import { useState, useCallback } from "react";
import TransformerEfficiencyByMakeAPI from "../../../../api/Catalog/AssetOptimization/EfficiencyByMakeAPI";

interface SearchTag {
  [key: string]: string;
}

const UseTransformerEfficiencyByMake = (
  searchTag: SearchTag,
  type: "plant" | "portfolio"
) => {
  const [data, setData] = useState<any>(null);

  const fetchTransformerEfficiencyByMake = useCallback(async () => {
    try {
      const response = await TransformerEfficiencyByMakeAPI(
        searchTag,
        type
      );

      setData(response.data);
    } catch (error) {
      console.error(
        "Error fetching Transformer Efficiency By Make:",
        error
      );
    }
  }, [searchTag, type]);

  return {
    data,
    fetchTransformerEfficiencyByMake,
  };
};

export default UseTransformerEfficiencyByMake;