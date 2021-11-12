import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';

import Button from './Button';

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
        </section>
    );
};

export default Baner;
