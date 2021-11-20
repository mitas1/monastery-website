import 'react-medium-image-zoom/dist/styles.css';
import 'tailwindcss/tailwind.css';

import { useEffect } from 'react';

import { useRouter } from 'next/router';
import Script from 'next/script';
import NProgress from 'nprogress';

import * as gtag from '../lib/gtag';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    useEffect(() => {
        const handleRouteChangeStart = () => {
            NProgress.start();
        };

        const handleRouteChangeComplete = (url) => {
            gtag.pageview(url);
            NProgress.done();
        };

        const handleRouteChangeError = () => {
            NProgress.done();
        };

        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);
        router.events.on("routeChangeError", handleRouteChangeError);

        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
            router.events.off("routeChangeError", handleRouteChangeError);
        };
    }, [router.events]);

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.ANALYTICS_ID}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${gtag.ANALYTICS_ID}', {
                        page_path: window.location.pathname,
                        });
                    `,
                }}
            />
            <Component {...pageProps} />
        </>
    );
}
export default MyApp;
