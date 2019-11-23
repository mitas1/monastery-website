import React from "react";

import { Markdown } from "../components/Markdown";
import Layout from "../components/Layout";
import Preamble from "../components/Preamble";

export default ({ content, preamble, ...other }) => (
    <Layout>
        <Preamble {...preamble} />
        <div className="content-ofset">
            <Markdown {...other} content={content} />
        </div>
        <style jsx>{`
            .content-ofset {
                margin-top: -100px;
            }
        `}</style>
    </Layout>
);
