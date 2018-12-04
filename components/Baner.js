import { translate } from "react-i18next";
import { ParallaxBanner } from "react-scroll-parallax";
import { CONTENT_WIDTH } from "../constants";
import Link from "next/link";

export default translate(["index"])(
    class Baner extends React.Component {
        render() {
            const { language } = this.props.i18n;
            return (
                <ParallaxBanner
                    className="baner"
                    style={{
                        height: "700px"
                    }}
                    layers={[
                        {
                            image: "/static/images/back.png",
                            amount: 0.2,
                            slowerScrollRate: true
                        }
                    ]}
                >
                    <div className="collection-heading-wrapper">
                        <h1 className="collection-heading">
                            Zbierka na dokončenie kláštora
                        </h1>
                        <Link
                            href={{
                                pathname: "/collection",
                                query: { lng: language }
                            }}
                            as={{ pathname: "/collection" }}
                        >
                            <div className="collection-button">
                                <span>Viac o projekte</span>
                                <img src="/static/images/arrow.svg" />
                            </div>
                        </Link>
                    </div>
                    <style jsx>{`
                        .collection-heading-wrapper {
                            width: ${CONTENT_WIDTH};
                            margin: 0 auto;
                        }
                        .collection-heading {
                            padding: 250px 0 70px 0;
                            font-size: 50px;
                            font-weight: 300;
                            font-family: "Roboto", sans-serif;
                            color: #fff;
                            line-height: 1.3;
                            position: relative;
                        }
                        .baner {
                            height: 700px;
                        }
                        .collection-button {
                            width: 200px;
                            height: 56px;
                            border-radius: 3px;
                            padding: 0 32px;
                            text-decoration: none;
                            color: #0c1a24;
                            background-color: #fff;
                            display: flex;
                            position: relative;
                            align-items: center;
                            justify-content: space-between;
                            transition: all 0.2s;
                        }
                        .collection-button:hover {
                            box-shadow: 0 1px 5px #777;
                            cursor: pointer;
                        }
                    `}</style>
                </ParallaxBanner>
            );
        }
    }
);
