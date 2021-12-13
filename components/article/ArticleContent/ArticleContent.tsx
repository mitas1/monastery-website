import React, { FC } from 'react';

import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';

import { PDFViewer } from '@components/react-pdf-viewer';
import {
    ArrowLink,
    Link,
} from '@components/ui';
import DownloadLink from '@components/ui/Link/DownloadLink';
import { urlFor } from '@lib/sanity/urlFor';
import BlockContent from '@sanity/block-content-to-react';

import styles from './ArticleContent.module.css';

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

export interface ArticleContentProps {
    offset?: boolean;
    dropCap?: boolean;
    file?: File;
    html?: string;
    sanityBody?: object;
    links: ArticleLinks;
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
    const { t } = useTranslation('common');

    return (
        <footer className="flex flex-col sm:flex-row items-start sm:items-center space-y-8 sm:space-y-0 sm:space-x-8 mt-16">
            {contactLink && (
                <Link style="button" href="/contact">
                    {t('linkFooter')}
                </Link>
            )}
            {backLink && (
                <ArrowLink type="back" href={backLink?.href || '/'}>
                    {backLink.title}
                </ArrowLink>
            )}
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

const ArticleRenderer: FC<ArticleContentProps> = ({
    offset,
    dropCap,
    html,
    sanityBody,
    file,
    links,
}) => {
    const { t } = useTranslation('common');

    return (
        <article
            className={classNames(styles.content, styles.narrow, {
                [styles.dropCap]: dropCap,
                [styles.offset]: offset,
            })}
        >
            {(html || sanityBody) &&
                (html ? (
                    <HTML html={html} />
                ) : (
                    <BlockContent
                        renderContainerOnSingleChild
                        serializers={serializers}
                        blocks={sanityBody}
                    />
                ))}
            {file && (
                <>
                    <PDFViewer
                        width="50rem"
                        height="900px"
                        rootClassName={styles.pdfViewer}
                        url={file.url}
                    />
                    <div className="m-auto text-center my-10">
                        <DownloadLink href={file.url} download={file.name}>
                            {t('downloadLink')}
                        </DownloadLink>
                    </div>
                </>
            )}
            {links && <Links {...links} />}
        </article>
    );
};

export default ArticleRenderer;
