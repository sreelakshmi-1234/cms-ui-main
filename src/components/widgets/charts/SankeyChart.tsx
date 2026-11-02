import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import SankeyModule from "highcharts/modules/sankey";
import Exporting from "highcharts/modules/exporting";
import ExportData from "highcharts/modules/export-data";

SankeyModule(Highcharts);
Exporting(Highcharts);
ExportData(Highcharts);

interface ExportFunctions {
  exportPNG: () => void;
  exportCSV: () => void;
}

interface SankeyChartProps {
  props?: any;
  height?: number;
  width?: number | string;
  onExportReady?: (functions: ExportFunctions) => void;
}

const SankeyChart: React.FC<SankeyChartProps> = ({
  props,
  height = 250,
  width,
  onExportReady,
}) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      type: "sankey",
      height,
      width: width || null,
      backgroundColor: "transparent",
    },

    title: {
      text: null,
    },

    credits: {
      enabled: false,
    },

    exporting: {
      enabled: false,
    },

    tooltip: {
      pointFormat:
        "<b>{point.fromNode.name}</b> → <b>{point.toNode.name}</b>: {point.weight}",
    },

    series: [],
  });

  useEffect(() => {
    if (props) {
      setChartOptions((prev: any) => ({
        ...prev,
        ...props,
      }));
    }
  }, [props]);

  const exportPNG = () => {
    const chart = chartRef.current?.chart;

    if (!chart) return;

    chart.exportChart(
      {
        type: "image/png",
        filename: "sankey-chart",
      },
      {}
    );
  };

  const exportCSV = () => {
    const chart = chartRef.current?.chart;

    if (!chart) return;

    chart.downloadCSV();
  };

  useEffect(() => {
    if (onExportReady) {
      onExportReady({
        exportPNG,
        exportCSV,
      });
    }
  }, [onExportReady]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      ref={chartRef}
    />
  );
};

export default SankeyChart;