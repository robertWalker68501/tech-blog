import axios from 'axios';

import { FetchPostsParams, FetchPostsResponse } from '@/types/post';

export async function fetchPosts({
  pageParam,
  limit,
}: FetchPostsParams): Promise<FetchPostsResponse> {
  const res = await axios.get('/sapi/posts', {
    params: {
      cursor: pageParam,
      limit,
    },
  });
  return res.data;
}
