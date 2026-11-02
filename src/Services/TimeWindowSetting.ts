import { useState, useEffect } from 'react';
import { windowSetting } from '../components/Layouts/ChartLayouts/GraphLayout';
import { calculateTimeOption } from '../utility/calculateTimeOption';
import { formatInTimeZone, fromZonedTime, toZonedTime } from 'date-fns-tz';

// Time Setting Options
const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const week = 7 * day;
const month = 30 * day;
const quarter = 3 * month;
// const cdsf = new Date().getTime() - new Date().setHours(0, 0, 0, 0);
// const cmsf = new Date().getTime() - new Date(new Date().setDate(1)).setHours(0,0,0,0);

const timeOption = (count: number, interval: string) => {
    switch (interval) {
        case "seconds":
            return count * second;      // This is Last Day
        case "minute":
            return count * minute;      // This is Last Day
        case "hour":
            return count * hour;        // This is Last Day
        case "day":
            return count * day;         // This is Last Day
        case "week":
            return count * week;        // This is Last Day
        case "month":
            return count * month;       // This is Last Day
        case "quarter":
            return count * quarter;     // This is Last Day
        case "cdsf":
            return new Date().getTime() - new Date().setHours(0, 0, 0, 0); // cdsf
        case "cmsf":
            return new Date().getTime() - new Date(new Date().setDate(1)).setHours(0, 0, 0, 0); // cmsf
        default:
            return 5 * minute;
    }
};

interface TimeWindow {
    startTs: number;
    endTs: number;
    aggregate: string;
    interval: number;
}

