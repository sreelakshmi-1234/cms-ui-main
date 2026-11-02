import React, {forwardRef, useEffect, useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { EnlargeWidgetSize } from '../../../Services/EnlargeWidget';

interface columnLineType {
    apiData? : Object[];
    bg? : string;
    height? : number | string;
    legendHeight? : number;
    props? : any,
    isFullscreen? : boolean;
}

const ColumnLineChart = forwardRef<HighchartsReact.RefObject, columnLineType>(
    ({apiData, bg, height=220, legendHeight=40, props, isFullscreen=false}, ref) => {

        const [chartOptions, setChartOptions] = useState({
            chart : {
                backgroundColor : bg || "transparent",
                height : height
            },
            title: {
                text: ''
            },
            xAxis: {
                type: "datetime",
                label : {
                    enabled : false,
                    style: {
                        fontSize: '10px',
                        fontFamily: 'inter',
                    }
                }
            },
            yAxis: [{
                title: {
                    text: 'Primary Axis'
                }
            }, {
                title: {
                    text: 'Secondary Axis'
                },
                opposite: true
            }],
            series: [] as Object[],
            credits : {
                enabled : false
            },
            legend: {
                enabled: true,
                align: "left",
                useHTML : true,
                maxHeight : legendHeight,
                itemStyle: {
                    fontFamily: 'Inter',
                    overflow : "auto"
                }
            },
            exporting : {
                enabled : true,
                buttons: {
                    contextButton: {
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
        const newHeight = isFullscreen ? 'auto' : height;
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
                    series: apiData || [],
                    ...props
                });
            }
        }, [apiData, props]);

        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                ref={ref} // Forward the ref to HighchartsReact
            />
        );
    }
);

export default ColumnLineChart;