import React from "react";
import Head from "next/head";

import { withTranslation } from "../lib/i18n";

import { CONTENT_WIDTH } from "../constants";
import { Subheading } from "../components/Markdown";
import { Wrapper, Heading } from "../components/Preamble";
import Layout from "../components/Layout";

const CircleIcon = ({ src }) => (
    <div className="wrapper">
        <img src={src} />
        <style jsx>{`
            .wrapper {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #262626;
                display: flex;
                align-items: center;
                justify-content: center;
                float: left;
            }
        `}</style>
    </div>
);

const Contact = ({ t }) => (
    <Layout>
        <Head>
            <title>{t('title')}</title>
        </Head>
        <Wrapper>
            <Heading title={t("heading")} />
        </Wrapper>
        <div className="column-wrapper">
            <div className="column">
                <CircleIcon src="/images/location.svg" />
                <div className="column-content">
                    <Subheading text={t("address.title")} />
                    <p
                        className="paragraph"
                        dangerouslySetInnerHTML={{
                            __html: t("address.text", {
                                escapeInterpolation: true,
                            }),
                        }}
                    />
                    <Subheading text={t("bankAccount.title")} />
                    {t("bankAccount.text")}
                </div>
            </div>
            <div className="column">
                <CircleIcon src="/images/tel.svg" />
                <div className="column-content">
                    <Subheading text={t("tel.title")} />
                    {t("tel.text")}
                </div>
            </div>
            <div className="column">
                <CircleIcon src="/images/mail.svg" />
                <div className="column-content">
                    <Subheading text={t("email.title")} />
                    {t("email.text")}
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
        <style jsx>{`
            .column-wrapper {
                display: flex;
                width: ${CONTENT_WIDTH};
                margin: 0 auto;
            }
            .column {
                flex: 1;
                display: block;
            }
            .column-content {
                float: left;
                width: 260px;
                font-family: "Roboto", sans-serif;
                font-size: 14px;
                margin: 0 0 0 20px;
            }
            .paragraph {
                margin: 0 0 20px;
            }
            .map {
                background-color: #e5e3df;
                margin: 40px auto;
                height: 550px;
                width: ${CONTENT_WIDTH};
            }
            .map iframe {
                border: 0;
            }
            @media screen and (max-width: 992px) {
                .column-wrapper {
                    width: 100%;
                    flex-direction: column;
                    padding: 24px;
                }
                .column {
                    padding: 0 0 48px;
                }
                .map {
                    width: 100%;
                }
                .map iframe {
                    width: 100%;
                }
            }
        `}</style>
    </Layout>
);

Contact.getInitialProps = async () => ({
    namespacesRequired: ["contact", "footer", "header"],
});

export default withTranslation("contact")(Contact);
