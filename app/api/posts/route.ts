import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import slugify from 'slugify';

import { auth } from '@/lib/auth';
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
    const baseSlug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Ensure slug is unique
    let slug = baseSlug;
    let counter = 1;

    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Upload the cover image to cloudinary
    const imageData: CloudinaryUploadResult =
      await uploadToCloudinary(coverImage);

    const post = await prisma.post.create({
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

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('CREATE_POST_ERROR: ', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
