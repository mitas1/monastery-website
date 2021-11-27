import {
    ComponentProps,
    FC,
} from 'react';

const ExternalLink: FC<Omit<ComponentProps<'a'>, 'target' | 'className'>> = ({
    children,
    ...linkProps
}) => (
    <a
        className="text-white inline-flex items-center leading-5 border-b hover:text-opacity-80"
        target="_blank"
        {...linkProps}
    >
        {children}
        <img className="ml-1 w-4 h-4" src="/images/external.svg" />
    </a>
);

export default ExternalLink;
