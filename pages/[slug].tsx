import { Article } from '@components/content';
import {
  getPostBySlug,
  getPostSlugsByLacale,
} from '@lib/api';

const MarkdownPost = ({ data, html }) => (
    <Article {...data} html={html} links={{ contactLink: true }} dropCap />
);

export async function getStaticProps({ locale, params: { slug } }) {
    const { data, html } = await getPostBySlug(slug, locale);

    return { props: { data, html } };
}

export async function getStaticPaths({ locales }) {
    let paths = [];
    locales.forEach((locale) => {
        paths = [
            ...paths,
            ...getPostSlugsByLacale(locale).map((slug) => ({
                locale,
                params: {
                    slug,
                },
            })),
        ];
    });

    return { paths, fallback: false };
}

export default MarkdownPost;
