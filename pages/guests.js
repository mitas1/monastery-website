import React from "react";

import { withTranslation } from "../lib/i18n";

import Article from "../components/Article";

const Guests = ({ t }) => (
    <Article
        content={t("__content")}
        preamble={t("preamble")}
    />
);

Guests.getInitialProps = async () => ({
    namespacesRequired: ["guests", "footer", "header"],
});

export default withTranslation("guests")(Guests);
