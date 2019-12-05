import { useRouter } from "next/router";

import { withTranslation, Link } from "../lib/i18n";

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
        href: "/announcements",
        tKey: "announcements",
    },
    {
        href: "/contact",
        tKey: "contact",
    },
];

export const NavLink = ({
    href,
    onClick,
    label,
    tabIndex=0,
    active = false,
    inverse = false,
    small = false,
}) => {
    let classes = ["link"];

    if (active) {
        classes.push("active");
    }

    if (inverse) {
        classes.push("inverse");
    }

    if (small) {
        classes.push("small");
    }

    classes = classes.join(" ");

    return (
        <>
            {href ? (
                <Link href={href}>
                    <a tabIndex={tabIndex} className={classes}>
                        {label}
                    </a>
                </Link>
            ) : (
                <a
                    onClick={onClick}
                    tabIndex={tabIndex}
                    className={classes}
                >
                    {label}
                </a>
            )}
            <style jsx>{`
                .link {
                    align-items: center;
                    color: #666666;
                    cursor: pointer;
                    display: flex;
                    font-family: "Roboto", sans-serif;
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

export default withTranslation("header")(({ t, smartphone, inverse }) => {
    const { pathname } = useRouter(null);

    return (
        <div className={`${smartphone && "smartphone"} menu`}>
            {MENU_ITEMS.map((item, index) => (
                <NavLink
                    inverse={inverse}
                    tabIndex={index}
                    key={index}
                    small={smartphone}
                    href={item.href}
                    active={pathname === item.href}
                    label={t(item.tKey)}
                />
            ))}
            <style jsx>{`
                .menu {
                    display: flex;
                }
                .smartphone {
                    display: flex;
                    flex-direction: column;
                }
                .link.active {
                    border-bottom: 1px solid #0c1a24;
                    color: #000;
                }
                @media screen and (max-width: 992px) {
                    .menu {
                        margin: 16px 0;
                    }
                    .item {
                        padding: 16px 8px;
                    }
                    .item-accent {
                        margin: 8px 0 0 16px;
                    }
                }
            `}</style>
        </div>
    );
});
