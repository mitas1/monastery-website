import { ReactNode } from 'react';

import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';

import Baner from '../components/Baner';
import Button from '../components/Button';
import {
  Content,
  ContentRight,
  Heading,
  Layout,
} from '../components/Layout';
import {
  SANITY_AVAILABLE_LOCALES,
  SANITY_ORDER_BY,
} from '../constants';
import sanity from '../lib/sanity';
import { formatDate } from '../utils';

export const ShortArticle = ({
    author,
    date,
    href,
    inverse = false,
    locale,
    number,
    readMore,
    text,
    title,
}: {
    author: string;
    date?: string;
    href: string;
    inverse?: boolean;
    locale?: string;
    number?: string;
    readMore: string;
    text: string;
    title: string;
}) => (
    <article className={inverse ? "short-article inverse" : "short-article"}>
        {number ? (
            <span className="number">{number}</span>
        ) : (
            <span className="meta">
                {formatDate(date, locale)}
                {author && (
                    <>
                        <span className="dot">·</span>
                        {author}
                    </>
                )}
            </span>
        )}
        <Link href={href}>
            <a className="text-link">
                <h1 className="heading">{title}</h1>
                <p className="text">{text}</p>
            </a>
        </Link>
        <Link href={href}>
            <a className="link">{readMore}</a>
        </Link>
    </article>
);

const Paragraph = ({ children }) => (
    <p>
        {children}
    </p>
);

const ShortArticleWithAside = ({ t }) => (
    <section id="test" className="wrapper">
        <aside className="image">
            <Image
                layout="fill"
                objectFit="cover"
                className="aside-image"
                src="/images/benedikt.jpg"
                alt="Detail: Kopf des Hl. Benedikt, Fra Angelico"
            />
        </aside>
        <article className="article">
            <Heading level={3} element="span">
                {t("index:shortArticleWithAside.subtitle")}
            </Heading>
            <Heading level={1}>
                {t("index:shortArticleWithAside.title")}
            </Heading>
            <Paragraph>{t("index:shortArticleWithAside.text")}</Paragraph>
            <span className="title">
                <Heading level={3} element="span">
                    {t("index:shortArticleWithAside.acronym.title")}
                </Heading>
                <strong className="acronym">
                    {t("index:shortArticleWithAside.acronym.text")}
                </strong>
            </span>
            <div className="image-title">
                <i>{t("index:shortArticleWithAside.imageLabel")}</i>
            </div>
        </article>
    </section>
);

export const ThreeColumnWrapper = ({
    inverse,
    children,
}: {
    inverse?: boolean;
    children: ReactNode;
}) => (
    <div className={inverse ? "inverse wrapper" : "wrapper"}>
        <Content>
            <div className="content">{children}</div>
        </Content>
    </div>
);

const Index = ({ news }) => {
    const { t, lang } = useTranslation("common");

    return (
        <Layout addTopListener footer={{ background: true }}>
            <Baner />
            {news && news.length > 0 && (
                <>
                    <ThreeColumnWrapper>
                        {news.map(
                            ({
                                title,
                                bodyPreview,
                                author,
                                publishedAt,
                                slug,
                                _id,
                            }) => (
                                <ShortArticle
                                    key={_id}
                                    date={publishedAt}
                                    locale={lang}
                                    href={`/post/news/${slug.current}`}
                                    title={title}
                                    author={author}
                                    text={bodyPreview}
                                    readMore={t("readMore")}
                                />
                            )
                        )}
                    </ThreeColumnWrapper>
                    {news.length > 3 && (
                        <div className="button">
                            <Button href="/post/news">
                                {t("index:news.button")}
                            </Button>
                        </div>
                    )}
                </>
            )}
            <ThreeColumnWrapper inverse>
                <ShortArticle
                    inverse
                    number="01"
                    href="/monastery-life"
                    {...t("index:article01", {}, { returnObjects: true })}
                    readMore={t("readMore")}
                />
                <ShortArticle
                    inverse
                    number="02"
                    href="/guests"
                    {...t("index:article02", {}, { returnObjects: true })}
                    readMore={t("readMore")}
                />
                <ShortArticle
                    inverse
                    number="03"
                    href="/experiences"
                    {...t("index:article03", {}, { returnObjects: true })}
                    readMore={t("readMore")}
                />
            </ThreeColumnWrapper>
            <div className="content-gray">
                <Content>
                    <ShortArticleWithAside t={t} />
                </Content>
            </div>
            <Content>
                <ContentRight>
                    <div className="markdown">
                        <Heading>{t("index:aboutus.title")}</Heading>
                        <Paragraph>{t("index:aboutus.text")}</Paragraph>
                    </div>
                </ContentRight>
            </Content>
        </Layout>
    );
};

export async function getStaticProps({ locale }) {
    if (SANITY_AVAILABLE_LOCALES.includes(locale)) {
        return {
            props: {
                news: await sanity.fetch(`
                *[_type == "post" && "news" in categories[]->slug.current] {
                    _id,
                    title,
                    'author': author->name,
                    bodyPreview,
                    slug,
                    publishedAt
                } ${SANITY_ORDER_BY} [0...3]`),
            },
            revalidate: 1,
        };
    }
    return {};
}

export default Index;
