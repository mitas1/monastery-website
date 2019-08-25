import React from "react";

import { withTranslation } from "../lib/i18n";

import Article from "../components/Article";

const Offerings = ({ t }) => (
    <Article
        content={t("__content")}
        preamble={t("preamble")}
        contactLink={true}
        iban={true}
    />
);

Offerings.getInitialProps = async () => ({
    namespacesRequired: ["contact", "offerings", "footer", "header"],
});

export default withTranslation("offerings")(Offerings);
