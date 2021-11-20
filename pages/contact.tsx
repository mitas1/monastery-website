import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';

import { ArticleHeader } from '@components/article/ArticleHeader';
import {
  CenterBox,
  Grid,
  Layout,
} from '@components/common';
import {
  ColumnWithIcon,
  Map,
} from '@components/content';
import { Heading } from '@components/ui';

const Contact = () => {
    const { t } = useTranslation("contact");

    return (
        <Layout>
            <Head>
                <title>{`${t("title")} | ${t("common:title")}`}</title>
                <meta
                    name="description"
                    content={t("metaDescription")}
                    key="description"
                />
            </Head>
            <CenterBox className="p-8">
                <ArticleHeader title={t("heading")} />
                <Grid className="p-0 pb-16 pt-4 sm:px-20">
                    <ColumnWithIcon
                        title={t("address.title")}
                        iconSrc="/images/place.svg"
                    >
                        <Trans
                            i18nKey="contact:address.text"
                            components={[<p />, <br />]}
                        />
                        <Heading level={3} size={4} className="pt-8">
                            {t("bankAccount.title")}
                        </Heading>
                        <p>{t("bankAccount.text")}</p>
                    </ColumnWithIcon>
                    <ColumnWithIcon
                        title={t("tel.title")}
                        iconSrc="/images/phone.svg"
                    >
                        <p>{t("tel.text")}</p>
                    </ColumnWithIcon>
                    <ColumnWithIcon
                        title={t("email.title")}
                        iconSrc="/images/email.svg"
                    >
                        <p>{t("email.text")}</p>
                    </ColumnWithIcon>
                </Grid>
                <Map />
            </CenterBox>
        </Layout>
    );
};

export default Contact;
