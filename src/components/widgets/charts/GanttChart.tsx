import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsGantt from 'highcharts/modules/gantt';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import { EnlargeHeight, EnlargeWidgetSize } from '../../../Services/EnlargeWidget';
import '../../../App.css';

HighchartsGantt(Highcharts); // Initialize Gantt module

//  init exporting module
exporting(Highcharts);
exportData(Highcharts);


interface  ExportFunction {
  exportPNG : () => void;
  exportCSV : () => void;
}

interface dataType {
    name : string;
    data : object[];
}

interface ganttChartType {
    height? : number;
    apiData? : dataType[] | [];
    props? : any;
    isFullscreen? : boolean;
    onExportReady? : (functions : ExportFunction) => void;
}

const GanttChart: React.FC <ganttChartType> = ({height=1000, apiData, props, isFullscreen=false, onExportReady}) => {
    
    const chartRef = useRef<HighchartsReact.RefObject>(null);
    
    const [chartOptions, setChartOptions] = useState({
        chart : {
            height : 200,
            backgroundColor : "transparent",
            className : "hide-ticks dashed-border",
            style: {
                fontFamily: 'Montserrat, sans-serif',
                color: "#062D59"
              },
        },
        title: {
            text: '',
        },
        tooltip: {
            formatter: function (this : any) {
                
                // Adjust start and end times by adding 5 hours and 30 minutes
                const addTime =  0//1000*60*60*5; //5:30 Hr
                
                const start = Highcharts.dateFormat('%Y-%m-%d %H:%M', this.point.start);
                const end = Highcharts.dateFormat('%Y-%m-%d %H:%M', this.point.end);
                return `<b>${this.point.name}</b><br/>
                        Start: ${start}<br/>
                        End: ${end}`;
            }
        },
        xAxis: {
            type : "datetime",
            opposite : false,
            gridLineWidth: 0,
            plotBorderColor: '#DFDFDF',
            plotBorderDashStyle: 'Dash',
            tickLength: 0,
            lineWidth: 0,
            tickInterval : 3600 * 1000 * 1,
            dateTimeLabelFormats: {
                hour: '%H',
            },
            labels : {
                style: {
                    color: '#062D59',
                    fontSize: '12px',
                    fontWeight : 'bold'
                },
            }
            // tickPositions: [],
            // label : {

            //     formatter: function(this : any) {
            //             return Highcharts.dateFormat('%H:%M', this.value + (5.5 * 3600 * 1000)); // Add 5.5 hours (IST) to the timestamp
            //     }
            // }
            // min: Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0), // Start of the day
            // max: Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59)  // End of the day
        },
        yAxis: {
            // uniqueNames: true,
            gridLineColor: '#DFDFDF',
            gridLineDashStyle: 'Dash',
            labels : {
                style: {
                    color: '#062D59',
                    fontSize: '12px',
                    fontWeight : '400',
                },
            }
        },
        series: [] as Object[],
        plotOptions: {
            series: {
                borderRadius: 0, // Set the border radius to 0 for sharp corners
                opacity: 0.9, // Set the opacity of the bars
                pointWidth : 23
            }
        },
        exporting : {
            enabled : false,
        },
        credits : {
            enabled : false
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
        // if(apiData && apiData?.length > 0) {
        //     if (isFullscreen) {
        //         apiData = [{}]
        //     } else {
                
        //     }
        // }
    }, [isFullscreen, height]);

    useEffect(() => {
        if(apiData) {
            // console.log(apiData)
            setChartOptions((prevOptions) => ({
                ...prevOptions,
                series : !isFullscreen? [{name : apiData[0]?.name, data : apiData[0]?.data.slice(0, 6)}] : apiData,
                ...props
            }))
        }
    }, [apiData, props, isFullscreen]);

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
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'ganttChart'}
                options={chartOptions}
                ref={chartRef}
            />
        </div>
    );
};

export default GanttChart;