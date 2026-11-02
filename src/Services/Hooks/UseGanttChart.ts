import { useState, useEffect, useCallback, useRef } from 'react';
import GanttChartAPI from '../../api/GanttChartAPI';

const UseGanttChart = (searchTag: Object, timeWindow: { startTs: number, endTs: number, aggregate: string, interval: number }) => {
    const [data, setData] = useState<[] | null>(null);

    const fetchTelemetryData = useCallback(async () => {

        try {
            const response = await GanttChartAPI(searchTag, timeWindow);
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

export default UseGanttChart;
