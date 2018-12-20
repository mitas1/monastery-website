import Link from "next/link";
import path from "path";
import { withNamespaces } from "react-i18next";
import { ParallaxBanner } from "react-scroll-parallax";

import { CONTENT_WIDTH } from "../constants";

export default withNamespaces(["index"])(
    class Baner extends React.Component {
        render() {
            const {
                i18n: { language },
                t
            } = this.props;
            return (
                <ParallaxBanner
                    className="baner"
                    style={{
                        height: "700px"
                    }}
                    layers={[
                        {
                            image: "/static/images/background.jpg",
                            amount: 0.2,
                            slowerScrollRate: true
                        }
                    ]}
                >
                    <div className="offerings-heading-wrapper">
                        <h1 className="offerings-heading">
                            {t("offerings.title.firstLine")}
                            <br />
                            {t("offerings.title.secondLine")}
                        </h1>
                        <Link
                            href={{
                                pathname: "/offerings",
                                query: { lng: language }
                            }}
                            as={{ pathname: path.join("/offerings", language) }}
                        >
                            <div className="offerings-button">
                                <span>{t("offerings.readMore")}</span>
                                <img src="/static/images/arrow.svg" />
                            </div>
                        </Link>
                    </div>
                    <style jsx>{`
                        .offerings-heading-wrapper {
                            width: ${CONTENT_WIDTH};
                            margin: 0 auto;
                        }
                        .offerings-heading {
                            color: #fff;
                            font-family: "Martel", serif;
                            font-size: 50px;
                            font-weight: 600;
                            line-height: 1.3;
                            padding: 250px 0 70px 0;
                            position: relative;
                            width: 800px;
                        }
                        .baner {
                            height: 700px;
                        }
                        .offerings-button {
                            align-items: center;
                            background-color: #fff;
                            border-radius: 3px;
                            color: #0c1a24;
                            display: flex;
                            font-family: "Roboto", sans-serif;
                            font-size: 15px;
                            height: 56px;
                            justify-content: space-between;
                            padding: 0 32px;
                            position: relative;
                            text-decoration: none;
                            transition: all 0.2s;
                            width: 200px;
                        }
                        .offerings-button:hover {
                            box-shadow: 0 1px 5px #777;
                            cursor: pointer;
                        }
                    `}</style>
                </ParallaxBanner>
            );
        }
    }
);
