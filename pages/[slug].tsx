import Article from '../components/Article';
import {
  getPostBySlug,
  getPostSlugsByLacale,
} from '../lib/api';
import markdownToHtml from '../lib/markdownToHtml';

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

export async function getStaticProps({ locale, preview, params: { slug } }) {
    if (preview) {
        console.error("Unexpected preview mode");
        return { notFound: true };
    }

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
