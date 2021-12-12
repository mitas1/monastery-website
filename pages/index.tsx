import useTranslation from 'next-translate/useTranslation';

import { ArticleFragment } from '@components/article';
import {
    CenterBox,
    Grid,
    Layout,
} from '@components/common';
import { ArticleWithAside } from '@components/content';
import {
    Banner,
    Heading,
    Link,
    Paragraph,
} from '@components/ui';
import createSanityApi from '@lib/sanity/api';
import { SANITY_CONFIG } from '@lib/sanity/config';

const Index = ({ news, newsCount }) => {
    const { t } = useTranslation('common');

    return (
        <Layout transparentHeader imageFooter>
            <Banner />
            {news && news.length > 0 && (
                <CenterBox>
                    <Grid divide className="py-24">
                        {/* We don't want to show mainImage here */}
                        {news.map(({ mainImage, ...post }) => (
                            <ArticleFragment
                                key={post._id}
                                href={`/post/news/${post.slug.current}`}
                                {...post}
                            />
                        ))}
                    </Grid>
                    {newsCount > 3 && (
                        <div className="flex justify-center items-center mb-20">
                            <Link href="/post/news" style="button">
                                {t('index:news.button')}
                            </Link>
                        </div>
                    )}
                </CenterBox>
            )}
            <CenterBox rootClassName="bg-gray-800">
                <Grid divide className="pb-16 sm:py-24">
                    <ArticleFragment
                        inverse
                        number="01"
                        href="/monastery-life"
                        {...t('index:article01', {}, { returnObjects: true })}
                    />
                    <ArticleFragment
                        inverse
                        number="02"
                        href="/guests"
                        {...t('index:article02', {}, { returnObjects: true })}
                    />
                    <ArticleFragment
                        inverse
                        number="03"
                        href="/experiences"
                        {...t('index:article03', {}, { returnObjects: true })}
                    />
                </Grid>
            </CenterBox>
            <CenterBox rootClassName="bg-gray-50">
                <ArticleWithAside />
            </CenterBox>
            <CenterBox className="space-y-4 py-10 sm:py-32" layout="text">
                <Heading className="max-w-xs">
                    {t('index:aboutus.title')}
                </Heading>
                <Paragraph>{t('index:aboutus.text')}</Paragraph>
            </CenterBox>
        </Layout>
    );
};

export async function getStaticProps({ locale }) {
    const sanityApi = createSanityApi();

    if (SANITY_CONFIG.availableLocales.includes(locale)) {
        const news = await sanityApi.getPosts('news', 0, 2);
        const newsCount = await sanityApi.getPostsCount('news');

        return {
            props: {
                news,
                newsCount,
            },
            revalidate: 1,
        };
    }
    return {};
}

export default Index;
