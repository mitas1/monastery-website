import React, { FC } from 'react';

import classNames from 'classnames';

import styles from './ArticleContent.module.css';

interface ArticleContentProps {
    className?: string;
    dropCap?: boolean;
}

const ArticleContent: FC<ArticleContentProps> = ({
    dropCap = false,
    className,
    children,
}) => (
    <article
        className={classNames(className, styles.content, styles.narrow, {
            [styles.dropCap]: dropCap,
        })}
    >
        {children}
    </article>
);

export default ArticleContent;
