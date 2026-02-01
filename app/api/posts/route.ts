import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import slugify from 'slugify';

import { auth } from '@/lib/auth';
import { Prisma } from '@/lib/generated/prisma/client';
import prisma from '@/lib/prisma';
import {
  CloudinaryUploadResult,
  uploadToCloudinary,
  deleteFromCloudinary,
} from '@/services/cloudinary';

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const coverImage = formData.get('coverImage') as File;

    if (!title || !coverImage || !content || !excerpt) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Generate slug
    let baseSlug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Guard against empty slugs
    if (!baseSlug) {
      baseSlug = `post-${Math.random().toString(36).substring(2, 8)}`;
    }

    // Ensure slug is unique initially
    let slug = baseSlug;
    let counter = 1;

    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Upload the cover image to cloudinary
    const imageData: CloudinaryUploadResult =
      await uploadToCloudinary(coverImage);

    // Create post with exponential backoff for race conditions
    let post;
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      try {
        post = await prisma.post.create({
          data: {
            title,
            content,
            excerpt,
            slug,
            coverImageURL: imageData.secure_url,
            coverImagePublicId: imageData.public_id,
            authorId: session.user.id,
          },
        });
        break; // Success
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002'
        ) {
          attempts++;
          if (attempts >= maxAttempts) {
            await deleteFromCloudinary(imageData.public_id);
            throw error;
          }

          // Regenerate slug for next attempt
          slug = `${baseSlug}-${counter}`;
          counter++;

          // Exponential backoff
          const delay = Math.pow(2, attempts) * 100 + Math.random() * 50;
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          await deleteFromCloudinary(imageData.public_id);
          if (!post) {
            throw new Error('Failed to create post after retries');
          }
        }
      }
    }

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('CREATE_POST_ERROR: ', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const DEFAULT_LIMIT = 3;
    const MAX_LIMIT = 50;

    const cursor = searchParams.get('cursor');

    const rawLimit = Number(searchParams.get('limit'));
    const limit =
      Number.isNaN(rawLimit) || rawLimit <= 0
        ? DEFAULT_LIMIT
        : Math.min(rawLimit, MAX_LIMIT);

    const posts = await prisma.post.findMany({
      take: limit + 1,
      orderBy: { createdAt: 'desc' },
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      select: {
        id: true,
        excerpt: true,
        title: true,
        slug: true,
        createdAt: true,
        coverImageURL: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    // Determine the pagination states
    const hasMore = posts.length > limit;

    const items = hasMore ? posts.slice(0, limit) : posts;

    const nextCursor = hasMore ? items[items.length - 1].id : null;

    return NextResponse.json({
      posts: items,
      nextCursor,
    });
  } catch (error) {
    console.error('FETCH_POSTS_ERROR: ', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
