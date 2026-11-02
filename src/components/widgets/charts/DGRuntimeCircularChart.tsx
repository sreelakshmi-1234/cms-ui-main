import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import HighchartsFullScreen from 'highcharts/modules/full-screen';
import HighchartsReact from 'highcharts-react-official';
import { EnlargeHeight, EnlargeWidgetSize } from '../../../Services/EnlargeWidget';
import '../../../App.css';
import highchartsMore from 'highcharts/highcharts-more';

// Initialize highcharts-more module (required for radial bars)
highchartsMore(Highcharts);
Highcharts3D(Highcharts); // Initialize the 3D module
HighchartsFullScreen(Highcharts);
//  init exporting module
exporting(Highcharts);
exportData(Highcharts);


interface  ExportFunction {
  exportPNG : () => void;
  exportCSV : () => void;
}

interface DGRuntimeCircularChartProps {
  apiData?: Object[];
  height?: Number | string;
  bg?: string;
  category?: string[];
  legendHeight?: number;
  xAxisInterval?: number | string;
  props?: any;
  isFullscreen?: boolean;
  onExportReady? : (functions : ExportFunction) => void;
  inFullScreen? : (mode : boolean) => void;
}

const DGRuntimeCircularChart: React.FC<DGRuntimeCircularChartProps> = ({ apiData, height = 280, bg, category, legendHeight = 40, xAxisInterval = "auto", props, isFullscreen = false, inFullScreen, onExportReady }) => {
  // console.log("FULL", isFullscreen)
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      backgroundColor: bg || "transparent",
      height: height,
      polar: true,
      inverted: true,
      borderWidth: 0,
      plotBorderWidth: 0,
      plotBorderColor: 'transparent',
      style: {
        fontFamily: 'Montserrat, sans-serif',
        color: "#062D59",
        fontSize : isFullscreen ? EnlargeHeight(12) : 12
      },
      className : "hide-stroke"
    },
    pane: {
        startAngle: 0,
        endAngle: 360,
        background: null // No background
    },
    title: {
      text: null
    },
    tooltip: {
      shared: false,
    },
    series: [] as Object[],
    legend: {
      enabled: false,
    },    
    xAxis: {
        lineWidth: 0,
        gridLineWidth: 0, // No grid lines on x-axis
        labels: {
            enabled: false,
            tickInterval : 0
        }
    },
    yAxis: {
      title: {
        text: null
      },
      min: 0,
      max: 24,
      gridLineWidth: 0, // No grid lines on y-axis
      labels: {
          enabled: false,
          tickInterval : 0
      }
    },
    exporting: {
      enabled: false,
    },
    credits: {
      enabled: false
    }
  });

  // Adjust chart height based on full-screen state
  useEffect(() => {
    // Mode Selection in Widget
    if(inFullScreen) {
      inFullScreen(isFullscreen)
    };

    const newHeight = isFullscreen ? EnlargeHeight(770) : height;
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      chart: {
        ...prevOptions.chart,
        height: newHeight
      }
    }));
  }, [isFullscreen, height]);


  useEffect(() => {
    if (apiData) {
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        series: apiData,
        ...props
      }));

      if (category) {
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          xAxis: {
            ...prevOptions.xAxis,
            categories: category
          }
        }));
      }
    }
  }, [apiData, category, props]);

  // Export PNG function
    const exportPNG = () => {
      chartRef.current?.chart.exportChart(
        { type: 'image/png', filename: 'chart-png' }, // Exporting options
        {} // Chart options (no changes)
      );
    };
  
    // Export CSV function
    const exportCSV = () => {
      chartRef.current?.chart.downloadCSV();
    };
  
    // Pass export functions to parent when ready
    useEffect(() => {
      if (onExportReady) {
        onExportReady({ exportPNG, exportCSV });
      }
    }, [onExportReady]);

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
    </>

  );
}
export default DGRuntimeCircularChart;