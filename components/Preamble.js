import React from "react";

import { CONTENT_WIDTH } from "../constants";

export const Heading = ({ title }) => (
    <h1 className="heading">
        {title}
        <style jsx>
            {`
                .heading {
                    display: block;
                    font-family: "Martel", serif;
                    font-size: 50px;
                    font-weight: 700;
                    line-height: 1.5;
                    padding: 0 0 20px 0;
                    text-align: center;
                }
            `}
        </style>
    </h1>
);

export const Wrapper = ({ children }) => (
    <div className="preamble-wrapper">
        {children}
        <style jsx>{`
            .preamble-wrapper {
                margin: 80px auto 0 auto;
                padding: 80px 0 60px 0;
                width: 600px;
            }
        `}</style>
    </div>
);

export default ({ title, preamble }) => (
    <div>
        <Wrapper>
            <Heading title={title} />
            <blockquote className="blockquote">
                <i>{preamble.text}</i>
            </blockquote>
            <div className="author">{preamble.author}</div>
        </Wrapper>
        <div className="crop">
            <img className="image" src={preamble.img} />
        </div>
        <style jsx>{`
            .blockquote {
                display: block;
                font-size: 14px;
                font-weight: 400;
                line-height: 26px;
                margin: 0 auto;
                text-align: center;
                width: 520px;
            }
            .author {
                color: #969696;
                font-size: 13px;
                font-weight: 500;
                margin: 24px 0 0 0;
                text-align: center;
                text-transform: uppercase;
            }
            .crop {
                margin: 0 auto;
                max-height: 600px;
                max-width: ${CONTENT_WIDTH};
                overflow: hidden;
            }
            .image {
                width: ${CONTENT_WIDTH};
            }
        `}</style>
    </div>
);
