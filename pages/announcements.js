import React from "react";
import Head from "next/head";
import moment from "moment";

import sanity from "../lib/sanity";
import { withTranslation } from "../lib/i18n";

import { Wrapper, Heading } from "../components/Preamble";
import Layout from "../components/Layout";
import BlockContent from "@sanity/block-content-to-react";

const Announcement = ({ content }) => (
    <div className="rich-text">
        {content && <BlockContent blocks={content} />}
        <style jsx>{`
            .rich-text {
                width: 600px;
                margin: 0 auto;
                line-height: 1.5;
            }
            .rich-text :global(p) {
                margin: 16px 0;
            }
            .rich-text :global(h1) {
                font-size: 24px;
            }
            .rich-text :global(h1) {
                font-size: 20px;
            }
            .rich-text :global(h1),
            .rich-text :global(h2) {
                font-family: "Martel", serif;
                margin: 16px 0 8px;
            }
            .rich-text :global(ul) {
                padding: 0 0 0 30px;
                line-height: 1.8;
            }
            @media screen and (max-width: 992px) {
                .rich-text {
                    width: 100%;
                    padding: 24px;
                    box-sizing: border-box;
                }
            }
        `}</style>
    </div>
);

const Announcements = ({ t, item }) => {
    const date = moment(item.publishedAt).format("D. MMMM YYYY");

    return (
        <Layout>
            <Head>
                <title>{t('title')}</title>
            </Head>
            <Wrapper>
                <Heading title={t("heading")}></Heading>
                <div className="date-wrapper">
                    Aktualizované: <strong>{date}</strong>
                    <br />
                    {item.author && (
                        <span className="author">{item.author.name}</span>
                    )}
                </div>
                <Announcement content={item.body} />
            </Wrapper>
            <style jsx>{`
                .date-wrapper {
                    text-align: center;
                    line-height: 28px;
                    margin-top: -24px;
                }
                .author {
                    text-transform: uppercase;
                    color: #777;
                    font-size: 14px;
                    font-weight: 500;
                }
                @media screen and (max-width: 992px) {
                    .date-wrapper {
                        text-align: left;
                        padding: 0 24px;
                    }
                }
            `}</style>
        </Layout>
    );
};

Announcements.getInitialProps = async () => {
    return {
        namespacesRequired: ["announcements", "footer", "header"],
        item: await sanity.fetch(`
        *[_type == "announcement"]{
            title,
            _id,
            publishedAt,
            author->{name},
            body
          } | order(_createdAt desc) [0]`),
    };
};

export default withTranslation("announcements")(Announcements);
