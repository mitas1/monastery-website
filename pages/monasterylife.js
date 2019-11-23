import React from "react";

import { withTranslation } from "../lib/i18n";

import Article from "../components/Article";

const MonasteryLife = ({ t }) => (
    <Article
        content={t("__content")}
        preamble={t("preamble", { returnObjects: true })}
    />
);

MonasteryLife.getInitialProps = async () => ({
    namespacesRequired: ["monastery-life"],
});

export default withTranslation("monastery-life")(MonasteryLife);
