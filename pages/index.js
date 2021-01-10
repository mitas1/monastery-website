import css from "styled-jsx/css";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

import Baner from "../components/Baner";
import Button from "../components/Button";
import sanity from "../lib/sanity";
import { Content, ContentRight, Layout } from "../components/Layout";
import { Heading } from "../components/Layout";
import { paragraphStyles } from "../components/ArticleContent";

import { SANITY_AVAILABLE_LOCALES, SANITY_ORDER_BY } from "../constants";
import { formatDate } from "../utils";

const styles = css`
    .markdown {
        padding: 48px 24px;
    }
    .markdown :global(p) {
        ${paragraphStyles}
        font-size: 20px;
        font-weight: 300;
    }
    .markdown :global(h1) {
        display: block;
        font-family: "Martel", serif;
        font-size: 33px;
        font-weight: 600;
        line-height: 1.5;
        position: relative;
    }
    @media screen and (min-width: 992px) {
        .markdown {
            width: 500px;
            margin: 60px 0 130px 0;
        }
        .markdown :global(h1) {
            max-width: 400px;
        }
        .markdown :global(h1)::before {
            background-image: url("/images/quote.svg");
            background-repeat: no-repeat;
            content: "";
            display: block;
            height: 60px;
            margin: 4px 0 0 -60px;
            position: absolute;
            width: 100px;
        }
    }
`;

export const ShortArticle = ({
    title,
    text,
    number,
    author,
    date,
    readMore,
    href,
    inverse,
}) => (
    <article className={inverse ? "short-article inverse" : "short-article"}>
        {number ? (
            <span className="number">{number}</span>
        ) : (
            <span className="meta">
                {formatDate(date)}
                {author && (
                    <>
                        <span className="dot">·</span>
                        {author}
                    </>
                )}
            </span>
        )}
        <Link href={href}>
            <a className="text-link">
                <h1 className="heading">{title}</h1>
                <p className="text">{text}</p>
            </a>
        </Link>
        <Link href={href}>
            <a className="link">{readMore}</a>
        </Link>
        <style jsx>{`
            .meta {
                color: #777;
                font-size: 14px;
                line-height: 2;
            }
            .dot {
                margin: 0 8px;
            }
            .short-article {
                color: #0c1a24;
                flex: 1;
                padding: 0 24px 0 16px;
                margin: 16px 0 24px;
            }
            .short-article.inverse {
                color: #fff;
            }
            .number {
                font-size: 10px;
                color: #848b90;
            }
            .heading {
                font-size: 28px;
                font-family: "Martel", serif;
                font-weight: 600;
                margin: 0 0 8px;
            }
            .text {
                color: #6c767b;
                font-size: 16px;
                font-weight: 300;
                line-height: 30px;
                padding: 0;
            }
            .inverse .text {
                color: #fff;
            }
            .link {
                margin: 26px 0;
                color: #006cb9;
                text-decoration: none;
                display: flex;
            }
            .inverse .link {
                color: #fff;
            }
            .text-link {
                text-decoration: none;
                color: #333;
            }
            .inverse .text-link {
                color: #fff;
            }
            .link::after {
                width: 25px;
                height: 8px;
                margin: 0 0 0 8px;
                display: flex;
                align-self: center;
                content: "";
                background-image: url("/images/arrow.svg");
                background-repeat: no-repeat;
            }
            @media screen and (min-width: 992px) {
                .short-article {
                    margin: 50px 0 58px;
                    padding: 0 70px 0 50px;
                    border-left: 1px dotted #979797;
                    max-width: 33%;
                    box-sizing: border-box;
                }
                .short-article:first-child {
                    padding: 0 80px 0 16px;
                    border-left: none;
                }
            }
        `}</style>
    </article>
);

const Paragraph = ({ children }) => (
    <p>
        {children}
        <style jsx>{`
            font-size: 22px;
            font-weight: 300;
            line-height: 1.6;
            margin: 0 0 24px;
            max-width: 450px;
        `}</style>
    </p>
);

