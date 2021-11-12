import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { SANITY_AVAILABLE_LOCALES } from '../constants';
import { isPathActive } from '../utils';

const MENU_ITEMS = [
    {
        href: '/',
        tKey: 'home',
    },
    {
        href: '/offerings',
        tKey: 'offerings',
    },
    {
        href: '/post/news',
        usesSanity: true,
        tKey: 'news',
    },
    {
        href: '/post/announcements/latest',
        usesSanity: true,
        tKey: 'announcements',
    },
    {
        href: '/contact',
        tKey: 'contact',
    },
];

export const NavLink = ({
    href,
    label,
    active = false,
    inverse = false,
    small = false,
    locale,
}: {
    href: string;
    label: string;
    active?: boolean;
    inverse?: boolean;
    small?: boolean;
    locale?: string;
}) => {
    const classes = ['link'];

    if (active) {
        classes.push('active');
    }

    if (inverse) {
        classes.push('inverse');
    }

    if (small) {
        classes.push('small');
    }

    return (
        <>
            <Link href={href} locale={locale}>
                <a tabIndex={0} className={classes.join(' ')}>
                    {label}
                </a>
            </Link>
        </>
    );
};

const Menu = ({ small, inverse }: { small?: boolean; inverse?: boolean }) => {
    const { t } = useTranslation('common');

    const { asPath, locale } = useRouter();

    return (
        <div className={`${small && 'small'} menu`}>
            {MENU_ITEMS.map(
                ({ href, tKey, usesSanity }, index) =>
                    (!usesSanity ||
                        SANITY_AVAILABLE_LOCALES.includes(locale)) && (
                        <NavLink
                            inverse={inverse}
                            key={`menu-item-${index}`}
                            small={small}
                            href={href}
                            active={isPathActive(href, asPath)}
                            label={t(`menu.${tKey}`)}
                        />
                    )
            )}
        </div>
    );
};

export default Menu;
