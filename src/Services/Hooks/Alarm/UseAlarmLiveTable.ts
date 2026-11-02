import { useState, useEffect, useCallback, useRef } from 'react';
import AlarmLiveTableAPI from '../../../api/Alarm/AlarmLiveTableAPI';

interface APIData {
    column : string[];
    dataFromAPI : string[][]; 
  }

const UseAlarmLiveTable = (searchDev: object, timeWindow: { startTs: number, endTs: number, aggregate: string, interval: number }, refresh : number, plant? : boolean) => {
    const [data, setData] = useState<APIData[] | null>(null);

    const fetchTelemetryData = useCallback(async () => {

        try {
            const response = await AlarmLiveTableAPI(searchDev, timeWindow, plant);
            setData(response?.data);
        } catch (error) {
            console.error('Error fetching telemetry data:', error);
        }
    }, [timeWindow, refresh]);

    useEffect(() => {
        
        fetchTelemetryData();
        
        // const interval = setInterval(fetchTelemetryData, 290000); // 5-minute interval
        // return () => clearInterval(interval);
    }, [fetchTelemetryData]);

    return data;
};

export default UseAlarmLiveTable;
