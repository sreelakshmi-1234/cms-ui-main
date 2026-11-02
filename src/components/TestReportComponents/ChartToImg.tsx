import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartLayout from '../Layouts/ChartLayouts/ChartLayout';
import UseManyDeviceManyKeysChart from '../../Services/Hooks/UseManyDeviceManyKeysChart';
import { useTimeHandle } from '../../Services/TimeWindowSetting';
import AreaSplineChart from '../widgets/charts/AreaSplineChart';
import { toPng } from 'html-to-image';
import { EnlargeWidgetContent, EnlargeWidgetSize } from '../../Services/EnlargeWidget';
import ColumnLineChart from '../widgets/charts/ColumnLineChart';
import UseColumnLine from '../../Services/Hooks/UseColumnLine';

export const PowerCurve: React.FC<{ onGenerate: (str: string) => void }> = ({ onGenerate }) => {
  const {
    timeWindow: timeWindowPowerCurve,
    handleTimeWindowChange: handleTimeWindowPowerCurveChange,
    handleReset: PowerCurveHandleReset,
  } = useTimeHandle(12, 'hour', 'AVG', [5, 'minute']);

  const searchTagPowerCurve = [
    {
      devName: 'Calculation',
      keys: 'INV_Total_Power,DG_Total_Power,Total_Grid_Power,Load_Power,PCS_Total_Power',
      type: ['areaspline', 'areaspline', 'areaspline', 'areaspline', 'areaspline'],
      name: ['PV kW', 'DG kW', 'Grid kW', 'Load kW', 'ESS kW'],
    },
  ];

  const PowerCurveData = UseManyDeviceManyKeysChart(searchTagPowerCurve, timeWindowPowerCurve)?.map(
    (series: any) => {
      if (series.name === 'PV kW') {
        return { ...series, color: '#19CA16', fillOpacity: 0.3 };
      } else if (series.name === 'Grid kW') {
        return { ...series, color: '#8842E0', fillOpacity: 0.3 };
      } else if (series.name === 'DG kW') {
        return { ...series, color: '#10BDF3', fillOpacity: 0.3 };
      } else if (series.name === 'ESS kW') {
        return { ...series, color: '#3853A5', fillOpacity: 0.3 };
      } else {
        return { ...series, color: '#CF4E4E', fillOpacity: 0.3 };
      }
    }
  );

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [isLoaded, setIsLoaded] = useState(false); // Flag to track if chart has been captured

  const captureChart = async () => {
    const chart = chartComponentRef.current?.chart;
    if (chart && !isLoaded) {
      chart.reflow(); // Ensure the chart is fully adjusted to its container
      // const svg = chart.getSVG({
      //   chart: {
      //     backgroundColor: '#ffffff', // Ensure a visible background in the PDF
      //   },
      // });
      // const dataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
      // Create a temporary DOM element to hold the SVG
      // const svgElement = document.createElement('div');
      // svgElement.innerHTML = svg;
      // document.body.appendChild(svgElement);
      const chartContainer = chartComponentRef.current?.container?.current;
    if (chartContainer && !isLoaded) {
      try {
        // Convert the chart container to a PNG image
        const dataUrl = await toPng(chartContainer);
        onGenerate(dataUrl); // Pass the base64 PNG image URL to the parent
        setIsLoaded(true); // Mark as loaded to prevent re-capture
      } catch (error) {
        console.error('Error capturing chart as PNG:', error);
      }
    }
    }
  };

  // Capture the chart only once when data is first available
  useEffect(() => {
    if (PowerCurveData && PowerCurveData.length > 0 && chartComponentRef.current?.chart && !isLoaded) {
      setTimeout(captureChart, 1000); // Delay capturing the chart to ensure it's rendered
    }
  }, [PowerCurveData]); // Only re-run if PowerCurveData changes

  return (
    <Box>
      <ChartLayout
        title=""
        width={['full', '100%']}
        height="120%"
        timeWindow={false}
        onTimeWindowChange={handleTimeWindowPowerCurveChange}
        onReset={PowerCurveHandleReset}
        fullScreen={false}
      >
        <AreaSplineChart
          ref={chartComponentRef}
          height={EnlargeWidgetSize(550)}
          props={
            { 
              chart : { 
                width : EnlargeWidgetSize(1000)
              }, 
              yAxis: {
                title: {
                  text: 'AC Power',
                  style: {
                    fontSize: '28px' 
                  }
                },
                gridLineWidth : 1,
                gridLineDashStyle : 'Dash',
                labels: {
                  style: {
                    fontSize: '24px'
                  }
                }
              }, 
              xAxis : {
                gridLineWidth : 1,
                gridLineDashStyle : 'Dash',
                minRange : 1000*60*60,
                labels: {
                  style: {
                    fontSize: '24px'
                  }
                }
              }, 
              legend : {
                align : 'center',
                itemStyle: {
                  fontSize: '22px'
                }
              },
              exporting : {
                enabled : false
              }
            }
          }
          apiData={PowerCurveData || [{}]}
        />
      </ChartLayout>
    </Box>
  );
};


