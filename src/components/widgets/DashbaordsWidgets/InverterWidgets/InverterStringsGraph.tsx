import { Box, Button, HStack, useColorModeValue, VStack } from "@chakra-ui/react"
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import { Select } from "chakra-react-select";
import { useEffect, useMemo, useState } from "react";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import { formatInTimeZone } from "date-fns-tz";
import OneClassDevicesAPI from "../../../../api/OneClassDevicesAPI";
import OneDevciceMultipleSamePrefixAPI from "../../../../api/OneDevciceMultipleSamePrefixAPI";
import LineChart from "../../charts/LineChart";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

interface DeviceDetailsType {
    label: string;
    value: string;
}

const InverterStringsGraph: React.FC<{ onExportReady?: (functions: ExportFunctions) => void }> = ({ onExportReady }) => {

    const timeZone = localStorage.getItem("SelectedTimezone") || 'Asia/Colombo';

    // options
    const [deviceOptions, setdeviceOptions] = useState<{ label: string, value: string }[] | []>([{ label: 'Inverter-1', value: "" }]);

    // defines
    const [device, setDevice] = useState("");
    const deviceClass = "inverter"

    const [Data, setData] = useState<any | null>(null);

    const searchTag = useMemo(() => ({
        devId: device,
        keyPrefix: "DC_String",
        deviceClass: deviceClass,
        type: 'spline'
    }), [device]);

    const { timeWindow: timeWindow, manualChanges } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"]);

    async function handleDeviceFetching(deviceClass: string) {
        const res = await OneClassDevicesAPI({ devName: deviceClass });
        if (res?.status == 200) {
            if (res.data.length > 0) {
                const responseData = res.data as DeviceDetailsType[];
                setdeviceOptions(responseData);
            } else {
                setdeviceOptions([])
            }
        }
    }
    useEffect(() => { handleDeviceFetching(deviceClass) }, [deviceClass]);
    useEffect(() => {
        const fetchData = async () => {
            // console.log(searchTag)
            try {
                const data = await OneDevciceMultipleSamePrefixAPI(searchTag, timeWindow);
                setData(data?.data);
            } catch (error) {
                console.error("Error fetching heatmap data:", error);
                setData(null);
            }
        };
        fetchData();
    }, [searchTag, timeWindow]);

    return (
        // <GraphLayout
        //     title="Heatmap"
        //     titleLengthSVG={70}
        //     titleLengthLongSVG={1040}
        //     width={["100%"]}
        //     height={"100%"}
        //     fullScreen={true}
        //     initTimeTitle="Current Day"
        // >
        <VStack width={"100%"} height={"100%"}  mt={"-20px"}>
            <HStack width={"100%"} justify={"flex-end"}>
                <HStack>
                    <Select
                        isMulti={false}
                        placeholder="Select Device"
                        closeMenuOnSelect={true}
                        variant="flushed"
                        focusBorderColor="#062D59"
                        size={"sm"}
                        chakraStyles={{
                            valueContainer: (provided) => ({
                                ...provided,
                                fontSize: "10px",
                                width: "120px",
                            }),
                            control: (prov) => ({
                                ...prov,
                                height: "10px",
                                minBlockSize: "20px"
                            }),
                            menuList: (prov) => ({
                                ...prov,
                                padding: 0,
                                fontSize: "10px",
                                height: "100px"
                            }),
                            option: (prov) => ({
                                ...prov,
                                height: "15px",
                                fontSize: "10px"
                            })
                        }}
                        options={deviceOptions || []}
                        onChange={(e) => {
                            setDevice(e?.value || "");
                        }}
                        selectedOptionColorScheme="green"
                        value={deviceOptions?.find(option => option.value == device)}
                    />
                </HStack>
            </HStack>
            <Box width={"100%"} height={"100%"}>
                {Data && Data.series && (
                    <LineChart
                        height={380}
                        apiData={Data.series || [{}]}
                        xAxisInterval={timeWindow.interval}
                        onExportReady={onExportReady}
                        // xAxisInterval={1000 * 60 * 60}
                        props={
                            {
                                chart: {
                                    zoomType: 'x',
                                    style: {
                                        fontFamily: 'Montserrat, sans-serif',
                                        color: "#062D59"
                                    },
                                    plotBorderWidth: 0,
                                    plotBorderColor: '#DFDFDF',
                                    plotBorderDashStyle: 'Dash',
                                    className: "dashed-border"
                                },
                                title: {
                                    text: '',
                                },
                                xAxis: {
                                    type: 'datetime',
                                    crosshair: true,
                                    labels: {
                                        enabled: true,
                                        style: {
                                            color: '#062D59',
                                            fontSize: '12px'
                                        }
                                    },
                                    dateTimeLabelFormats: {
                                        month: '%b %y', // Custom format for months
                                        year: '%Y' // Format for years if needed
                                    },
                                    tickLength: 0,
                                    lineColor: "rgba(0,0,0,0.5)",
                                    tickInterval: 60 * 60 * 2 * 1000, // 2 hours interval
                                    min: !manualChanges ? undefined : new Date(formatInTimeZone(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 4, 0, 0, 0), timeZone, "yyyy-MM-dd HH:mm:ss.SSS")).getTime(),
                                    max: !manualChanges ? undefined : new Date(formatInTimeZone(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 20, 0, 0, 0), timeZone, "yyyy-MM-dd HH:mm:ss.SSS")).getTime(),
                                },
                                yAxis: {
                                    gridLineWidth: 1,
                                    gridLineDashStyle: 'Dash',
                                    gridLineColor: '#DFDFDF',
                                }
                            }
                        }
                    />
                )}
            </Box>
        </VStack>
        // </GraphLayout>
    );
};

export default InverterStringsGraph;