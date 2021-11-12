import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Image from 'next/image';

import {
  ArticleWrapper,
  Header,
} from '../components/Article';
import {
  Heading,
  Layout,
} from '../components/Layout';

const CircleIcon = (props) => (
    <div className="wrapper">
        <Image {...props} />
    </div>
);

const Contact = () => {
    const { t } = useTranslation('contact');

    return (
        <Layout>
            <Head>
                <title>{`${t('title')} | ${t('common:title')}`}</title>
                <meta name="description" content={t('metaDescription')} />
            </Head>
            <ArticleWrapper>
                <Header>
                    <Heading level={1}>{t('heading')}</Heading>
                </Header>
                <div className="wrapper">
                    <div className="column">
                        <CircleIcon
                            src="/images/location.svg"
                            width={18}
                            height={23}
                        />
                        <div className="column-content">
                            <Heading level={3}>{t('address.title')}</Heading>
                            <Trans
                                i18nKey="contact:address.text"
                                components={[<p className="paragraph"/>, <br/>]}/>
                            <Heading level={3}>
                                {t('bankAccount.title')}
                            </Heading>
                            {t('bankAccount.text')}
                        </div>
                    </div>
                    <div className="column">
                        <CircleIcon
                            src="/images/tel.svg"
                            width={18}
                            height={18}
                        />
                        <div className="column-content">
                            <Heading level={3}>{t('tel.title')}</Heading>
                            {t('tel.text')}
                        </div>
                    </div>
                    <div className="column">
                        <CircleIcon
                            src="/images/mail.svg"
                            width={17}
                            height={14}
                        />
                        <div className="column-content">
                            <Heading level={3}>{t('email.title')}</Heading>
                            {t('email.text')}
                        </div>
                    </div>
                </div>
                <div className="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5290.7719196383005!2d17.448451!3d48.46831!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd34656e8201f7ce4!2zS2zDocWhdG9yIE5hanN2w6R0ZWrFoWVqIEJvaG9yb2RpxI1reQ!5e0!3m2!1sen!2ssk!4v1571779579264!5m2!1sen!2ssk"
                        width={1150}
                        height={550}
                        frameBorder={0}
                        allowFullScreen={true}
                    ></iframe>
                </div>
            </ArticleWrapper>
        </Layout>
    );
};

export default Contact;