export const EnergyYield: React.FC<{ onGenerate: (str: string) => void }> = ({ onGenerate }) => {
  // ***********************Energy Yield******************
    const {
      timeWindow: timeWindowEnergyYield,
      handleTimeWindowChange: handleTimeWindowEnergyYieldChange,
      handleReset: EnergyYieldHandleReset
  } = useTimeHandle(7, "day", "NONE", [5, "minute"]);

  var searchTagEnergyYield = { 
    devName : "portfolio",
    keys: "PV_Portfolio_Energy,Grid_Portfolio_Daily_Energy_Export",
    type : ["bar", "bar"],
    name : ["Daily Energy", "Energy Consumption"]
  };
  const ColumnLineData = UseColumnLine(searchTagEnergyYield, timeWindowEnergyYield);

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [isLoaded, setIsLoaded] = useState(false); // Flag to track if chart has been captured

  const captureChart = async () => {
    const chart = chartComponentRef.current?.chart;
    if (chart && !isLoaded) {
      chart.reflow(); // Ensure the chart is fully adjusted to its container
      const chartContainer = chartComponentRef.current?.container?.current;
    if (chartContainer && !isLoaded) {
      try {
        // Convert the chart container to a PNG image
        const dataUrl = await toPng(chartContainer);
        onGenerate(dataUrl); // Pass the base64 PNG image URL to the parent
        setIsLoaded(true); // Mark as loaded to prevent re-capture
      } catch (error) {
        console.error('Error capturing chart as PNG:', error);
      }
    }
    }
  };

  // Capture the chart only once when data is first available
  useEffect(() => {
    if (ColumnLineData && ColumnLineData.length > 0 && chartComponentRef.current?.chart && !isLoaded) {
      setTimeout(captureChart, 1000); // Delay capturing the chart to ensure it's rendered
    }
  }, [ColumnLineData]); // Only re-run if ColumnLineData changes

  return (
    <ChartLayout
      title=""
      initTimeTitle=" "
      width={["full", "full"]}
      height={[EnlargeWidgetSize(270) + "px"]}
      onTimeWindowChange = {handleTimeWindowEnergyYieldChange}
      fullScreen={false}
    >
        <ColumnLineChart height={EnlargeWidgetContent(570, 530)} apiData={ColumnLineData || [{}]} // column line = energy yield
          ref={chartComponentRef}
          props = {
            {
              legend: {
                align : "center",
                itemStyle: {
                  fontSize: '22px'
                }
              },
              yAxis: [
                {
                  title: {
                    text: 'kWh',
                    style: {
                      fontSize: '28px' 
                    }
                  },
                  labels: {
                    style: {
                      fontSize: '24px'
                    }
                  }
                }, 
                {
                  title: {
                      text: 'PR %',
                      style: {
                        fontSize: '28px' 
                      }
                  },
                  opposite: true,
                  labels: {
                    style: {
                      fontSize: '24px'
                    }
                  }
                }
              ],
              xAxis : {
                labels: {
                  style: {
                    fontSize: '24px'
                  }
                }
              },
              exporting : {
                enabled : false
              }
            }
          }
        />
    </ChartLayout>
  );
};

