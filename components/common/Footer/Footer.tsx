import { FC } from 'react';

import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';

import { ExternalLink } from '@components/ui/Link';
import footerImage from '@public/images/footer.jpg';

import { CenterBox } from '../';

export interface FooterProps {
    type?: 'simple' | 'timesheets';
}

type TimeSheetElement = { time: string; title: string };

const Footer: FC<FooterProps> = ({ type = 'simple' }) => {
    const { t } = useTranslation('common');

    const renderTimeSheetsTable = (tHead, tBody) => {
        return (
            <table className="table-fixed text-left">
                <thead>
                    <tr>
                        <th className="uppercase py-3" colSpan={3}>
                            {t(tHead)}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {(
                        t(
                            tBody,
                            {},
                            { returnObjects: true }
                        ) as TimeSheetElement[]
                    ).map((elem, index) => (
                        <tr key={`td-${index}`}>
                            <td className="w-24 font-bold">{elem.time}</td>
                            <td>{elem.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <footer
            className={classNames('relative', {
                'text-white divide-y divide-white divide-opacity-25':
                    type === 'timesheets',
                'text-black': type === 'simple',
            })}
        >
            {type === 'timesheets' && (
                <>
                    <Image
                        src={footerImage}
                        alt="hero image"
                        className="hero-image"
                        layout="fill"
                        objectFit="cover"
                        placeholder="blur"
                    />
                    <section className="relative py-2 sm:py-20">
                        <CenterBox layout="text">
                            <h1 className="font-serif text-5xl pb-4">
                                {t('footer.title')}
                            </h1>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                {renderTimeSheetsTable(
                                    'footer.workdays.title',
                                    'footer.workdays.elems'
                                )}
                                {renderTimeSheetsTable(
                                    'footer.holidays.title',
                                    'footer.holidays.elems'
                                )}
                            </div>
                            <div className="h-1 my-4 w-1/4 border-t border-dashed" />
                            <ExternalLink href="https://www.horneoresany.sk/klastor/">
                                {t('footer.link')}
                            </ExternalLink>
                        </CenterBox>
                    </section>
                </>
            )}
            <CenterBox
                rootClassName="border-t relative border-white border-opacity-25"
                className={classNames(
                    'text-center relative text-xs px-8 py-4 sm:flex sm:justify-between sm:py-8',
                    {
                        'text-white text-opacity-50': type === 'timesheets',
                        'text-black text-opacity-50': type === 'simple',
                    }
                )}
            >
                <p>2021 / benediktinky.sk</p>
                <p>{t('footer.official')}</p>
            </CenterBox>
        </footer>
    );
};

export default Footer;
