import { FC } from 'react';

import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { NavLink } from '@components/common';
import { SANITY_CONFIG } from '@lib/sanity/config';

import { isPathActive } from '../../../utils';

interface MenuProps {
    type?: "normal" | "mobile";
    inverse?: boolean;
}

const MENU_ITEMS = [
    {
        href: "/",
        tKey: "home",
    },
    {
        href: "/offerings",
        tKey: "offerings",
    },
    {
        href: "/post/news",
        usesSanity: true,
        tKey: "news",
    },
    {
        href: "/post/announcements/latest",
        usesSanity: true,
        tKey: "announcements",
    },
    {
        href: "/contact",
        tKey: "contact",
    },
];

const Menu: FC<MenuProps> = ({ type, inverse }) => {
    const { t } = useTranslation("common");

    const { asPath, locale } = useRouter();

    return (
        <div className={classNames("flex", { "flex-col": type === "mobile" })}>
            {MENU_ITEMS.map(
                ({ href, tKey, usesSanity }, index) =>
                    (!usesSanity ||
                        SANITY_CONFIG.availableLocales.includes(locale)) && (
                        <NavLink
                            inverse={inverse}
                            key={`menu-item-${index}`}
                            type={type}
                            href={href}
                            active={isPathActive(href, asPath)}
                        >
                            {t(`menu.${tKey}`)}
                        </NavLink>
                    )
            )}
        </div>
    );
};

export default Menu;
