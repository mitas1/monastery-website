import {
    ComponentProps,
    FC,
} from 'react';

const DownloadLink: FC<Omit<ComponentProps<'a'>, 'className'>> = ({
    children,
    ...linkProps
}) => (
    <a
        className="bg-blue-500 text-white px-8 py-4 rounded inline-flex items-center space-x-2"
        {...linkProps}
    >
        <img className="w-4 h-4 ml-[-5px]" src="/images/download.svg" />
        <span>{children}</span>
    </a>
);

export default DownloadLink;
