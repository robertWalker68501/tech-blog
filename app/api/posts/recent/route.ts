import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImageURL: true,
        createdAt: true,
      },
      take: 6,
    });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch posts', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent posts' },
      { status: 500 }
    );
  }
}
