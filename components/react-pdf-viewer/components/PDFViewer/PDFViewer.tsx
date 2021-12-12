import {
  CSSProperties,
  FC,
  useState,
} from 'react';

import classNames from 'classnames';
import {
  Document,
  Page,
  pdfjs,
} from 'react-pdf';

import {
  MinusIcon,
  PlusIcon,
  SearchIcon,
  WarningIcon,
} from '../../icons';
import { Button } from '../Button';
import { Spinner } from '../Spinner';
import styles from './PDFViewer.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export interface PDFViewerProps {
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
    rootClassName?: string;
    url: string;
    scale?: {
        initial: number;
        diff: number;
        max: number;
        min: number;
    };
}

const Loading = () => (
    <Spinner className="absolute top-0 bottom-0 right-0 left-0 m-auto" />
);

const ErrorMessage = () => (
    <div className="flex items-center justify-center flex-col text-gray-500 text-sm absolute top-0 bottom-0 right-0 left-0 m-auto space-y-2">
        <WarningIcon />
        <span>Failed to load PDF file.</span>
    </div>
);

const PDFViewer: FC<PDFViewerProps> = ({
    url,
    rootClassName,
    width = "800px",
    height = "600px",
    scale: scaleProps = { initial: 1.4, max: 1.6, min: 0.6, diff: 0.2 },
}) => {
    const [scale, setScale] = useState(scaleProps.initial);
    const [currentPage, setCurrentPage] = useState(1);
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
    }

    function handleScale(action: "reset" | "increase" | "decrease") {
        const { initial, max, min, diff } = scaleProps;

        setScale((scale) => {
            switch (action) {
                case "reset":
                    return initial;
                case "increase":
                    return scale < max ? round(scale + diff) : scale;
                case "decrease":
                    return scale > min ? round(scale - diff) : scale;
            }
        });
    }

    function handlePageChange(difference: 1 | -1) {
        setCurrentPage((page) => {
            if (difference === -1) {
                return page > 1 ? page - 1 : page;
            }
            return page < numPages ? page + 1 : page;
        });
    }

    return (
        <div
            className={classNames(rootClassName, styles.window)}
            style={{ width, height }}
        >
            <Document
                file={url}
                loading={<Loading />}
                onLoadSuccess={onDocumentLoadSuccess}
                options={{
                    cMapUrl: "cmaps/",
                    cMapPacked: true,
                }}
                error={<ErrorMessage />}
                className={styles.document}
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <Page
                        className={styles.page}
                        loading={<Loading />}
                        key={`page_${index + 1}`}
                        width={500 * scale}
                        pageNumber={index + 1}
                    />
                ))}
            </Document>
            {numPages && (
                <div className={styles.controlsWrapper}>
                    <div className={styles.controls}>
                        <Button
                            onClick={() => handleScale("decrease")}
                            icon={<MinusIcon />}
                        />
                        <Button
                            onClick={() => handleScale("reset")}
                            icon={<SearchIcon />}
                        />
                        <Button
                            onClick={() => handleScale("increase")}
                            icon={<PlusIcon />}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

function round(number: number) {
    return Math.round(number * 10) / 10;
}

export default PDFViewer;
