import React from "react";
import { withTranslation, Link } from "../lib/i18n";
import { useRouter } from "next/router";

import { LANGUAGES, LANGUAGES_LABELS } from "../constants";
import { CONTENT_WIDTH } from "../constants";

const Header = ({ addTopListener, t, i18n }) => {
    const [isTop, setIsTop] = React.useState(false);

    const { pathname } = useRouter(null);

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

    return (
        <div className={isTop ? "header-wrapper top" : "header-wrapper"}>
            <header className="header">
                <Link href="/">
                    <a className="title">benediktinky.sk</a>
                </Link>
                <nav className="menu">
                    <Link href="/">
                        <a
                            className={
                                pathname === "/" ? "link active" : "link"
                            }
                        >
                            {t("home")}
                        </a>
                    </Link>
                    <Link href="/offerings">
                        <a
                            className={
                                pathname === "/offerings"
                                    ? "link active"
                                    : "link"
                            }
                        >
                            {t("offerings")}
                        </a>
                    </Link>
                    <Link href="/announcements">
                        <a
                            className={
                                pathname === "/announcements"
                                    ? "link active"
                                    : "link"
                            }
                        >
                            {t("announcements")}
                        </a>
                    </Link>
                    <Link href="/contact">
                        <a
                            className={
                                pathname === "/contact" ? "link active" : "link"
                            }
                        >
                            {t("contact")}
                        </a>
                    </Link>
                    <div className="spacer" />
                    {LANGUAGES.map((lang, key) => (
                        <a
                            key={key}
                            onClick={() => i18n.changeLanguage(lang)}
                            className={
                                lang === i18n.language ? "link active" : "link"
                            }
                        >
                            {LANGUAGES_LABELS[lang]}
                        </a>
                    ))}
                </nav>
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
                .link {
                    align-items: center;
                    color: #666666;
                    cursor: pointer;
                    display: flex;
                    font-family: "Roboto", sans-serif;
                    font-weight: 500;
                    height: 80px;
                    padding: 0 18px;
                    text-decoration: none;
                    transition: color 0.5s ease;
                }
                .link.active {
                    border-bottom: 1px solid #0c1a24;
                    color: #000;
                }
                .top .link.active {
                    border-bottom: 1px solid #fff;
                }
                .top .link {
                    color: #fff;
                }
                .link:hover {
                    color: #29d;
                }
                .spacer {
                    background-color: #ecedee;
                    height: 18px;
                    margin: 31px 10px;
                    width: 1px;
                }
            `}</style>
        </div>
    );
};

export default withTranslation("header")(Header);
