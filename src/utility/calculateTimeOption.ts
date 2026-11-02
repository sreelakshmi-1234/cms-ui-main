import { toZonedTime, fromZonedTime } from "date-fns-tz";
import { startOfDay, startOfWeek, startOfMonth, subDays } from "date-fns";

/* -------------------------------------------------------------------------- */
/*                               Time Constants                               */
/* -------------------------------------------------------------------------- */
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const QUATER = 3 * MONTH;
const YEAR = 4 * QUATER;

/* -------------------------------------------------------------------------- */
/*                               Utility Function                             */
/* -------------------------------------------------------------------------- */
export const calculateTimeOption = (count: number, interval: string): number => {
    const timeZone = localStorage.getItem("SelectedTimezone") || 'Asia/Colombo';

    const now = new Date();

    // Convert current UTC time to selected timezone
    const zonedNow = toZonedTime(now, timeZone);

    switch (interval) {
        case "seconds":
            return count * SECOND;
        case "minute":
            return count * MINUTE;
        case "hour":
            return count * HOUR;
        case "day":
            return count * DAY;
        case "week":
            return count * WEEK;
        case "month":
            return count * MONTH;

        /* ------------------------- Current Day Start ------------------------- */
        case "cdsf": {
            const start = startOfDay(zonedNow);
            return fromZonedTime(start, timeZone).getTime();
        }

        /* --------------------------- Yesterday Start -------------------------- */
        case "ydsf": {
        const yesterday = subDays(zonedNow, 1);
        const start = startOfDay(yesterday);
        return fromZonedTime(start, timeZone).getTime();
        }

        /* ------------------------- Current Week Start ------------------------- */
        case "cwsf": {
        const start = startOfWeek(zonedNow, { weekStartsOn: 1 }); // Monday start
        return fromZonedTime(start, timeZone).getTime();
        }

        /* ------------------------ Current Month Start ------------------------- */
        case "cmsf": {
        const start = startOfMonth(zonedNow);
        return fromZonedTime(start, timeZone).getTime();
        }

        default:
            return 5 * MINUTE;
    }
};