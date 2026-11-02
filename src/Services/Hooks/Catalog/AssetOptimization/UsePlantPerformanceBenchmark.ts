import { useState, useCallback } from "react";
import PlantPerformanceBenchmarkAPI from "../../../../api/Catalog/AssetOptimization/PlantPerformanceBenchmarkAPI";

const UsePlantPerformanceBenchmark = (
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

  const fetchPlantPerformanceBenchmark = useCallback(async () => {
    try {
      const response = await PlantPerformanceBenchmarkAPI(
        searchTag,
        timeWindow,
        type
      );

      setData(response.data);
    } catch (error) {
      console.error(
        "Error fetching Plant Performance Benchmark:",
        error
      );
    }
  }, [searchTag, timeWindow, type]);

  return {
    data,
    fetchPlantPerformanceBenchmark,
  };
};

export default UsePlantPerformanceBenchmark;