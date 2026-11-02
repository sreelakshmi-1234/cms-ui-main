import { useState, useEffect, useCallback, useRef } from 'react';
import ManyDeviceSameKeyHeatmapAPI from '../api/ManyDeviceSameKeyHeatmapAPI';

const UseManyDeviceSameKeyHeatmap = (searchTag: { devName: string, keys: string;}, timeWindow: { startTs: number, endTs: number, aggregate: string, interval: number }) => {
    const [data, setData] = useState<Object | null>(null);

    const fetchTelemetryData = useCallback(async () => {

        try {
            const response = await ManyDeviceSameKeyHeatmapAPI(searchTag, timeWindow);
            setData(response?.data);
        } catch (error) {
            console.error('Error fetching telemetry data:', error);
        }
    }, [timeWindow, searchTag.devName,searchTag.keys]);

    useEffect(() => {

        fetchTelemetryData();

    }, [fetchTelemetryData]);

    return data;
};

export default UseManyDeviceSameKeyHeatmap;
