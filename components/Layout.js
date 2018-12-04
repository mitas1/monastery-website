import React from "react";
import Header from "../components/Header";

export default ({ children, ...other }) => (
    <div className="content">
        <Header {...other} />
        {children}
        <style jsx>{`
            .content {
                background-color: #fff;
                position: relative;
                display: block;
            }
        `}</style>
    </div>
);
