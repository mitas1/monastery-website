import React, { ReactNode } from 'react';

import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';

import Drawer from '@material/react-drawer';

import Header from '../components/Header';
import { GA_TRACKING_ID } from '../constants';
import Footer, { TFooterProps } from './Footer';
import Menu from './Menu';

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
        </>
    );
};

export const Content = ({ children }) => (
    <div>
        {children}
    </div>
);

export const ContentRight = ({ children }) => (
    <div>
        {children}
    </div>
);

export const Layout = ({
    children,
    addTopListener,
    footer,
}: {
    children: React.ReactNode;
    addTopListener?: boolean;
    footer?: TFooterProps;
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
                    href="https://fonts.googleapis.com/css?family=Martel:600|Roboto:300,300i,400,400i,700&display=swap"
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
            <Header addTopListener={addTopListener} handleDrawer={() => setOpen(!open)} />
            {children}
            <Footer {...footer} />
        </div>
    );
};
