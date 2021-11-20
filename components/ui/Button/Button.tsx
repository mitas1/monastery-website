import {
  FC,
  ReactNode,
} from 'react';

import classNames from 'classnames';

interface ButtonProps {
    onClick?: () => void;
    icon?: ReactNode;
    className?: string;
    secondary?: boolean;
}

const Button: FC<ButtonProps> = ({
    children,
    onClick,
    className,
    icon,
    secondary = false,
    ...rest
}) => {
    const content = (
        <button {...rest} className={classNames(className)}>
            {children}
            {icon}
        </button>
    );

    return content;
};

export default Button;
