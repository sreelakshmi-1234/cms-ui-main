import { useState, useEffect, useCallback } from "react";
import DailyReportAPI from "../../../api/ReportPDF/DailyReportAPI";

const UseDailyReport = (
  section1Keys: string[],
  section2Keys: string[],
  dates: { startDate: Date; endDate: Date }
) => {
  const [data, setData] = useState<{ section1: Object[]; section2: Object[] } | null>(null);

  const fetchTelemetryData = useCallback(async () => {
    try {
      const response = await DailyReportAPI(section1Keys, section2Keys, dates);
      setData(response?.data);
    } catch (error) {
      console.error("Error fetching telemetry data:", error);
      setData(null); // Reset data on error
    }
  }, [section1Keys, section2Keys, dates.startDate, dates.endDate]); // Include all dependencies

  useEffect(() => {
    fetchTelemetryData();
  }, [fetchTelemetryData]); // Depend on the memoized function

  return data;
};

export default UseDailyReport;