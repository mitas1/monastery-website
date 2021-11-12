import React from 'react';

import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';

import {
  LANGUAGES,
  LANGUAGES_LABELS,
} from '../constants';
import Menu, { NavLink } from './Menu';

export interface THeaderProps {
    addTopListener: boolean;
    handleDrawer: () => void;
}

const Header = ({ addTopListener, handleDrawer }: THeaderProps) => {
    const { t, lang } = useTranslation('common');

    const [isTop, setIsTop] = React.useState(false);

    const handleScroll = () => {
        setIsTop(window.scrollY < 200);
    };

    React.useEffect(() => {
        if (addTopListener) {
            document.addEventListener('scroll', handleScroll);

            handleScroll();

            return () => {
                document.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    const otherLanguage = LANGUAGES.filter((_lang) => _lang != lang)[0];

    return (
        <div className={isTop ? 'wrapper top' : 'wrapper'}>
            <header className="header">
                <Link href="/">
                    <a className="title">benediktinky.sk</a>
                </Link>
                <nav className="menu">
                    <Menu inverse={isTop} />
                    <div className="spacer" />
                    {LANGUAGES.map((_lang, key) => (
                        <NavLink
                            href="/"
                            key={key}
                            inverse={isTop}
                            active={_lang === lang}
                            locale={_lang}
                            label={LANGUAGES_LABELS[_lang]}
                        />
                    ))}
                </nav>
                <div className="small-menu">
                    <Link href="/" locale={otherLanguage}>
                        <a className="small-language">
                            {LANGUAGES_LABELS[otherLanguage]}
                        </a>
                    </Link>
                    <a onClick={handleDrawer}>
                        <Image width={24} height={24} alt={t('burger_menu')} src="/images/menu.svg" />
                    </a>
                </div>
            </header>
        </div>
    );
};

export default Header;
