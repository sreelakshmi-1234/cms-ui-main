import { useState, useCallback } from "react";
import PortfolioBenchmarkRadarAPI from "../../../../api/Catalog/RevenueInteligence/PortfolioBenchmarkRadarAPI";

const UsePortfolioBenchmarkRadar = (
  searchTag: Object,
  timeWindow: {
    startTs: number;
    endTs: number;
    aggregate: string;
    interval: number;
  },
  type?: "plant" | "portfolio"
) => {
  const [data, setData] = useState<any>(null);

  const fetchPortfolioBenchmarkRadar = useCallback(async () => {
    try {
      const response = await PortfolioBenchmarkRadarAPI(
        searchTag,
        timeWindow,
        type
      );

      setData(response?.data);
    } catch (error) {
      console.error(
        "Error fetching Portfolio Benchmark Radar:",
        error
      );
    }
  }, [searchTag, timeWindow, type]);

  return {
    data,
    fetchPortfolioBenchmarkRadar,
  };
};

export default UsePortfolioBenchmarkRadar;