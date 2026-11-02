import { useState, useEffect, useCallback, useRef } from 'react';
import ChartSeriesDataFromDBAPI from '../../../api/GetSeriesDataFromDB/ChartSeriesDataFromDBAPI';

const UseChartSeriesDataFromDB = (searchTag: Object, timeWindow: { startTs: number, endTs: number, aggregate: string, interval: number }, lastValue? : boolean) => {
    const [data, setData] = useState<Object[] | null>(null);

    const fetchTelemetryDataFromDB = useCallback(async () => {

        try {
            const response = await ChartSeriesDataFromDBAPI(searchTag, timeWindow, lastValue);
            setData(response?.data);
        } catch (error) {
            console.error('Error fetching telemetry data:', error);
        }
    }, []);

    useEffect(() => {
        
        fetchTelemetryDataFromDB();

    }, [fetchTelemetryDataFromDB]);

    return {data, fetchTelemetryDataFromDB};
};

export default UseChartSeriesDataFromDB;
