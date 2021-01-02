import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostBySlug(slug: string, locale: string) {
    const rawContent = fs.readFileSync(
        join(postsDirectory, locale, `${slug}.md`),
        'utf8'
    );

    return matter(rawContent);
}

export function getPostSlugsByLacale(locale: string) {
    const files = fs
        .readdirSync(join(postsDirectory, locale))
        .filter((file) => file.endsWith('.md'));
    return files.map((file) => file.replace(/\.md$/, ''));
}
