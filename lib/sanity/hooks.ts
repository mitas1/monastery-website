import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import { useAsyncCallback } from 'react-async-hook';

import { sanityApi } from './api';
import { SANITY_CONFIG } from './config';

const POSTS_PER_PAGE = SANITY_CONFIG.postsPerPage;

export function usePosts(
    categorySlug: string,
    initialState: any,
    totalCount: number
) {
    const skip = initialState.length;

    const [currentPage, setCurrentPage] = useState(0);

    const hasMore = currentPage * POSTS_PER_PAGE < totalCount;

    const loadMore = useCallback(async () => {
        console.log(
            skip + currentPage * POSTS_PER_PAGE,
            skip + (currentPage + 1) * POSTS_PER_PAGE
        );
        return await sanityApi.getPosts(
            categorySlug,
            skip + currentPage * POSTS_PER_PAGE,
            skip + (currentPage + 1) * POSTS_PER_PAGE
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
