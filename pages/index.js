import React from "react";
import path from "path";
import Link from "next/link";
import { withNamespaces } from "react-i18next";

import { withI18next } from "../lib/withI18next";

import { NarrowMarkdown, Subheading, Paragraph } from "../components/Markdown";
import Baner from "../components/Baner";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

const ShortArticle = ({
    heading,
    content,
    number,
    readMore,
    lng,
    pathname
}) => (
    <article className="short-article">
        <span className="number">{number}</span>
        <h1 className="heading">{heading}</h1>
        <p className="text">{content}</p>
        <Link
            href={{
                pathname,
                query: { lng }
            }}
            as={{ pathname: path.join(pathname, lng) }}
        >
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
                padding: 0 0 0 0;
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
                background-image: url("/static/images/arrow.svg");
                background-repeat: no-repeat;
            }
        `}</style>
    </article>
);

const ShortArticleWithAside = ({ t }) => (
    <article id="test" className="short-article-with-aside">
        <img className="aside-image" src="/static/images/benedikt.jpg" />
        <div className="wrapper">
            <Subheading text={t("shortArticleWithAside.subtitle")} />
            <h1 className="heading">{t("shortArticleWithAside.title")}</h1>
            <p className="text">
            <Paragraph>{t("shortArticleWithAside.text")}</Paragraph>
            </p>
            <span>
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
        `}</style>
    </article>
);

export default withI18next()(
    withNamespaces(["index", "markdown"])(({ t, i18n: { language } }) => (
        <Layout addTopListener={true}>
            <Baner />
            <Content>
                <div className="short-articles-wrapper">
                    <ShortArticle
                        number="01"
                        lng={language}
                        pathname="/monasterylife"
                        heading={t("article01.title")}
                        content={t("article01.text")}
                        readMore={t("readMore")}
                    />
                    <ShortArticle
                        number="02"
                        lng={language}
                        pathname="/guests"
                        heading={t("article02.title")}
                        content={t("article02.text")}
                        readMore={t("readMore")}
                    />
                    <ShortArticle
                        number="03"
                        pathname="/experiences"
                        lng={language}
                        heading={t("article03.title")}
                        content={t("article03.text")}
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
                <NarrowMarkdown content={t("markdown:aboutUs").html} />
            </Content>
            <Footer background />
            <style jsx>{`
                .short-articles-wrapper {
                    display: flex;
                    flex-direction: row;
                }
                .content-gray {
                    background-color: #fafafa;
                }
            `}</style>
        </Layout>
    ))
);
