import React, { FC } from 'react';

import { Article } from '@components/content';
import createSanityApi from '@lib/sanity/api';
import { SANITY_CONFIG } from '@lib/sanity/config';
import { Post } from '@lib/sanity/types';

type Category = 'news' | 'word-from-the-monastery';

interface PostProps {
    post: Post;
    category: Category;
}

const Post: FC<PostProps> = ({ post, category }) => {
    const { author, body, bodyPreview, ...postProps } = post;

    return (
        <Article
            {...postProps}
            author={author?.name}
            meta={{ title: postProps.title, description: bodyPreview }}
            sanityBody={body}
            links={{
                backLink: {
                    href: `/post/${category}`,
                    title: 'Zobraziť všetky príspevky',
                },
            }}
        />
    );
};

export async function getStaticProps({
    params: { slug, category },
    locale,
    preview,
}) {
    const sanityApi = createSanityApi(preview);

    if (!SANITY_CONFIG.availableLocales.includes(locale)) {
        return {
            notFound: true,
        };
    }

    if (slug === 'latest') {
        const post = await sanityApi.getPost({ categorySlug: category });

        return {
            props: {
                category,
                post,
            },
            revalidate: 1,
        };
    }

    let post;

    if (preview) {
        post = await sanityApi.getPost({ draft: true, postSlug: slug });
    }

    if (!post) {
        post = await sanityApi.getPost({ draft: false, postSlug: slug });
    }

    return {
        props: {
            category,
            post,
        },
        revalidate: 1,
    };
}

export async function getStaticPaths() {
    const paths = [];

    const sanityApi = createSanityApi();

    const posts = await sanityApi.getPostsCategories();

    SANITY_CONFIG.availableLocales.forEach((locale) => {
        posts.forEach(({ slug, categories }) => {
            categories.forEach((category) => {
                paths.push({
                    params: {
                        slug: slug.current,
                        category: category.current,
                    },
                    locale,
                });
            });
        });

        paths.push({
            params: {
                slug: 'latest',
                category: 'word-from-the-monastery',
            },
            locale,
        });
    });

    return { paths, fallback: 'blocking' };
}

export default Post;
