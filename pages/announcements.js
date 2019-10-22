import React from "react";

import sanity from "../lib/sanity";
import { withTranslation } from "../lib/i18n";

import { Wrapper, Heading } from "../components/Preamble";
import Layout from "../components/Layout";
import BlockContent from "@sanity/block-content-to-react";

const CircleDate = ({ src }) => (
    <div className="wrapper">
        <span className="primary">19</span>
        <span>Sep</span>
        <style jsx>{`
            .wrapper {
                color: #fff;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: #262626;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                float: left;
                font-size: 12px;
                font-weight: 300;
            }
            .primary {
                font-size: 20px;
                font-weight: 400;
            }
        `}</style>
    </div>
);

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
        `}</style>
    </div>
);

const Announcements = ({ t, item }) => {
    return (
        <Layout>
            <Wrapper>
                <Heading title={t("heading")}></Heading>
                <div className="date-wrapper">
                    <CircleDate />
                </div>
                <Announcement content={item.body} />
            </Wrapper>
            <style jsx>{`
                .date-wrapper {
                    display: flex;
                    justify-content: center;
                }
            `}</style>
        </Layout>
    );
};

Announcements.getInitialProps = async () => {
    return {
        namespacesRequired: ["announcements", "footer", "header"],
        item: await sanity.fetch(`
        *[_type == "post"]{
            title,
            _id,
            publishedAt,
            body
          } | order(_createdAt desc) [0]`),
    };
};

export default withTranslation("announcements")(Announcements);
