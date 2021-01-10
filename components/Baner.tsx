import useTranslation from 'next-translate/useTranslation';

import { CONTENT_WIDTH } from '../constants';
import Button from './Button';
import Image from 'next/image';

const Baner = () => {
    const { t } = useTranslation('index');

    return (
        <section className="hero">
            <Image
                src="/images/background.jpg"
                alt="hero image"
                className="hero-image"
                layout="fill"
                objectFit="cover"
            />
            <div className="wrapper">
                <h1 className="heading">
                    <span>{t('offerings.title.firstLine')}</span>
                    <br />
                    <span>{t('offerings.title.secondLine')}</span>
                </h1>

                <Button
                    href="/offerings"
                    secondary
                    icon={
                        <Image
                            alt="arrow right"
                            src="/images/arrow.svg"
                            width={20}
                            height={8}
                        />
                    }
                >
                    {t('offerings.readMore')}
                </Button>
            </div>

            <style jsx>{`
                .hero {
                    height: 700px;
                    width: 100%;
                    position: relative;
                    overflow: hidden;
                    background-color: #72695f;
                }
                .hero-image {
                    height: 700px;
                    width: 100%;
                }
                .wrapper {
                    width: 100%;
                    position: relative;
                    padding: 204px 48px 24px 48px;
                    box-sizing: border-box;
                }
                .heading {
                    color: #fff;
                    position: relative;
                    font-family: 'Martel', serif;
                    font-weight: 600;
                    box-sizing: border-box;
                    font-size: 30px;
                    margin: 0 0 48px;
                }
                .heading span:last-child {
                    font-size: 55px;
                    line-height: 1.1;
                }
                @media screen and (min-width: 992px) {
                    .wrapper {
                        width: ${CONTENT_WIDTH};
                        margin: 0 auto;
                        padding: 250px 0 70px 0;
                    }
                    .heading {
                        color: #fff;
                        font-size: 30px;
                        font-weight: 600;
                        line-height: 1.3;
                        width: 900px;
                    }
                    .heading span:last-child {
                        font-size: 60px;
                        line-height: 1.1;
                    }
                }
            `}</style>
        </section>
    );
};

export default Baner;
