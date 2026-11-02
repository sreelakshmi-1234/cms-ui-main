import { useState, useEffect, useRef } from 'react';
import BESSDailyAPI from '../../../api/Battery/BESSDailyAPI';

// *************BESS Daily Use FOr Single Device Multiple Keys Fetching**************

const UseBESSDaily = (searchTag: Object, timeWindow: { startTs: number, endTs: number, aggregate: string, interval: number }) => {

    const [data, setData] = useState<Object[] | null>(null);
    const [isFetched, setIsFetched] = useState(false); // To ensure first call
    
    // Using refs to store previous values for comparison
    const prevSearchTagRef = useRef(searchTag);
    const prevTimeWindowRef = useRef(timeWindow);

    useEffect(() => {
        const searchTagChanged = JSON.stringify(prevSearchTagRef.current) !== JSON.stringify(searchTag);
        const timeWindowChanged = JSON.stringify(prevTimeWindowRef.current) !== JSON.stringify(timeWindow);

        if (searchTagChanged || timeWindowChanged || !isFetched) {

            const fetchTelemetryData = async () => {
                try {
                    const response = await BESSDailyAPI(searchTag, timeWindow);
                    setData(response?.data);
                    setIsFetched(true); // Mark as fetched
                } catch (error) {
                    console.error('Error fetching telemetry data:', error);
                }
            };
            fetchTelemetryData();

            // Update the previous values
            prevSearchTagRef.current = searchTag;
            prevTimeWindowRef.current = timeWindow;
        }
    }, [searchTag, timeWindow]);
    

    return data;
};

export default UseBESSDaily;
