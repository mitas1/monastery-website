import { PREVIEW_URL_SECRET } from "../../constants";
import { sanityPreview } from "../../lib/sanity";

export default async (req, res) => {
    if (req.query.secret !== PREVIEW_URL_SECRET || !req.query.slug) {
        return res.status(401).json({ message: "Invalid token" });
    }

    const post = await sanityPreview.fetch(`
        *[_type == "post" && slug.current == "${req.query.slug}"]{
            _id,
            title,
            publishedAt,
            body,
            'slug': slug.current,
            'category': categories[0]->slug.current,
        }[0]
    `);

    if (!post || !post.slug) {
        return res.status(401).json({ message: "Invalid slug" });
    }

    if (!(post.category && post.title && post.body && post.publishedAt)) {
        return res.status(401).json({ message: "Required fields are missing" });
    }

    res.setPreviewData({});

    res.redirect(`/post/${post.category}/${post.slug}`);
};
