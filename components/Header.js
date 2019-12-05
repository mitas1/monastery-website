import React from "react";
import { withTranslation, Link } from "../lib/i18n";

import Menu, { NavLink } from "./Menu";
import { LANGUAGES, LANGUAGES_LABELS } from "../constants";
import { CONTENT_WIDTH } from "../constants";

const Header = ({ addTopListener, t, i18n, handleDrawer }) => {
    const [isTop, setIsTop] = React.useState(false);

    const handleScroll = () => {
        setIsTop(window.scrollY < 200);
    };

    React.useEffect(() => {
        if (addTopListener) {
            document.addEventListener("scroll", handleScroll);

            handleScroll();

            return () => {
                document.removeEventListener("scroll", handleScroll);
            };
        }
    }, []);

    const otherLanguage = LANGUAGES.filter((lang) => lang != i18n.language)[0];

    return (
        <div className={isTop ? "header-wrapper top" : "header-wrapper"}>
            <header className="header">
                <Link href="/">
                    <a className="title">benediktinky.sk</a>
                </Link>
                <nav className="menu">
                    <Menu t={t} inverse={isTop} />
                    <div className="spacer" />
                    {LANGUAGES.map((lang, key) => (
                        <NavLink
                            key={key}
                            inverse={isTop}
                            active={lang === i18n.language}
                            onClick={() => i18n.changeLanguage(lang)}
                            label={LANGUAGES_LABELS[lang]}
                        />
                    ))}
                </nav>
                <div className="smartphone-menu">
                    <a className="smartphone-language"
                        onClick={() => i18n.changeLanguage(otherLanguage)}>
                        {LANGUAGES_LABELS[otherLanguage]}
                    </a>
                    <a
                        onClick={handleDrawer}
                    >
                        <img src="/images/menu.svg"/>
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
                    font-family: "Martel", serif;
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
                        line-height: 24px;
                        margin: 0 16px 0;
                        padding: 0 16px;
                        border-right: 1px solid rgba(0,0,0,.3);
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

export default withTranslation("header")(Header);
