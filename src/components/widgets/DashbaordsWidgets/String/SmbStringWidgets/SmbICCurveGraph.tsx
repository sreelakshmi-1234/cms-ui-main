import { Box, Button, HStack, useColorModeValue, VStack } from "@chakra-ui/react"
import { Select } from "chakra-react-select";
import { useEffect, useMemo, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";
import OneClassDevicesAPI from "../../../../../api/OneClassDevicesAPI";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import XYPlotFromDeviceKeysAPI from "../../../../../api/XYPlotFromDeviceKeysAPI";
import ScatterChart from "../../../charts/ScatterChart";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

interface DeviceDetailsType {
    label: string;
    value: string;
}

const SmbICCurveGraph: React.FC<{ onExportReady?: (functions: ExportFunctions) => void }> = ({ onExportReady }) => {

    const timeZone = localStorage.getItem("SelectedTimezone") || 'Asia/Colombo';

    // options
    const [deviceOptions, setdeviceOptions] = useState<{ label: string, value: string }[] | []>([{ label: 'SMB-1', value: "" }]);

    // defines
    const [device, setDevice] = useState("");
    const deviceClass = "smb"

    const [Data, setData] = useState<any | null>(null);

    const searchTag = useMemo(() => ({
        devId: device,
        xAxisKey: "DC_String1_Amps",
        yAxisKey: "DC_String1_Volt",
        deviceClass: deviceClass,
        type: 'scatter',
        name : 'Volt-Amps',
        color : '#6FD195'
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
    useEffect(() => { handleDeviceFetching(deviceClass) }, [deviceClass, timeWindow]);
    useEffect(() => {
        const fetchData = async () => {
            // console.log(searchTag)
            try {
                const data = await XYPlotFromDeviceKeysAPI(searchTag, timeWindow);
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
        //     title="Volt-Amps Curve"
        //     titleLengthSVG={130}
        //     titleLengthLongSVG={400}
        //     width={["100%"]}
        //     height={"100%"}
        //     fullScreen={true}
        //     initTimeTitle="Current Day"
        // >
        <VStack width={"100%"} height={"100%"} mt={"-20px"}>
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
                    <ScatterChart
                        height={270}
                        apiData={Data.series || [{}]}
                        onExportReady={onExportReady}
                        props={
                            {
                                chart: {
                                    zoomType: 'xy',
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
                                    title: {
                                        text: 'Current (A)',
                                        style: { color: '#062D59', fontSize: '12px' }
                                    },
                                    crosshair: true,
                                    labels: {
                                        enabled: true,
                                        style: {
                                            color: '#062D59',
                                            fontSize: '12px'
                                        }
                                    },
                                    tickLength: 0,
                                    lineColor: "rgba(0,0,0,0.5)"
                                },
                                yAxis: {
                                    title: {
                                        text: 'Voltage (V)',
                                        style: { color: '#062D59', fontSize: '12px' }
                                    },
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

export default SmbICCurveGraph;