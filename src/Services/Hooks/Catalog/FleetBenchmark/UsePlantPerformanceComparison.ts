import { useState, useCallback } from "react";
import PlantPerformanceComparisonAPI from "../../../../api/Catalog/FleetBenchmark/PlantPerformanceComparisonAPI";

const UsePlantPerformanceComparison = (
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

  const fetchPlantPerformanceComparison = useCallback(async () => {
    try {
      const response = await PlantPerformanceComparisonAPI(
        searchTag,
        timeWindow,
        type
      );

      setData(response?.data);
    } catch (error) {
      console.error(
        "Error fetching Plant Performance Comparison:",
        error
      );
    }
  }, [searchTag, timeWindow, type]);

  return {
    data,
    fetchPlantPerformanceComparison,
  };
};

export default UsePlantPerformanceComparison;