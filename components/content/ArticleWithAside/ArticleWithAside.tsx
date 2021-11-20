import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';

import {
  Heading,
  Paragraph,
} from '@components/ui';

const ArticleWithAside = () => {
    const { t } = useTranslation();

    return (
        <section className="flex flex-col sm:flex-row">
            <div className="relative w-full h-[600px] sm:h-auto sm:w-1/3">
                <Image
                    layout="fill"
                    objectFit="cover"
                    className="aside-image"
                    src="/images/benedikt.jpg"
                    alt="Detail: Kopf des Hl. Benedikt, Fra Angelico"
                />
            </div>
            <article className="px-8 py-10 sm:px-24 sm:py-32 sm:w-2/3">
                <span>{t("index:shortArticleWithAside.subtitle")}</span>
                <Heading
                    className="text-4xl leading-relaxed"
                    level={1}
                    size={1}
                >
                    {t("index:shortArticleWithAside.title")}
                </Heading>
                <Paragraph>{t("index:shortArticleWithAside.text")}</Paragraph>
                <span className="py-4 title space-x-4">
                    <span>
                        {t("index:shortArticleWithAside.acronym.title")}
                    </span>
                    <strong className="acronym">
                        {t("index:shortArticleWithAside.acronym.text")}
                    </strong>
                </span>
                <div className="pt-8">
                    <i className="py-4 text-xs">
                        {t("index:shortArticleWithAside.imageLabel")}
                    </i>
                </div>
            </article>
        </section>
    );
};

export default ArticleWithAside;
