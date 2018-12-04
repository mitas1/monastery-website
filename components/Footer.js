import React from "react";
import { CONTENT_WIDTH } from "../constants";
import { translate } from "react-i18next";

export default translate(["common"])(({ t }) => (
    <footer className="footer-container">
        <div className="footer-wrapper">
            <div className="footer-table">
                <h1 className="heading">{t("footer.title")}</h1>
                <div className="row">
                    <div className="column">
                        <h2 className="subheading">
                            {t(`footer.workdays.title`)}
                        </h2>
                        {t(`footer.workdays.elems`).map((elem, index) => (
                            <div className="inner-row" key={index}>
                                <span className="time">{elem.time}</span>
                                <span className="title">{elem.title}</span>
                            </div>
                        ))}
                    </div>
                    <div className="column">
                        <h2 className="subheading">
                            {t(`footer.holidays.title`)}
                        </h2>
                        {t(`footer.holidays.elems`).map((elem, index) => (
                            <div className="inner-row" key={index}>
                                <span className="time">{elem.time}</span>
                                <span className="title">{elem.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="footer">
            <div className="footer-wrapper bottom">
                <span>2018 / benediktinky.sk</span>
                <span>
                    Oficiálna stránka benediktínskeho kláštora v Horných Orešanoch
                </span>
            </div>
        </div>
        <style jsx>{`
            .footer-container {
                color: #fff;
                background-image: url("/static/images/footer2.png");
                background-size: cover;
                overflow: auto;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .footer-wrapper {
                width: ${CONTENT_WIDTH};
                margin: 0 auto;
            }
            .footer-wrapper.bottom {
                display: flex;
                height: 65px;
                justify-content: space-between;
                align-items: center;
            }
            .footer-wrapper.bottom span {
                font-size: 12px;
            }
            .footer-table {
                margin: 0 0 160px 390px;
                font-family: "Roboto", sans-serif;
            }
            .heading {
                margin: 130px 0 100px 0;
                color: #fff;
                font-family: "Roboto", sans-serif;
                font-weight: 300;
                font-size: 50px;
            }
            .subheading {
                font-size: 12px;
                text-transform: uppercase;
                margin: 0 0 60px;
                color: rgba(255, 255, 255, 0.8);
            }
            .row {
                display: flex;
                flex-direction: row;
            }
            .column {
                flex: 1;
                border-right: 1px dotted rgba(255, 255, 255, 0.5);
                margin-right: 30px;
            }
            .column:last-child {
                border-right: none;
                margin-right: none;
            }
            .inner-row {
                line-height: 30px;
            }
            .time {
                font-size: 17px;
                width: 100px;
                display: inline-block;
                font-weight: 700;
                font-family: "Roboto", sans-serif;
            }
            .title {
                font-size: 15px;
            }
            .footer {
                border-top: 1px solid rgba(255, 255, 255, 0.2);
                color: rgba(255, 255, 255, 0.7);
            }
        `}</style>
    </footer>
));