export const useTimeHandle = (
    defaultCount: number,
    defaultInterval: string,
    defaultAggregate: string,
    defaultGroupInterval: [number, string],
    autoUpdateIntervalMs: number = 1000, // It will check every second to send API in 5 minutes
    onAutoUpdate?: (timeWindow: TimeWindow) => void
) => {
    const initTimeSetter = (
        count: number,
        intervalMS: string,
        aggregate: string,
        groupInterval: [number, string]
    ): TimeWindow => {
        const endTs = Date.now(); // Current time
        const startTs = endTs - timeOption(count, intervalMS); // Calculate start time
        const interval = timeOption(groupInterval[0], groupInterval[1]);
        return { startTs, endTs, aggregate, interval };
    };
    const [manualChanges, setManualChanges] = useState<boolean>(true);
    const [changedWithLive, setChangedWithLive] = useState<boolean>(false);
    const [aggregation, setAggregation] = useState<string>('AVG');
    const [windowSetting, setWindowSetting] = useState<windowSetting>();
    const [timeWindow, setTimeWindow] = useState<TimeWindow>(() =>
        initTimeSetter(defaultCount, defaultInterval, defaultAggregate, defaultGroupInterval)
    );

    const timeZone = localStorage.getItem("SelectedTimezone") || 'Asia/Colombo';
    const changedLiveTimeSetter = (aggregate: string, setting: windowSetting | undefined) : TimeWindow => {
        if(!setting) return initTimeSetter(defaultCount, defaultInterval, defaultAggregate, defaultGroupInterval);
        
        const resName = setting.live.timeResolutionName;

        const timeInterval = setting.live.intervalResolution;

        
        const endTs = resName == "Yesterday" ? calculateTimeOption(1, "cdsf") - 1 : timeInterval == (1000*60*60*24) ? new Date(formatInTimeZone(new Date().setHours(24, 0, 0, 0), timeZone, 'yyyy-MM-dd HH:mm:ss') + "Z").getTime() : Date.now();
        const startTs = resName == "Yesterday" ? setting.live.timeResolution : resName == "Current Day So Far" || resName == "Current Week So Far" || resName == "Current Month So Far" ? timeInterval == (1000*60*60*24) ? new Date(formatInTimeZone(setting.live.timeResolution, timeZone, 'yyyy-MM-dd HH:mm:ss') + "Z").getTime() : setting.live.timeResolution : endTs - setting.live.timeResolution;

        return {startTs, endTs, aggregate, interval: timeInterval }
    }


    const handleTimeWindowChange = (from: string, to: string, aggregate: string, interval: number, setting: windowSetting) => {
        if(setting.selectedTab == "live") {
            setTimeWindow(changedLiveTimeSetter(aggregate, setting));
            
            setAggregation(aggregate);
            setWindowSetting(setting);
            
            setChangedWithLive(false);
            setManualChanges(false);
        }

        if(setting.selectedTab == "history") {

            const timeInterval = setting.live.intervalResolution;

            const startTs = timeInterval == (1000*60*60*24) ? new Date(formatInTimeZone(new Date(from).getTime(), timeZone, 'yyyy-MM-dd HH:mm:ss') + "Z").getTime() :  new Date(from).getTime();
            const endTs = timeInterval == (1000*60*60*24) ? new Date(formatInTimeZone(new Date(to).getTime(), timeZone, 'yyyy-MM-dd HH:mm:ss') + "Z").getTime() : new Date(to).getTime();

            setTimeWindow({ startTs, endTs, aggregate, interval: timeInterval });
            
            setManualChanges(false);
            setChangedWithLive(true);
        }
    };

    const handleReset = () => {
        setManualChanges(true);
        setChangedWithLive(false);
        setTimeWindow(initTimeSetter(defaultCount, defaultInterval, defaultAggregate, defaultGroupInterval));
    };

    useEffect(() => {
        const getNearest5MinTimestamp = () => {
            const now = new Date();
            now.setSeconds(0);
            now.setMilliseconds(0);
            const minutes = Math.floor(now.getMinutes() / 5) * 5;
            now.setMinutes(minutes);
            return now.getTime();
        };

        const updateLastTime = () => {
            const alignedTime = getNearest5MinTimestamp();
            localStorage.setItem("lastUpdateTime", alignedTime.toString());
        };
        
        if(manualChanges) {

            updateLastTime(); // Set initial timestamp

            const FIVE_MINUTES = 1000 * 60 * 5;
    
    
            const checkAndReloadIfStale = () => {
                const lastUpdateTime = parseInt(localStorage.getItem("lastUpdateTime") || "0");
                const expectedUpdateTime = getNearest5MinTimestamp();
    
                if (Date.now() - lastUpdateTime >= FIVE_MINUTES) {
                    window.location.reload();
                } else {
                    updateLastTime();
                }
            };
    
            // Sync with the next exact 5-minute mark
            const now = new Date();
            const delayToNextUpdate =
                FIVE_MINUTES - (now.getTime() % FIVE_MINUTES);
    
            const timeoutId = setTimeout(() => {
                updateLastTime();
                const updated = changedWithLive ? changedLiveTimeSetter(aggregation, windowSetting) : initTimeSetter(defaultCount, defaultInterval, defaultAggregate, defaultGroupInterval);
                setTimeWindow(updated);

                if (onAutoUpdate) {
                    onAutoUpdate(updated);  // <-- call here for the first auto refresh
                }
    
                // After initial alignment, run every 5 minutes
                const intervalId = setInterval(() => {
                    updateLastTime();
                    const updated = changedWithLive ? changedLiveTimeSetter(aggregation, windowSetting) : initTimeSetter(defaultCount, defaultInterval, defaultAggregate, defaultGroupInterval);
                    setTimeWindow(updated);

                    if (onAutoUpdate) {
                        onAutoUpdate(updated);  // <-- call here for recurring updates
                    }
                }, FIVE_MINUTES);
    
                // Save interval ID to clear later
                (window as any).myIntervalId = intervalId;
            }, delayToNextUpdate);
    
            // Tab visibility event
            document.addEventListener("visibilitychange", checkAndReloadIfStale);
    
            return () => {
                clearTimeout(timeoutId);
                clearInterval((window as any).myIntervalId);
                document.removeEventListener("visibilitychange", checkAndReloadIfStale);
            };
        }
    }, [manualChanges, autoUpdateIntervalMs]);




    return {
        timeWindow,
        handleTimeWindowChange,
        handleReset,
        manualChanges
    };
};
