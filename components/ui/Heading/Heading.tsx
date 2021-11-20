import {
  createElement,
  FC,
} from 'react';

import classNames from 'classnames';

export interface HeadingProps {
    className?: string;
    level?: 1 | 2 | 3;
    size?: 1 | 2 | 3 | 4;
}

const Heading: FC<HeadingProps> = ({
    level = 1,
    size = 1,
    children,
    className,
}) =>
    createElement(
        `h${level}`,
        {
            className: classNames(
                "font-serif sm:leading-tight",
                {
                    "text-2xl sm:text-5xl": size === 1,
                    "text-xl": size === 2,
                    "text-lg": size === 3,
                    "text-xs uppercase font-sans font-semibold text-gray-600": size === 4,
                },
                className
            ),
        },
        children
    );

export default Heading;
