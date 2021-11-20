import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

import mdToHtml from './mdToHtml';

const postsDirectory = join(process.cwd(), "_posts");

export async function getPostBySlug(slug: string, locale: string) {
    const rawContent = fs.readFileSync(
        join(postsDirectory, locale, `${slug}.md`),
        "utf8"
    );

    const { data, content } = matter(rawContent);

    const html = await mdToHtml(content);

    return { data, html };
}

export function getPostSlugsByLacale(locale: string) {
    const files = fs
        .readdirSync(join(postsDirectory, locale))
        .filter((file) => file.endsWith(".md"));
    return files.map((file) => file.replace(/\.md$/, ""));
}
