import { useState, useEffect, useCallback, useRef } from 'react';
import LocationMapAPI from '../../api/LocationMapAPI'

const UseLocationMap = (searchTag : string, tenant? : boolean) => {
  const [data, setData] = useState(null);
  const hasFetchedRef = useRef(false);
  const fetchTelemetryData = useCallback(async () => {
    try {
      const response = await LocationMapAPI(searchTag, tenant);
      setData(response?.data);
    } catch (error) {
      console.error('Error fetching telemetry data:', error);
    }
  }, [searchTag]);

  useEffect(() => {
    if (!hasFetchedRef.current) {
        fetchTelemetryData();
        hasFetchedRef.current = true;
    }
  }, [fetchTelemetryData]);

  return data;
};

export default UseLocationMap;