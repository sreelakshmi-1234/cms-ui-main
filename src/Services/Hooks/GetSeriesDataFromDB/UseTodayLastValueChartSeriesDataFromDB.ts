import { useState, useEffect, useCallback, useRef } from 'react';
import TodayLastValueChartSeriesDataFromDBAPI from '../../../api/GetSeriesDataFromDB/TodayLastValueChartSeriesDataFromDBAPI';

const UseTodayLastValueChartSeriesDataFromDB = (searchTag: Object, timeWindow: { startTs: number, endTs: number, aggregate: string, interval: number }) => {
    const [data, setData] = useState<any | null>(null);

    const fetchTelemetryDataFromDB = useCallback(async () => {

        try {
            const response = await TodayLastValueChartSeriesDataFromDBAPI(searchTag, timeWindow);
            setData(response?.data);
        } catch (error) {
            console.error('Error fetching telemetry data:', error);
        }
    }, []);

    // useEffect(() => {
        
    //     fetchTelemetryDataFromDB();

    // }, [fetchTelemetryDataFromDB]);

    return {data, fetchTelemetryDataFromDB} ;
};

export default UseTodayLastValueChartSeriesDataFromDB;
