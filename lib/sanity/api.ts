import {
  sanityClient,
  sanityPreviewClient,
} from './client';
import { SANITY_CONFIG } from './config';
import { Post } from './types';

export const POSTS_PER_PAGE = 10;

export default function createSanityApi(preview = false) {
    const client = preview ? sanityClient : sanityPreviewClient;

    async function getPost({
        draft,
        postSlug,
        categorySlug,
    }: {
        draft?: boolean;
        postSlug?: string;
        categorySlug?: string;
    }) {
        return (await client.fetch(`
              *[_type == "post" ${draft ? '&& _id in path("drafts.**")' : ""} ${
            postSlug ? `&& slug.current == "${postSlug}"` : ""
        } ${
            categorySlug
                ? `&& "${categorySlug}" in categories[]->slug.current`
                : ""
        }]{
                  _id,
                  title,
                  body,
                  bodyPreview,
                  'file': {
                      'url': file.asset->url,
                      'title': file.title,
                  },
                  mainImage,
                  publishedAt,
                  'category': categories[0]->slug.current,
                  'author': author->name
              } [0]
        `)) as Post;
    }

    async function getPosts(
        categorySlug: string,
        from = 0,
        to = POSTS_PER_PAGE
    ) {
        return (await client.fetch(`
            *[_type == "post" && "${categorySlug}" in categories[]->slug.current]{
                _id,
                title,
                slug,
                publishedAt,
                'author': author->name,
                mainImage,
                bodyPreview
            } ${SANITY_CONFIG.orderBy} [${from}..${to}]
        `)) as Post[];
    }

    async function getPostsCategories() {
        return await client.fetch(`
            *[_type == "post"]{
                slug,
                'categories': categories[]->slug,
            } ${SANITY_CONFIG.orderBy}
      `);
    }

    async function getPostsCount(categorySlug: string) {
        return await client.fetch(`
            count(*[_type == "post" && "${categorySlug}" in categories[]->slug.current])
        `);
    }

    async function getCategories() {
        return await client.fetch(`
            *[_type == "category"]{
                slug,
            }
        `);
    }

    async function getCategory(categorySlug: string) {
        return await client.fetch(`
            *[_type == "category" && slug.current == "${categorySlug}"]{title, slug}[0]
        `);
    }

    return {
        getPost,
        getPosts,
        getPostsCount,
        getPostsCategories,
        getCategories,
        getCategory,
    };
}

export const sanityApi = createSanityApi();
