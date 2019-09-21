const LANGUAGES = require("../constants").LANGUAGES;
const NextI18Next = require("next-i18next").default;

const NextI18NextInstance = new NextI18Next({
    defaultLanguage: "sk",
    defaultNS: ["index"],
    otherLanguages: ["en"],
    strictMode: false,
    localeSubpaths: {
        en: "en",
    },
    returnObjects: true,
});

NextI18NextInstance.i18n.languages = LANGUAGES;

module.exports = NextI18NextInstance;
