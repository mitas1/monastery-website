import React from "react";
import Head from "next/head";
import Link from "next/link";


import { ParallaxProvider } from "react-scroll-parallax";

import { withTranslation } from "../lib/i18n";

import { NarrowMarkdown, Subheading, Paragraph } from "../components/Markdown";
import Baner from "../components/Baner";
import Content from "../components/Content";
import Layout from "../components/Layout";

const AboutUs = withTranslation("aboutus")(({ t }) => (
    <NarrowMarkdown>{t("__content")}</NarrowMarkdown>
));

const ShortArticle = ({
    title,
    text,
    number,
    readMore,
    pathname,
}) => (
    <article className="short-article">
        <span className="number">{number}</span>
        <h1 className="heading">{title}</h1>
        <p className="text">{text}</p>
        <Link href={pathname}>
            <a className="link">{readMore}</a>
        </Link>
        <style jsx>{`
            .short-article {
                color: #0c1a24;
                flex: 1;
                padding: 0 70px 0 50px;
                margin: 50px 0 58px;
                border-left: 1px dotted #979797;
            }
            .short-article:first-child {
                padding: 0 80px 0 16px;
                border-left: none;
            }
            .number {
                font-size: 10px;
                color: #757c81;
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
            .link {
                margin: 26px 0;
                color: #006cb9;
                text-decoration: none;
                display: flex;
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
            @media screen and (max-width: 992px) {
                .short-article,
                .short-article:first-child {
                    padding: 8px 24px;
                    margin: 0;
                    border-left: none;
                }
            }
        `}</style>
    </article>
);

const ShortArticleWithAside = ({ t }) => (
    <article id="test" className="short-article-with-aside">
        <img className="aside-image" src="/images/benedikt.jpg" alt="Detail: Kopf des Hl. Benedikt, Fra Angelico" />
        <div className="wrapper">
            <Subheading text={t("shortArticleWithAside.subtitle")} />
            <h1 className="heading">
                {t("shortArticleWithAside.title")}
            </h1>
            <div className="text">
                <Paragraph>{t("shortArticleWithAside.text")}</Paragraph>
            </div>
            <span className="title">
                <Subheading
                    text={t("shortArticleWithAside.acronym.title")}
                    inline
                />
                <span className="acronym">
                    {t("shortArticleWithAside.acronym.text")}
                </span>
            </span>
        </div>
        <div className="image-title">
            <i>{t("shortArticleWithAside.imageLabel")}</i>
        </div>
        <style jsx>{`
            .short-article-with-aside {
                background-color: #fafafa;
                overflow: auto;
                position: relative;
            }
            .heading {
                display: block;
                font-family: "Martel", serif;
                font-weight: 600;
                width: 300px;
                line-height: 1;
                font-size: 50px;
                padding: 10px 0 10px;
            }
            .aside-image {
                float: left;
                width: 390px;
            }
            .wrapper {
                padding: 90px 0 70px 114px;
                overflow: hidden;
            }
            .text {
                max-width: 420px;
            }
            .acronym {
                margin: 0 0 0 20px;
                font-size: 16px;
                line-height: 20px;
            }
            .image-title {
                padding: 0 0 0 114px;
                overflow: hidden;
                font-size: 12px;
            }
            @media screen and (max-width: 992px) {
                .heading {
                    width: 100%;
                    padding: 0;
                }
                .aside-image {
                    width: 100%;
                }
                .wrapper {
                    padding: 48px 24px;
                    float: left;
                }
                .title {
                    display: none;
                }
                .image-title {
                    display: none;
                }
                .text {
                    width: 100%;
                }
            }
        `}</style>
    </article>
);

const Index = ({ t }) => {
    return (
        <ParallaxProvider>
            <Head>
                <title>{t('title')}</title>
                <meta name="description" content={t('metaDescription')} />
            </Head>
            <Layout
                header={{ addTopListener: true }}
                footer={{ background: true }}
            >
                <Baner />
                <Content>
                    <div className="short-articles-wrapper">
                        <ShortArticle
                            number="01"
                            pathname="/monasterylife"
                            {...t("article01")}
                            readMore={t("readMore")}
                        />
                        <ShortArticle
                            number="02"
                            pathname="/guests"
                            {...t("article02")}
                            readMore={t("readMore")}
                        />
                        <ShortArticle
                            number="03"
                            pathname="/experiences"
                            {...t("article03")}
                            readMore={t("readMore")}
                        />
                    </div>
                </Content>
                <div className="content-gray">
                    <Content>
                        <ShortArticleWithAside t={t} />
                    </Content>
                </div>
                <Content>
                    <AboutUs />
                </Content>
                <style jsx>{`
                    .short-articles-wrapper {
                        display: flex;
                        flex-direction: row;
                    }
                    .content-gray {
                        background-color: #fafafa;
                    }
                    @media screen and (max-width: 992px) {
                        .short-articles-wrapper {
                            flex-direction: column;
                            margin: 16px 0;
                        }
                    }
                `}</style>
            </Layout>
        </ParallaxProvider>
    );
};

Index.getInitialProps = async () => ({
    namespacesRequired: ["index", "aboutus", "footer", "header"],
});

export default withTranslation("index")(Index);
