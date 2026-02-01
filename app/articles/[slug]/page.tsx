import { Suspense } from 'react';

import BlogView from '@/components/blog-page/BlogView';
import PostViewSkeleton from '@/components/skeletons/PostViewSkeleton';
import { getPostBySlug } from '@/server-actions/getPost';

const ArticlePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = await (await params).slug;
  const postPromise = getPostBySlug(slug);

  return (
    <div className='container'>
      <Suspense fallback={<PostViewSkeleton />}>
        <BlogView postPromise={postPromise} />
      </Suspense>
    </div>
  );
};

export default ArticlePage;
