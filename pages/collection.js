import React from "react";
import { withNamespaces } from "react-i18next";

import { withI18next } from "../lib/withI18next";

import Article from "../components/Article";

export default withI18next()(
    withNamespaces(["markdown"])(({ t }) => (
        <Article content={t("collection")} contact iban />
    ))
);
