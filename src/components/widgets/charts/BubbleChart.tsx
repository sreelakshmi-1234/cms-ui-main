import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { EnlargeHeight } from '../../../Services/EnlargeWidget';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import '../../../App.css';

// init exporting module
exporting(Highcharts);
exportData(Highcharts);

interface ExportFunction {
    exportPNG: () => void;
    exportCSV: () => void;
}

interface BubbleChartProps {
    apiData?: any[];
    height?: number | string;
    bg?: string;
    props?: any;
    isFullscreen?: boolean;
    onExportReady?: (functions: ExportFunction) => void;
}

const BubbleChart = React.forwardRef<HighchartsReact.RefObject, BubbleChartProps>(({ apiData, height = 260, bg, props, isFullscreen = false, onExportReady }, ref) => {
    const chartRef = useRef<HighchartsReact.RefObject>(null);
    const [isFullscreenActive, setIsFullscreenActive] = useState(false);

    const [chartOptions, setChartOptions] = useState<any>({
        chart: {
            type: 'bubble',
            zoomType: 'xy',
            backgroundColor: bg || 'transparent',
            height: height,
            style: { fontFamily: 'Montserrat, sans-serif', color: '#062D59' },
            plotBorderWidth: 1,
            plotBorderColor: '#DFDFDF',
            plotBorderDashStyle: 'Dash',
            className: 'dashed-border',
            events: {
                load: function (this: Highcharts.Chart) {
                    const chart = this as any;
                    if (typeof chart._ensureButtons === 'function') chart._ensureButtons();
                    if (typeof chart._positionButtons === 'function') chart._positionButtons();
                    chart.redraw?.();
                },
                render: function (this: Highcharts.Chart) {
                    const chart = this as any;
                    const lg: any = this.legend;
                    if (!lg?.group) return;

                    const g = lg.group;

                    const H = 14;
                    const W_SHOW = 48;
                    const W_HIDE = 48;
                    const PAD = 2;

                    const BTN_NORMAL_ATTR = { fill: '#FFFFFF', stroke: '#CFE0FF', 'stroke-width': 1, zIndex: 9 };
                    const BTN_HOVER_ATTR = { fill: '#F4F8FF', stroke: '#AFC8FF', 'stroke-width': 1, zIndex: 9 };
                    const BTN_ACTIVE_ATTR = { fill: '#E8F1FF', stroke: '#7FA8FF', 'stroke-width': 1, zIndex: 9 };
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

                    if (!chart._ensureButtons) {
                        chart._ensureButtons = () => {
                            try {
                                if (!chart._hideGrp || !chart._hideBtn) {
                                    chart._hideGrp = chart.renderer.g('hide-grp').add();
                                    const hideHandler = () => {
                                        chart.series.forEach((s: any) => {
                                            if (s.options.showInLegend !== false) s.setVisible(false, false);
                                        });
                                        chart.redraw();
                                    };
                                    chart._hideBtn = chart.renderer
                                        .button('Hide all', 0, 0, hideHandler, { r: 0, padding: 1, ...BTN_NORMAL_ATTR }, { r: 0, padding: 1, ...BTN_HOVER_ATTR }, { r: 0, padding: 1, ...BTN_ACTIVE_ATTR })
                                        .attr({ width: W_HIDE, height: H, title: 'Hide all series' })
                                        .add(chart._hideGrp)
                                        .css(BTN_CSS);
                                }

                                if (!chart._showGrp || !chart._showBtn) {
                                    chart._showGrp = chart.renderer.g('show-grp').add();
                                    const showHandler = () => {
                                        chart.series.forEach((s: any) => {
                                            if (s.options.showInLegend !== false) s.setVisible(true, false);
                                        });
                                        chart.redraw();
                                    };
                                    chart._showBtn = chart.renderer
                                        .button('Show all', 0, 0, showHandler, { r: 0, padding: 1, ...BTN_NORMAL_ATTR }, { r: 0, padding: 1, ...BTN_HOVER_ATTR }, { r: 0, padding: 1, ...BTN_ACTIVE_ATTR })
                                        .attr({ width: W_SHOW, height: H, title: 'Show all series' })
                                        .add(chart._showGrp)
                                        .css(BTN_CSS);
                                }
                            } catch {
                                /* noop */
                            }
                        };
                    }

                    if (!chart._positionButtons) {
                        chart._positionButtons = () => {
                            const PAD = 2;
                            const H = 54;
                            const bottomY = chart.chartHeight - H - PAD;
                            const showXLeft = PAD;
                            const hideXRight = Math.max(PAD, chart.chartWidth - W_HIDE - PAD);
                            chart._showGrp?.attr({ translateX: showXLeft, translateY: bottomY });
                            chart._hideGrp?.attr({ translateX: hideXRight, translateY: bottomY });
                            chart._showGrp?.attr({ visibility: 'visible' });
                            chart._hideGrp?.attr({ visibility: 'visible' });
                            chart._showGrp?.toFront?.();
                            chart._hideGrp?.toFront?.();
                        };
                    }

                    chart._ensureButtons();
                    chart._positionButtons();
                },
                redraw: function (this: Highcharts.Chart) {
                    const chart = this as any;
                    chart._ensureButtons?.();
                    chart._positionButtons?.();
                },
            },
        },
        title: { text: '' },
        credits: { enabled: false },
        tooltip: {
            useHTML: true,
            formatter: function (this: any) {
                const name = this.series?.name || '';
                const x = this.x;
                const y = Number(this.y);
                const z = this.point?.z;
                return `
                    <div style="white-space:nowrap; font-family: Montserrat, sans-serif;">
                      <div style="font-weight:700; margin-bottom:6px;">${name}</div>
                      <div>Health Score: ${x}</div>
                      <div>Revenue: ${y.toLocaleString()}</div>
                      <div>Capacity: ${z} MW</div>
                    </div>
                `;
            },
        },
        plotOptions: {
            series: {
                states: { inactive: { opacity: 0.15 }, hover: { enabled: true, halo: { size: 8 } } },
                events: {
                    mouseOver: function (this: Highcharts.Series) {
                        const chart = this.chart;
                        chart.series.forEach((s) => {
                            if (s !== this) s.setState('inactive');
                        });
                    },
                    mouseOut: function (this: Highcharts.Series) {
                        const chart = this.chart;
                        chart.series.forEach((s) => s.setState(''));
                    },
                },
            },
            bubble: {
                minSize: 12,
                maxSize: 35,
                zMin: 1,
                zMax: 10,
                marker: {
                    enabled: true,
                    fillOpacity: 0.75,
                    lineWidth: 1,
                },
                dataLabels: { enabled: false },
            },
        },
        series: apiData as Highcharts.SeriesBubbleOptions[] || [],
        legend: {
            enabled: true,
            useHTML: false,
            symbolWidth: 16,
            symbolHeight: 16,
            symbolRadius: 6,
            itemStyle: { color: '#062D59', fontSize: '12px' },
            navigation: { enabled: true },
        },
        exporting: { enabled: true, buttons: { contextButton: { enabled: false, menuItems: ['downloadJPEG', 'separator', 'downloadCSV'] } } },
    });

    useEffect(() => {
        const newHeight = isFullscreenActive ? EnlargeHeight(750) : height;
        setChartOptions((prev: any) => ({ ...prev, chart: { ...prev.chart, height: newHeight } }));
    }, [isFullscreenActive, height]);

    useEffect(() => {
        if (apiData) setChartOptions((prev: any) => ({ ...prev, series: apiData, ...(props || {}) }));
    }, [apiData, props]);

    // Export functions
    const exportPNG = () => chartRef.current?.chart.exportChart({ type: 'image/png' }, {});
    const exportCSV = () => chartRef.current?.chart.downloadCSV?.();

    useEffect(() => {
        if (onExportReady) onExportReady({ exportPNG, exportCSV });
    }, [onExportReady]);

    // Fullscreen detection
    useEffect(() => {
        const onFS = () => setIsFullscreenActive(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', onFS);
        return () => document.removeEventListener('fullscreenchange', onFS);
    }, []);

    return <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={ref || chartRef} />;
});

export default BubbleChart;
