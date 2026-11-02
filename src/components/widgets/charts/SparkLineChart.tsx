import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface SparkLineChartProps {
    data : Number[];
    stat : Number;
    tooltip? : boolean;
}

const SparklineChart : React.FC<SparkLineChartProps> = ({data ,stat, tooltip=false}) => {
    const options = {
        chart: {
            type: 'areaspline',
            height: "67", // Adjust the height as needed
            width : 84,
            backgroundColor : "transparent",
            margin: [0, 0, 0, 5], // Adjust the margins to make it compact
        },
        title: {
            text: null
        },
        xAxis: {
            visible: false
        },
        yAxis: {
            visible: false
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {point.y}',
            valueDecimals: 2,
            enabled : tooltip,
            style: {
                padding : 0,
                fontSize: '8px',
            }
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: false // Disable data point markers
                },
            },
            series: {
                type : "areaspline",
                lineWidth : 1,
                marker: {
                    enabled: false // Disable data point markers
                },
                spline: {
                    marker: {
                        enable: false
                    }
                }
            }
        },
        series: [{
            data: data, // Add your data points here
            lineColor: Number(stat)>=0?"rgba(5, 186, 59, 1)":"rgba(255, 72, 72, 1)", // Customize the color as needed
            fillColor : {
                linearGradient : [0, 0, 0, 60],
                stops : [
                    [0, Number(stat)>=0?"rgba(5, 186, 59, 0.4)":"rgba(255, 72, 72, 0.4)"],
                    [1, Number(stat)>=0?"rgba(5, 186, 59, 0)":"rgba(255, 72, 72, 0)"]
                ]
            },
        }],
        credits : {
            enabled : false
        },
        exporting : {
            enabled : false
        }
    }
    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
}

export default SparklineChart;