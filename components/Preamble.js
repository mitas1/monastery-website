import { CONTENT_WIDTH } from '../constants';

export const Heading = ({ title }) => (
    <h1 className="heading">
        {title}
        <style jsx>
            {`
                .heading {
                    display: block;
                    font-family: 'Martel', serif;
                    font-size: 50px;
                    font-weight: 700;
                    line-height: 1.5;
                    padding: 0 0 20px 0;
                    text-align: center;
                }
                @media screen and (max-width: 992px) {
                    .heading {
                        text-align: left;
                        padding: 24px;
                        box-sizing: border-box;
                        width: 100%;
                        font-size: 35px;
                    }
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
            @media screen and (max-width: 992px) {
                .preamble-wrapper {
                    margin: 0;
                    padding: 80px 0 0;
                    width: 100%;
                }
            }
        `}</style>
    </div>
);

export default ({ title, text, author, img }) => (
    <div>
        <Wrapper>
            <Heading title={title} />
            <blockquote className="blockquote">
                <i>{text}</i>
            </blockquote>
            <div className="author">{author}</div>
        </Wrapper>
        {img && (
            <div className="crop">
                <img className="image" src={img} />
            </div>
        )}
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
            @media screen and (max-width: 992px) {
                .image {
                    width: 100%;
                    padding: 24px;
                    box-sizing: border-box;
                }
                .blockquote {
                    width: 100%;
                    padding: 0 24px;
                    margin: 0;
                    text-align: left;
                    box-sizing: border-box;
                }
            }
        `}</style>
    </div>
);
