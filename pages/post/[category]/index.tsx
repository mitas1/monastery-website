import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

import Button from "../../../components/Button";
import sanity from "../../../lib/sanity";
import { SANITY_AVAILABLE_LOCALES, SANITY_ORDER_BY } from "../../../constants";
import { ArticleWrapper, Header } from "../../../components/Article";
import { formatDate } from "../../../utils";
import { Layout, Content, Heading } from "../../../components/Layout";
import { urlFor } from "../../../lib/sanity";

const INITIAL_COUNT_FETCHED = 2;
const ARTICLES_PER_PAGE = 2;

const ShortArticle = ({
    author,
    bodyPreview,
    date,
    href,
    mainImage,
    title,
}) => {
    return (
        <div className="wrapper">
            <div className="image">
                {mainImage && (
                    <Link href={href}>
                        <a>
                            <Image
                                src={urlFor(mainImage)
                                    .size(220, 140)
                                    .quality(100)
                                    .url()}
                                layout="fill"
                                objectFit="cover"
                                alt="Obrázok článku"
                            />
                        </a>
                    </Link>
                )}
            </div>
            <article className="article">
                <Link href={href}>
                    <a className="text-link">
                        <h2 className="title">{title}</h2>
                        <p className="text">{bodyPreview}</p>
                    </a>
                </Link>

                <p className="meta">
                    <span className="date">{formatDate(date)}</span>
                    <span className="dot">·</span>
                    <span className="author">{author}</span>
                </p>
            </article>
            <style jsx>{`
                .wrapper {
                    margin: 36px 0;
                    display: flex;
                    flex-direction: row-reverse;
                    justify-content: space-between;
                    text-align: left;
                }
                .image {
                    position: relative;
                    width: 100px;
                    height: 100px;
                    flex: 0 0 auto;
                }
                .article {
                    margin: 0 16px 0 0;
                }
                .title {
                    font-size: 18px;
                    line-height: 1.3;
                    color: #333;
                }
                .text-link {
                    text-decoration: none;
                }
                .meta {
                    font-size: 14px;
                    color: #777;
                    margin: 8px 0 0;
                }
                .dot {
                    padding: 0 8px;
                }
                .text {
                    color: #777;
                    margin: 4px 0 0 0;
                    font-size: 14px;
                    line-height: 1.2;
                    max-height: 2.4em;
                    overflow: hidden;
                }

                @media screen and (min-width: 992px) {
                    .wrapper {
                        justify-content: flex-end;
                        flex-direction: row;
                    }

                    .image {
                        width: 220px;
                        height: 140px;
                    }

                    .article {
                        width: 450px;
                        margin: 0 0 0 24px;
                    }
                    .article.first-child {
                        border-top: none;
                    }
                    .title {
                        font-size: 20px;
                    }
                    .text {
                        margin: 16px 48px 16px 0;
                        line-height: 1.4;
                        max-height: 2.8em;
                    }
                }
            `}</style>
        </div>
    );
};

const Articles = ({ count, posts, category, skip }) => {
    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [cursor, setCursor] = React.useState(1);

    const { t } = useTranslation("common");

    React.useEffect(() => {
        setItems([...posts]);
    }, [posts]);

    const from = skip + (cursor - 1) * ARTICLES_PER_PAGE;
    const to = skip + (cursor * ARTICLES_PER_PAGE - 1);

    const loadMore = async () => {
        setLoading(true);

        const result = await sanity.fetch(
            `
                *[_type == "post" && "${category.slug.current}" in categories[]->slug.current]{
                      title,
                      slug,
                      publishedAt,
                      mainImage,
                      bodyPreview
                    } ${SANITY_ORDER_BY} [${from}..${to}]
              `
        );

        setCursor(cursor + 1);
        setItems([...items, ...result]);
        setLoading(false);
    };

    return (
        <Layout>
            <Head>
                <title>{`${category.title} | ${t("title")}`}</title>
            </Head>
            <Content>
                <ArticleWrapper>
                    <div className="wrapper">
                        <Header>
                            <Heading level={1}>{category.title}</Heading>
                        </Header>
                        {items.length > 0 &&
                            items.map((item, i) => (
                                <ShortArticle
                                    key={i}
                                    mainImage={item.mainImage}
                                    author={item.author}
                                    date={item.publishedAt}
                                    bodyPreview={item.bodyPreview}
                                    href={`/post/${category.slug.current}/${item.slug.current}`}
                                    title={item.title}
                                ></ShortArticle>
                            ))}

                        {count > cursor * ARTICLES_PER_PAGE && (
                            <Button onClick={loadMore}>
                                {loading ? "Načítavam..." : "Staršie články"}
                            </Button>
                        )}
                    </div>
                </ArticleWrapper>
            </Content>
            <style jsx>{`
                @media screen and (min-width: 992px) {
                    .wrapper {
                        margin: 0 auto;
                        width: 800px;
                        text-align: center;
                    }
                }
            `}</style>
        </Layout>
    );
};

export async function getStaticProps({ params: { category } }) {
    return {
        props: {
            skip: INITIAL_COUNT_FETCHED,
            ...(await sanity.fetch(`{
                'category': *[_type == "category" && slug.current == "${category}"]{title, slug}[0],
                'count': count(*[_type == "post" && "${category}" in categories[]->slug.current]),
                'posts': *[_type == "post" && "${category}" in categories[]->slug.current]{
                    title,
                    slug,
                    publishedAt,
                    'author': author->name,
                    mainImage,
                    bodyPreview
                  } ${SANITY_ORDER_BY} [0..${INITIAL_COUNT_FETCHED - 1}]
            }`)),
        },
        revalidate: 1,
    };
}

export async function getStaticPaths() {
    const paths = [];

    const categories = await sanity.fetch(`
        *[_type == "category"]{
            slug,
        }
    `);

    SANITY_AVAILABLE_LOCALES.forEach((locale) => {
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
