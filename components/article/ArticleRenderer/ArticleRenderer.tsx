import React, { FC } from 'react';

import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';

import { ArticleContent } from '@components/article';
import {
  ArrowLink,
  Button,
  Link,
} from '@components/ui';
import { urlFor } from '@lib/sanity/urlFor';
import BlockContent from '@sanity/block-content-to-react';

export interface File {
    url: string;
    title?: string;
    name?: string;
}

export interface HTMLProps {
    html: string;
}

export interface ArticleLinks {
    contactLink?: boolean;
    backLink?: {
        href: string;
        title: string;
    };
}

export interface ArticleRendererProps {
    offset?: boolean;
    file?: File;
    html?: string;
    sanityBody?: object;
    links: ArticleLinks;
    dropCap?: boolean;
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

export const Links: FC<ArticleLinks> = ({ contactLink = false, backLink }) => {
    const { t } = useTranslation("common");

    return (
        <footer className="flex flex-col sm:flex-row items-start sm:items-center space-y-8 sm:space-y-0 sm:space-x-8 mt-16">
            {contactLink && (
                <Link style="button" href="/contact">
                    {t("linkFooter")}
                </Link>
            )}
            <ArrowLink type="back" href={backLink?.href || "/"}>
                {t("arrowBack")}
            </ArrowLink>
        </footer>
    );
};

export const HTML: FC<HTMLProps> = ({ html }) => (
    <div
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);

const PDFViewer: FC<File> = ({ url, title }) => {
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
                <Button>Stiahnuť PDF súbor</Button>
            </div>
        </div>
    );
};

const ArticleRenderer: FC<ArticleRendererProps> = ({
    offset,
    html,
    sanityBody,
    file,
    links,
    ...rest
}) =>
    html || sanityBody ? (
        <ArticleContent
            {...rest}
            className={classNames({
                "mt-8 sm:-mt-32": offset,
                "sm:-mt-10": !offset,
            })}
        >
            {html ? (
                <HTML html={html} />
            ) : (
                <BlockContent
                    renderContainerOnSingleChild
                    serializers={serializers}
                    blocks={sanityBody}
                />
            )}
            {file && file.url && <PDFViewer {...file} />}
            {links && <Links {...links} />}
        </ArticleContent>
    ) : null;

export default ArticleRenderer;
