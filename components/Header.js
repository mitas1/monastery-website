import React, { Component } from "react";
import path from "path";
import { translate } from "react-i18next";
import Link from "next/link";
import { withRouter } from "next/router";

import { LANGUAGES, LANGUAGES_LABELS } from "../constants";
import { CONTENT_WIDTH } from "../constants";

export default withRouter(
    translate(["common"])(
        class Header extends Component {
            state = {
                isTop: true
            };
            handleScroll() {
                this.setState({ isTop: window.scrollY < 200 });
            }
            componentDidMount() {
                window.addEventListener("scroll", this.handleScroll.bind(this));
            }
            componentWillUnMount() {
                // TODO remove scroll listener
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
                            <span className="title">benediktinky.sk</span>
                            <nav className="menu">
                                <Link
                                    href={{
                                        pathname: "/",
                                        query: { lng: language }
                                    }}
                                    as={{ pathname: "/" }}
                                >
                                    <a className="link active">{t("home")}</a>
                                </Link>
                                <Link
                                    href={{
                                        pathname: "/",
                                        query: { lng: language }
                                    }}
                                    as={{ pathname: "/" }}
                                >
                                    <a className="link">{t("aboutUs")}</a>
                                </Link>
                                <Link
                                    href={{
                                        pathname: "/collection",
                                        query: { lng: language }
                                    }}
                                    as={{ pathname: "/collection" }}
                                >
                                    <a className="link">{t("collection")}</a>
                                </Link>
                                {LANGUAGES.map(lang => (
                                    <Link
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
                                width: 100%;
                                position: fixed;
                                top: 0;
                                z-index: 1;
                                transition: all 0.2s;
                                border-bottom: 1px solid
                                    rgba(255, 255, 255, 0.2);
                                background-color: rgba(255, 255, 255, 0.7);
                            }
                            .header-wrapper.top {
                                background-color: transparent;
                            }
                            .header {
                                width: ${CONTENT_WIDTH};
                                margin: 0 auto;
                                box-sizing: border-box;
                                z-index: 1;
                                height: 80px;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                            }
                            .title {
                                font-size: 14px;
                                font-family: "Roboto", sans-serif;
                                color: #fff;
                            }
                            .menu {
                                float: right;
                                font-size: 14px;
                                display: flex;
                                height: 80px;
                            }
                            .link {
                                padding: 0 18px;
                                height: 80px;
                                align-items: center;
                                display: flex;
                                text-decoration: none;
                                cursor: pointer;
                                color: #000;
                                font-weight: 400;
                                font-family: "Roboto", sans-serif;
                                transition: color 0.5s ease;
                            }
                            .link.active {
                                border-bottom: 1px solid #fff;
                            }
                            .top .link {
                                color: #fff;
                            }
                            .link:hover {
                                color: #29d;
                            }
                        `}</style>
                    </div>
                );
            }
        }
    )
);
