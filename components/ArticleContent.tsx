import React from 'react';

import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import Zoom from 'react-medium-image-zoom';

import BlockContent from '@sanity/block-content-to-react';

import { urlFor } from '../lib/sanity';
import Button from './Button';

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

export interface TOther {
    offset?: boolean;
    footer: TArticleFooterProps;
}

export type TArticleProps = TContent & TOther;

export interface TArticleFooterProps {
    showContact?: boolean;
    back?: {
        href: string;
        title: string;
    };
}

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

export const Footer = ({ showContact = false, back }: TArticleFooterProps) => {
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
        </div>
    );
};

const ArticleContent = ({ html, body, offset, file, footer }: TArticleProps) => (
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
    </>
);

export default ArticleContent;
