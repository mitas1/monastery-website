import React from "react";

import { Markdown } from "../components/Markdown";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Preamble from "../components/Preamble";

export default ({ content, ...other }) => (
    <Layout>
        <Preamble {...content.attributes} />
        <div className="content-ofset">
            <Markdown {...other} content={content.html} />
        </div>
        <style jsx>{`
            .content-ofset {
                margin-top: -100px;
            }
        `}</style>
        <Footer />
    </Layout>
);
