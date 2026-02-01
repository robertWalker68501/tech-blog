import Image from 'next/image';
import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';

import { Post } from '@/types/post';

const RecentPosts = async () => {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    throw new Error('BASE_URL environment variable is not configured');
  }

  const res = await fetch(`${baseUrl}/api/posts/recent`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch recent posts');
  }

  const { posts }: { posts: Post[] } = await res.json();

  return (
    <div className='mb-10 space-y-2'>
      <h2 className='mb-6 text-xl font-semibold text-white sm:text-2xl md:text-3xl'>
        Recent Posts
      </h2>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post) => {
          return (
            <div
              key={post.id}
              className='group overflow-hidden rounded-xl border border-white/10 bg-[#0B0B0B] transition-all duration-300 hover:-translate-y-1 hover:border-white/20'
            >
              {/* Image */}
              {post.coverImageURL && (
                <div className='relative h-75 w-full overflow-hidden'>
                  <Image
                    src={post.coverImageURL}
                    alt={post.title}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-black/30' />
                </div>
              )}

              {/* Content */}
              <div className='space-y-3 p-5'>
                <time className='text-xs text-gray-400'>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                </time>
                <h3 className='text-lg leading-snug font-semibold text-white transition-colors group-hover:text-indigo-400'>
                  {post.title}
                </h3>
                <p className='line-clamp-3 text-sm leading-relaxed text-gray-400'>
                  {post.excerpt}
                </p>
                <Link
                  href={`/articles/${post.slug}`}
                  className='inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:underline'
                >
                  Read Article <LuArrowRight className='h-4 w-4' />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentPosts;
