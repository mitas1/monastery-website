import sk from "../static/locales/sk/sk.yaml";

import skAboutUs from "../static/locales/sk/aboutus.md";
import skCollection from "../static/locales/sk/collection.md";
import skMonasteryLife from "../static/locales/sk/monastery_life.md";
import skHostReception from "../static/locales/sk/host_reception.md";

import en from "../static/locales/en/common.yaml";

export const getTranslations = () => ({
    sk: {
        ...sk,
        markdown: {
            aboutUs: skAboutUs,
            collection: skCollection,
            monasteryLife: skMonasteryLife,
            hostReception: skHostReception
        }
    },
    en: {
        ...en,
        markdown: {
            aboutUs: skAboutUs,
            collection: skCollection
        }
    }
});
