import { FC } from 'react';

import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Image from 'next/image';

import { ArticleContent } from '@components/article';
import {
  ArticleContentProps,
} from '@components/article/ArticleContent/ArticleContent';
import { ArticleHeader } from '@components/article/ArticleHeader';
import {
  ArticleHeaderProps,
} from '@components/article/ArticleHeader/ArticleHeader';
import {
  CenterBox,
  Layout,
} from '@components/common';
import { urlFor } from '@lib/sanity/urlFor';

import styles from './Article.module.css';

export interface Meta {
    title?: string;
    description?: string;
}

export interface ArticleProps extends ArticleHeaderProps, ArticleContentProps {
    meta?: Meta;
    mainImage?: string;
}

const Article: FC<ArticleProps> = ({
    meta,
    mainImage,
    title,
    quote,
    publishedAt,
    author,
    ...contentProps
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
                <ArticleHeader
                    title={title}
                    quote={quote}
                    publishedAt={publishedAt}
                    author={author}
                />
                {mainImage && (
                    <div className={styles.heroImage}>
                        <Image
                            layout="fill"
                            objectFit="cover"
                            src={
                                contentProps.html
                                    ? mainImage
                                    : urlFor(mainImage).width(1150).toString()
                            }
                        />
                    </div>
                )}
                <ArticleContent {...contentProps} offset={!!mainImage} />
            </CenterBox>
        </Layout>
    );
};

export default Article;
