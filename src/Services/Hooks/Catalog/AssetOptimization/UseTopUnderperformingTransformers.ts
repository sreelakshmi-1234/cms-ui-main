import { useState, useCallback } from "react";
import TopUnderperformingTransformersAPI from "../../../../api/Catalog/AssetOptimization/TopUnderperformingTransformersAPI";

interface SearchTag {
  devName: string;
  keys: string[];
}

interface TimeWindow {
  startTs: number;
  endTs: number;
  aggregate: string;
  interval: number;
}

const UseTopUnderperformingTransformers = (
  searchTag: SearchTag,
  timeWindow: TimeWindow,
  type: "plant" | "portfolio"
) => {
  const [data, setData] = useState<any[]>([]);

  const fetchTopUnderperformingTransformers = useCallback(async () => {
    try {
      const response = await TopUnderperformingTransformersAPI(
        searchTag,
        timeWindow,
        type
      );

      setData(Array.isArray(response?.data) ? response.data : response?.data?.data || []);
    } catch (error) {
      console.error(
        "Error fetching Top Underperforming Transformers:",
        error
      );
    }
  }, [searchTag, timeWindow, type]);

  return {
    data,
    fetchTopUnderperformingTransformers,
  };
};

export default UseTopUnderperformingTransformers;