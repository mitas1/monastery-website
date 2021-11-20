import React from 'react';

import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';

import { ArticleFragment } from '@components/article';
import { ArticleHeader } from '@components/article/ArticleHeader';
import {
  CenterBox,
  Layout,
} from '@components/common';
import createSanityApi from '@lib/sanity/api';
import { SANITY_CONFIG } from '@lib/sanity/config';
import { usePosts } from '@lib/sanity/hooks';

const sanityApi = createSanityApi();

const Articles = ({ articles: ssrArticles, category, totalCount }) => {
    const { t } = useTranslation("common");

    const { posts, loadMore } = usePosts(
        category.slug.current,
        ssrArticles,
        totalCount
    );

    return (
        <Layout>
            <Head>
                <title>{`${category.title} | ${t("title")}`}</title>
            </Head>
            <CenterBox className="p-8">
                <ArticleHeader title={category.title} />
                <div className="space-y-14">
                    {posts?.map((post) => (
                        <ArticleFragment
                            key={post._id}
                            href={`/post/${category.slug.current}/${post.slug.current}`}
                            layout="image"
                            {...post}
                        />
                    ))}
                </div>
                <button onClick={loadMore}>Load more</button>
            </CenterBox>
        </Layout>
    );
};

export async function getStaticProps({ params: { category } }) {
    const articles = await sanityApi.getPosts(category);
    const totalCount = await sanityApi.getPostsCount(category);
    const fetchedCategory = await sanityApi.getCategory(category);

    return {
        props: {
            articles,
            totalCount,
            category: fetchedCategory,
        },
        revalidate: 1,
    };
}

export async function getStaticPaths() {
    const paths = [];

    const categories = await sanityApi.getCategories();

    SANITY_CONFIG.availableLocales.forEach((locale) => {
        categories.forEach(({ slug }) => {
            paths.push({
                params: {
                    category: slug.current,
                },
                locale,
            });
        });
    });

    return { paths, fallback: false };
}

export default Articles;
