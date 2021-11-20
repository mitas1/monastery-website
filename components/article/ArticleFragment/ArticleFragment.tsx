import { FC } from 'react';

import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from 'utils';

import { ArrowLink } from '@components/ui';
import { Post } from '@lib/sanity/types';
import { urlFor } from '@lib/sanity/urlFor';

import styles from './ArticleFragment.module.css';

export interface ArticleFragmentProps extends Post {
    layout?: "normal" | "image";
    inverse?: boolean;
    number?: string;
    href: string;
}

const ArticleFragment: FC<ArticleFragmentProps> = ({
    layout = "normal",
    author,
    href,
    publishedAt,
    mainImage,
    inverse = false,
    number,
    bodyPreview,
    title,
}) => {
    const { t, lang } = useTranslation("common");

    const metaInfo = number ? (
        <span className={classNames("text-xs text-gray-500")}>{number}</span>
    ) : (
        <span
            className={classNames("text-gray-500", {
                "text-sm": layout === "normal",
                "text-xs sm:text-sm sm:block sm:mt-4": layout === "image",
            })}
        >
            {formatDate(publishedAt, lang)}
            {author && (
                <>
                    <span className="px-2">·</span>
                    {author}
                </>
            )}
        </span>
    );

    return (
        <article
            className={classNames(styles.article, "sm:pl-10", {
                "text-white": inverse,
                "text-black": !inverse,
                [styles.imageLayout]: layout === "image",
                [styles.normalLayout]: layout === "normal",
            })}
        >
            {mainImage ? (
                <Link href={href}>
                    <a className={styles.image}>
                        <Image
                            src={urlFor(mainImage)
                                .size(220, 140)
                                .quality(100)
                                .url()}
                            layout="fill"
                            objectFit="cover"
                            alt="Obrázok článku"
                        />
                    </a>
                </Link>
            ) : (
                <div />
            )}

            <div className="w-2/3">
                {layout === "normal" && metaInfo}
                <Link href={href}>
                    <a
                        className={classNames({
                            "space-y-4": layout === "normal",
                            "space-y-1 sm:space-y-4": layout === "image",
                        })}
                    >
                        <h1
                            className={classNames("font-serif", {
                                "text-2xl": layout === "normal",
                                "text-lg sm:text-2xl": layout === "image",
                            })}
                        >
                            {title}
                        </h1>
                        <p
                            className={classNames("font-light leading-loose", {
                                "text-xs leading-5 sm:text-base sm:leading-normal": layout === "image",
                            })}
                        >
                            {bodyPreview}
                        </p>
                    </a>
                </Link>
                {layout === "normal" ? (
                    <ArrowLink
                        href={href}
                        className={classNames("mt-6", {
                            "text-blue-500": !inverse,
                            "text-white": inverse,
                        })}
                    >
                        {t("readMore")}
                    </ArrowLink>
                ) : (
                    metaInfo
                )}
            </div>
        </article>
    );
};
export default ArticleFragment;
