import 'moment/locale/sk';

import moment from 'moment';

export const formatDate = (date, locale = "en") =>
    moment(date).locale(locale).format("LL");

export const isPathActive = (path: string, currentPath: string): boolean => {
    if (path == "/") {
        return path === currentPath;
    }

    if (path === "/post/announcements/latest") {
        return currentPath.startsWith("/post/announcements");
    }

    return currentPath.startsWith(path);
};