const ShortArticleWithAside = ({ t }) => (
    <section id="test" className="wrapper">
        <aside className="image">
            <Image
                layout="fill"
                objectFit="cover"
                className="aside-image"
                src="/images/benedikt.jpg"
                alt="Detail: Kopf des Hl. Benedikt, Fra Angelico"
            />
        </aside>
        <article className="article">
            <Heading level={3} element="span">
                {t("index:shortArticleWithAside.subtitle")}
            </Heading>
            <Heading level={1}>
                {t("index:shortArticleWithAside.title")}
            </Heading>
            <Paragraph>{t("index:shortArticleWithAside.text")}</Paragraph>
            <span className="title">
                <Heading level={3} element="span">
                    {t("index:shortArticleWithAside.acronym.title")}
                </Heading>
                <strong className="acronym">
                    {t("index:shortArticleWithAside.acronym.text")}
                </strong>
            </span>
            <div className="image-title">
                <i>{t("index:shortArticleWithAside.imageLabel")}</i>
            </div>
        </article>

        <style jsx>{`
            .article {
                padding: 48px 24px;
            }
            .image {
                position: relative;
                width: 100%;
                height: 500px;
            }

            .title > :global(h3) {
                display: inline;
            }

            .image-title {
                padding: 48px 0 0 0;
                overflow: hidden;
                font-size: 12px;
            }
            .acronym {
                margin: 0 0 0 24px;
            }

            @media screen and (min-width: 992px) {
                .article {
                    padding: 90px 110px;
                }
                .image {
                    width: 390px;
                    height: 600px;
                }
                .image-title {
                    padding: 64px 0 0 0;
                }
                .wrapper {
                    display: flex;
                }
            }
        `}</style>
    </section>
);

export const ThreeColumnWrapper = ({ inverse, children }) => (
    <div className={inverse ? "inverse wrapper" : "wrapper"}>
        <Content>
            <div className="content">{children}</div>
        </Content>
        <style jsx>{`
            .wrapper {
                padding: 24px;
            }
            .inverse.wrapper {
                background: #222;
            }
            .content {
                display: flex;
                flex-direction: column;
            }
            @media screen and (min-width: 992px) {
                .content {
                    flex-direction: row;
                }
            }
        `}</style>
    </div>
);

const Index = ({ news }) => {
    const { t } = useTranslation("common");

    return (
        <Layout header={{ addTopListener: true }} footer={{ background: true }}>
            <Baner />
            {news && news.length > 0 && (
                <>
                    <ThreeColumnWrapper>
                        {news.map(
                            ({
                                title,
                                bodyPreview,
                                author,
                                publishedAt,
                                slug,
                                _id,
                            }) => (
                                <ShortArticle
                                    key={_id}
                                    date={publishedAt}
                                    href={`/post/news/${slug.current}`}
                                    title={title}
                                    author={author}
                                    text={bodyPreview}
                                    readMore={t("readMore")}
                                />
                            )
                        )}
                    </ThreeColumnWrapper>
                    {news.length > 3 && <div className="button">
                        <Button href="/post/news">
                            {t("index:news.button")}
                        </Button>
                    </div>}
                </>
            )}
            <ThreeColumnWrapper inverse>
                <ShortArticle
                    inverse
                    number="01"
                    href="/monastery-life"
                    {...t("index:article01", {}, { returnObjects: true })}
                    readMore={t("readMore")}
                />
                <ShortArticle
                    inverse
                    number="02"
                    href="/guests"
                    {...t("index:article02", {}, { returnObjects: true })}
                    readMore={t("readMore")}
                />
                <ShortArticle
                    inverse
                    number="03"
                    href="/experiences"
                    {...t("index:article03", {}, { returnObjects: true })}
                    readMore={t("readMore")}
                />
            </ThreeColumnWrapper>
            <div className="content-gray">
                <Content>
                    <ShortArticleWithAside t={t} />
                </Content>
            </div>
            <Content>
                <ContentRight>
                    <div className="markdown">
                        <Heading>{t("index:aboutus.title")}</Heading>
                        <Paragraph>{t("index:aboutus.text")}</Paragraph>
                    </div>
                </ContentRight>
            </Content>
            <style jsx>{styles}</style>
            <style jsx>{`
                .button {
                    margin: 0 0 48px;
                    text-align: center;
                }
                .content-gray {
                    background-color: #fafafa;
                }
            `}</style>
        </Layout>
    );
};

export async function getStaticProps({ locale }) {
    if (SANITY_AVAILABLE_LOCALES.includes(locale)) {
        return {
            props: {
                news: await sanity.fetch(`
                *[_type == "post" && "news" in categories[]->slug.current] {
                    _id,
                    title,
                    'author': author->name,
                    bodyPreview,
                    slug,
                    publishedAt
                } ${SANITY_ORDER_BY} [0...3]`),
            },
            revalidate: 1,
        };
    }
    return {};
}

export default Index;
