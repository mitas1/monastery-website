import Article from '../components/Article';
import markdownToHtml from '../lib/markdownToHtml';
import { getPostBySlug, getPostSlugsByLacale } from '../lib/api';

const MarkdownPost = ({ data: { title, metaDescription, preamble }, html }) => {
    return (
        <>
            <Article
                title={preamble.title}
                meta={{ title, description: metaDescription }}
                mainImage={preamble.img}
                quote={preamble.text}
                author={preamble.author}
                footer={{ showContact: true }}
                content={{ html }}
            />
        </>
    );
};

export async function getStaticProps({ locale, params: { slug } }) {
    const { data, content } = getPostBySlug(slug, locale);

    const html = await markdownToHtml(content);

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
