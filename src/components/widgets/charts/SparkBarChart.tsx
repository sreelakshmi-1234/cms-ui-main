import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { EnlargeHeight, EnlargeWidgetSize, EnlargeWidgetSizeWidth } from '../../../Services/EnlargeWidget';


interface SparkBarChartProps {
    apiData? : number[];
    colors? : string[];
}

const SparkBarChart: React.FC <SparkBarChartProps> = ({apiData, colors}) => {
    // console.log(apiData)
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'bar',
            backgroundColor : "transparent",
            style: {
                fontFamily: 'Montserrat, sans-serif',
                color : "#062D59"
            },
            height : 95,
            width : 238,
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['SoC', 'DoD', 'SoH'],
            lineColor: 'transparent', // Make the axis line invisible
            tickLength: 0, // Hide the axis ticks as well
            labels : {
                padding : "1px",
                style : {
                    fontSize : EnlargeWidgetSize(14),
                    fontWeight : 400,
                    color : '#062D59'
                }
            }
        },
        yAxis: {
            visible: false,
            min: 0,
            max: 100
        },
        tooltip : {
            shared : true,
            pointFormat: '{point.y}%<br/>'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: false,
                    inside: false,
                },
                pointWidth : EnlargeWidgetSize(9),
                pointRaduis : 0,
                colorByPoint : true,
                colors: colors || ['#FDAB70', '#C38AFF', '#8CFDBF'],
            }
        },
        series: [] as Object[],
        exporting : {
            enabled : false
        },
        credits : {
            enabled : false
        },
        legend : {
            enabled : false
        }
    });

    useEffect(() => {
        if(apiData) {
            setChartOptions({
                ...chartOptions,
                series : [{
                    data : apiData || [85, 45, 65]
                }]
            })
        }
    }, [apiData])

    return (

        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    );
}



export default SparkBarChart;