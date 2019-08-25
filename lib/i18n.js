const NextI18Next = require("next-i18next").default;


module.exports = new NextI18Next({
    defaultLanguage: "sk",
    otherLanguages: ["en"],
    localeSubpaths: {
        en: "en"
    },
    returnObjects: true,
});
