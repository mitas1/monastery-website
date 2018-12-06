import React from "react";

import { CONTENT_WIDTH } from "../constants";

export default ({ children }) => (
    <div className={"content"}>
        {children}
        <style jsx>{`
            .content {
                width: ${CONTENT_WIDTH};
                margin: 0 auto;
            }
        `}</style>
    </div>
);
