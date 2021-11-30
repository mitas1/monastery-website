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
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta charSet="UTF-8" />
                <title>{t("title")}</title>
                <meta
                    name="description"
                    content={t("metaDescription")}
                    key="description"
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
                <Sidebar className="bg-gray-800" onClose={() => setOpen(false)}>
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
