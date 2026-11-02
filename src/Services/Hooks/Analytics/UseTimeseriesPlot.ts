import { useState, useEffect, useCallback } from "react";
import { useToast } from "@chakra-ui/react"; // Import useToast
import TimeseriesPlotAPI from "../../../api/Analytics/TimeseriesPlotAPI";
import { fieldsType } from "../../../Dashboards/AnalyticsDashboard";

interface Series {
  type: string;
  name: string;
  data: any[];
  yAxis: number;
  opposite: boolean;
  marker: { enabled: boolean };
}

interface yAxisType {
  title: { text: string };
  gridLineWidth: number;
  gridLineDashStyle: string;
  gridLineColor: string;
  opposite: boolean;
}

const UseTimeseriesPlot = (
  field: fieldsType[],
  timeWindow: { startTs: number; endTs: number; interval: number; intervalName: string },
  shouldFetch: boolean 
) => {
  const [data, setData] = useState<{ series: Series[]; yAxis: yAxisType[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast(); // Initialize toast

  const fetchTelemetryData = useCallback(async () => {
    if (!shouldFetch) return;

    try {
      setLoading(true);
      const response = await TimeseriesPlotAPI(field, timeWindow);
      setData(response);
    } catch (error) {
      console.error("Error fetching telemetry data:", error);
      setData({ series: [], yAxis: [] });
      toast({
        title: "Error",
        description: "Failed to fetch timeseries data. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [timeWindow, shouldFetch, toast]);

  useEffect(() => {
    fetchTelemetryData();
  }, [fetchTelemetryData]);

  return { data, loading };
};

export default UseTimeseriesPlot;