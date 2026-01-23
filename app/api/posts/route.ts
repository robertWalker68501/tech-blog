import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import slugify from 'slugify';

import { auth } from '@/lib/auth';
import { Prisma } from '@/lib/generated/prisma/client';
import prisma from '@/lib/prisma';
import {
  CloudinaryUploadResult,
  uploadToCloudinary,
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
          if (attempts >= maxAttempts) throw error;

          // Regenerate slug for next attempt
          slug = `${baseSlug}-${counter}`;
          counter++;

          // Exponential backoff
          const delay = Math.pow(2, attempts) * 100 + Math.random() * 50;
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          throw error;
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
