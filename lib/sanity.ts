import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const sanity = sanityClient({
    projectId: process.env.NODE_ENV === "production" ? "joyq4ipz" : "joyq4ipz",
    dataset: process.env.NODE_ENV,
    useCdn: true,
});

const builder = imageUrlBuilder(sanity);

export const urlFor = (source) => {
    return builder.image(source);
};

export default sanity;
