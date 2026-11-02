import { useState, useCallback } from "react";
import UnderperformersAPI from "../../../../api/Catalog/FleetBenchmark/UnderperformersAPI";

const UseUnderperformers = (
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

  const fetchUnderperformers = useCallback(async () => {
    try {
      const response = await UnderperformersAPI(
        searchTag,
        timeWindow,
        type
      );

      setData(response?.data);
    } catch (error) {
      console.error("Error fetching Underperformers:", error);
    }
  }, [searchTag, timeWindow, type]);

  return {
    data,
    fetchUnderperformers,
  };
};

export default UseUnderperformers;