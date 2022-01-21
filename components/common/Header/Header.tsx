import React, {
    FC,
    useEffect,
    useState,
} from 'react';

import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';

import {
    CenterBox,
    Menu,
    NavLink,
} from '@components/common';
import {
    LANGUAGES,
    LANGUAGES_LABELS,
} from '@constants';

import styles from './Header.module.css';

export interface HeaderProps {
    transparent: boolean;
    handleDrawer(): void;
}

const Header: FC<HeaderProps> = ({ transparent, handleDrawer }) => {
    const { t, lang: currentLang } = useTranslation("common");

    const [isScrolledTop, setIsTop] = useState(false);

    const handleScroll = () => {
        setIsTop(window.scrollY < 200);
    };

    useEffect(() => {
        if (transparent) {
            document.addEventListener("scroll", handleScroll);

            handleScroll();

            return () => {
                document.removeEventListener("scroll", handleScroll);
            };
        }
    }, []);

    const otherLanguage = LANGUAGES.filter((lang) => lang != currentLang)[0];

    return (
        <header
            className={classNames(styles.header, {
                [styles.top]: isScrolledTop,
            })}
        >
            <CenterBox className="max-w-4xl m-auto items-center h-20 sm:h-24 justify-between flex">
                <Link href="/">
                    <a className="font-serif font-semibold tracking-wider">
                        benediktinky.sk
                    </a>
                </Link>
                <div className="hidden sm:flex space-x-2 h-full">
                    <Menu inverse={isScrolledTop} />
                    <div className="flex h-full items-center">
                        <div className="border-l h-6" />
                    </div>
                    <div className="space-x-2 px-4 flex items-center">
                        {LANGUAGES.map((lang, key) => (
                            <NavLink
                                href="/"
                                key={key}
                                inverse={isScrolledTop}
                                active={lang === currentLang}
                                locale={lang}
                            >
                                {LANGUAGES_LABELS[lang]}
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="flex sm:hidden divide-x space-x-4 items-center">
                    <Link href="/" locale={otherLanguage}>
                        <a>{LANGUAGES_LABELS[otherLanguage]}</a>
                    </Link>
                    <button
                        onClick={handleDrawer}
                        className="pl-4 flex items-center text-white"
                    >
                        <Image
                            width={24}
                            height={24}
                            alt={t("burger_img_alt")}
                            src="/images/menu.svg"
                        />
                    </button>
                </div>
            </CenterBox>
        </header>
    );
};

export default Header;
