const locales = {
    en: import ('../static/locales/en/common.json'),
    sk: import ('../static/locales/sk/common.json')
}

export async function getTranslation(lang) {
    return {
        [lang]: {
            common: await locales[lang]
        }
    }
}
