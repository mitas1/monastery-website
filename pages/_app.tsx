import '@material/react-drawer/dist/drawer.css';
import 'react-medium-image-zoom/dist/styles.css';
import 'tailwindcss/tailwind.css';

import Router from 'next/router';
import NProgress from 'nprogress';

Router.events.on("routeChangeStart", () => {
    NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
export default MyApp;
