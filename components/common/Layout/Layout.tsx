import React, { FC } from 'react';

import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';

import {
  Footer,
  Header,
  Menu,
} from '@components/common';
import { Sidebar } from '@components/ui';

interface LayoutProps {
    transparentHeader?: boolean;
    imageFooter?: boolean;
}

const Layout: FC<LayoutProps> = ({
    children,
    transparentHeader = false,
    imageFooter = false,
}) => {
    const [open, setOpen] = React.useState(false);

    const { t } = useTranslation("common");

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <title>{t("title")}</title>
                <meta
                    name="description"
                    content={t("metaDescription")}
                    key="description"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Martel:wght@600&family=Roboto:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
                    rel="stylesheet"
                />
                <meta
                    name="keywords"
                    content="benediktínky, kláštor, horné orešany, slovensko, monastery, benedictines, slovakia"
                    key="keywords"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            {open ? (
                <Sidebar onClose={() => setOpen(false)}>
                    <Menu type="mobile" />
                </Sidebar>
            ) : null}
            <Header
                transparent={transparentHeader}
                handleDrawer={() => setOpen(!open)}
            />
            <main className={classNames({ "mt-24": !transparentHeader })}>
                {children}
            </main>
            <Footer type={imageFooter ? "timesheets" : "simple"} />
        </>
    );
};

export default Layout;
