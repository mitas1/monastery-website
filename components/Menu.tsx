import { useRouter } from 'next/router';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { isPathActive } from '../utils';
import { SANITY_AVAILABLE_LOCALES } from '../constants';

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
            <style jsx>{`
                .link {
                    align-items: center;
                    color: #666666;
                    cursor: pointer;
                    display: flex;
                    font-family: 'Roboto', sans-serif;
                    font-weight: 500;
                    height: 80px;
                    padding: 0 18px;
                    text-decoration: none;
                    transition: color 0.5s ease;
                }
                .link.active {
                    border-bottom: 1px solid #0c1a24;
                    color: #000;
                }
                .link.inverse {
                    color: #fff;
                }
                .link.small {
                    height: 56px;
                }
                .link.inverse.active {
                    border-bottom: 1px solid #fff;
                }
                .link.small.active {
                    border-bottom: none;
                    color: #29d;
                }
                .link:hover {
                    color: #29d;
                }
                .link.inverse:hover {
                    color: #fff;
                }
            `}</style>
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
            <style jsx>{`
                .menu {
                    margin: 16px 0;
                    display: flex;
                }
                .item {
                    padding: 16px 8px;
                }
                .item-accent {
                    margin: 8px 0 0 16px;
                }
                .small {
                    display: flex;
                    flex-direction: column;
                }

                @media screen and (min-width: 992px) {
                    .menu {
                        margin: 0;
                    }
                    .link.active {
                        border-bottom: 1px solid #0c1a24;
                        color: #000;
                    }
                }
            `}</style>
        </div>
    );
};

export default Menu;
