import { FC } from 'react';

import styles from './Map.module.css';

const Map: FC = () => (
    <div className={styles.map}>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5290.7719196383005!2d17.448451!3d48.46831!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd34656e8201f7ce4!2zS2zDocWhdG9yIE5hanN2w6R0ZWrFoWVqIEJvaG9yb2RpxI1reQ!5e0!3m2!1sen!2ssk!4v1571779579264!5m2!1sen!2ssk"
            className={styles.iframe}
            frameBorder={0}
            allowFullScreen={true}
        ></iframe>
    </div>
);

export default Map;
