import React, { FC } from 'react';

import { useRouter } from 'next/router';
import { formatDate } from 'utils';

import { Heading } from '@components/ui';

import styles from './ArticleHeader.module.css';

export interface ArticleHeaderProps {
    title?: string;
    quote?: string;
    publishedAt?: string;
    author?: string;
}

const Date = ({ date }) => {
    const { locale } = useRouter();

    return (
        <div>
            Aktualizované: <strong>{formatDate(date, locale)}</strong>
        </div>
    );
};

const ArticleHeader: FC<ArticleHeaderProps> = ({
    author,
    publishedAt,
    quote,
    title,
}) => (
    <article className={styles.header}>
        {title && <Heading>{title}</Heading>}
        {quote && <blockquote className="italic">{quote}</blockquote>}
        {publishedAt && <Date date={publishedAt} />}
        {author && (
            <div className="uppercase text-sm text-gray-600">{author}</div>
        )}
    </article>
);

export default ArticleHeader;
