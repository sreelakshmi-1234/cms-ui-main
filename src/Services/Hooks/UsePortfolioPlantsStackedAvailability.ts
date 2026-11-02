import { useState, useEffect, useCallback, useRef } from 'react';
import PortfolioPlantsStackedAvailabilityAPI from '../../api/PortfolioPlantsStackedAvailabilityAPI';


const UsePortfolioPlantsStackedAvailability = (type : String, textSearch : string[], timeWindow : Object) => {
  const [data, setData] = useState<Object[] | null>(null);
  const fetchTelemetryData = useCallback(async () => {
    try {
      const response = await PortfolioPlantsStackedAvailabilityAPI(type, textSearch, timeWindow);
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

export default UsePortfolioPlantsStackedAvailability;
