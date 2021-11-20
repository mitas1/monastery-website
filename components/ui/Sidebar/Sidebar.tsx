import {
  FC,
  useEffect,
  useRef,
} from 'react';

import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';
import classNames from 'classnames';

import styles from './Sidebar.module.css';

interface SidebarProps {
    children: any;
    onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ children, onClose }) => {
    const sidebarRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const contentRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const onKeyDownSidebar = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.code === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        if (sidebarRef.current) {
            sidebarRef.current.focus();
        }

        const contentElement = contentRef.current;

        if (contentElement) {
            disableBodyScroll(contentElement, { reserveScrollBarGap: true });
        }

        return () => {
            if (contentElement) enableBodyScroll(contentElement);
            clearAllBodyScrollLocks();
        };
    }, []);

    return (
        <div
            className={classNames(styles.root)}
            ref={sidebarRef}
            onKeyDown={onKeyDownSidebar}
            tabIndex={1}
        >
            <div className="absolute inset-0 overflow-hidden">
                <div className={styles.backdrop} onClick={onClose} />
                <section className="absolute inset-y-0 left-0 max-w-full flex outline-none">
                    <div className="h-full w-full md:w-screen md:max-w-md">
                        <div className={styles.sidebar} ref={contentRef}>
                            {children}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Sidebar;
