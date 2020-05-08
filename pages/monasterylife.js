import React from "react";
import Head from "next/head";

import { withTranslation } from "../lib/i18n";

import Article from "../components/Article";

const MonasteryLife = ({ t }) => (
    <>
        <Head>
            <title>{t('title')}</title>
            <meta name="description" content={t('metaDescription')} />
        </Head>
        <Article
            content={t("__content")}
            preamble={t("preamble", { returnObjects: true })}
        />
    </>
);

MonasteryLife.getInitialProps = async () => ({
    namespacesRequired: ["monastery-life"],
});

export default withTranslation("monastery-life")(MonasteryLife);
