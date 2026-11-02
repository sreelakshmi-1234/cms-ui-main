import { Box, Button, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import ConfigurationFields from "../components/widgets/DashbaordsWidgets/Analytic/ConfigurationFields";
import { useEffect, useState } from "react";
import DoubleTabTimeWindowSelector from "../components/widgets/DashbaordsWidgets/Analytic/DoubleTabTimewindowSelector";
import TimeseriesPlotGraph from "../components/widgets/DashbaordsWidgets/Analytic/TimeseriesPlotGraph";
import swal from "sweetalert";
import "../index.css";
import GlobalLoader from "../components/GlobalLoader";

export interface fieldsType {
    portfolio: string | null;
    plantName: string[] | null;
    plant: string[] | null;
    assetType: string | null;
    ids: { label: string; value: string }[][] | { label: string; value: string }[] | null;
    params: string[] | null;
    agg: string | null;
    chart: string | null;
}

const AnalyticsDashboard: React.FC = () => {

    // Loading State for dashboard
    const [showLoader, setShowLoader] = useState(true);

    // Simulate minimum loading time (2 sec)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 1500);
    })

    const storageName = "config1";
    const strObj = localStorage.getItem(storageName);
    let parsedConfig: { fields?: fieldsType[]; timewindow?: any } = {};

    try {
        parsedConfig = strObj ? JSON.parse(strObj) : {};
    } catch (e) {
        console.error("Failed to parse localStorage config:", e);
        parsedConfig = {};
    }

    const [configFields, setConfigFields] = useState<fieldsType[]>(
        parsedConfig.fields ?? [
            {
                portfolio: null,
                plantName: null,
                plant: null,
                assetType: null,
                ids: null,
                params: null,
                agg: null,
                chart: null,
            },
        ]
    );

    const [timewindow, setTimewindow] = useState(
        parsedConfig.timewindow ?? {
            startTs: Date.now() - 1000 * 60 * 60,
            endTs: Date.now(),
            interval: 1000 * 60 * 5,
            intervalName: "5 Minutes",
        }
    );

    const [plotData, setPlotData] = useState<{
        fields: fieldsType[];
        timewindow: typeof timewindow;
    } | null>({ fields: configFields, timewindow: timewindow });
    const [readyToPlot, setReadyToPlot] = useState(parsedConfig ? true : false);

    const handleSave = (
        startTs: number,
        endTs: number,
        intervalResolution: number,
        intervalResolutionName: string,
        autoRefresh?: boolean
    ) => {
        setTimewindow({
            startTs,
            endTs,
            interval: intervalResolution,
            intervalName: intervalResolutionName,
        });

        if (autoRefresh) {
            // Check if any field in configFields contains null
            const hasNullInConfig = configFields.some((field) =>
                Object.values(field).some((value) => value === null)
            );
            if (!hasNullInConfig) {
                handlePlot();
            }
        }
    };

    const handlePlot = () => {
        // Check if any field in configFields contains null
        const hasNullInConfig = configFields.some((field) =>
            Object.values(field).some((value) => value === null)
        );

        // Check if timewindow has valid values
        const hasInvalidTimewindow = Object.values(timewindow).some(
            (value) => value === null || value === undefined
        );

        if (hasNullInConfig || hasInvalidTimewindow) {
            swal({
                title: "Cannot Plot",
                text: "Config fields or time window contain null or invalid values.",
                icon: "error"
            });
            setReadyToPlot(false);
            return;
        }

        // If no null values, set readyToPlot to true
        setReadyToPlot(true);
        // console.log({
        //     fields: configFields,
        //     timewindow,
        // });
        setPlotData({
            fields: [...configFields],
            timewindow: { ...timewindow },
        });

        localStorage.setItem(storageName, JSON.stringify({
            fields: [...configFields],
            timewindow: { ...timewindow }
        }))
    };

    function handleReset() {
        localStorage.removeItem(storageName);
        window.location.reload();
    }

    // Debugging useEffect (optional, can be removed in production)
    // useEffect(() => {
    //     console.log("configFields updated: ", configFields);
    // }, [configFields]);

    // useEffect(() => {
    //     console.log("timewindow updated: ", timewindow);
    // }, [timewindow]);

    return (
        <>
            {showLoader && <GlobalLoader />}
            <Box display={showLoader ? "none" : "block"} mt={"87px"} width="1816px" ml={10} minH={"1000px"} px={{ base: 2, sm: 12, md: 17 }}>
                <Flex width={"1816px"} color={"#062D59"} direction={"column"}>
                    <Box borderBottom={"1px solid #888"} width={"100%"}>
                        <Text fontSize={"18px"} fontWeight={700} textTransform={"capitalize"} px={2} mb={1}>
                            analytics
                        </Text>
                    </Box>
                    <Box
                        className="scroll-enabled"
                        mt={2}
                        px={2}
                        fontSize="14px"
                        width="100%"
                        h="300px"
                        overflow="auto"
                        sx={{
                            '&::-webkit-scrollbar': {
                                width: '5px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'transparent',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#aaa', // or your preferred color
                                borderRadius: '10px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                backgroundColor: '#888',
                            },
                        }}
                    >
                        <Text color="#555">Configurations -</Text>
                        <ConfigurationFields setFields={setConfigFields} />
                    </Box>

                    <HStack mt={5} px={2} fontSize={"14px"}>
                        <Text color={"#555"}>Time Configuration -</Text>
                        <DoubleTabTimeWindowSelector onSave={handleSave} />
                        <HStack>
                            <Text>Start time: </Text>
                            <Text borderBottom={"1px solid #062D59"}>
                                {formatDateForInput(timewindow.startTs)}
                            </Text>
                            <Text ml={5}>End time: </Text>
                            <Text borderBottom={"1px solid #062D59"}>
                                {formatDateForInput(timewindow.endTs)}
                            </Text>
                            <Text ml={5}>Interval: </Text>
                            <Text borderBottom={"1px solid #062D59"}>{timewindow.intervalName}</Text>
                        </HStack>
                    </HStack>
                    <HStack mt={5} ml={3}>
                        <Button
                            fontWeight={600}
                            variant={"ghost"}
                            bg={useColorModeValue("#062D59", "#fff")}
                            rounded={"none"}
                            color={useColorModeValue("#fff", "#062D59")}
                            mr={3}
                            onClick={handlePlot}
                            _hover={{ opacity: 0.8 }}
                            fontSize={"14px"}
                        >
                            Plot Graph
                        </Button>
                        <Button
                            fontWeight={600}
                            variant={"ghost"}
                            bg={useColorModeValue("#062D59", "#fff")}
                            rounded={"none"}
                            color={useColorModeValue("#fff", "#062D59")}
                            mr={3}
                            onClick={handleReset}
                            _hover={{ opacity: 0.8 }}
                            fontSize={"14px"}
                        >
                            Reset
                        </Button>
                    </HStack>
                </Flex>
                <Flex m={"auto"} width={"1816px"} mt={"50px"} justify={"center"}>
                    {readyToPlot && plotData ? (
                        <TimeseriesPlotGraph
                            RequestData={plotData}
                        />
                    ) : (
                        <Text color={"#555"} fontSize={"16px"}>
                            Please complete all configurations and click "Plot Graph" to display the chart.
                        </Text>
                    )}
                </Flex>
            </Box>
        </>
    );
};

export default AnalyticsDashboard;


// Format date for datetime-local input
    const formatDateForInput = (timestamp: number | null): string => {
      if (!timestamp || isNaN(timestamp)) return "";

      const date = new Date(timestamp);
      const pad = (n: number) => n.toString().padStart(2, '0');

      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1); // Months are 0-based
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());

      return `${year}-${month}-${day}  ${hours}:${minutes}`;
    };