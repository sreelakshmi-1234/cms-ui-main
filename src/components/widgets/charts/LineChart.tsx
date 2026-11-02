import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { EnlargeHeight, EnlargeWidgetSize } from '../../../Services/EnlargeWidget';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import '../../../App.css';

//  init exporting module
exporting(Highcharts);
exportData(Highcharts);

interface ExportFunction {
    exportPNG: () => void;
    exportCSV: () => void;
}

interface LineChartProps {
    apiData?: Object[];
    height?: number | string;
    bg?: string;
    legendHeight?: number;
    xAxisInterval?: number | string;
    props?: any;
    isFullscreen?: boolean;
    onExportReady?: (functions: ExportFunction) => void;
    showHideButtons?: boolean;

}

const LineChart = React.forwardRef<HighchartsReact.RefObject, LineChartProps>(({ apiData, height = 240, xAxisInterval = "auto", legendHeight = 45, bg, props, isFullscreen = false, onExportReady, showHideButtons = true }, ref) => {
    const chartRef = useRef<HighchartsReact.RefObject>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFullscreenActive, setIsFullscreenActive] = useState(false);

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
            backgroundColor: bg || 'transparent',
            height: height,
            zoomType: 'x',
            style: {
                fontFamily: 'Montserrat, sans-serif',
                color: "#062D59"
            },
            plotBorderWidth: 1,
            plotBorderColor: '#DFDFDF',
            plotBorderDashStyle: 'Dash',
            className: "dashed-border",

            /* Buttons — SHOW ALL & HIDE ALL — (locked position, never disappear) */
            ...(!showHideButtons ? {} : {
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
            }),

        },
        title: {
            text: '',
        },
        xAxis: {
            type: 'datetime',
            crosshair: true,
            tickInterval: xAxisInterval,
            labels: {
                enabled: true,
                style: {
                    color: '#062D59',
                    fontSize: '12px'
                }
                // formatter: function(this : any) {
                //     return Highcharts.dateFormat('%H:%M', this.value + (5.5 * 3600 * 1000)); // Add 5.5 hours (IST) to the timestamp
                // }
            },
            dateTimeLabelFormats: {
                month: '%b %y', // Custom format for months
                year: '%Y' // Format for years if needed
            },
            tickLength: 0,

        },
        yAxis: {
            title: {
                text: '',
            },
            crosshair: true,
            labels: {
                enabled: true,
                style: {
                    color: '#062D59',
                    fontSize: '12px'
                }
            },
            tickAmount: !isFullscreen ? 6 : 10,
        },
        tooltip: {
            shared: true,
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

                return `<div><b>${date}</b></div>${rows}`;
            },
            // pointFormat: '{series.name}: {point.y}<br/>'//Total: {point.stackTotal}
            // valueSuffix: ' unit',
            // headerFormat: '<b>{series.name}</b><br>',
            // formatter: function (this : any) {
            //     var date = this.x;
            //     var formattedDate = Highcharts.dateFormat('%Y-%m-%d %H:%M', date);
            //     var points = this.points.map(function (point : any) {
            //         return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y + '</b>';
            //     });
            //     return '<b>' + formattedDate + '</b><br/>' + points.join('<br/>');
            // }
        },

        /* HOVER HIGHLIGHT */
        plotOptions: {
            series: {
                states: {
                    inactive: { opacity: 0.15 },
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
        series: apiData || [],
        credits: {
            enabled: false,
        },
        label: {
            enabled: true,
            style: {
                color: '#062D59',
                fontSize: '12px'
            }
        },
        legend: {
            maxHeight: legendHeight,
            useHTML: true,
            itemStyle: {
                // display:"inline-block",
                overflow: "auto",
                color: '#062D59',
                fontSize: '12px'
            },
            symbolHeight: 0,    // This helps to remove default legends
            symbolWidth: 0, // This helps to remove default legends
            labelFormatter: function (this: any) {
                return '<span style="display:inline-block;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                    '<circle opacity="0.25" cx="8" cy="11" r="8" fill="' + this.color + '"/>' +
                    '<circle cx="8" cy="11" r="3.5" fill="' + this.color + '" stroke="white"/>' +
                    '</svg></span> ' + this.name;
            },
            navigation: {
                enabled: true,
            }
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

    // Fullscreen change: NO microtask delay; immediate reflow/redraw
    useEffect(() => {
        const onFS = () => {
            const entered = !!document.fullscreenElement;
            setIsFullscreenActive(entered);

            const c = (chartRef.current as any)?.chart;
            c?._ensureButtons?.();
            c?._positionButtons?.();
            c?.reflow?.();
            c?.redraw?.();
        };
        const evts = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];
        evts.forEach((e) => document.addEventListener(e, onFS));
        return () => evts.forEach((e) => document.removeEventListener(e, onFS));
    }, []);

    // Auto Detect Full screen withhout props
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFull = !(document.fullscreenElement === containerRef.current);
            setIsFullscreenActive(isFull);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);


    // Adjust chart height based on full-screen state
    useEffect(() => {
        const newHeight = isFullscreenActive ? EnlargeHeight(750) : height;
        setChartOptions((prevOptions) => ({
            ...prevOptions,
            chart: {
                ...prevOptions.chart,
                height: newHeight,
                overflow: "auto"
            }
        }));
    }, [isFullscreenActive, height]);

    useEffect(() => {
        if (apiData) {
            setChartOptions((prevOptions) => ({
                ...prevOptions,
                series: apiData,
                ...(props || {}),
            }));
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

    return <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={ref || chartRef || containerRef} />;
});

export default LineChart;