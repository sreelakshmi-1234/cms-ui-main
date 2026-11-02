import { 
    Box,
    Flex,
    Heading,
    HStack,
    Text,
    Tooltip,
    VStack,
} from "@chakra-ui/react";
import UseHeatmap from "../../../../Services/Hooks/PlantView/UseHeatmap";
import { EnlargeWidgetSize, EnlargeWidgetSizeWidth } from "../../../../Services/EnlargeWidget";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";

interface countType {
    label : string;
    name : string;
    value : number;
    capacity : number;
    color : string;
}


const Heatmap = () => {
    // const count = [
    //   {
    //     name : "one",
    //     value : 6787,
    //     color : "#132a13"
    //   },
    //   {
    //     name : "two",
    //     value : 677,
    //     color : "#4f772d"
    //   },
    //   {
    //     name : "three",
    //     value : 678,
    //     color : "#31572c"
    //   },
    //   {
    //     name : "four",
    //     value : 787,
    //     color : "#90a955"
    //   },  
    //   {
    //     name : "five",
    //     value : 87,
    //     color : "#ecf39e"
    //   },
    // ];
    const legends = [
        {
            name : "Running",
            color : "#8AE9AF"
        },
        {
            name : "Stop",
            color : "#FFD175"
        },
        {
            name : "Trip",
            color : "#FFA6A6"
        },
        {
            name : "Non-Communicating",
            color : "#D0D0D0"
        },
    ];

    /*prev color {
        name : "Running",
        color : "green"
    },
    {
        name : "Stop",
        color : "#f2a65a"
    },
    {
        name : "Trip",
        color : "red"
    },
    {
        name : "Non-Communicating",
        color : "#777"
    }, */
    var searchTag = {
        devName : "Inverter",
        power : "AC_Active_Power_Watt"
    }
    var apiName = "inverter"
    // const HeatmapData = UseHeatmap(apiName, searchTag) || [];

    var searchTagStatus = {
        devName : "Inverter",
        power :  "AC_Active_Power_Watt",
        trip : "Trip_Mode_Inv",
        // capacity : "Capacity"    // This is Directly added in API at Node Scrpit!!
    }
    var apiNameStatus = "status";
    const HeatmapStatusData = UseHeatmap(apiNameStatus, searchTagStatus) || [];

    var searchTagDGStatus = {
        devName : "DG",
        power : "AC_Active_Power_Watt",
        trip : "Trip_Mode_Inv",
        // capacity : "Capacity"    // This is Directly added in API at Node Scrpit!!
    }
    const HeatmapDGStatus = UseHeatmap(apiNameStatus, searchTagDGStatus) || [];

    return (
            <Box height={"100%"} width={"100%"} color={"#062D59"} overflowX={"auto"}>
                <Flex justify={"space-around"} direction={"column"} height={"100%"}>
                    <VStack align={"flex-start"} spacing={3}>
                        <VStack align={"flex-start"} spacing={1} h={"94px"}>
                            <Heading fontSize={14 + "px"} fontWeight={500}>Inverter</Heading>
                            <HStack
                                minWidth={"100%"}
                                overflowX={"auto"} 
                                spacing={3}
                            >
                                {HeatmapStatusData.length > 0 && HeatmapStatusData.map((value : countType, index : number) => (
                                    <Box 
                                        key={index}
                                        height={64 + "px"}
                                        minW={80 + "px"}
                                        bgColor={`${value.color}`}
                                        textAlign={"left"}
                                        p={1}
                                    >
                                        <Text mt={"22px"} fontSize={"12px"} fontWeight={400}>{value.label}</Text>
                                        <Text fontSize={"12px"} fontWeight={400}>{value.value} kW</Text>
                                        {/* <Text color={"#777"} fontSize={EnlargeWidgetSize(8)}>{value.capacity ? (value.capacity + " kW") : ""}</Text> */}
                                    </Box>
                                ))}
                            </HStack>
                        </VStack>
                        <VStack align={"flex-start"} spacing={1} mt={0} h={"94px"}>
                            <Heading fontSize={14 + "px"} fontWeight={500}>DG</Heading>
                            <HStack
                                minWidth={"100%"}
                                overflowX={"auto"} 
                                spacing={3}
                            >
                                {HeatmapDGStatus.length > 0 && HeatmapDGStatus.map((value : countType, index : number) => (
                                    <Box 
                                        key={index}
                                        height={64 + "px"}
                                        minW={80 + "px"}
                                        bgColor={`${value.color}`}
                                        textAlign={"left"}
                                        p={1}
                                    >
                                        <Text mt={"22px"} fontSize={"12px"} fontWeight={400}>{value.label}</Text>
                                        <Text fontSize={"12px"} fontWeight={400}>{value.value} kW</Text>
                                        {/* <Text color={"#777"} fontSize={EnlargeWidgetSize(8)}>{value.capacity ? (value.capacity + " kW") : ""}</Text> */}
                                    </Box>
                                ))}
                            </HStack>
                        </VStack>
                    </VStack>  
                    <HStack spacing={5}>
                        {legends.map((value, index) => (
                            <HStack key={index}>
                                <Box width={EnlargeWidgetSizeWidth(10) + "px"} height={EnlargeWidgetSize(10) + "px"} borderRadius={"25%"} bgColor={value.color}></Box>
                                <Text fontSize={EnlargeWidgetSize(12)} fontWeight={300} letterSpacing={1}>{value.name}</Text>
                            </HStack>
                        ))}
                    </HStack>
                </Flex>
            </Box>
    );
};

export default Heatmap;