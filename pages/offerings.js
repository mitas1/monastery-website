import React from "react";
import Head from "next/head";

import { withTranslation } from "../lib/i18n";

import Article from "../components/Article";

const Offerings = ({ t }) => (
    <>
        <Head>
            <title>{t('title')}</title>
            <meta name="description" content={t('metaDescription')} />
        </Head>
        <Article
            content={t("__content")}
            preamble={t("preamble")}
            contactLink={true}
            iban={true}
        />
    </>
);

Offerings.getInitialProps = async () => ({
    namespacesRequired: ["contact", "offerings", "footer", "header", "article"],
});

export default withTranslation("offerings")(Offerings);
