import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const sanity = sanityClient({
    projectId: "evpwn98r",
    dataset: process.env.NODE_ENV,
    useCdn: true,
});

const builder = imageUrlBuilder(sanity);

export const urlFor = (source) => {
    return builder.image(source);
};

export default sanity;
