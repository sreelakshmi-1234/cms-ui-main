import { useState, useEffect, useCallback, useRef } from 'react';
import InverterStatusAPI from '../../api/InverterStatusAPI';

const UseInverterStatus = (searchTag: Object, timeWindow: { startTs: number, endTs: number, aggregate: string, interval: number }) => {
    const [data, setData] = useState<number[] | null>(null);

    const fetchTelemetryData = useCallback(async () => {

        try {
            const response = await InverterStatusAPI(searchTag, timeWindow);
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

export default UseInverterStatus;
