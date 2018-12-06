import path from "path";
import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import Link from "next/link";
import { withRouter } from "next/router";

import { LANGUAGES, LANGUAGES_LABELS } from "../constants";
import { CONTENT_WIDTH } from "../constants";

export default withRouter(
    withNamespaces(["common"])(
        class Header extends Component {
            constructor(props) {
                super(props);
                this.handleScroll = this.handleScroll.bind(this);
            }
            state = {
                isTop: false
            };
            handleScroll() {
                this.setState({ isTop: window.scrollY < 200 });
            }
            componentDidMount() {
                if (this.props.addTopListener) {
                    document.addEventListener("scroll", this.handleScroll);
                    this.handleScroll();
                }
            }
            componentWillUnmount() {
                if (this.props.addTopListener) {
                    document.removeEventListener("scroll", this.handleScroll);
                }
            }
            render() {
                const {
                    t,
                    i18n,
                    router: { pathname }
                } = this.props;

                const { language } = i18n;

                return (
                    <div
                        ref={r => (this.header = r)}
                        className={
                            this.state.isTop
                                ? "header-wrapper top"
                                : "header-wrapper"
                        }
                    >
                        <header className="header">
                            <Link
                                href={{
                                    pathname: "/",
                                    query: { lng: language }
                                }}
                                as={{ pathname: "/" }}
                            >
                                <a className="title">benediktinky.sk</a>
                            </Link>
                            <nav className="menu">
                                <Link
                                    href={{
                                        pathname: "/",
                                        query: { lng: language }
                                    }}
                                    as={{ pathname: "/" }}
                                >
                                    <a
                                        className={
                                            pathname === "/"
                                                ? "link active"
                                                : "link"
                                        }
                                    >
                                        {t("home")}
                                    </a>
                                </Link>
                                <Link
                                    href={{
                                        pathname: "/collection",
                                        query: { lng: language }
                                    }}
                                    as={{ pathname: "/collection" }}
                                >
                                    <a
                                        className={
                                            pathname === "/collection"
                                                ? "link active"
                                                : "link"
                                        }
                                    >
                                        {t("collection")}
                                    </a>
                                </Link>
                                <Link
                                    href={{
                                        pathname: "/contact",
                                        query: { lng: language }
                                    }}
                                    as={{ pathname: "/contact" }}
                                >
                                    <a
                                        className={
                                            pathname === "/contact"
                                                ? "link active"
                                                : "link"
                                        }
                                    >
                                        {t("contact")}
                                    </a>
                                </Link>
                                <div className="spacer" />
                                {LANGUAGES.map(lang => (
                                    <Link
                                        key={lang}
                                        href={{
                                            pathname: pathname,
                                            query: { lng: lang }
                                        }}
                                        as={{
                                            pathname: path.join(pathname, lang)
                                        }}
                                    >
                                        <a
                                            className={
                                                lang === language
                                                    ? "link active"
                                                    : "link"
                                            }
                                        >
                                            {LANGUAGES_LABELS[lang]}
                                        </a>
                                    </Link>
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
                                border-bottom: 1px solid
                                    rgba(255, 255, 255, 0.2);
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
            }
        }
    )
);
