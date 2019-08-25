import React from "react";
import { withTranslation } from "../lib/i18n";

import { CONTENT_WIDTH } from "../constants";

export default withTranslation("footer")(({ background, t }) => {
    return (
        <footer
            className={
                background ? "footer-container background" : "footer-container"
            }
        >
            {background && (
                <div className="footer-wrapper">
                    <div className="footer-table">
                        <h1 className="heading">{t("title")}</h1>
                        <div className="row">
                            <div className="column">
                                <h2 className="subheading">
                                    {t("workdays.title")}
                                </h2>
                                
                            </div>
                            <div className="column">
                                <h2 className="subheading">
                                    {t("holidays.title")}
                                </h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="footer">
                <div className="footer-wrapper bottom">
                    <span>2018 / benediktinky.sk</span>
                    <span>{t("official")}</span>
                </div>
            </div>
            <style jsx>{`
                .footer-container {
                    border-top: 1px solid #ecedee;
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    overflow: auto;
                }
                .footer-container.background {
                    background-image: url("/static/images/footer.jpg");
                    background-size: cover;
                }
                .footer-wrapper {
                    width: ${CONTENT_WIDTH};
                    margin: 0 auto;
                }
                .footer-wrapper.bottom {
                    align-items: center;
                    color: #262626;
                    display: flex;
                    height: 65px;
                    justify-content: space-between;
                }
                .footer-container.background .footer-wrapper.bottom {
                    color: #fff;
                }
                .footer-wrapper.bottom span {
                    font-size: 12px;
                }
                .footer-table {
                    margin: 0 0 160px 390px;
                    font-family: "Roboto", sans-serif;
                }
                .heading {
                    color: #fff;
                    font-family: "Martel", serif;
                    font-size: 50px;
                    font-weight: 300;
                    margin: 130px 0 100px 0;
                }
                .subheading {
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 12px;
                    margin: 0 0 60px;
                    text-transform: uppercase;
                }
                .row {
                    display: flex;
                    flex-direction: row;
                }
                .column {
                    border-right: 1px dotted rgba(255, 255, 255, 0.5);
                    flex: 1;
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
                    display: inline-block;
                    font-family: "Roboto", sans-serif;
                    font-size: 17px;
                    font-weight: 700;
                    width: 100px;
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
    );
});
