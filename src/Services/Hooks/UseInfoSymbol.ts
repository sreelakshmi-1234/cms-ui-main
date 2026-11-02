import { useState, useEffect, useCallback, useRef } from 'react';
import InfoSymbolAPI from '../../api/InfoSymbolAPI';

const UseInfoSymbol = (searchKeys: string[]) => {
    const [data, setData] = useState<string[]>([]);
    const hasFetchedRef = useRef(false);

    const fetchTelemetryData = useCallback(async () => {

        try {
            const response = await InfoSymbolAPI();
            const info = JSON.parse(response.additionalInfo.description);
            const temp = [];
            for(const key of searchKeys) {
                const value = info[key] ? info[key] : "NA";
                temp.push(value);
            }
            setData(temp);
        } catch (error) {
            console.error('Error fetching telemetry data:', error);
        }
    }, []);

    useEffect(() => {
        
        if (!hasFetchedRef.current) {
            fetchTelemetryData();
            hasFetchedRef.current = true;
        }

    }, [fetchTelemetryData]);

    return data;
};

export default UseInfoSymbol;
