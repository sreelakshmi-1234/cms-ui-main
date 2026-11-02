import { useState, useCallback } from "react";
import AssetRevenueHeatmapAPI from "../../../../api/Catalog/RevenueInteligence/AssetRevenueHeatmapAPI";

const UseAssetRevenueHeatmap = (
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

  const fetchAssetRevenueHeatmap = useCallback(async () => {
    try {
      const response = await AssetRevenueHeatmapAPI(
        searchTag,
        timeWindow,
        type
      );

      setData(response?.data);
    } catch (error) {
      console.error("Error fetching Asset Revenue Heatmap:", error);
    }
  }, [searchTag, timeWindow, type]);

  return {
    data,
    fetchAssetRevenueHeatmap,
  };
};

export default UseAssetRevenueHeatmap;