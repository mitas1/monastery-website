export const LANGUAGES_LABELS = {
    sk: "SK",
    en: "EN",
};
export const LANGUAGES = Object.keys(LANGUAGES_LABELS);

export const CONTENT_WIDTH = "1150px";

export const SANITY_AVAILABLE_LOCALES = ["sk"];
export const SANITY_ORDER_BY = " | order(publishedAt desc) ";
export const SANITY_PROJECT_ID = "evpwn98r";
export const SANITY_DATASET = process.env.NODE_ENV;
export const SANITY_SECRET_TOKEN = process.env.SANITY_SECRET_TOKEN;

export const GA_TRACKING_ID = "G-YD5R7KD0FF";

export const PREVIEW_URL_SECRET = process.env.PREVIEW_URL_SECRET || "secret";
