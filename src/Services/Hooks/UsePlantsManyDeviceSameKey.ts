import { useState, useEffect, useCallback, useRef } from 'react';
import PlantsManyDeviceSameKeyAPI from '../../api/PlantsManyDeviceSameKeyAPI';


const UsePlantsManyDeviceSameKey = (type : String, searchTag : Object, textSearch : string[], timeWindow : Object, timeseries? : boolean) => {
  const [data, setData] = useState<Object[] | null>(null);
  const fetchTelemetryData = useCallback(async () => {
    try {
      const response = await PlantsManyDeviceSameKeyAPI(type, searchTag, textSearch, timeWindow, timeseries);
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

export default UsePlantsManyDeviceSameKey;
