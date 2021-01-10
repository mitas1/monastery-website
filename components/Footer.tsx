import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';

import { CONTENT_WIDTH } from '../constants';
import { ContentRight, Heading } from './Layout';

export interface TFooterProps {
    background: boolean;
}

type TimeSheetElement = { time: string; title: string };

const Footer = ({ background }: TFooterProps) => {
    const { t } = useTranslation('common');

    return (
        <footer className={background ? 'wrapper background' : 'wrapper'}>
            {background && (
                <>
                    <Image
                        src="/images/footer.jpg"
                        alt="hero image"
                        className="hero-image"
                        layout="fill"
                        objectFit="cover"
                    />
                    <section className="section section-background">
                        <ContentRight>
                            <Heading>{t('footer.title')}</Heading>
                            <div className="row">
                                <div className="column">
                                    <h2 className="subheading">
                                        {t('footer.workdays.title')}
                                    </h2>
                                    {(t(
                                        'footer.workdays.elems',
                                        {},
                                        { returnObjects: true }
                                    ) as TimeSheetElement[]).map(
                                        (elem, index) => (
                                            <div
                                                className="inner-row"
                                                key={index}
                                            >
                                                <span className="time">
                                                    {elem.time}
                                                </span>
                                                <span className="title">
                                                    {elem.title}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="column">
                                    <h2 className="subheading">
                                        {t('footer.holidays.title')}
                                    </h2>
                                    {(t(
                                        'footer.holidays.elems',
                                        {},
                                        { returnObjects: true }
                                    ) as TimeSheetElement[]).map(
                                        (elem, index) => (
                                            <div
                                                className="inner-row"
                                                key={index}
                                            >
                                                <span className="time">
                                                    {elem.time}
                                                </span>
                                                <span className="title">
                                                    {elem.title}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </ContentRight>
                    </section>
                </>
            )}
            <hr className="hr" />
            <section className="section section-copyright">
                <span>2021 / benediktinky.sk</span>
                <span>{t('footer.official')}</span>
            </section>
            <style jsx>{`
                .wrapper {
                    color: #777;
                }
                .hero-image {
                    width: 100%;
                    height: 100%;
                }
                .hr {
                    border: none;
                    position: relative;
                    border-bottom: 1px solid #eee;
                }
                .wrapper.background {
                    color: #fff;
                    position: relative;
                    background-color: #1e1f1c;
                }
                .wrapper.background .hr {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
                }
                .wrapper.background .section-copyright {
                    color: rgba(255, 255, 255, 0.8);
                }
                .section {
                    position: relative;
                    padding: 24px;
                    box-sizing: border-box;
                }
                .subheading {
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 12px;
                    margin: 0 0 8px;
                    text-transform: uppercase;
                }
                .column {
                    margin: -8px 0 30px;
                }
                .inner-row {
                    line-height: 30px;
                }
                .time {
                    display: inline-block;
                    font-family: 'Roboto', sans-serif;
                    font-size: 17px;
                    font-weight: 500;
                    width: 100px;
                }
                .title {
                    font-size: 15px;
                }
                .section-copyright {
                    font-size: 12px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                }
                .section-background {
                    padding: 48px 24px;
                }
                @media screen and (min-width: 992px) {
                    .section {
                        width: ${CONTENT_WIDTH};
                        margin: 0 auto;
                    }
                    .section-copyright {
                        flex-direction: row;
                        justify-content: space-between;
                    }
                    .section-background {
                        padding: 100px 0 80px;
                    }
                    .row {
                        display: flex;
                        margin: 48px 0 0 0;
                    }
                    .column {
                        margin-right: 30px;
                        border-right: 1px dotted rgba(255, 255, 255, 0.5);
                        margin-right: 30px;
                        flex: 1;
                    }
                    .column:last-child {
                        border: none;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
