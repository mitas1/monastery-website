import App, { Container } from "next/app";

import React from "react";
import NProgress from "nprogress";
import Router from "next/router";
import { ParallaxProvider } from "react-scroll-parallax";

Router.events.on("routeChangeStart", url => {
    NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <ParallaxProvider>
                    <Component {...pageProps} />
                </ParallaxProvider>
            </Container>
        );
    }
}
