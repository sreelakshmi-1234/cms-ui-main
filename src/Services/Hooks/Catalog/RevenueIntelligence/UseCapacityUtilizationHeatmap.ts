import { useState, useCallback } from "react";
import CapacityUtilizationHeatmapAPI from "../../../../api/Catalog/RevenueInteligence/CapacityUtilizationHeatmapAPI";

const UseCapacityUtilizationHeatmap = (
  searchTag: Object,
  timeWindow: {
    startTs: number;
    endTs: number;
    aggregate: string;
    interval: number;
  },
  type: "plant" | "portfolio"
) => {
  const [data, setData] = useState<any>(null);

  const fetchCapacityUtilizationHeatmap = useCallback(async () => {
    try {
      const response = await CapacityUtilizationHeatmapAPI(
        searchTag,
        timeWindow,
        type
      );

      setData(response?.data);
    } catch (error) {
      console.error("Error fetching Capacity Utilization Heatmap:", error);
    }
  }, [searchTag, timeWindow, type]);

  return {
    data,
    fetchCapacityUtilizationHeatmap,
  };
};

export default UseCapacityUtilizationHeatmap;