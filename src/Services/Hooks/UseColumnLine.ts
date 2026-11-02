import { useState, useEffect, useCallback, useRef } from 'react';
import ColumnLineAPI from '../../api/ColumnLineAPI';

const UseColumnLine = (searchTag : Object, timeWindow : Object) => {
    const [data, setData] = useState([]);
    // const hasFetchedRef = useRef(false);

    const fetchTelemetryData = useCallback(async () => {
        try {
            const response = await ColumnLineAPI(searchTag, timeWindow);
            setData(response?.data);
        } catch (error) {
            console.error('Error fetching telemetry data:', error);
        }
    }, [timeWindow]);

    useEffect(() => {
        // if (!hasFetchedRef.current) {
            fetchTelemetryData();
            // hasFetchedRef.current = true;
        // }
        
        // const interval = setInterval(fetchTelemetryData, 300000); // 5 minutes interval
        // return () => clearInterval(interval);
    }, [fetchTelemetryData]);

    return data;
};

export default UseColumnLine;
