import React, { useEffect, useRef, useState } from 'react';
import Highcharts, { Options, Series } from 'highcharts/highstock';
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

interface CandlestickChartProps {
    apiData? : any[];
    bg? : string;
    height? : Number | string;
    isFullscreen? : boolean;
    onExportReady? : (functions : ExportFunction) => void;
}

const CandlestickChart: React.FC <CandlestickChartProps> = ({apiData, bg, height=270, isFullscreen=false, onExportReady}) => {
    const chartRef = useRef<HighchartsReact.RefObject>(null);
    

    // console.log(apiData, "candlestick")
const [chartOption, setChartOption] = useState({
        chart : {
            height : height,
            backgroundColor : bg || "transparent",
            style: {
                fontFamily: 'Montserrat, sans-serif',
                color: "#062D59"
            },
            zooming: {
                type: null // Disable zooming
            },
            className : "hide-scrollbar"
        },
        title: {
            text: ''
        },
        tooltip: {
            shared: true,
            valueDecimals: 2,
            useHTML: true,
            pointFormat: '<b>{point.series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}',
            backgroundColor: '#ffffff',
            borderColor: '#3C5FC5',
        },
        plotOptions: {
            candlestick: {
                color: '#35B5FF', // Bearish candle body color
                lineColor: '#35B5FF', // Bearish wick color
                upColor: '#35B5FF', // Bullish candle body color
                upLineColor: '#35B5FF', // Bullish wick color
                lineWidth: 5, // Set wick width
                pointWidth : 8
            }
        },
        xAxis : {
            type: 'datetime',
            labels: {
                enabled: true,
                style: {
                color: '#062D59',
                fontSize: '14px'
                },
            },
            gridLineDashStyle: 'Dash',
            gridLineWidth: 0, // Ensure grid line width is set
            tickLength: 0,
            gridLineColor: '#DFDFDF',
            lineColor : "#DFDFDF",
            scrollbar: {
                enabled: false // Disable the scrollbar
            },
        },
        yAxis : {
            gridLineDashStyle: 'Dash',
            gridLineWidth: 1, // Ensure grid line width is set
            tickLength: 0,
            gridLineColor: '#DFDFDF',
            lineColor : "#DFDFDF",
            opposite : false,
            tickAmount : 7
        },
        rangeSelector: {
            enabled: false // Disable the range selector
        },
        navigator: {
            enabled: false // Disable the navigator (footer part)
        },
        series: [{
            type: 'candlestick',
            name: 'AAPL',
            data: [
                [1625097600000, 145.0, 150.0, 144.0, 149.0],
                [1625184000000, 149.0, 152.0, 148.0, 151.0],
                [1625270400000, 151.0, 153.0, 150.0, 152.0],
                // Add more data points here
            ],
            // color: '#3C5FC5', // Down candle color
            // upColor: '#3C5FC5', // Up candle color
            // lineWidth: 5, // Wick line width
            // borderWidth: 0, // Border width for the candles
            dataGrouping: {
                enabled: false // Enable data grouping for better performance
            },
            // pointWidth : 8,
            style: {
                color: '#333333',
            },
        }] as any[],
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
        },
        credits : {
            enabled : false
        }
    });

    // Adjust chart height based on full-screen state
    useEffect(() => {
        const newHeight = isFullscreen ? EnlargeHeight(770) : height;
        setChartOption((prevOptions) => ({
            ...prevOptions,
            chart: {
                ...prevOptions.chart,
                height: newHeight
            }
        }));
    }, [isFullscreen, height]);

    useEffect(() => {
        if (apiData && apiData.length > 0) {
            const transformedSeries = apiData.map(series => {
                const candlestickData = series.data.map((point : any, index : any) => {
                    // Assuming the value is the closing price and using the previous and next values for open, high, and low
                    const open = index > 0 ? series.data[index - 1][1] : point[1];
                    const high = Math.max(open, point[1]);
                    const low = Math.min(open, point[1]);
                    const close = point[1];

                    return [point[0], open, high, low-1, close-1];
                });

                return {
                    name: series.name,
                    type: series.type || 'candlestick',
                    data: candlestickData,
                    marker: {
                        enabled: false
                    }
                };
            });

            setChartOption(prevOptions => ({
                ...prevOptions,
                series: transformedSeries
            }));
        }
    }, [apiData]);

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
                constructorType={'stockChart'}
                options={chartOption}
                ref={chartRef}
            />
        </div>
    );
};

export default CandlestickChart;