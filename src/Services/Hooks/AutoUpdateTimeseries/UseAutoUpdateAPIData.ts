import { useState, useEffect, useCallback } from "react";
import AutoUpdateAPIData from "../../../api/AutoUpdateTimeseries/AutoUpdateAPIData";

const UseAutoUpdateAPIData = (
  searchTag: object,
  onData?: (newData: any) => void
) => {
  const [latestData, setLatestData] = useState<object | null>(null);

  const fetchAutoUpdateData = useCallback(async () => {
    try {
      const response = await AutoUpdateAPIData(searchTag);
      setLatestData(response?.data);
      if (onData) onData(response?.data); // pass to parent if needed
    } catch (error) {
      console.error("Error fetching auto-update data:", error);
    }
  }, [searchTag]);

//   useEffect(() => {
//     fetchAutoUpdateData();
//   }, [fetchAutoUpdateData]);

  return {latestData, fetchAutoUpdateData};
};

export default UseAutoUpdateAPIData;
