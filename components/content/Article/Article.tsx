import { FC } from 'react';

import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Image from 'next/image';

import { ArticleHeader } from '@components/article/ArticleHeader';
import {
  ArticleHeaderProps,
} from '@components/article/ArticleHeader/ArticleHeader';
import ArticleRenderer, {
  ArticleRendererProps,
} from '@components/article/ArticleRenderer/ArticleRenderer';
import {
  CenterBox,
  Layout,
} from '@components/common';
import { Post } from '@lib/sanity/types';
import { urlFor } from '@lib/sanity/urlFor';

import styles from './Article.module.css';

export interface Meta {
    title?: string;
    description?: string;
}

export interface ArticleProps
    extends ArticleHeaderProps,
        Omit<Post, "author" | "publishedAt"> {
    meta?: Meta;
    renderProps: ArticleRendererProps;
}

const Article: FC<ArticleProps> = ({
    meta,
    renderProps,
    mainImage,
    ...headerProps
}) => {
    const { t } = useTranslation("common");
    return (
        <Layout>
            <Head>
                <title>{`${meta.title} | ${t("title")}`}</title>
                <meta
                    name="description"
                    content={meta.description}
                    key="description"
                />
            </Head>
            <CenterBox className="p-8">
                <ArticleHeader {...headerProps} />
                {mainImage && (
                    <div className={styles.heroImage}>
                        <Image
                            layout="fill"
                            objectFit="cover"
                            src={
                                renderProps.html
                                    ? mainImage
                                    : urlFor(mainImage).width(1150).toString()
                            }
                        />
                    </div>
                )}
                <ArticleRenderer {...renderProps} offset={!!mainImage} />
            </CenterBox>
        </Layout>
    );
};

export default Article;
