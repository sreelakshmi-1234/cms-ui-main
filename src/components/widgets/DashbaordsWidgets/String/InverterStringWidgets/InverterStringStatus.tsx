import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import StripsPieChart from "../../../charts/StripsPieChart";
import { HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import DeviceKeysAPI from "../../../../../api/DeviceKeysAPI";
import StringStatusAPI from "../../../../../api/String/StringStatusAPI";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const InverterStringStatus = () => {

    // String Keys
    // defines
        const [device, setDevice] = useState('inverter');
        const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    async function handleKeyFetching(device: string) {
        const res = await DeviceKeysAPI({ devName: device + "-1" });
        if (res?.status == 200) {
            if (res.data.length > 0) {
                const responseData = res.data as string[];
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

    useEffect(() => {
        handleKeyFetching(device)
    }, []);

    // ******************** InvString Status  ***********************

    var searchInvString = useMemo(() => (
        {
            devName : "Inverter",
            keys: selectedKeys
        }
    ), [selectedKeys]);

    const [StatusData, setStatusData] = useState<number[] | []>([]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        let timeoutId: NodeJS.Timeout;

        const fetchData = async () => {
            try {
                if(selectedKeys.length > 0) {
                    const response = await StringStatusAPI(searchInvString) as any;
                    if(response.data && response.data?.length > 0) {
                        setStatusData(response.data);
                    } else {
                        setStatusData([]);
                    }
                }
            } catch (error) {
                console.error("Error Fetching Inv Str Data: ", error);
                setStatusData([]);
            }
        }

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
    }, [searchInvString])
    // ************************* Status ******************

    const StatusLabel = ["Generating", "Non Generating", "Non Cummunication"]
    // const pieData = StatusData.map((data : number, i : number) => ({
    //     name: StatusLabel[i],
    //     y: data
    // }));

    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Status'
            width={["full", "100%"]}
            height='100%'
            titleLengthSVG={40}
            titleLengthLongSVG={170}
            downloadOption={true}
            onExport={exportFunctions}
        >
            <Stack direction={["column", "column"]} spacing={0}>
                <StripsPieChart
                    height={120}
                    names={StatusLabel}
                    apiData={StatusData || []}
                    color={["#7086FD", "#6FD195", "#FFAE4C"]}
                    onExportReady={setExportFunctions}
                />
                <HStack width={"full"} align={"start"} textAlign={"left"} wrap={"wrap"} mt={-4}>
                    <VStack width={"130px"} spacing={0} alignItems={"flex-start"}>
                        <Text color={"#7086FD"} fontSize={"16px"} fontWeight={700}>{StatusData.length > 0 ? StatusData[0] : 0}</Text>
                        <Text fontSize={"12px"} fontWeight={500} color={"#9BABBD"}>Generating</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Text color={"#6FD195"} fontSize={"16px"} fontWeight={700}>{StatusData.length > 0 ? StatusData[1] : 0}</Text>
                        <Text fontSize={"12px"} fontWeight={500} color={"#9BABBD"}>Non Generating</Text>
                    </VStack>
                    <VStack width={"130px"} spacing={0} alignItems={"flex-start"}>
                        <Text color={"#FFAE4C"} fontSize={"16px"} fontWeight={700}>{StatusData.length > 0 ? StatusData[2] : 0}</Text>
                        <Text fontSize={"12px"} fontWeight={500} color={"#9BABBD"}>Non Communicating</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Text color={"#07DBFA"} fontSize={"16px"} fontWeight={700}>{StatusData.length > 0 ? StatusData[0] + StatusData[1] + StatusData[2] : 0}</Text>
                        <Text fontSize={"12px"} fontWeight={500} color={"#9BABBD"}>Total</Text>
                    </VStack>
                </HStack>
            </Stack>
        </GraphLayout>
    );
};

export default InverterStringStatus