import React, { memo, useEffect, useState } from 'react';
import Highcharts, { color } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface DonutPieChartProps {
  apiData : Object[];
  pieColors : string[];
  height? : number | string;
  name? : string;
  legends? : boolean;
  title? : string;
  titleAlign? : string;
  plotOptionDataEnabled? : boolean;
  titleVerticalAlign? : string;
}

const DonutPieChart: React.FC<DonutPieChartProps> = ({apiData, pieColors, height=250, name="series", legends=true, title="", titleAlign="left", titleVerticalAlign='top', plotOptionDataEnabled=false}) => {

  const options = {
    chart: {
      type: 'pie',
      height: height,
      backgroundColor: 'transparent',
    },
    title: {
      text: title,
      align: titleAlign,
      verticalAlign : titleVerticalAlign,
      style: {
        fontFamily: 'Montserrat, sans-serif',
        color: "#062D59",
        fontSize: 14
      },
    },
    subtitle: {
      text:  '',//'<b style="padding-left= 10px">10</b>',
      align: 'left',
      verticalAlign: 'middle',
        style: {
            fontSize: '18px',
            // fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
            color : "#000",
        },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b>'  //'{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        borderWidth: 2,
        cursor: 'pointer',
        dataLabels: {
          enabled: plotOptionDataEnabled,
          format: '{point.name}: {point.y}',
          distance: 10,
          style: {
            color : '#062D59',
            fontWeight : '400',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 9
          }

        },
        innerSize: '50%',
        showInLegend: true,
      },
    },
    legend: {
      enabled : legends,
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      symbolRadius: 4,
      symbolHeight: 8,
      itemStyle: {
        fontWeight: 500,
        fontSize: 12,
        color: '#657079',
        fontFamily: 'Montserrat, sans-serif',
      },
    },
    colors : pieColors || [
                  '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                  '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
                  '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                  '#03c69b', '#00f194'
              ],
    series: [
      {
        enableMouseTracking: true,
        animation: {
          duration: 2000,
        },
        colorByPoint: true,
        innerSize : '55%',
        name : name,
        data: apiData || [],
      },
    ],
    credits: {
      enabled: false,
    },
    exporting : {
      enabled : false
  }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default memo(DonutPieChart);
