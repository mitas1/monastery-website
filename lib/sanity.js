import sanityClient from '@sanity/client';

export default sanityClient({
    projectId: 'evpwn98r',
    dataset: 'production',
    useCdn: false,
});
