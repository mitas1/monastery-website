import { FC } from 'react';

import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';

import styles from './NavLink.module.css';

interface NavLinkProps extends LinkProps {
    active?: boolean;
    inverse?: boolean;
    type?: "normal" | "mobile";
}

const NavLink: FC<NavLinkProps> = ({
    children,
    active = false,
    inverse = false,
    type = "normal",
    ...linkProps
}) => {
    return (
        <Link {...linkProps}>
            <a
                tabIndex={0}
                className={classNames(styles.navLink, {
                    [styles.inverse]: inverse,
                    [styles.normal]: type === "normal",
                    [styles.mobile]: type === "mobile",
                    [styles.active]: active,
                })}
            >
                {children}
            </a>
        </Link>
    );
};

export default NavLink;
