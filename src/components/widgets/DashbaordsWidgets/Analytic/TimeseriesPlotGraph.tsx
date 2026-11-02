import { useEffect, useState } from "react";
import { Spinner, Box, Text } from "@chakra-ui/react"; // Added Chakra UI components
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import AreaSplineChart from "../../charts/AreaSplineChart";
import { fieldsType } from "../../../../Dashboards/AnalyticsDashboard";
import UseTimeseriesPlot from "../../../../Services/Hooks/Analytics/UseTimeseriesPlot";

// Define the shape of the export functions
interface ExportFunctions {
  exportPNG: () => void;
  exportCSV: () => void;
}

interface RequestDataType {
  fields: fieldsType[];
  timewindow: { startTs: number; endTs: number; interval: number; intervalName: string };
}

interface TimeseriesPlotGraphType {
  RequestData: RequestDataType;
}

const TimeseriesPlotGraph: React.FC<TimeseriesPlotGraphType> = ({ RequestData }) => {
    // Defines
    const [shouldFetch, setShouldFetch] = useState(false);
    useEffect(() => {
        setShouldFetch(true);
      }, [RequestData]);

  // ********************* Custom Plot *********************
//   console.log(RequestData);
  const { data, loading } = UseTimeseriesPlot(RequestData.fields, RequestData.timewindow, shouldFetch);
  const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);

  useEffect(() => {
    if (loading) setShouldFetch(false); // Reset fetch control after call starts
  }, [loading]);

  return (
    <GraphLayout
      title="Custom plot"
      titleLengthSVG={110}
      titleLengthLongSVG={1630}
      width={["100%"]}
      height={["100%"]}
      timeWindow={false}
      fullScreen={true}
      onExport={exportFunctions}
    >
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={400}>
          <Spinner size="xl" color="#062D59" />
        </Box>
      ) : data && data.series.length > 0 ? (
        <AreaSplineChart
          height={400}
          apiData={data.series} // Assign series to apiData
          onExportReady={setExportFunctions}
          legendHeight={80}
          props={{
            chart: {
              zoomType: "x",
              style: {
                fontFamily: "Montserrat, sans-serif",
                color: "#062D59",
              },
              plotBorderWidth: 0,
              plotBorderColor: "#DFDFDF",
              plotBorderDashStyle: "Dash",
              className: "dashed-border",
            },
            title: {
              text: "",
            },
            xAxis: {
              type: "datetime",
              crosshair: true,
              labels: {
                enabled: true,
                style: {
                  color: "#062D59",
                  fontSize: "12px",
                },
              },
              dateTimeLabelFormats: {
                month: "%b %y", // Custom format for months
                year: "%Y", // Format for years if needed
              },
              tickLength: 0,
              lineColor: "rgba(0,0,0,0.5)",
            },
            yAxis: data.yAxis, // Assign fetched yAxis to yAxis prop
          }}
        />
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height={400}>
          <Text color="#062D59">No data available to display.</Text>
        </Box>
      )}
    </GraphLayout>
  );
};

export default TimeseriesPlotGraph;