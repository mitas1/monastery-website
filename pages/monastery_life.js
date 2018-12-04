import React from "react";

import { withI18next } from "../lib/withI18next";
import { translate } from "react-i18next";
import { Markdown } from "../components/Markdown";
import Layout from "../components/Layout";
import { withZoom } from "../lib/withZoom";

export default withI18next()(
    withZoom()(
        translate(["markdown"])(({ t }) => (
            <Layout>
                <Markdown content={t("monasteryLife")} />
            </Layout>
        ))
    )
);
