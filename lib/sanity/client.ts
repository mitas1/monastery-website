import sanity from '@sanity/client';

import { SANITY_CONFIG } from './config';

export const sanityPreviewClient = sanity({
    apiVersion: SANITY_CONFIG.apiVersion,
    projectId: SANITY_CONFIG.projectId,
    dataset: SANITY_CONFIG.dataset,
    token: SANITY_CONFIG.secretToken,
    useCdn: false,
});

export const sanityClient = sanity({
    apiVersion: SANITY_CONFIG.apiVersion,
    projectId: SANITY_CONFIG.projectId,
    dataset: SANITY_CONFIG.dataset,
    useCdn: true,
});
