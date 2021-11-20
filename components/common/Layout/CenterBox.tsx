import { FC } from 'react';

import classNames from 'classnames';

interface CenterBoxProps {
    rootClassName?: string;
    className?: string;
    layout?: "full" | "text";
}

const CenterBox: FC<CenterBoxProps> = ({
    rootClassName,
    className,
    layout,
    children,
}) => (
    <div className={rootClassName}>
        <div
            className={classNames(className, "m-auto max-w-6xl", {
                "px-8 py-10  sm:pl-[480px]": layout === "text",
            })}
        >
            {children}
        </div>
    </div>
);

export default CenterBox;
