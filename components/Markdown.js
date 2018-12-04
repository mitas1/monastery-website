import { withZoom } from "../lib/withZoom";

import Parser from "html-react-parser";

const subHeadingStyles = `
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 0.1em;
    margin: 15px 0;
    font-size: 11px;
    color: rgb(150, 150, 150);
`;

const paragraphStyles = `
    margin: 15px 0 45px;
    font-size: 18px;
    font-weight: 300;
    font-family: "Roboto", sans-serif;
    line-height: 1.8;
`;

export const Subheading = ({ text }) => (
    <span className="subheading">
        {text}
        <style jsx>{`
            .subheading {
                ${subHeadingStyles};
            }
        `}</style>
    </span>
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

export const Markdown = ({ content }) => (
    <div>
        <article className="markdown">
            {Parser(content)}
            <style jsx>{`
                .markdown {
                    margin: 0 auto;
                    width: 700px;
                }
                .markdown :global(h1) {
                    display: block;
                    font-family: "Martel", serif;
                    font-weight: 200;
                    line-height: 1.5;
                    padding: 40px 0 40px;
                    font-size: 40px;
                }
                .markdown :global(h2) {
                    display: block;
                    font-family: "Martel", serif;
                    font-weight: 200;
                    line-height: 1.5;
                    padding: 10px 0 10px;
                    font-size: 30px;
                }
                .markdown :global(h3) {
                    display: block;
                    font-family: "Martel", serif;
                    font-weight: 200;
                    line-height: 1.5;
                    padding: 10px 0 10px;
                    font-size: 20px;
                }
                .markdown :global(.image-left) {
                    width: 400px;
                    float: left;
                    margin: 8px 24px 0 -150px;
                }
                .markdown :global(.image-left img) {
                    width: 400px;
                }
                .markdown :global(.image-left p) {
                    font-size: 12px;
                    margin: 4px 0 0 0;
                    color: #777;
                    text-align: center;
                }
                .markdown :global(.image-full) {
                    width: 700px;
                }
                .markdown :global(.image-full img) {
                    width: 700px;
                }
                .markdown {
                    quotes: "“" "”";
                }
                .markdown :global(.stars) {
                    width: 40px;
                    margin: 80px auto 80px;
                    display: block;
                }
                .markdown :global(blockquote p) {
                    font-style: italic;
                    color: #333;
                    margin: 0 0 0 8px;
                    font-size: 24px;
                    font-family: "Playfair Display";
                    font-weight: 700;
                    font-variant-ligatures: discretionary-ligatures;
                }
                .markdown :global(.cite) {
                    font-size: 14px;
                }
                .markdown :global(blockquote:before) {
                    content: open-quote;
                    margin: 0 0 0 -0.5em;
                    font-size: 9em;
                    position: absolute;
                    font-family: "Roboto";
                    font-style: normal;
                    top: -0.1em;
                    color: #ccc;
                }
                .markdown :global(strong) {
                    font-weight: 500;
                }
                .article {
                    clear: both;
                    margin: 0 0 0 390px;
                }
            `}</style>
        </article>
    </div>
);

export const NarrowMarkdown = ({ content }) => (
    <div className="markdown">
        <article dangerouslySetInnerHTML={{ __html: content }} />
        <style jsx>{`
            .markdown {
                margin: 0 0 0 390px;
            }
            .markdown :global(h1) {
                display: block;
                font-family: "Roboto", serif;
                font-weight: 400;
                width: 300px;
                line-height: 1.5;
                padding: 90px 0 30px;
                font-size: 30px;
                position: relative;
            }
            .markdown :global(h1)::before {
                content: "";
                background-image: url("/static/images/quote.svg");
                background-repeat: no-repeat;
                margin: 4px 0 0 -60px;
                width: 100px;
                height: 60px;
                display: block;
                position: absolute;
            }
            .markdown :global(p) {
                ${paragraphStyles} width: 430px;
            }
            .article {
                clear: both;
                margin: 0 0 0 390px;
            }
        `}</style>
    </div>
);
