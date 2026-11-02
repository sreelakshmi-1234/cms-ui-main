import { useState, useEffect, useCallback, useRef } from 'react';
import SpecificYieldAPI from '../../api/SpecificYieldAPI';


const UseSpecificYield = (textSearch : string, key : string) => {
  const [data, setData] = useState(null);
  const hasFetchedRef = useRef(false);

  const fetchTelemetryData = useCallback(async () => {
    try {
      const response = await SpecificYieldAPI(textSearch, key);
      setData(response?.data);
    } catch (error) {
      console.error('Error fetching telemetry data:', error);
    }
  }, [textSearch, key]);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchTelemetryData();
      hasFetchedRef.current = true;
  }
    const intervalId = setInterval(() => {
      const currentIntervalTime = new Date();
      const latestStoredTime = parseInt(localStorage.getItem("landingTime") || "0");
      
      if((currentIntervalTime.getMinutes() == new Date(latestStoredTime - 300000).getMinutes() && currentIntervalTime.getSeconds() == 0) || (currentIntervalTime.getMinutes() == new Date(latestStoredTime).getMinutes() && currentIntervalTime.getSeconds() == 0)) {
          
          fetchTelemetryData();
      }

    }, 1000);

    // Cleanup interval on component unmount
    return () => {
        
        clearInterval(intervalId)
    };
  }, [fetchTelemetryData, 60000]);

  return data;
};

export default UseSpecificYield;
