import React, { FC } from 'react';

import { Article } from '@components/content';
import createSanityApi from '@lib/sanity/api';
import { SANITY_CONFIG } from '@lib/sanity/config';
import { Post } from '@lib/sanity/types';

type Category = "news" | "announcements";

interface PostProps {
    post: Post;
    category: Category;
}

const getFooterTitleForCategory = (category: Category): string => {
    switch (category) {
        case "announcements":
            return "Zobraziť staršie oznamy";
        case "news":
            return "Naspäť";
    }
};

const Post: FC<PostProps> = ({ post, category }) => {
    const title = getFooterTitleForCategory(category);

    const { author, body, bodyPreview, ...postProps } = post;

    return (
        <Article
            author={author?.name}
            meta={{ title: postProps.title, description: bodyPreview }}
            {...postProps}
            renderProps={{
                sanityBody: body,
                links: {
                    backLink: {
                        href: `/post/${category}`,
                        title,
                    },
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

    if (slug === "latest") {
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
                slug: "latest",
                category: "announcements",
            },
            locale,
        });
    });

    return { paths, fallback: "blocking" };
}

export default Post;
