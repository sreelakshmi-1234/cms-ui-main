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

interface ColumnChartProps {
  apiData?: Object[];
  height?: Number | string;
  bg?: string;
  category?: string[];
  legendHeight?: number;
  xAxisInterval?: number | string;
  props?: any;
  isFullscreen?: boolean;
  onExportReady?: (functions: ExportFunction) => void;
  inFullScreen?: (mode: boolean) => void;
}

const ColumnChart: React.FC<ColumnChartProps> = ({ apiData, height = 280, bg, category, legendHeight = 40, xAxisInterval = "auto", props, isFullscreen = false, inFullScreen, onExportReady }) => {
  // console.log("FULL", isFullscreen)
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  // ResizeObserver benign errors suppress
  useEffect(() => {
    const handleROError = (e: any) => {
      if (
        e?.message === 'ResizeObserver loop completed with undelivered notifications.' ||
        e?.message === 'ResizeObserver loop limit exceeded'
      )
        e.stopImmediatePropagation?.();
    };
    window.addEventListener('error', handleROError);
    return () => window.removeEventListener('error', handleROError);
  }, []);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'column',
      backgroundColor: bg || "transparent",
      height: height,
      // options3d: {
      //   enabled: true,
      //   alpha: 7, // Adjust this to control the tilt
      //   beta: 0,  // Adjust this to control the rotation
      //   depth: 0, // Adjust this to control the depth of the bars
      //   // viewDistance: 25
      // },
      style: {
        fontFamily: 'Montserrat, sans-serif',
        color: "#062D59",
        fontSize: isFullscreen ? EnlargeHeight(12) : 12
      },
      plotBorderWidth: 1,
      plotBorderColor: '#DFDFDF',
      plotBorderDashStyle: 'Dash',
      className: "dashed-border",

      /* Buttons — SHOW ALL & HIDE ALL — (locked position, never disappear) */
      events: {
        // 1) Ensure once chart is loaded ( no delay)
        load: function (this: Highcharts.Chart) {
          const chart = this as any;
          if (typeof chart._ensureButtons === 'function') chart._ensureButtons();
          if (typeof chart._positionButtons === 'function') chart._positionButtons();
          chart.redraw?.(); // immediate
        },

        // 2) Every render: re-ensure & re-position
        render: function (this: Highcharts.Chart) {
          const chart = this as any;
          const lg: any = this.legend;
          if (!lg?.group) return;

          const g = lg.group;
          const allBB = g.getBBox();
          const tX = (g as any).translateX || 0;
          const tY = (g as any).translateY || 0;

          // ---- Config ----
          const H = 14;
          const W_SHOW = 48;
          const W_HIDE = 48;
          const PAD = 2;

          // Polished look (same size/anchors)
          const BTN_NORMAL_ATTR = { fill: '#FFFFFF', stroke: '#CFE0FF', 'stroke-width': 1, zIndex: 9 };
          const BTN_HOVER_ATTR = { fill: '#F4F8FF', stroke: '#AFC8FF', 'stroke-width': 1, zIndex: 9 };
          const BTN_ACTIVE_ATTR = { fill: '#E8F1FF', stroke: '#7FA8FF', 'stroke-width': 1, zIndex: 9 };
          const BTN_RADIUS = 10; // rounded pill
          const BTN_CSS = {
            cursor: 'pointer',
            fontSize: '10px',
            fontWeight: '400',
            color: '#062D59',
            lineHeight: `${H}px`,
            padding: '0 6px',
            letterSpacing: '0.2px',
            textTransform: 'none',
            userSelect: 'none' as const,
          };

          // ---- creators (idempotent)
          if (!chart._ensureButtons) {
            chart._ensureButtons = () => {
              try {
                // Hide all
                if (!chart._hideGrp || !chart._hideBtn) {
                  chart._hideGrp = chart.renderer.g('hide-grp').add();
                  const hideHandler = () => {
                    chart.series.forEach((s: any) => {
                      if (s.options.showInLegend !== false) s.setVisible(false, false);
                    });
                    chart.redraw();
                  };
                  chart._hideBtn = chart.renderer
                    .button(
                      'Hide all',
                      0,
                      0,
                      hideHandler,
                      { r: 0, padding: 1, ...BTN_NORMAL_ATTR },
                      { r: 0, padding: 1, ...BTN_HOVER_ATTR },
                      { r: 0, padding: 1, ...BTN_ACTIVE_ATTR }
                    )
                    .attr({ width: W_HIDE, height: H, title: 'Hide all series' })
                    .add(chart._hideGrp)
                    .css(BTN_CSS);

                  // keep bold style persistent across interactions
                  try {
                    const applyHideCss = () => {
                      try {
                        chart._hideBtn && chart._hideBtn.css(BTN_CSS);
                      } catch { }
                      try {
                        const el = chart._hideBtn.element as any;
                        if (el && el.childNodes) {
                          for (let i = 0; i < el.childNodes.length; i++) {
                            const ch: any = el.childNodes[i];
                            try {
                              if ((ch.tagName || '').toLowerCase() === 'text') {
                                ch.setAttribute('font-weight', '700');
                                ch.setAttribute('font-size', BTN_CSS.fontSize || '12px');
                                ch.setAttribute('fill', BTN_CSS.color || '#062D59');
                              }
                            } catch (e) {
                              /* ignore */
                            }
                          }
                        }
                      } catch (e) {
                        /* ignore */
                      }
                    };
                    ['pointerdown', 'pointerup', 'click', 'focus', 'blur', 'mouseenter', 'mouseleave'].forEach((ev) => {
                      try {
                        chart._hideBtn.element.addEventListener(ev, applyHideCss);
                      } catch { }
                    });
                    // initial enforce
                    applyHideCss();
                  } catch (e) {
                    /* ignore */
                  }
                }

                // Show all
                if (!chart._showGrp || !chart._showBtn) {
                  chart._showGrp = chart.renderer.g('show-grp').add();
                  const showHandler = () => {
                    chart.series.forEach((s: any) => {
                      if (s.options.showInLegend !== false) s.setVisible(true, false);
                    });
                    chart.redraw();
                  };
                  chart._showBtn = chart.renderer
                    .button(
                      'Show all',
                      0,
                      0,
                      showHandler,
                      { r: 0, padding: 1, ...BTN_NORMAL_ATTR },
                      { r: 0, padding: 1, ...BTN_HOVER_ATTR },
                      { r: 0, padding: 1, ...BTN_ACTIVE_ATTR }
                    )
                    .attr({ width: W_SHOW, height: H, title: 'Show all series' })
                    .add(chart._showGrp)
                    .css(BTN_CSS);

                  // keep bold style persistent across interactions
                  try {
                    const applyShowCss = () => {
                      try {
                        chart._showBtn && chart._showBtn.css(BTN_CSS);
                      } catch { }
                      try {
                        const el = chart._showBtn.element as any;
                        if (el && el.childNodes) {
                          for (let i = 0; i < el.childNodes.length; i++) {
                            const ch: any = el.childNodes[i];
                            try {
                              if ((ch.tagName || '').toLowerCase() === 'text') {
                                ch.setAttribute('font-weight', '700');
                                ch.setAttribute('font-size', BTN_CSS.fontSize || '12px');
                                ch.setAttribute('fill', BTN_CSS.color || '#062D59');
                              }
                            } catch (e) {
                              /* ignore */
                            }
                          }
                        }
                      } catch (e) {
                        /* ignore */
                      }
                    };
                    ['pointerdown', 'pointerup', 'click', 'focus', 'blur', 'mouseenter', 'mouseleave'].forEach((ev) => {
                      try {
                        chart._showBtn.element.addEventListener(ev, applyShowCss);
                      } catch { }
                    });
                    // initial enforce
                    applyShowCss();
                  } catch (e) {
                    /* ignore */
                  }
                }
              } catch {
                /* noop */
              }
            };
          }

          // ---- positioner (ALWAYS same spot)
          // ---- positioner (ALWAYS at bottom — consistent across chart types)
          if (!chart._positionButtons) {
            chart._positionButtons = () => {
              const PAD = 2;
              const H = 54;

              // 🔸 ALWAYS position at bottom of chart (not legend, not plot area)
              const bottomY = chart.chartHeight - H - PAD;
              const showXLeft = PAD;
              const hideXRight = Math.max(PAD, chart.chartWidth - W_HIDE - PAD);

              chart._showGrp?.attr({ translateX: showXLeft, translateY: bottomY });
              chart._hideGrp?.attr({ translateX: hideXRight, translateY: bottomY });

              // Ensure visibility and stacking
              chart._showGrp?.attr({ visibility: 'visible' });
              chart._hideGrp?.attr({ visibility: 'visible' });
              chart._showGrp?.toFront?.();
              chart._hideGrp?.toFront?.();
            };
          }
          // idempotent calls every render
          chart._ensureButtons();
          chart._positionButtons();
        },

        // 3) Redraw hook (resize, series toggle, etc.)
        redraw: function (this: Highcharts.Chart) {
          const chart = this as any;
          chart._ensureButtons?.();
          chart._positionButtons?.();
        },
      },
      /* 🔧 ADD END */
    },
    title: {
      text: null
    },
    series: [] as Object[],
    plotOptions: {
      column: {
        dataLabels: {
          enabled: false
        },
        pointWidth: 7,
        pointPadding: 0,
        borderRadius: 0
        // borderWidth : 1,
      },
      series: {
        states: {
          inactive: { opaciX: 0.15 },
          hover: { lineWidthPlus: 2, halo: { size: 6 } },
        },
        marker: { enabled: false, states: { hover: { enabled: true, radiusPlus: 2 } } },
        events: {
          mouseOver: function (this: Highcharts.Series) {
            const chart = this.chart;
            chart.series.forEach((s) => {
              if (s !== this) s.setState('inactive');
            });
          },
          mouseOut: function (this: Highcharts.Series) {
            const chart = this.chart;
            chart.series.forEach((s) => s.setState('')); // fixed missing paren
          },
        },
      },
    },
    legend: {
      enabled: true,
      align: 'center',
      verticalAlign: 'bottom',
      symbolShape: 'square', // Keep this for other chart Xpes, but it won't be applied to column chart symbols
      symbolHeight: 0,
      symbolWidth: 0,
      useHTML: true, // Allow HTML rendering for custom symbols
      itemSXle: {
        overflow: "auto",
        color: '#062D59',
        fontSize: '12px',
      },
      maxHeight: legendHeight,
      labelFormatter: function (this: any) {
        // Create a custom square legend symbol with the background color of each series
        // Here we avoid using the default circle symbol
        return '<span style="width: 10px; height: 10px; display: inline-block; background-color: ' + this.color + '; border-radius: 0;"></span> ' + this.name;
      },
    },
    tooltip: {
      shared: true,
      // pointFormat: '{series.name}: {point.y}<br/>'
      useHTML: true,
      outside: false,
      borderRadius: 6,
      padding: 8,
      formatter: function (this: any) {
        const date = Highcharts.dateFormat('%e %b, %H:%M', this.x);

        const hovered = this.points.find((p: any) => p.series?.state === 'hover') || null;

        const rows = [...this.points]
          .sort((a: any, b: any) => {
            if (a === hovered) return -1;
            if (b === hovered) return 1;
            return (a.series?.name || '').localeCompare(b.series?.name || '');
          })
          .map((p: any) => {
            const isHovered = p === hovered;
            const name = p.series?.name || 'Series';
            const unit = (p.series?.userOptions as any)?.unit || '';
            return `
                <div style="white-space:nowrap; ${isHovered ? 'font-weight:700;' : ''}">
                  <span style="color:${p.color}">\u25CF</span>
                  ${name}: <b>${Highcharts.numberFormat(p.y, 2)}</b> ${unit}
                  ${isHovered ? '<span style="margin-left:6px;padding:1px 6px;border:1px solid #cfd8e3;border-radius:10px;font-size:11px;">selected</span>' : ''}
                </div>`;
          })
          .join('');

        return `<div><b></b></div>${rows}`;
      },
      // formatter: function (this : any) {
      //   var points = this.points.map(function (point : any) {
      //       return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y + '</b>';
      //   });
      //   return points.join('<br/>');
      // }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        enabled: true,
        tickInterval: xAxisInterval,
        style: {
          color: '#062D59',
          fontSize: '14px'
        },
      },
      gridLineDashStyle: 'Dash',
      gridLineWidth: 1, // Ensure grid line width is set
      tickLength: 0,
      gridLineColor: '#DFDFDF',
      lineColor: "#DFDFDF",
      dateTimeLabelFormats: {
        month: '%b %y', // Custom format for months
        year: '%Y' // Format for years if needed
      },
    },
    yAxis: {
      title: {
        text: null
      },
      className: 'dashed-border',
      gridLineWidth: 1,
      gridLineDashStyle: 'Dash',
      tickAmount: !isFullscreen ? 6 : 10,
      lineWidth: 2,
      // lineDashStyle: 'Dash',
      gridLineColor: '#DFDFDF',
      lineColor: "#DFDFDF",
      labels: {
        style: {
          color: '#062D59',
          fontSize: '14px'
        }
      },
    },
    exporting: {
      enabled: false,
      buttons: {
        contextButton: {
          menuItems: [
            'downloadJPEG', // Allow JPEG export
            'separator',
            'downloadCSV'   // Allow CSV export
          ]
        }
      },
      csv: {
        dateFormat: '%Y-%m-%d' // Format to export only the date
      }
    },
    credits: {
      enabled: false
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
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        series: apiData,
        ...props
      }));

      if (category) {
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          xAxis: {
            ...prevOptions.xAxis,
            categories: category
          }
        }));
      }
    }
  }, [apiData, category, props]);

  // Export PNG function
  const exportPNG = () => {
    chartRef.current?.chart.exportChart(
      { type: 'image/png', filename: 'chart-png' }, // Exporting options
      {} // Chart options (no changes)
    );
  };

  // Export CSV function
  // const exportCSV = () => {
  //   chartRef.current?.chart.downloadCSV();
  // };
  const exportCSV = () => {
    const chart = chartRef.current?.chart;
    if (!chart) return;

    // Get all visible series
    const series = chart.series.filter(s => s.visible);
    if (series.length === 0) return;

    // Collect all unique x values (timestamps)
    const xSet = new Set<number>();
    series.forEach(s => {
      s.data.forEach((point: any) => {
        if (point && typeof point.x === 'number') xSet.add(point.x);
      });
    });
    const xValues = Array.from(xSet).sort((a, b) => a - b);

    // Build header
    let header = ['DateTime', ...series.map(s => s.name)];

    // Build rows for each x (date)
    let rows: any[] = [];
    for (let xi = 0; xi < xValues.length; xi++) {
      const x = xValues[xi];
      const date = new Date(x);
      const dateStr = date.toISOString().slice(0, 10);
      let row = [dateStr];
      for (let s = 0; s < series.length; s++) {
        const pt = series[s].data.find((p: any) => p && p.x === x);
        row.push(pt && pt.y !== undefined && pt.y !== null ? String(pt.y) : '');
      }
      rows.push(row);
    }

    // Calculate totals for each series (column)
    let totalRow = ['Total'];
    for (let s = 0; s < series.length; s++) {
      let sum = 0;
      for (let xi = 0; xi < xValues.length; xi++) {
        const x = xValues[xi];
        const pt = series[s].data.find((p: any) => p && p.x === x);
        let val = pt && pt.y !== undefined && pt.y !== null ? Number(pt.y) : 0;
        if (typeof val === 'number' && !isNaN(val)) sum += val;
      }
      totalRow.push(Number.isFinite(sum) ? String(sum) : '');
    }
    rows.push(totalRow);

    // Convert to CSV string
    let csv = header.join(',') + '\r\n';
    rows.forEach(row => {
      csv += row.join(',') + '\r\n';
    });

    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Pass export functions to parent when ready
  useEffect(() => {
    if (onExportReady) {
      onExportReady({ exportPNG, exportCSV });
    }
  }, [onExportReady]);

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
    </>

  );
}
export default ColumnChart;