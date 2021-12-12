import {
  FC,
  ReactNode,
} from 'react';

import styles from './Button.module.css';

interface ButtonProps {
    onClick(): void;
    icon: ReactNode;
}

const Button: FC<ButtonProps> = ({ icon, ...buttonProps }) => (
    <button className={styles.button} type="button" {...buttonProps}>
        {icon}
    </button>
);

export default Button;
