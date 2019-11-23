import React from "react";
import App from "next/app";
import NProgress from "nprogress";
import Router from "next/router";

import { appWithTranslation } from "../lib/i18n";

Router.events.on("routeChangeStart", url => {
    NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (<Component {...pageProps} />);
    }
}

export default appWithTranslation(MyApp);
