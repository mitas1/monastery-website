import Parser from "html-react-parser";
import { withTranslation, Link } from "../lib/i18n";

const subHeadingStyles = `
    color: rgb(150, 150, 150);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    margin: 0 0 15px;
    text-transform: uppercase;
`;

const paragraphStyles = `
    font-family: "Roboto", sans-serif;
    font-size: 22px;
    font-weight: 300;
    line-height: 1.8;
    margin: 15px 0 35px;
`;

export const Subheading = ({ text, inline }) => (
    <div className="subheading">
        {text}
        <style jsx>{`
            .subheading {
                ${subHeadingStyles};
                ${inline ? "display: inline;" : ""}
            }
        `}</style>
    </div>
);

export const Paragraph = ({ children }) => (
    <p className="text">
        {children}
        <style jsx>{`
            .text {
                ${paragraphStyles};
            }
        `}</style>
    </p>
);

const FooterActions = withTranslation("article")(({ t, contactLink }) => (
    <div className="footer-actions">
        {contactLink && (
            <Link href="/contact">
                <a className="button-link">{t("linkFooter")}</a>
            </Link>
        )}
        <Link href="/">
            <a className="link">
                <img height={8} src="/static/images/arrow_back.svg" />
                {t("arrowBack")}
            </a>
        </Link>
        <style jsx>
            {`
                .footer-actions {
                    margin: 70px 0 80px 0;
                }
                .button-link {
                    background-color: #006cb9;
                    border-radius: 3px;
                    color: #fff;
                    font-size: 15px;
                    font-weight: 500;
                    margin: 0 50px 0 0;
                    padding: 24px 45px;
                    text-decoration: none;
                }
                .link {
                    color: #006cb9;
                    font-size: 15px;
                    font-weight: 400;
                    text-decoration: none;
                }
                .link img {
                    margin: 0 18px 0 0;
                }
            `}
        </style>
    </div>
));

const IBAN = withTranslation("contact")(({ t }) => (
    <div className="iban">
        {t("bank_account.text")}
        <style jsx>{`
            .iban {
                text-align: center;
                font-family: "Martel", serif;
                font-size: 24px;
                font-weight: 600;
            }
        `}</style>
    </div>
));

export const Markdown = ({ content, iban, ...other }) => {
    return (
        <article className="markdown">
            {Parser(content)}
            {iban && <IBAN />}
            <div className="dot" />
            <FooterActions {...other}/>
            <style jsx>{`
                .markdown {
                    background-color: #fff;
                    font-family: "Roboto", sans-serif;
                    font-size: 17px;
                    font-weight: 300;
                    line-height: 26px;
                    margin: 0 auto;
                    padding: 46px 120px;
                    position: relative;
                    width: 640px;
                }
                .markdown :global(p) {
                    font-family: "Roboto", sans-serif;
                    margin-bottom: 26px;
                    line-height: 26px;
                }
                .markdown :global(> p:first-of-type::first-letter) {
                    display: block;
                    float: left;
                    font-family: "Martel", serif;
                    font-size: 50px;
                    font-weight: 400;
                    padding-left: 3px;
                    padding-right: 8px;
                    padding-top: 18px;
                    position: relative;
                }
                .markdown :global(h1) {
                    display: block;
                    font-family: "Martel", serif;
                    font-size: 40px;
                    font-weight: 600;
                    line-height: 1.5;
                    margin-bottom: 16px;
                    padding: 10px 0 10px;
                    text-align: center;
                }
                .markdown :global(h2) {
                    display: block;
                    font-family: "Martel", serif;
                    font-size: 23px;
                    font-weight: 400;
                    line-height: 1.5;
                    margin-bottom: 16px;
                    padding: 10px 0 10px;
                }
                .markdown :global(h3) {
                    color: #575757;
                    display: block;
                    font-family: "Roboto", serif;
                    font-size: 13px;
                    font-weight: 500;
                    line-height: 1.5;
                    margin-bottom: 16px;
                    padding: 10px 0 10px;
                    text-align: center;
                    text-transform: uppercase;
                }
                .markdown :global(blockquote p) {
                    border-left: 4px solid #e9e9e9;
                    font-style: italic;
                    font-weight: 300;
                    padding: 0 0 0 30px;
                }
                .markdown :global(.image-full) {
                    margin: 24px 0 24px -255px;
                    max-height: 590px;
                    overflow: hidden;
                    position: relative;
                    width: 1150px;
                }
                .markdown :global(.image-full::before) {
                    background-image: url("/static/images/gradient.png");
                    background-repeat: repeat-x;
                    bottom: 0;
                    content: "";
                    height: 82px;
                    position: absolute;
                    width: 100%;
                }
                .markdown :global(.image-full img) {
                    width: 100%;
                }
                .markdown :global(.image-full p) {
                    bottom: 0px;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 500;
                    left: 24px;
                    position: absolute;
                }
                .markdown :global(.image-side-by-side) {
                    display: flex;
                    flex-direction: row;
                    margin: 24px 0 24px -255px;
                    max-height: 500px;
                    width: 1150px;
                }
                .markdown :global(.image-side-by-side div::before) {
                    background-image: url("/static/images/gradient.png");
                    background-repeat: repeat-x;
                    bottom: 0;
                    content: "";
                    height: 82px;
                    position: absolute;
                    width: 100%;
                }
                .markdown :global(.image-side-by-side img) {
                    width: 100%;
                }
                .markdown :global(.image-side-by-side .left) {
                    flex: 2;
                    margin: 0 24px 0 0;
                    overflow: hidden;
                    position: relative;
                }
                .markdown :global(.image-side-by-side .right) {
                    flex: 1;
                    overflow: hidden;
                    position: relative;
                }
                .markdown :global(.image-side-by-side p) {
                    bottom: 0px;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 500;
                    left: 24px;
                    position: absolute;
                }
                .dot {
                    width: 9px;
                    height: 9px;
                    border-radius: 50%;
                    background-color: #000;
                    display: block;
                    margin-top: 60px;
                }
            `}</style>
        </article>
    );
};

export const NarrowMarkdown = ({ children }) => (
    <article className="markdown">
        {Parser(children)}
        <style jsx>{`
            .markdown {
                margin: 0 0 130px 390px;
            }
            .markdown :global(h1) {
                display: block;
                font-family: "Martel", serif;
                font-size: 33px;
                font-weight: 700;
                line-height: 1.5;
                padding: 90px 0 30px;
                position: relative;
                width: 400px;
            }
            .markdown :global(h1)::before {
                background-image: url("/static/images/quote.svg");
                background-repeat: no-repeat;
                content: "";
                display: block;
                height: 60px;
                margin: 4px 0 0 -60px;
                position: absolute;
                width: 100px;
            }
            .markdown :global(p) {
                ${paragraphStyles}
                width: 530px;
            }
        `}</style>
    </article>
);
