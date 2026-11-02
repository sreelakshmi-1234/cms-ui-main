import { useState, useEffect, useCallback, useRef } from 'react';
import PlantAvailabilityAPI from '../../../api/PlantView/PlantAvailabilityAPI';

const UsePlantAvailability = (searchTag : Object) => {
  const [data, setData] = useState(null);
  const hasFetchedRef = useRef(false);

  const fetchTelemetryData = useCallback(async () => {
    try {
      const response = await PlantAvailabilityAPI(searchTag);
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
  }, [fetchTelemetryData]);

  return data;
};

export default UsePlantAvailability;
