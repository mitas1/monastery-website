import { FC } from 'react';

import Link, { LinkProps } from './Link';

interface ArrowLinkProps extends Omit<LinkProps, "iconPrefix" | "iconSuffix"> {
    type?: "back" | "next";
}

const ArrowLink: FC<ArrowLinkProps> = ({ type = "next", ...linkProps }) => (
    <Link
        {...linkProps}
        iconPrefix={
            type === "back" ? <img src="/images/arrow-back.svg" /> : null
        }
        iconSuffix={type === "next" ? <img src="/images/arrow.svg" /> : null}
    />
);

export default ArrowLink;
