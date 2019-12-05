import React from "react";

import Drawer from "@material/react-drawer";


import Header from "../components/Header";
import Footer from "./Footer";
import Menu from "./Menu";

import "@material/react-drawer/dist/drawer.css";

export default ({ children, header, footer }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="content">
            <Drawer
                modal
                open={open}
                onClose={() => setOpen(false)}
                className="drawer"
            >
                <Menu smartphone closeDrawer={() => setOpen(false)} />
            </Drawer>
            <Header {...header} handleDrawer={() => setOpen(!open)} />
            {children}
            <Footer {...footer} />
            <style jsx>{`
                .content {
                    background-color: #fff;
                    display: block;
                    position: relative;
                    top: 0;
                }
                .drawer {
                    top: 0;
                }
            `}</style>
            <style global jsx>
                {`
                    * {
                        margin: 0;
                        padding: 0;
                    }
                    body {
                        background: #fafafa;
                        font-family: "Roboto", sans-serif;
                    }
                    #nprogress {
                        pointer-events: none;
                        position: relative;
                        z-index: 9999999;
                    }

                    #nprogress .bar {
                        background: #29d;
                        height: 2px;
                        left: 0;
                        position: fixed;
                        top: 0;
                        width: 100%;
                        z-index: 3;
                    }

                    #nprogress .peg {
                        -ms-transform: rotate(3deg) withNamespaces(0px, -4px);
                        -webkit-transform: rotate(3deg)
                            withNamespaces(0px, -4px);
                        box-shadow: 0 0 10px #29d, 0 0 5px #29d;
                        display: block;
                        height: 100%;
                        opacity: 1;
                        position: absolute;
                        right: 0px;
                        transform: rotate(3deg) withNamespaces(0px, -4px);
                        width: 100px;
                        z-index: 3;
                    }
                `}
            </style>
        </div>
    );
};
