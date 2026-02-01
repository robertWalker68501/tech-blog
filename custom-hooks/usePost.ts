import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchPosts } from '@/services/post';
import { FetchPostsResponse } from '@/types/post';

export function useInfinitePosts({ limit }: { limit: number }) {
  return useInfiniteQuery<FetchPostsResponse>({
    queryKey: ['posts', { limit }],
    queryFn: ({ pageParam }) =>
      fetchPosts({ pageParam: pageParam as string | null, limit }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor || null,
  });
}
