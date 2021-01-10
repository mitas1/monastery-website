import Head from "next/head";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

import { Content, Heading, Layout } from "../components/Layout";
import ArticleContent, {
    TContent,
    TFile,
    ArticleFooterProps,
} from "./ArticleContent";
import { formatDate } from "../utils";
import { urlFor } from "../lib/sanity";

export interface ArticleProps {
    meta: {
        title: string;
        description: string;
    };
    file?: TFile;
    content: TContent;
    footer?: ArticleFooterProps;
    author: string;
    mainImage?: string;
    publishedAt?: string;
    quote?: string;
    title: string;
}

export const Header = ({ children }) => (
    <header>
        {children}
        <style jsx>{`
            @media screen and (min-width: 992px) {
                position: relative;
                text-align: center;
                max-width: 600px;
                margin: 0 auto;
            }
        `}</style>
    </header>
);

export const ArticleWrapper = ({ children }) => (
    <header>
        {children}
        <style jsx>{`
            margin: 80px auto 0 auto;
            padding: 24px;

            @media screen and (min-width: 992px) {
                padding: 64px 24px;
            }
        `}</style>
    </header>
);

const Blockquote = ({ children }) => {
    return (
        <blockquote>
            {children}
            <style jsx>{`
                display: block;
                font-size: 14px;
                font-style: italic;
                line-height: 26px;
                margin: 0 0 16px 0;
                max-width: 520px;

                @media screen and (min-width: 992px) {
                    text-align: center;
                    margin: 0 auto 20px auto;
                }
            `}</style>
        </blockquote>
    );
};

const LastUpdated = ({ date }) => {
    return (
        <div>
            Aktualizované: <strong>{formatDate(date)}</strong>
            <style jsx>{`
                margin: -4px 0 4px 0;
                color: #666;
                @media screen and (min-width: 992px) {
                    margin: -4px 0 8px 0;
                }
            `}</style>
        </div>
    );
};

const Article = ({
    author,
    content,
    file,
    footer,
    mainImage,
    meta,
    publishedAt,
    quote,
    title,
}: ArticleProps) => {
    const { t } = useTranslation("common");
    return (
        <Layout>
            <Head>
                <title>{`${meta.title} | ${t("title")}`}</title>
                <meta name="description" content={meta.description} />
            </Head>
            <Content>
                <ArticleWrapper>
                    <Header>
                        <Heading level={1}>{title}</Heading>
                        {quote && <Blockquote>{quote}</Blockquote>}
                        {publishedAt && <LastUpdated date={publishedAt} />}
                        {author && <div className="author">{author}</div>}
                    </Header>
                    {mainImage && (
                        <div className="mainImage">
                            <Image
                                layout="fill"
                                objectFit="cover"
                                src={
                                    content.html
                                        ? mainImage
                                        : urlFor(mainImage)
                                              .width(1150)
                                              .toString()
                                }
                            />
                        </div>
                    )}
                    <ArticleContent
                        {...content}
                        file={file}
                        footer={footer}
                        offset={!!mainImage}
                    />
                </ArticleWrapper>
            </Content>
            <style jsx>{`
                .author {
                    color: #666;
                    font-weight: 500;
                    font-size: 14px;
                    text-transform: uppercase;
                }
                .mainImage {
                    width: 100%;
                    height: 300px;
                    position: relative;
                    margin: 24px 0;
                    background-color: #efefef;
                }
                @media screen and (min-width: 992px) {
                    .header {
                        position: relative;
                        text-align: center;
                        max-width: 600px;
                        margin: 0 auto;
                    }
                    .mainImage {
                        height: 600px;
                    }
                    .content.offset {
                        margin-top: -200px;
                        background: #fff;
                        padding: 80px;
                        z-index: 1;
                        position: relative;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default Article;
