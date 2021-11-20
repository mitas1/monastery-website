import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import { useAsyncCallback } from 'react-async-hook';

import { sanityApi } from './api';
import { POSTS_PER_PAGE } from './client';

export function usePosts(
    categorySlug: string,
    initialState: any,
    totalCount: number
) {
    const [currentPage, setCurrentPage] = useState(() => {
        if (!initialState) {
            return 1;
        }
        return Math.ceil(initialState.length / POSTS_PER_PAGE);
    });

    const hasMore = currentPage * POSTS_PER_PAGE < totalCount;

    const loadMore = useCallback(async () => {
        return await sanityApi.getPosts(
            categorySlug,
            currentPage * POSTS_PER_PAGE,
            (currentPage + 1) * POSTS_PER_PAGE
        );
    }, [currentPage]);

    const setResult = useCallback(
        (result, state) => {
            if (result.length > 0) {
                setCurrentPage((page) => page + 1);

                return {
                    ...state,
                    result: state.result
                        ? [...state.result, ...result]
                        : result,
                    loading: false,
                };
            }
            return { ...state, loading: false };
        },
        [setCurrentPage]
    );

    const setLoading = useCallback(
        (state) => ({ ...state, loading: true }),
        []
    );

    const { result, execute, ...asyncCallback } = useAsyncCallback(loadMore, {
        setResult,
        setLoading,
    });

    const posts = useMemo(() => {
        return result ? initialState.concat(result) : initialState;
    }, [initialState, result]);

    return {
        ...asyncCallback,
        loadMore: execute,
        posts,
        hasMore,
    };
}
