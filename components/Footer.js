import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import { CONTENT_WIDTH } from '../constants';

export default ({ background }) => {
    const { t } = useTranslation('common');

    return (
        <footer
            className={
                background ? 'footer-container background' : 'footer-container'
            }
        >
            {background && (
                <div className="footer-wrapper">
                    <div className="footer-table">
                        <h1 className="heading">{t('footer.title')}</h1>
                        <div className="row">
                            <div className="column">
                                <h2 className="subheading">
                                    {t('footer.workdays.title')}
                                </h2>
                                {t('footer.workdays.elems', {}, { returnObjects: true }).map((elem, index) => (
                                    <div className="inner-row" key={index}>
                                        <span className="time">
                                            {elem.time}
                                        </span>
                                        <span className="title">
                                            {elem.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="column">
                                <h2 className="subheading">
                                    {t('footer.holidays.title')}
                                </h2>
                                {t('footer.holidays.elems', {}, { returnObjects: true }).map((elem, index) => (
                                    <div className="inner-row" key={index}>
                                        <span className="time">
                                            {elem.time}
                                        </span>
                                        <span className="title">
                                            {elem.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="footer">
                <div className="footer-wrapper bottom">
                    <span>2018 / benediktinky.sk</span>
                    <span>{t('footer.official')}</span>
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
                    background-image: url('/images/footer.jpg');
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
                    font-family: 'Roboto', sans-serif;
                }
                .heading {
                    color: #fff;
                    font-family: 'Martel', serif;
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
                    font-family: 'Roboto', sans-serif;
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
                @media screen and (max-width: 992px) {
                    .footer-wrapper {
                        width: 100%;
                    }
                    .footer-table {
                        margin: 0;
                        padding: 24px 0;
                    }
                    .row {
                        flex-direction: column;
                    }
                    .heading {
                        margin: 24px 24px 0 24px;
                        font-size: 36px;
                    }
                    .subheading {
                        font-size: 16px;
                        margin: 0 0 8px;
                    }
                    .column {
                        margin: 8px 24px 24px;
                        border-right: none;
                    }
                    .footer-wrapper.bottom {
                        flex-direction: column;
                        justify-content: center;
                        padding: 16px 24px;
                        height: auto;
                        box-sizing: border-box;
                        text-align: center;
                    }
                    .footer-wrapper.bottom span {
                        margin: 0;
                        padding: 0;
                    }
                }
            `}</style>
        </footer>
    );
};
