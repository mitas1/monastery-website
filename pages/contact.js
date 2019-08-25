import React from "react";

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
        <Wrapper>
            <Heading title={t("heading")} />
        </Wrapper>
        <div className="column-wrapper">
            <div className="column">
                <CircleIcon src="/static/images/location.svg" />
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
                    <Subheading text={t("bank_account.title")} />
                    {t("bank_account.text")}
                </div>
            </div>
            <div className="column">
                <CircleIcon src="/static/images/tel.svg" />
                <div className="column-content">
                    <Subheading text={t("tel.title")} />
                    {t("tel.text")}
                </div>
            </div>
            <div className="column">
                <CircleIcon src="/static/images/mail.svg" />
                <div className="column-content">
                    <Subheading text={t("email.title")} />
                    {t("email.text")}
                </div>
            </div>
        </div>
        <div className="map">
            <iframe
                src="https://www.google.com/maps/embed?key=AIzaSyALytxfAEHyoB1OXEqFWifQ08Odpavl_5g&pb=!1m18!1m12!1m3!1d3156.8249944713557!2d17.445837090180323!3d48.46845163582786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476ca4e61ff63565%3A0xd34656e8201f7ce4!2zS2zDocWhdG9yIE5hanN2w6R0ZWrFoWVqIEJvaG9yb2RpxI1reQ!5e0!3m2!1sen!2ssk!4v1544362285429"
                width="1150"
                height="550"
                frameBorder="0"
                allowFullScreen
            />
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
        `}</style>
    </Layout>
);

Contact.getInitialProps = async () => ({
    namespacesRequired: ["contact", "footer", "header"],
});

export default withTranslation("contact")(Contact);
