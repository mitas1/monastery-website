import Head from "next/head";
import React, { ReactNode } from "react";
import useTranslation from "next-translate/useTranslation";
import Drawer from "@material/react-drawer";

import Footer, { FooterProps } from "./Footer";
import Header, { HeaderProps } from "../components/Header";
import Menu from "./Menu";

import { CONTENT_WIDTH, GA_TRACKING_ID } from "../constants";

export const Heading = ({
    level = 1,
    children,
    element,
}: {
    level?: number;
    element?: "span";
    children: ReactNode;
}) => {
    if (![1, 2, 3].includes(level)) {
        throw "Level needs to be within 1-3";
    }

    return React.createElement(
        element ? element : `h${level}`,
        null,
        <>
            {children}
            <style jsx>{`
                :global(h1) {
                    font-size: 50px;
                    font-family: "Martel", serif;
                    font-weight: 300;
                    margin: 0 0 24px;
                    line-height: 1.3;
                }
                :global(h2) {
                    font-family: "Martel", serif;
                    font-size: 24px;
                }
                :global(h3) {
                    font-family: "Roboto", sans-serif;
                    font-size: 12px;
                    color: #777;
                    text-transform: uppercase;
                    margin: 0 0 8px 0;
                }
                @media screen and (min-width: 992px) {
                    :global(h1) {
                        line-height: 1.4;
                    }
                }
            `}</style>
        </>
    );
};

export const Content = ({ children }) => (
    <div>
        {children}
        <style jsx>{`
            width: 100%;

            @media screen and (min-width: 992px) {
                width: ${CONTENT_WIDTH};
                margin: 0 auto;
            }
        `}</style>
    </div>
);

export const ContentRight = ({ children }) => (
    <div>
        {children}
        <style jsx>{`
            @media screen and (min-width: 992px) {
                margin: 0 0 0 390px;
            }
        `}</style>
    </div>
);

export const Layout = ({
    children,
    header,
    footer,
}: {
    children: React.ReactNode;
    header?: HeaderProps;
    footer?: FooterProps;
}) => {
    const [open, setOpen] = React.useState(false);

    const { t } = useTranslation("common");

    return (
        <div className="content">
            <Head>
                <meta charSet="UTF-8" />
                <title>{t("title")}</title>
                <meta name="description" content={t("metaDescription")} />
                <link
                    href="https://fonts.googleapis.com/css?family=Martel:600,700,900|Roboto:300,300i,400,400i,500,700&display=swap"
                    rel="stylesheet"
                />
                <meta
                    name="keywords"
                    content="benediktínky, kláštor, horné orešany, slovensko, monastery, benedictines, slovakia"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_TRACKING_ID}');
                        `,
                    }}
                />
            </Head>
            <Drawer
                modal
                open={open}
                onClose={() => setOpen(false)}
                className="drawer"
            >
                <Menu small />
            </Drawer>
            <Header {...header} handleDrawer={() => setOpen(!open)} />
            {children}
            <Footer {...footer} />
            <style jsx>{`
                .content {
                    background-color: #fff;
                    display: block;
                    position: relative;
                }
                :global(.drawer) {
                    top: 0;
                }
            `}</style>
            <style global jsx>
                {`
                    * {
                        margin: 0;
                        padding: 0;
                    }
                    body {
                        background: #fafafa;
                        font-family: "Roboto", sans-serif;
                    }
                    #nprogress {
                        pointer-events: none;
                        position: relative;
                        z-index: 9999999;
                    }

                    #nprogress .bar {
                        background: #29d;
                        height: 2px;
                        left: 0;
                        position: fixed;
                        top: 0;
                        width: 100%;
                        z-index: 3;
                    }

                    #nprogress .peg {
                        -ms-transform: rotate(3deg) withNamespaces(0px, -4px);
                        -webkit-transform: rotate(3deg)
                            withNamespaces(0px, -4px);
                        box-shadow: 0 0 10px #29d, 0 0 5px #29d;
                        display: block;
                        height: 100%;
                        opacity: 1;
                        position: absolute;
                        right: 0px;
                        transform: rotate(3deg) withNamespaces(0px, -4px);
                        width: 100px;
                        z-index: 3;
                    }
                `}
            </style>
        </div>
    );
};
