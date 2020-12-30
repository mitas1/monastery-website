import React from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import Menu, { NavLink } from './Menu';
import { LANGUAGES, LANGUAGES_LABELS } from '../constants';
import { CONTENT_WIDTH } from '../constants';

const Header = ({ addTopListener, handleDrawer }) => {
    const { t, lang } = useTranslation('common');

    const { pathname } = useRouter(null);

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
        <div className={isTop ? 'header-wrapper top' : 'header-wrapper'}>
            <header className="header">
                <Link href="/">
                    <a className="title">benediktinky.sk</a>
                </Link>
                <nav className="menu">
                    <Menu t={t} inverse={isTop} />
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
                <div className="smartphone-menu">
                    <Link href="/" locale={otherLanguage}>
                        <a className="smartphone-language">
                            {LANGUAGES_LABELS[otherLanguage]}
                        </a>
                    </Link>
                    <a onClick={handleDrawer}>
                        <img src="/images/menu.svg" />
                    </a>
                </div>
            </header>
            <style jsx>{`
                .header-wrapper {
                    background-color: #fff;
                    border-bottom: 1px solid #ecedee;
                    position: fixed;
                    top: 0;
                    transition: all 0.2s;
                    width: 100%;
                    z-index: 1;
                }
                .header-wrapper.top {
                    background-color: transparent;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                }
                .header {
                    align-items: center;
                    box-sizing: border-box;
                    display: flex;
                    height: 80px;
                    justify-content: space-between;
                    margin: 0 auto;
                    width: ${CONTENT_WIDTH};
                    z-index: 1;
                }
                .top .title {
                    color: #fff;
                }
                .title {
                    color: #000;
                    font-family: 'Martel', serif;
                    font-size: 16px;
                    font-weight: 900;
                    text-decoration: none;
                }
                .menu {
                    display: flex;
                    float: right;
                    font-size: 14px;
                    height: 80px;
                }
                .spacer {
                    background-color: #ecedee;
                    height: 18px;
                    margin: 31px 10px;
                    width: 1px;
                }
                .smartphone-menu {
                    display: none;
                }
                @media screen and (max-width: 992px) {
                    .header {
                        width: 100%;
                        padding: 0 24px;
                    }
                    .menu {
                        display: none;
                    }
                    .smartphone-menu {
                        display: flex;
                    }
                    .smartphone-language {
                        text-decoration: none;
                        color: #000;
                        line-height: 24px;
                        margin: 0 16px 0;
                        padding: 0 16px;
                        border-right: 1px solid rgba(0, 0, 0, 0.3);
                    }
                    .header-wrapper.top {
                        background-color: #fff;
                    }
                    .top .title {
                        color: #000;
                    }
                }
            `}</style>
        </div>
    );
};

export default Header;
