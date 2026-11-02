import { useState, useEffect, useCallback, useRef } from 'react';
import ManyDeviceManyKeysChartAPI from '../../api/ManyDeviceManyKeysChartAPI';

const UseManyDeviceManyKeysChart = (searchTag: Object[], timeWindow: { startTs: number, endTs: number, aggregate: string, interval: number }, LastValue? : string) => {
    const [data, setData] = useState<Object[] | null>(null);

    const fetchTelemetryData = useCallback(async () => {

        try {
            const response = await ManyDeviceManyKeysChartAPI(searchTag, timeWindow, LastValue);
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

export default UseManyDeviceManyKeysChart;
