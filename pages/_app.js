import React from "react";
import Head from 'next/head';
import App from "next/app";
import NProgress from "nprogress";
import Router from "next/router";

import "@material/react-drawer/dist/drawer.css";

Router.events.on("routeChangeStart", url => {
    NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());


class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <Head>
                    <meta charSet="UTF-8"/>
                    <title>Benediktínky | SK</title>
                    <link
                        href="https://fonts.googleapis.com/css?family=Martel:600,700,900|Roboto:300,300i,400,400i,500,700&display=swap"
                        rel="stylesheet"
                    />
                    <meta name="keywords" content="benediktínky, kláštor, horné orešany, slovensko, monastery, benedictines, slovakia" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                </Head>
                <Component {...pageProps} />
            </>
        );
    }
}

export default MyApp;
