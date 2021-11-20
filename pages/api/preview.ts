import createSanityApi from '@lib/sanity/api';
import { SANITY_CONFIG } from '@lib/sanity/config';

export default async (req, res) => {
    if (req.query.secret !== SANITY_CONFIG.previewUrl || !req.query.slug) {
        return res.status(401).json({ message: "Invalid token" });
    }

    const post = await createSanityApi(true).getPost({
        postSlug: req.query.slug,
    });

    if (!post?.slug) {
        return res.status(401).json({ message: "Invalid slug" });
    }

    res.setPreviewData({});

    res.redirect(`/post/${post.category}/${post.slug}`);
};
