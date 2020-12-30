import fs from 'fs';

import matter from 'gray-matter';

import React from 'react';
import Head from 'next/head';

import CArticle from '../components/Article';

const Article = ({ data, content }) => {
    return (
        <>
            <Head>
                <title>{data.title}</title>
                <meta name="description" content={data.metaDescription} />
            </Head>
            <CArticle content={content} preamble={data.preamble} />
        </>
    );
};

export async function getStaticProps({ locale, params: { slug } }) {
    const rawContent = fs.readFileSync(
        `${process.cwd()}/locales/${locale}/${slug}.md`,
        'utf8'
    );

    const { data, content } = matter(rawContent);

    return { props: { data, content } };
}

const getSlug = (fileName) => {
    return fileName.replace(/\.[^/.]+$/, '');
};

export async function getStaticPaths({ locales }) {
    const paths = [];
    locales.forEach((locale) => {
        const files = fs.readdirSync(
            `${process.cwd()}/locales/${locale}/`,
            'utf-8'
        );
        const markdownFiles = files.filter((fn) => fn.endsWith('.md'));

        files.forEach((file) => {
            if (file.endsWith('.md')) {
                console.log(getSlug(file));
                paths.push({
                    locale,
                    params: { slug: getSlug(file) },
                });
            }
        });
    });

    return { paths, fallback: false };
}

export default Article;
