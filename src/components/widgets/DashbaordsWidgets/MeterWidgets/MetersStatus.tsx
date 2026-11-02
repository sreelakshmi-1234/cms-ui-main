import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import StripsPieChart from "../../charts/StripsPieChart";
import { Box, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { EnlargeWidgetContent, EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import UseInverterStatus from "../../../../Services/Hooks/UseInverterStatus";
import { useState } from "react";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const MeterMetersStatus = () => {
    // ************************* Status ******************
    const {
        timeWindow: timeWindowInverterStatus,
        handleTimeWindowChange: handleTimeWindowInverterStatusChange,
        handleReset: InverterStatusHandleReset
    } = useTimeHandle(5, "minute", "NONE", [5, "minute"]);
    const searchObj = {
        devName: "Meter.",
        keys: "AC_Active_Power_Watt",
    };

    const StatusData = UseInverterStatus(searchObj, timeWindowInverterStatus) || [];
    const StatusLabel = ["Online", "Offline", "Total"]
    const pieData = StatusData.map((data, i) => ({
        name: StatusLabel[i],
        y: data
    }));

    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Status'
            width={["full", "100%"]}
            height='100%'
            titleLengthSVG={40}
            titleLengthLongSVG={250}
            downloadOption={true}
            onExport={exportFunctions}
        >
            <Stack direction={"row"} padding={"16px"} spacing={5}>
                <Box width={"169px"}>
                    <StripsPieChart
                        height={170}
                        width={170}
                        names={StatusLabel}
                        apiData={[StatusData[0], StatusData[2]]}
                        color={["#7086FD", "#6FD195", "#FFAE4C"]}
                        onExportReady={setExportFunctions}
                    />
                </Box>
                <VStack width={"full"} align={"start"} justify={"center"} textAlign={"left"} wrap={"wrap"} spacing={0} mt={0}>
                    <VStack width={"130px"} spacing={0} alignItems={"flex-start"}>
                        <Text color={"#7086FD"} fontSize={"16px"} fontWeight={700}>{StatusData[0]}</Text>
                        <Text fontSize={"12px"} fontWeight={500} color={"#9BABBD"}>Online</Text>
                    </VStack>
                    {/* <VStack spacing={0} alignItems={"flex-start"}>
                        <Text color={"#6FD195"} fontSize={"16px"} fontWeight={700}>{StatusData[1]}</Text>
                        <Text fontSize={"12px"} fontWeight={500} color={"#9BABBD"}>Non Generating</Text>
                    </VStack> */}
                    <VStack width={"130px"} spacing={0} alignItems={"flex-start"}>
                        <Text color={"#FFAE4C"} fontSize={"16px"} fontWeight={700}>{StatusData[2]}</Text>
                        <Text fontSize={"12px"} fontWeight={500} color={"#9BABBD"}>Offline</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Text color={"#07DBFA"} fontSize={"16px"} fontWeight={700}>{StatusData[0] + StatusData[1] + StatusData[2]}</Text>
                        <Text fontSize={"12px"} fontWeight={500} color={"#9BABBD"}>Total</Text>
                    </VStack>
                </VStack>
            </Stack>
        </GraphLayout>
    );
};

export default MeterMetersStatus