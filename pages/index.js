import React from "react";

import { withI18next } from "../lib/withI18next";
import { translate } from "react-i18next";
import Baner from "../components/Baner";
import Layout from "../components/Layout";

import { NarrowMarkdown, Subheading, Paragraph } from "../components/Markdown";
import Content from "../components/Content";
import Footer from "../components/Footer";

const ShortArticle = ({ heading, content, number }) => (
    <article className="short-article">
        <span className="number">{number}</span>
        <h1 className="heading">{heading}</h1>
        <p className="text">{content}</p>
        <a href="text" className="link">
            Citat viac
        </a>
        <style jsx>{`
            .short-article {
                color: #0c1a24;
                flex: 1;
                padding: 0 80px 0 50px;
                margin: 90px 0 110px;
                border-left: 1px dotted #979797;
            }
            .short-article:first-child {
                padding: 0 80px 0 16px;
                border-left: none;
            }
            .number {
                font-size: 10px;
                color: #0c1a24;
            }
            .heading {
                font-size: 28px;
                font-weight: 300;
                margin: 19px 0 34px;
            }
            .text {
                color: #6c767b;
                font-size: 15px;
                font-weight: 300;
                line-height: 2;
            }
            .link {
                margin: 16px 0;
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
    <article className="short-article-with-aside">
        <img className="aside-image" src="/static/images/benedikt.png" />
        <div className="wrapper">
            <Subheading text={t("shortArticleWithAside.subtitle")} />
            <h1 className="heading">{t("shortArticleWithAside.title")}</h1>
            <Paragraph>{t("shortArticleWithAside.text")}</Paragraph>
        </div>
        <style jsx>{`
            .short-article-with-aside {
                background-color: #fafafa;
                overflow: auto;
                position: relative;
            }
            .heading {
                display: block;
                font-family: "Roboto", sans-serif;
                font-weight: 200;
                width: 300px;
                line-height: 1.5;
                font-size: 50px;
                padding: 10px 0 20px;
            }
            .aside-image {
                float: left;
                width: 390px;
            }
            .wrapper {
                padding: 90px 250px 90px 114px;
                overflow: hidden;
            }
        `}</style>
    </article>
);
export default withI18next()(
    translate(["index", "markdown"])(({ t, ...other }) => (
        <Layout>
            <Baner />
            <Content>
                <div className="short-articles-wrapper">
                    <ShortArticle
                        number="01"
                        heading={t("article01.title")}
                        content={t("article01.text")}
                    />
                    <ShortArticle
                        number="02"
                        heading={t("article02.title")}
                        content={t("article02.text")}
                    />
                    <ShortArticle
                        number="03"
                        heading={t("article03.title")}
                        content={t("article03.text")}
                    />
                </div>
            </Content>
            <div className="content-gray">
                <Content>
                    <ShortArticleWithAside t={t} />
                </Content>
            </div>
            <Content>
                <NarrowMarkdown content={t("markdown:aboutUs")} />
            </Content>
            <Footer />
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
