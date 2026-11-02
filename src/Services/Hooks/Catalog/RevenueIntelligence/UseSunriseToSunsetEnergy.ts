import { useState, useCallback } from "react";
import SunriseToSunsetEnergyAPI from "../../../../api/Catalog/RevenueInteligence/SunriseToSunsetEnergyAPI";

const UseSunriseToSunsetEnergy = (
  searchTag: {
    devName: string;
    keys: string;
  },
  timeWindow: {
    startTs: number;
    endTs: number;
    aggregate: string;
    interval: number;
  },
  type: "plant" | "portfolio"
) => {
  const [data, setData] = useState<any>(null);

  const fetchSunriseToSunsetEnergy = useCallback(async () => {
    try {
      const response = await SunriseToSunsetEnergyAPI(
        searchTag,
        timeWindow,
        type
      );

      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  }, [searchTag, timeWindow, type]);

  return {
    data,
    fetchSunriseToSunsetEnergy,
  };
};

export default UseSunriseToSunsetEnergy;