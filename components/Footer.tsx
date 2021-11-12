import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';

import {
  ContentRight,
  Heading,
} from './Layout';

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
        </footer>
    );
};

export default Footer;
