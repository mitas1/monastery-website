import { FC } from 'react';

import classNames from 'classnames';

interface GridProps {
    type?: "vertical" | "horizontal";
    className?: string;
    divide?: boolean;
}

const Grid: FC<GridProps> = ({
    type = "horizontal",
    divide,
    children,
    className,
}) => (
    <div
        className={classNames(className, {
            "p-8 space-y-10 sm:space-y-0 sm:flex sm:flex-row sm:space-x-10 sm:ml-[-4.5rem]":
                type === "horizontal",
            "sm:divide-x sm:divide-dotted": divide,
        })}
    >
        {children}
    </div>
);

export default Grid;
