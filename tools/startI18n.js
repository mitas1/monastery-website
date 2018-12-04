import i18n from "i18next";

export default (resources, lng) =>
    i18n.init({
        debug: false,
        defaultNS: "common",
        returnObjects: true,
        fallbackLng: false,
        lng,
        ns: ["common", "index", "aboutUs"],
        resources
    });
