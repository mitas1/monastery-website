import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';

import { CenterBox } from '@components/common';
import backgroundImage from '@public/images/background.jpg';

import styles from './Banner.module.css';

// TODO: Make this reusable

const Banner = () => {
    const { t } = useTranslation("index");

    return (
        <section className={styles.banner}>
            <Image
                src={backgroundImage}
                alt="Kláštor najsvätejšej Bohorodičky"
                layout="fill"
                objectFit="cover"
                placeholder="blur"
            />
            <CenterBox>
                <div className={styles.heading}>
                    <h1 className="text-6xl filter drop-shadow text-white font-light">
                        <span>{t("offerings.title.firstLine")}</span>
                        <br />
                        <span className="text-5xl">
                            {t("offerings.title.secondLine")}
                        </span>
                    </h1>
                </div>
            </CenterBox>
        </section>
    );
};

export default Banner;
