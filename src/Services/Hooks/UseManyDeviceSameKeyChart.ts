import { useState, useEffect, useCallback, useRef } from 'react';
import ManyDeviceSameKeyChartAPI from '../../api/ManyDeviceSameKeyChartAPI';

const UseManyDeviceSameKeyChart = (searchTag: Object, timeWindow: { startTs: number, endTs: number, aggregate: string, interval: number }, lastValue? : boolean) => {
    const [data, setData] = useState<Object[] | null>(null);

    const fetchTelemetryData = useCallback(async () => {

        try {
            const response = await ManyDeviceSameKeyChartAPI(searchTag, timeWindow, lastValue);
            setData(response?.data);
        } catch (error) {
            console.error('Error fetching telemetry data:', error);
        }
    }, [timeWindow]);

    useEffect(() => {
        
        fetchTelemetryData();

    }, [fetchTelemetryData]);

    return data;
};

export default UseManyDeviceSameKeyChart;


export const UseManyDeviceSameKeyChartV2 = (searchTag: Object, timeWindow: { startTs: number, endTs: number, aggregate: string, interval: number }, lastValue? : boolean) => {
    const [data, setData] = useState<Object[] | null>(null);

    const fetchTelemetryDataFromTB = useCallback(async () => {

        try {
            const response = await ManyDeviceSameKeyChartAPI(searchTag, timeWindow, lastValue);
            setData(response?.data);
        } catch (error) {
            console.error('Error fetching telemetry data:', error);
        }
    }, [timeWindow]);

    // useEffect(() => {
        
    //     fetchTelemetryDataFromTB();

    // }, [fetchTelemetryDataFromTB]);

    return {data, fetchTelemetryDataFromTB};
};