"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import queryString from "query-string";

interface UseGetPosts {
  queryKey: string;
  paramKey: string;
  paramValue: string;
}

export function useGetPosts({ queryKey, paramKey, paramValue }: UseGetPosts) {
  async function fetchProjects(pageParam: string | null) {
    try {
      const qs = queryString.stringifyUrl({
        url: `/api/messages`,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
        },
      });

      const data = await axios.get(qs);
      return data.data;
    } catch (err) {
      console.log(err);
    }
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }: { pageParam: string | null }) => {
      return fetchProjects(pageParam);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage: any) => lastPage?.nextCursor,
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
}
