import React from "react";
import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";

import Article from "../../../components/Article";
import { Layout } from "../../../components/Layout";
import Spinner from "../../../components/Spinner";
import { SANITY_AVAILABLE_LOCALES, SANITY_ORDER_BY } from "../../../constants";
import sanity, { sanityPreview } from "../../../lib/sanity";
import Head from "next/head";

interface TPost {
    _id: string;
    title: string;
    body: object;
    bodyPreview: string;
    publishedAt: string;
    author: {
        name: string;
    };
}

type Categories = "news" | "announcements";

const getFooterTitleForCategory = (category: Categories): string => {
    switch (category) {
        case "announcements":
            return "Zobraziť staršie oznamy";
        case "news":
            return "Naspäť";
    }
};

const constructQuery = (drafts: boolean, slug: string) => `
        *[${
            drafts ? '_id in path("drafts.**") &&' : ""
        } _type == "post" && slug.current == "${slug}"]{
            ${POST_QUERY_FIELDS}
        } [0]
    `;

const Post = ({ post, category }: { post: TPost; category: Categories }) => {
    const title = getFooterTitleForCategory(category);

    const router = useRouter();

    if (router.isFallback) {
        return (
            <Layout>
                <div className="wrapper">
                    <Spinner />
                    <style jsx>{`
                        .wrapper {
                            display: flex;
                            align-items: center;
                            height: calc(100vh - 60px);
                            box-sizing: border-box;
                        }
                    `}</style>
                </div>
            </Layout>
        );
    }

    if (!post) {
        return (
            <>
                <Head>
                    <meta name="robots" content="noindex" />
                </Head>
                <DefaultErrorPage statusCode={404} />
            </>
        );
    }

    const { author, body, bodyPreview, ...rest } = post;

    return (
        <>
            <Article
                {...rest}
                content={{ body }}
                author={author && author.name}
                meta={{ title: rest.title, description: bodyPreview }}
                footer={{
                    back: {
                        href: `/post/${category}`,
                        title,
                    },
                }}
            />
        </>
    );
};

export const POST_QUERY_FIELDS = `
    _id,
    title,
    body,
    bodyPreview,
    'file': {
        'url': file.asset->url,
        'title': file.title,
    },
    mainImage,
    publishedAt,
    'author': author->{name}
`;

export async function getStaticProps({
    params: { slug, category },
    locale,
    preview,
}) {
    const sanityClient = preview ? sanityPreview : sanity;

    if (!SANITY_AVAILABLE_LOCALES.includes(locale)) {
        return {};
    }

    if (slug === "latest") {
        return {
            props: {
                category,
                post: await sanityClient.fetch(`
                    *[_type == "post" && "${category}" in categories[]->slug.current] {
                        ${POST_QUERY_FIELDS}
                    } ${SANITY_ORDER_BY} [0]
                `),
            },
            revalidate: 1,
        };
    }

    let post;

    if (preview) {
        post = await sanityClient.fetch(constructQuery(true, slug));
    }

    if (!post) {
        post = await sanityClient.fetch(constructQuery(false, slug));
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

    const posts = await sanity.fetch(`
        *[_type == "post"]{
            slug,
            'categories': categories[]->slug,
        } ${SANITY_ORDER_BY}
    `);

    SANITY_AVAILABLE_LOCALES.forEach((locale) => {
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

    return { paths, fallback: true };
}

export default Post;
