import React from "react";

import { CONTENT_WIDTH } from "../constants";

export default ({ children }) => (
    <div>
        {children}
        <style jsx>{`
            width: ${CONTENT_WIDTH};
            margin: 0 auto;

            @media screen and (max-width: 992px) {
                width: 100%;
            }
        `}</style>
    </div>
);
