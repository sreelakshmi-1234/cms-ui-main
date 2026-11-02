import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { EnlargeWidgetSize } from '../../../Services/EnlargeWidget';

interface BarLineChartProps {
    apiData? : Object[];
    height? : Number | string;
    bg? : string;
    isFullscreen? : boolean;
}

const BarLineChart: React.FC <BarLineChartProps> = ({apiData, height, bg, isFullscreen=false}) => {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'bar', // Set the default type to bar
            height : height,
            backgroundColor : bg || "transparent"
        },
        title: {
            text: ''
        },
        xAxis: {
            type : 'datetime'
        },
        yAxis: {
            title: {
                text: ''
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
        },
        credits : {
            enabled : false
        }
    });

    // Adjust chart height based on full-screen state
    useEffect(() => {
        const newHeight = isFullscreen ? EnlargeWidgetSize(800) : height;
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
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    );
};

export default BarLineChart;