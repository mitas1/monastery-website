import React from "react";

import { withTranslation } from "../lib/i18n";

import Article from "../components/Article";

const Experiences = ({ t }) => (
    <Article
        content={t("__content")}
        preamble={t("preamble")}
    />
);

Experiences.getInitialProps = async () => ({
    namespacesRequired: ["experiences", "footer", "header"],
});

export default withTranslation("experiences")(Experiences);
