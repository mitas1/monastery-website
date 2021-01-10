import React from "react";
import Link from "next/link";
import css from "styled-jsx/css";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import useTranslation from "next-translate/useTranslation";

import BlockContent from "@sanity/block-content-to-react";

import { urlFor } from "../lib/sanity";
import Button from "./Button";

export interface TFile {
    url: string;
    title?: string;
    name?: string;
}

export interface TContent {
    body?: object;
    file?: TFile;
    html?: string;
}

export interface Other {
    offset?: boolean;
    footer: ArticleFooterProps;
}

export type ArticleProps = TContent & Other;

export interface ArticleFooterProps {
    showContact?: boolean;
    back?: {
        href: string;
        title: string;
    };
}

export const paragraphStyles = `
    display: block;
    font-family: Roboto, serif;
    line-height: 1.8;
    margin-bottom: 32px;
`;

const contentStyles = css`
    .content {
        max-width: 600px;
        margin: 24px auto;
    }
    .content :global(h1) {
        font-family: Martel, serif;
        font-size: 40px;
        line-height: 1.5;
        text-align: center;
    }
    .content :global(h2) {
        font-family: Martel, serif;
        font-size: 23px;
        line-height: 1.5;
    }
    .content :global(h3) {
        color: rgb(87, 87, 87);
        font-family: Roboto, serif;
        font-size: 13px;
        line-height: 1.5;
        margin-bottom: 16px;
        padding: 10px 0px;
        text-align: center;
        text-transform: uppercase;
    }
    .content :global(h1),
    .content :global(h2),
    .content :global(h3) {
        font-weight: 600;
        margin-top: 24px;
        margin-bottom: 16px;
    }
    .content :global(h1:first-child),
    .content :global(h2:first-child),
    .content :global(h3:first-child) {
        margin-top: 0;
    }
    .content :global(p) {
        ${paragraphStyles}
    }
    .content :global(> div > p:first-of-type::first-letter) {
        display: block;
        float: left;
        font-family: "Martel", serif;
        font-size: 50px;
        font-weight: 600;
        padding-left: 3px;
        padding-right: 8px;
        margin-bottom: -22px;
        margin-top: -12px;
        position: relative;
    }
    .content :global(blockquote) {
        border-left: 4px solid rgb(233, 233, 233);
        font-family: Roboto, serif;
        font-style: italic;
        font-weight: 300;
        line-height: 1.8;
        margin-bottom: 16px;
        padding: 0px 0px 0px 30px;
    }
    .content :global(ul) {
        max-width: 500px;
        line-height: 1.5;
        padding: 0 0 0 24px;
    }
    .content :global(li) {
        margin: 0 0 4px 0;
    }
    .content :global(.image) {
        margin: 32px 0;
    }
    .content :global(.image img) {
        width: 100%;
    }
    .content :global(figcaption) {
        font-size: 14px;
        margin-top: 10px;
        color: #757575;
        text-align: center;
    }
    .content :global(.image.side-by-side) {
        flex-direction: column;
    }
    .content :global(.image.side-by-side figcaption) {
        margin-bottom: 16px;
    }
    .content :global(.zoomImage) {
        width: calc(100vw - 48px);
        max-width: 600px;
        height: 250px;
    }
    .content :global(.zoomWrapper) {
        margin: 32px 0;
    }
    @media screen and (min-width: 992px) {
        .content {
            margin: 80px auto;
        }
        .content :global(.image) {
            margin: 24px 0 24px -275px;
            overflow: hidden;
            position: relative;
            width: 1150px;
        }
        .content :global(.image.side-by-side) {
            display: flex;
            flex-direction: row;
        }
        .content :global(.image.side-by-side img) {
            max-height: 470px;
        }

        .content :global(.image.side-by-side figure:first-child) {
            margin: 0 24px 0 0;
        }
        .content.offset {
            margin-top: -200px;
            background: #fff;
            padding: 80px;
            z-index: 1;
            position: relative;
        }
        .content :global(.zoomImage) {
            width: 600px;
            height: 400px;
            max-height: 450px;
        }
    }
`;

const serializers = {
    types: {
        image: (props) => {
            return (
                <div className="zoomWrapper">
                    <Zoom>
                        <div className="zoomImage">
                            <Image
                                src={urlFor(props.node).width(1920).toString()}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </Zoom>
                    {props.node.caption && (
                        <figcaption>{props.node.caption}</figcaption>
                    )}
                </div>
            );
        },
    },
};

export const Footer = ({ showContact = false, back }: ArticleFooterProps) => {
    const { t } = useTranslation("common");

    return (
        <footer className="footer-actions">
            {showContact && (
                <Link href="/contact">
                    <a className="button-link">{t("linkFooter")}</a>
                </Link>
            )}

            <Link href={back ? back.href : "/"}>
                <a className="link">
                    <img height={8} src="/images/arrow_back.svg" />
                    {back ? back.title : t("arrowBack")}
                </a>
            </Link>

            <style jsx>
                {`
                    .footer-actions {
                        margin: 70px 0 80px 0;
                    }
                    .button-link {
                        background-color: #006cb9;
                        border-radius: 3px;
                        color: #fff;
                        font-size: 15px;
                        font-weight: 500;
                        margin: 0 50px 0 0;
                        padding: 24px 45px;
                        text-decoration: none;
                    }
                    .link {
                        color: #006cb9;
                        font-size: 15px;
                        font-weight: 400;
                        text-decoration: none;
                    }
                    .link img {
                        margin: 0 18px 0 0;
                    }
                `}
            </style>
        </footer>
    );
};

export const HTML = ({ html }: { html: string }) => (
    <div
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);

const PDFViewer = ({ url, title }: TFile) => {
    return (
        <div className="wrapper">
            <iframe
                className="iframe"
                src={`https://docs.google.com/viewer?url=${url}&embedded=true`}
                frameBorder="0"
            >
                Stiahnuť PDF súbor
            </iframe>
            {title && <figcaption>{title}</figcaption>}
            <div className="button">
                <Button href={`${url}?dl=`}>Stiahnuť PDF súbor</Button>
            </div>
            <style jsx>{`
                .wrapper {
                    text-align: center;
                }
                .iframe {
                    display: none;
                }
                .button {
                    margin: 36px 0;
                }
                @media screen and (min-width: 992px) {
                    .wrapper {
                        margin: 48px -80px;
                    }
                    .iframe {
                        background: #d0d0d0;
                        display: flex;
                        width: 760px;
                        height: 800px;
                    }
                }
            `}</style>
        </div>
    );
};

const ArticleContent = ({ html, body, offset, file, footer }: ArticleProps) => (
    <>
        {(html || body) && (
            <article className={offset ? "content offset" : "content"}>
                {html ? (
                    <HTML html={html} />
                ) : (
                    <BlockContent
                        renderContainerOnSingleChild
                        serializers={serializers}
                        blocks={body}
                    />
                )}
                {file && file.url && <PDFViewer {...file} />}
                {footer && <Footer {...footer} />}
            </article>
        )}
        <style jsx>{contentStyles}</style>
    </>
);

export default ArticleContent;
