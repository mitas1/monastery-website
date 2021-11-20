import { FC } from 'react';

import Image from 'next/image';

import { Heading } from '@components/ui';

import styles from './ColumnWithIcon.module.css';

interface ColumnWithIconProps {
    iconSrc: string;
    title: string;
}

const ColumnWithIcon: FC<ColumnWithIconProps> = ({
    iconSrc,
    title,
    children,
}) => (
    <div className={styles.root}>
        <div className={styles.iconCircle}>
            <Image
                className={styles.icon}
                src={iconSrc}
                width={22}
                height={22}
            />
        </div>
        <div className={styles.content}>
            <Heading level={3} size={4}>
                {title}
            </Heading>
            {children}
        </div>
    </div>
);

export default ColumnWithIcon;
