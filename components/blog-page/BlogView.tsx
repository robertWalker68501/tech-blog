'use client';

import { use } from 'react';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { LuPen, LuTrash } from 'react-icons/lu';

import { authClient } from '@/lib/auth-client';

interface BlogViewProps {
  postPromise: Promise<{
    id: string;
    title: string;
    content: string;
    excerpt: string;
    createdAt: string | Date;
    slug: string;
    coverImageURL: string;
    author: {
      id: string;
      name: string;
      image: string | null;
    };
  } | null>;
}

const BlogView = ({ postPromise }: BlogViewProps) => {
  const post = use(postPromise);
  const { data: session } = authClient.useSession();
  const userId = session?.user.id;

  return (
    <article className='mx-auto max-w-3xl px-6 py-20'>
      {/* Article header */}
      <header className='mb-10'>
        <h1 className='primary-heading'>{post?.title}</h1>
        <div className='flex items-center gap-4 text-sm text-gray-400'>
          <div className='relative h-10 w-10 overflow-hidden rounded-full'>
            <Image
              src={post?.author.image || ''}
              alt='author-image'
              fill
              className='object-cover'
            />
          </div>
          <span>By {post?.author.name}</span>
          <span>.</span>
          <span>
            {new Date(post?.createdAt as string).toLocaleString('en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
      </header>

      {/* Article Image */}
      <div className='relative mb-12 h-55 w-full sm:h-80 lg:h-105'>
        <Image
          src={post?.coverImageURL || ''}
          alt='Article image'
          fill
          className='rounded-2xl object-cover'
        />
      </div>

      {/* Article content */}
      {post?.content && (
        <div
          className='blog-post max-w-none leading-relaxed tracking-wide text-gray-400'
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}

      <div className='my-16 border-t border-white/10' />

      {userId === post?.author.id && (
        <div className='flex items-center justify-end gap-2'>
          <Link
            href='#'
            className='inline-flex items-center gap-2 rounded-full border border-indigo-400/20 px-3 py-1.5 text-sm font-medium text-indigo-400 transition hover:border-indigo-400/40 hover:bg-indigo-400/10'
          >
            <LuPen />
            Edit
          </Link>
          <button
            type='button'
            className='inline-flex cursor-pointer items-center gap-2 rounded-full border border-red-400/20 px-3 py-1.5 text-sm font-medium text-red-400 transition hover:border-red-400/40 hover:bg-red-400/10 disabled:cursor-not-allowed'
          >
            <LuTrash />
            Delete
          </button>
        </div>
      )}

      <div className='mt-16'>
        <Link
          href='/articles'
          className='flex items-center gap-2 text-indigo-400 transition-colors hover:text-indigo-300'
        >
          <ArrowLeft size={20} /> Back to Articles
        </Link>
      </div>
    </article>
  );
};

export default BlogView;
