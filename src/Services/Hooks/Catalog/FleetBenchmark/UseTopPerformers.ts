import { useState, useCallback } from "react";
import TopPerformersAPI from "../../../../api/Catalog/FleetBenchmark/TopPerformersAPI";

const UseTopPerformers = (
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

  const fetchTopPerformers = useCallback(async () => {
    try {
      const response = await TopPerformersAPI(
        searchTag,
        timeWindow,
        type
      );

      setData(response?.data);
    } catch (error) {
      console.error(
        "Error fetching Top Performers:",
        error
      );
    }
  }, [searchTag, timeWindow, type]);

  return {
    data,
    fetchTopPerformers,
  };
};

export default UseTopPerformers;