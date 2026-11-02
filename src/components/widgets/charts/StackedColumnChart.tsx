import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import HighchartsFullScreen from 'highcharts/modules/full-screen';
import HighchartsReact from 'highcharts-react-official';
import { EnlargeHeight, EnlargeWidgetSize } from '../../../Services/EnlargeWidget';
import '../../../App.css';

Highcharts3D(Highcharts); // Initialize the 3D module
HighchartsFullScreen(Highcharts);
//  init exporting module
exporting(Highcharts);
exportData(Highcharts);

interface ExportFunction {
    exportPNG: () => void;
    exportCSV: () => void;
}

interface StakedColumnProps {
    apiData?: Object[];
    height?: Number;
    bg?: string;
    isFullscreen?: boolean;
    legendHeight?: number;
    props?: any;
    onExportReady?: (functions: ExportFunction) => void;
    inFullScreen?: (mode: boolean) => void;
}

const StackedColumnChart: React.FC<StakedColumnProps> = ({ apiData, height = 210, legendHeight = 40, bg, isFullscreen = false, props, inFullScreen, onExportReady }) => {
    const chartRef = useRef<HighchartsReact.RefObject>(null);

    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: "column",
            backgroundColor: bg || "transparent",
            height: height,
            options3d: {
                enabled: true,
                alpha: 7, // Adjust this to control the tilt
                beta: 0,  // Adjust this to control the rotation
                depth: 0, // Adjust this to control the depth of the bars
                // viewDistance: 25
            },
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
            type: 'datetime',
            labels: {
                enabled: true,
                style: {
                    color: '#062D59',
                    fontSize: '12px'
                }
            },
            gridLineDashStyle: 'Dash',
            // lineWidth : 2,
            gridLineWidth: 1, // Ensure grid line width is set
            tickLength: 0,
            gridLineColor: '#DFDFDF',
            lineColor: "#DFDFDF",
        },
        yAxis: {
            title: {
                text: null
            },
            stackLabels: {
                enabled: false
            },
            labels: {
                enabled: true,
                style: {
                    color: '#062D59',
                    fontSize: '12px'
                }
            },
            tickAmount: !isFullscreen ? 6 : 10,
            gridLineDashStyle: 'Dash',
            gridLineWidth: 1, // Ensure grid line width is set
            tickLength: 0,
            gridLineColor: '#DFDFDF',
            lineColor: "#DFDFDF",
        },
        legend: {
            enabled: true,
            align: 'left',
            verticalAlign: 'bottom',
            // x: 0,
            // y: 100,
            maxHeight: legendHeight,
            useHTML: true,
            itemStyle: {
                overflow: "auto",
                color: '#062D59',
                fontSize: '12px'
            }
        },
        tooltip: {
            shared: true,
            // pointFormat: '{series.name}: {point.y}<br/>'//Total: {point.stackTotal}
            formatter: function (this: any) {
                var points = this.points.map(function (point: any) {
                    return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y + '</b>';
                });
                return points.join('<br/>');
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    format: '{point.y} units'
                }
            }
        },
        series: [] as Object[],
        credits: {
            enabled: false
        },
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    enabled: false,
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
        // Mode Selection in Widget
        if (inFullScreen) {
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
            setChartOptions({
                ...chartOptions,
                series: apiData,
                ...(props || {})
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
        <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
    );
};

export default StackedColumnChart;