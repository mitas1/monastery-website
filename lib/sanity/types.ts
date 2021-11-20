interface Slug {
    current: string;
}

export interface Post {
    _id?: string;
    slug?: Slug;
    title?: string;
    body?: object;
    bodyPreview?: string;
    publishedAt?: string;
    mainImage?: string;
    category?: string;
    author?: {
        name?: string;
    };
}
