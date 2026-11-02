import { useState, useEffect, useCallback } from 'react';
import StatisticsCardAPI from '../../api/StatisticsCardAPI';

const UseStatisticsCard = (deviceLabel : string, telemetry : string, title : string) => {
  const [data, setData] = useState(null);

  const fetchTelemetryData = useCallback(async () => {
    try {
      const response = await StatisticsCardAPI(deviceLabel, telemetry, title);
      setData(response?.data);
    } catch (error) {
      console.error('Error fetching telemetry data:', error);
    }
  }, []);

  useEffect(() => {
    fetchTelemetryData();
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

export default UseStatisticsCard;
