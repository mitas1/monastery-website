import React from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import Menu, { NavLink } from './Menu';
import { LANGUAGES, LANGUAGES_LABELS } from '../constants';
import { CONTENT_WIDTH } from '../constants';
import Image from 'next/image';

export interface HeaderProps {
    addTopListener: boolean;
    handleDrawer: () => void;
}

const Header = ({ addTopListener, handleDrawer }: HeaderProps) => {
    const { t, lang } = useTranslation('common');

    const [isTop, setIsTop] = React.useState(false);

    const handleScroll = () => {
        setIsTop(window.scrollY < 200);
    };

    React.useEffect(() => {
        if (addTopListener) {
            document.addEventListener('scroll', handleScroll);

            handleScroll();

            return () => {
                document.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    const otherLanguage = LANGUAGES.filter((_lang) => _lang != lang)[0];

    return (
        <div className={isTop ? 'wrapper top' : 'wrapper'}>
            <header className="header">
                <Link href="/">
                    <a className="title">benediktinky.sk</a>
                </Link>
                <nav className="menu">
                    <Menu inverse={isTop} />
                    <div className="spacer" />
                    {LANGUAGES.map((_lang, key) => (
                        <NavLink
                            href="/"
                            key={key}
                            inverse={isTop}
                            active={_lang === lang}
                            locale={_lang}
                            label={LANGUAGES_LABELS[_lang]}
                        />
                    ))}
                </nav>
                <div className="small-menu">
                    <Link href="/" locale={otherLanguage}>
                        <a className="small-language">
                            {LANGUAGES_LABELS[otherLanguage]}
                        </a>
                    </Link>
                    <a onClick={handleDrawer}>
                        <Image width={24} height={24} alt={t('burger_menu')} src="/images/menu.svg" />
                    </a>
                </div>
            </header>
            <style jsx>{`
                .wrapper {
                    background-color: #fff;
                    border-bottom: 1px solid #ecedee;
                    position: fixed;
                    top: 0;
                    transition: all 0.2s;
                    width: 100%;
                    z-index: 2;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    height: 80px;
                    align-items: center;
                    box-sizing: border-box;
                    margin: 0 auto;
                    width: 100%;
                    padding: 0 24px;
                }
                .title {
                    color: #000;
                    font-family: 'Martel', serif;
                    font-weight: 600;
                    letter-spacing: 0.06em;
                    font-size: 16px;
                    font-weight: 700;
                    text-decoration: none;
                }
                .spacer {
                    background-color: #ecedee;
                    height: 18px;
                    margin: 31px 10px;
                    width: 1px;
                }
                .small-language {
                    text-decoration: none;
                    color: #000;
                    line-height: 24px;
                    margin: 0 16px 0;
                    padding: 0 16px;
                    border-right: 1px solid rgba(0, 0, 0, 0.3);
                }
                .menu {
                    display: none;
                }
                .small-menu {
                    display: flex;
                }

                @media screen and (min-width: 992px) {
                    .wrapper.top {
                        background-color: transparent;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    }
                    .top .title {
                        color: #fff;
                    }
                    .menu {
                        display: flex;
                        float: right;
                        font-size: 14px;
                        height: 80px;
                    }
                    .small-menu {
                        display: none;
                    }
                    .header {
                        width: ${CONTENT_WIDTH};
                    }
                }
            `}</style>
        </div>
    );
};

export default Header;
