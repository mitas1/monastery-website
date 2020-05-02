import React from "react";
import Head from "next/head";

import { withTranslation } from "../lib/i18n";

import Article from "../components/Article";

const Guests = ({ t }) => (
    <>
        <Head>
            <title>{t('title')}</title>
            <meta name="description" content={t('metaDescription')} />
        </Head>
        <Article
            content={t("__content")}
            preamble={t("preamble")}
        />
    </>
);

Guests.getInitialProps = async () => ({
    namespacesRequired: ["guests", "footer", "header"],
});

export default withTranslation("guests")(Guests);
