import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import {
  Content,
  Heading,
  Layout,
} from '../components/Layout';
import { urlFor } from '../lib/sanity';
import { formatDate } from '../utils';
import ArticleContent, {
  TArticleFooterProps,
  TContent,
  TFile,
} from './ArticleContent';

export interface TArticleProps {
    meta: {
        title: string;
        description: string;
    };
    file?: TFile;
    content: TContent;
    footer?: TArticleFooterProps;
    author?: string;
    mainImage?: string;
    publishedAt?: string;
    quote?: string;
    title: string;
}

export const Header = ({ children }) => (
    <header>
        {children}
    </header>
);

export const ArticleWrapper = ({ children }) => (
    <header>
        {children}
    </header>
);

const Blockquote = ({ children }) => {
    return (
        <blockquote>
            {children}
        </blockquote>
    );
};

const LastUpdated = ({ date }) => {
    const { locale } = useRouter();

    return (
        <div>
            Aktualizované: <strong>{formatDate(date, locale)}</strong>
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
}: TArticleProps) => {
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
        </Layout>
    );
};

export default Article;
