import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { EnlargeHeight } from '../../../Services/EnlargeWidget';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import '../../../App.css'

interface ExportFunction {
    exportPNG: () => void;
    exportCSV: () => void;
}

// Define props interface
interface AreaSplineChartProps {
    apiData?: Object[];
    height?: number | string;
    bg?: string;
    legendHeight?: number;
    props?: any;
    isFullscreen?: boolean;
    onExportReady?: (functions: ExportFunction) => void;
    inFullScreen?: (mode: boolean) => void;
}

// Initialize Highcharts modules
exporting(Highcharts);
exportData(Highcharts);

const AreaSplineChart = React.forwardRef<HighchartsReact.RefObject, AreaSplineChartProps>(({
    apiData,
    height = "300px",
    legendHeight = 50,
    bg,
    props,
    isFullscreen = false,
    inFullScreen,
    onExportReady
}, ref) => {
    const chartRef = useRef<HighchartsReact.RefObject>(null);
    const [chartOption, setChartOptions] = useState({
        chart: {
            type: 'areaspline',
            height: height,
            zoomType: 'x',
            backgroundColor: bg || "transparent",
            style: {
                fontFamily: 'Montserrat, sans-serif',
                color: "#062D59"
            },
            plotBorderWidth: 1,
            plotBorderColor: '#DFDFDF',
            plotBorderDashStyle: 'Dash',
            className: "dashed-border"
        },
        title: {
            text: ''
        },
        xAxis: {
            type: "datetime",
            gridLineDashStyle: 'Dash',
            // lineWidth : 1,
            tickLength: 0,
            gridLineWidth: 1,
            labels : {
                style: {
                    fontFamily: 'Montserrat, sans-serif',
                    color: "#062D59",
                    fontSize: isFullscreen ? EnlargeHeight(12) : 12
                },
            }

        },
        yAxis: {
            title: {
                text: '',
            },
            gridLineDashStyle: 'Dash',
            gridLineWidth: 1,
            tickAmount: !isFullscreen ? 6 : 8,
            labels : {
                style: {
                    fontFamily: 'Montserrat, sans-serif',
                    color: "#062D59",
                    fontSize: isFullscreen ? EnlargeHeight(12) : 12
                },
            }
        },
        tooltip: {
            shared: true,
            formatter: function (this: any) {
                var date = this.x // + (5.5 * 3600 * 1000); // Add 5.5 hours (IST) to the timestamp
                var formattedDate = Highcharts.dateFormat('%Y-%m-%d %H:%M', date);
                var points = this.points.map(function (point: any) {
                    return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y + '</b>';
                });
                return '<b>' + formattedDate + '</b><br/>' + points.join('<br/>');
            }
        },
        series: [] as Object[],
        legend : {
            maxHeight : legendHeight,
            useHTML : true,
            itemStyle : {
                // display:"inline-block",
                overflow : "auto",
                color: '#062D59',
                fontSize: '12px'
            },
            symbolHeight: 0,    // This helps to remove default legends
            symbolWidth: 0, // This helps to remove default legends
            labelFormatter: function(this : any) {
                return '<span style="display:inline-block;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                   '<circle opacity="0.25" cx="8" cy="11" r="8" fill="' + this.color + '"/>' +
                   '<circle cx="8" cy="11" r="3.5" fill="' + this.color + '" stroke="white"/>' +
                   '</svg></span> ' + this.name;
            },
            navigation: {
                enabled: true,
            }   
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    enabled: false,
                    // menuItems: [
                    //     'downloadJPEG', // Allow JPEG export
                    //     'separator', 
                    //     'downloadCSV'   // Allow CSV export
                    // ]
                }
            }
        }
    });

    // Adjust chart height based on full-screen state
    useEffect(() => {
        // Mode Selection in Widget
        if (inFullScreen) {
            inFullScreen(isFullscreen)
        };
        const newHeight = isFullscreen ? EnlargeHeight(770) : height;
        // console.log("FULL", isFullscreen, newHeight)
        setChartOptions((prevOptions) => ({
            ...prevOptions,
            chart: {
                ...prevOptions.chart,
                height: newHeight
            }
        }));
    }, [isFullscreen, height]);

    // Update chart options when apiData or props change
    useEffect(() => {
        setChartOptions((prevOptions) => ({
            ...prevOptions,
            series: apiData || [{}],
            ...props
        }))
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
        <HighchartsReact highcharts={Highcharts} options={chartOption} ref={ref || chartRef} />
    );
  }
);

export default AreaSplineChart;