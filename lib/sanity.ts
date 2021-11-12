import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

import {
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  SANITY_SECRET_TOKEN,
} from '../constants';

export const sanityPreview = sanityClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    token: SANITY_SECRET_TOKEN,
    useCdn: false,
});

const sanity = sanityClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    useCdn: true,
});

const builder = imageUrlBuilder(sanity);

export const urlFor = (source) => {
    return builder.image(source);
};

export default sanity;
