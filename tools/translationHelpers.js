import { LANGUAGES } from "../constants";

const mdFiles = {
    aboutUs: "aboutus",
    offerings: "offerings",
    monasteryLife: "monastery_life",
    guests: "guests",
    experiences: "experiences"
};

export async function getTranslations() {
    const res = {};

    for (const lang of LANGUAGES) {
        const markdown = {};
        for (const md in mdFiles) {
            markdown[md] = await require(`../static/locales/${lang}/${
                mdFiles[md]
            }.md`);
        }
        res[lang] = {
            ...(await require(`../static/locales/${lang}/${lang}.yaml`)),
            markdown
        };
    }

    return res;
}
