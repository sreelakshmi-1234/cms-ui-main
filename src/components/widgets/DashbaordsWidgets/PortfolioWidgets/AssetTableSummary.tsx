import { Box, Flex, HStack, Tab, TabList, Tabs, Text, useColorModeValue } from "@chakra-ui/react"
import UsePlantTableSummary from "../../../../Services/Hooks/UsePlantTableSummary";


const AssetTableSummary = () => {
    // *****************Summary*************
    var textSearchSummary = ["", "PV", "Wind", "Hybrid"];
    var searchTagsSummary = {
        calculation: "INV_Total_Power"
    }
    const PlantTableSummaryData = UsePlantTableSummary(searchTagsSummary, textSearchSummary) || [];
    const tabList = ["PV", "Wind", "Hybrid"];
    const color = ["rgba(140, 218, 170, 0.5)", "rgba(130, 178, 255, 0.5)", "rgba(253, 112, 140, 0.5)"]
    return (
        <Box
        >
            <HStack
                // border={"1px solid #DFDFDF"}
                color={useColorModeValue('#062D59', 'white')}
            >
                {tabList.map((value, index) => (
                    <HStack
                        mx={0}
                        px={2}
                        h={"27px"}
                        fontSize={"12px"}
                        rounded={"xl"}
                        bg={color[index]}
                        color={"#062D59"}
                    >
                        {/* <span 
                          style={{width:"10px",height:"10px",backgroundColor:dotColor[index], display:"flex", borderRadius:"50%", marginRight:"7px"}}
                          ></span> */}
                        <Text>{value}</Text> &nbsp; <sub><b style={{ color: "red" }}>{PlantTableSummaryData[index + 1]?.[2] || 0}</b>/{PlantTableSummaryData[index + 1]?.[0] || 0}</sub>
                    </HStack>
                ))}

            </HStack>
        </Box>
    )
}

export default AssetTableSummary;