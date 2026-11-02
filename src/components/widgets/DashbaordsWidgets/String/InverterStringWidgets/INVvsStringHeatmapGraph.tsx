import { Box, HStack, VStack } from "@chakra-ui/react"
import HeatmapChart from "../../../charts/HeatmapChart"
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import { Select } from "chakra-react-select";
import { useEffect, useMemo, useState } from "react";
import DeviceKeysAPI from "../../../../../api/DeviceKeysAPI";
import INVvsStringHeatmapAPI from "../../../../../api/String/INVvsStringHeatmapAPI";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const INVvsStringHeatmapGraph = () => {

    // Options

    const keyOptions = [
        {
            label : "Amps",
            value : "amps"
        },
        {
            label : "Specific Yield",
            value : "Sp_Yield"
        }
    ];

    // defines
    const [device, setDevice] = useState('inverter');
    const [deviceKeys, setDeviceKeys] = useState<string[]>([])
    const [key, setKey] = useState('amps');
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const [heatmapData, setHeatmapData] = useState<any | null>(null);

    const searchTagHeatmap = useMemo(() => ({
        devName: device,
        keys: selectedKeys
    }), [device, selectedKeys]);

    async function handleKeyFetching(device: string) {
        const res = await DeviceKeysAPI({ devName: device+"-1" });
        if (res?.status == 200) {
            if (res.data.length > 0) {
                const responseData = res.data as string[];
                setDeviceKeys(responseData);
                setKey('amps');
                const ampsMatch = responseData.filter(key => {
                    const pattern = /^DC_String\d+_Amps$/i;
                    return pattern.test(key);
                });
                console.log("AMPS: ", ampsMatch);
                setSelectedKeys(ampsMatch);
            } else {
                // setKeyOptions([])
            }
        }
    }
    function seletionOfKeys(key : string) {
        if (key == 'amps') {
            const ampsMatch = deviceKeys.filter(key => {
                const pattern = /^DC_String\d+_Amps$/i;
                return pattern.test(key);
            });
            // console.log("AMPS: ", ampsMatch);
            setSelectedKeys(ampsMatch);

        } else if (key == "Sp_Yield") {
            const spMatch = deviceKeys.filter(key => {
                // const lowerKey = key.toLowerCase();
                return key == "Sp_Yield";
            });
            // console.log("AMPS: ", spMatch);
            setSelectedKeys(spMatch);
        }
    }
    useEffect(() => { handleKeyFetching(device) }, [device]);
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        let timeoutId: NodeJS.Timeout;

        const fetchData = async () => {
            // console.log("Fetching at:", new Date().toLocaleTimeString());
            // console.log(searchTagHeatmap);
            try {
                if (key.length > 0) {
                    const data = await INVvsStringHeatmapAPI(searchTagHeatmap);
                    setHeatmapData(data?.data);
                }
            } catch (error) {
                console.error("Error fetching heatmap data:", error);
                setHeatmapData(null);
            }
        };

        // Immediate fetch on mount
        fetchData();

        const startHourlyFetch = () => {
            fetchData(); // Fetch at top of hour
            intervalId = setInterval(fetchData, 60 * 60 * 1000); // Repeat every 1 hour
        };

        // Calculate ms until next top of hour
        const now = new Date();
        const msUntilNextHour =
            (60 - now.getMinutes()) * 60 * 1000 -
            now.getSeconds() * 1000 -
            now.getMilliseconds();

        // Set timeout to align hourly fetch
        timeoutId = setTimeout(startHourlyFetch, msUntilNextHour);

        // Cleanup
        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [searchTagHeatmap]);


    return (
        <GraphLayout
            title="Heatmap"
            titleLengthSVG={70}
            titleLengthLongSVG={1680}
            width={["100%"]}
            height={"100%"}
            fullScreen={true}
            initTimeTitle={heatmapData?"Last Update: " +  new Date(new Date(parseInt(heatmapData.lastUpdateTime)).setMinutes(0, 0, 0)).toLocaleString() : ""}
        >
            <VStack width={"100%"} height={"100%"}>
                <HStack width={"100%"} justify={"flex-end"}>
                    <HStack>
                        <Select
                            isMulti={false}
                            placeholder="Select Parameter"
                            closeMenuOnSelect={true}
                            variant="flushed"
                            focusBorderColor="#062D59"
                            size={"sm"}
                            chakraStyles={{
                                valueContainer: (provided) => ({
                                    ...provided,
                                    fontSize: "10px",
                                    width: "120px"
                                }),
                                control: (prov) => ({
                                    ...prov,
                                    height: "10px",
                                    minBlockSize: "20px"
                                }),
                                menuList: (provided) => ({
                                    ...provided,
                                    height: "50px"
                                }),
                                option: (prov) => ({
                                    ...prov,
                                    height: "15px",
                                    fontSize: "10px"
                                })
                            }}
                            options={keyOptions}
                            onChange={(e) => {
                                setKey(e?.value || "Sp_Yield");
                                seletionOfKeys(e?.value || "Sp_Yield");
                            }}
                            selectedOptionColorScheme="green"
                            value={keyOptions?.find(option => option.value == key)}
                        />
                    </HStack>
                </HStack>
                <Box width={"100%"}>
                    {heatmapData && heatmapData.series && (
                        <HeatmapChart
                            height={240}
                            apiData={heatmapData.series || [{}]}
                            // xAxisInterval={timeWindowHeatmap.interval}
                            // onExportReady={onExportReady}
                            props={
                                {
                                    yAxis: {
                                        title: null,
                                        crosshair: false,
                                        labels: {
                                            step : 1,
                                            enabled: true,
                                            formatter: function (this : any) {
                                                return String(this.value); // Ensure it's a string, not auto-parsed
                                            },
                                            style: {
                                                color: '#062D59',
                                                fontSize: '8px'
                                            }
                                        },
                                        gridLineWidth: 0,
                                        categories: heatmapData.yAxisCategories.sort((a : string, b : string) => {
                                            const numA = parseInt(a.split('-')[1], 10);
                                            const numB = parseInt(b.split('-')[1], 10);
                                            return numA - numB;
                                          })
                                    },
                                    xAxis: {
                                        categories : heatmapData.xAxisCategories,
                                        crosshair: false,
                                        labels: {
                                            enabled: true,
                                            style: {
                                                color: '#062D59',
                                                fontSize: '8px'
                                            },
                                            title: {
                                                text: ''
                                            },
                                            dateTimeLabelFormats: {
                                                month: '%b %y', // Custom format for months
                                                year: '%Y' // Format for years if needed
                                            },
                                            tickLength: 0,
                                        },
                                        gridLineWidth : 0,
                                        tickLength: 0,
                                        // opposite : true,
                                        // min : !manualChanges ? undefined :  new Date(formatInTimeZone(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 0, 0, 0, 0), timeZone, "yyyy-MM-dd HH:mm:ss.SSS")).getTime(),
                                        // max : !manualChanges ? undefined : new Date(formatInTimeZone(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 23, 59, 59, 0), timeZone, "yyyy-MM-dd HH:mm:ss.SSS")).getTime(),
                                    },
                                    tooltip: {
                                        formatter: function (this: any) {
                                            const inverter = this.series.yAxis.categories[this.point.y];
                                            return `<b>${inverter} : <b>${this.point.value}</b>`;
                                        }
                                    },
                                }
                            }
                        />
                    )}
                </Box>
            </VStack>
        </GraphLayout>
    );
};

export default INVvsStringHeatmapGraph;