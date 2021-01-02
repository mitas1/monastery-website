import Link from 'next/link';
import css from 'styled-jsx/css';
import { ReactNode } from 'react';

interface TButton {
    children: ReactNode;
    onClick?: () => void;
    href?: string | object;
    icon?: ReactNode;
    className?: string;
    secondary?: boolean;
}

const styles = css`
    .button {
        display: inline-block;
        background-color: #006cb9;
        border-radius: 3px;
        color: #fff;
        font-size: 15px;
        font-weight: 500;
        padding: 24px 45px;
        text-decoration: none;
    }
    .icon {
        margin: 0 0 0 16px;
    }
    .button.secondary {
        color: #0c1a24;
        border-radius: 3px;
        background-color: #fff;
    }
    .button:hover {
        box-shadow: 0 1px 5px #777;
        cursor: pointer;
    }
`;

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
            <style jsx>{styles}</style>
        </a>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return content;
};

export default Button;
