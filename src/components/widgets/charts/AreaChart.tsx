import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { EnlargeHeight, EnlargeWidgetSize } from '../../../Services/EnlargeWidget';

interface AreaChartProps {
    apiData? : Object[];
    height? : Number | string;
    bg ? : string;
    isFullscreen? : boolean;
}

const AreaChart : React.FC <AreaChartProps> = ({apiData, height=290, bg, isFullscreen=false}) => {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'area',
            backgroundColor : bg || "transparent",
            height : height,
            zoomType : "x"
        },
        title: {
            text: ''
        },
        xAxis: {
            type : 'datetime'
        },
        yAxis: {
            title: {
                text: 'Values'
            }
        },
        series: [] as Object[],
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
                series: apiData
            });
        }
    }, [apiData]);

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
        />
    );
};

export default AreaChart;