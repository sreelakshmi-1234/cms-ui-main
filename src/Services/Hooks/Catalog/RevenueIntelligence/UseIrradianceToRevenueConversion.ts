import { useState, useCallback } from "react";
import IrradianceToRevenueConversionAPI from "../../../../api/Catalog/RevenueInteligence/IrradianceToRevenueConversionAPI";

const UseIrradianceToRevenueConversion = (
  searchTag: any,
  timeWindow: {
    startTs: number;
    endTs: number;
    aggregate: string;
    interval: number;
  },
  type?: "plant" | "portfolio"
) => {
  const [data, setData] = useState<any>(null);

  const fetchIrradianceToRevenueConversion = useCallback(async () => {
    try {
      const response = await IrradianceToRevenueConversionAPI(
        searchTag,
        timeWindow,
        type
      );

      setData(response?.data);
    } catch (error) {
      console.error(
        "Error fetching Irradiance To Revenue Conversion:",
        error
      );
    }
  }, [searchTag, timeWindow, type]);

  return {
    data,
    fetchIrradianceToRevenueConversion,
  };
};

export default UseIrradianceToRevenueConversion;