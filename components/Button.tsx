import { ReactNode } from 'react';

import Link from 'next/link';

interface TButton {
    children: ReactNode;
    onClick?: () => void;
    href?: string | object;
    icon?: ReactNode;
    className?: string;
    secondary?: boolean;
}

const Button = ({
    children,
    className,
    href,
    icon,
    secondary = false,
    ...rest
}: TButton) => {
    const classes = ['button'];

    if (className) classes.push(className);
    if (secondary) classes.push('secondary');

    const classStr = classes.join(' ');

    const content = (
        <a {...rest} className={classStr}>
            {children}
            {icon && <i className="icon">{icon}</i>}
        </a>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return content;
};

export default Button;
