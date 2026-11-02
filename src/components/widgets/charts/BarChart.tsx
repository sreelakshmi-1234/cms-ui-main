import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { EnlargeHeight, EnlargeWidgetSize } from '../../../Services/EnlargeWidget';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import '../../../App.css';

//  init exporting module
exporting(Highcharts);
exportData(Highcharts);

interface  ExportFunction {
  exportPNG : () => void;
  exportCSV : () => void;
}

interface BarChartType {
    apiData? : Object[];
    bg? : string;
    height? : Number | string;
    barColors? : string[];
    legendHeight? : number;
    props? : any;
    isFullscreen? : boolean;
    onExportReady? : (functions : ExportFunction) => void;
}

const BarChart : React.FC <BarChartType> = ({apiData, bg, height=240, barColors, legendHeight=50, props, isFullscreen=false, onExportReady}) => {
    const chartRef = useRef<HighchartsReact.RefObject>(null);
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'bar',
            backgroundColor: bg || "transparent",
            height: height,
            style: {
                fontFamily: 'Montserrat, sans-serif',
                color: "#062D59"
              },
            plotBorderWidth: 1,
            plotBorderColor: '#DFDFDF',
            plotBorderDashStyle: 'Dash',
            className : "dashed-border"
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            labels: {
                enabled: false,
                style: {
                    fontSize: isFullscreen? EnlargeHeight(12) : '12px',
                    color : '#062D59'
                }
            },
            gridLineDashStyle: 'Dash',
            gridLineWidth: 1, // Ensure grid line width is set
            tickLength: 0,
            gridLineColor: '#DFDFDF',
            lineColor : "#DFDFDF",
            dateTimeLabelFormats: {
                month: '%b %y', // Custom format for months
                year: '%Y' // Format for years if needed
            },
        },
        yAxis: {
            labels: {
                enabled: true,
                autoRotation: [45, 90],
                style: {
                    fontSize: isFullscreen? EnlargeHeight(12) : '12px',
                    color : '#062D59'
                }
            },
            min: 0,
            title: {
                text: ''
            },
            gridLineDashStyle: 'Dash',
            gridLineWidth: 1, // Ensure grid line width is set
            tickLength: 0,
            gridLineColor: '#DFDFDF',
            lineColor : "#DFDFDF",
        },
        legend: {
            enabled: true,
            align: "left",
            maxHeight: legendHeight,
            useHTML: true,
            itemStyle: {
                overflow : "auto"
            }
        },
        tooltip : {
            shared : true,
            formatter: function (this : any) {
              var date = this.x // + (5.5 * 3600 * 1000); // Add 5.5 hours (IST) to the timestamp
              var formattedDate = Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', date);
              var points = this.points.map(function (point : any) {
                  return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y + '</b>';
              });
              return '<b>' + formattedDate + '</b><br/>' + points.join('<br/>');
            }
          },
        series : [] as Object[],
        plotOptions: {
            bar: {
                pointWidth: 25
            }
        },
        credits: {
            enabled: false
        },
        exporting : {
            enabled : true,
            buttons: {
                contextButton: {
                    enabled : false,
                    menuItems: [
                        'downloadJPEG', // Allow JPEG export
                        'separator', 
                        'downloadCSV'   // Allow CSV export
                    ]
                }
            }
        }
    });

    // Adjust chart height based on full-screen state
    useEffect(() => {
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
            setChartOptions({
                ...chartOptions,
                series: apiData.map((series : object, index : number) => {
                    if(barColors?.length){
                        return ({
                            ...series,
                            color : barColors[index]
                        })
                    } else {
                        return {
                            ...series
                        }
                    }
                }),
                ...props
            });
        }
    }, [apiData, props]);

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
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            ref={chartRef}
        />
    );
};

export default BarChart;



// colors: [
//             '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
//             '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
//             '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
//             '#03c69b', '#00f194'
//         ],