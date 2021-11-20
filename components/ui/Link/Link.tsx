import {
  FC,
  ReactNode,
} from 'react';

import classNames from 'classnames';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

export interface LinkProps extends NextLinkProps {
    style?: "link" | "button";
    iconSuffix?: ReactNode;
    iconPrefix?: ReactNode;
    className?: string;
}

const Link: FC<LinkProps> = ({
    style = "link",
    children,
    className,
    iconPrefix,
    iconSuffix,
    ...linkProps
}) => {
    return (
        <NextLink {...linkProps}>
            <a
                className={classNames("inline-flex", className, {
                    "items-center text-blue-500": style === "link",
                    "bg-blue-500 text-white px-8 py-4 rounded":
                        style === "button",
                })}
            >
                {iconPrefix && <span className="mr-4">{iconPrefix}</span>}
                {children}
                {iconSuffix && <span className="ml-4">{iconSuffix}</span>}
            </a>
        </NextLink>
    );
};

export default Link;
