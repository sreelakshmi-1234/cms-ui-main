import { Box, HStack, Text } from "@chakra-ui/react";
import { color } from "highcharts";
import { Link } from "react-router-dom";

interface LayerOptionType {
    currentLayer : "overview"|"kpi"|"health";
    mb? : number;
}

const BESSLayerOptions : React.FC<LayerOptionType> = ({currentLayer, mb=5}) => {
    return (
        <HStack ml={2} spacing={3} mb={mb}>
            <Box
                py={"8px"}
                px={"12px"}
                border={"1px solid"}
                borderColor={currentLayer == "overview" ? "#062D59": "#9BABBD"}
                bgColor={ currentLayer == "overview" ? "#062D59" : "transparent"}
                as={Link}
                to={"/bess/overview"}
            >
                <Text fontSize={"14px"} color={currentLayer == "overview" ? "#FFFFFF" : "#062D59"}>BESS Overview</Text>
            </Box>
            <Box
                py={"8px"}
                px={"12px"}
                border={"1px solid"}
                borderColor={currentLayer == "kpi" ? "#062D59": "#9BABBD"}
                bgColor={ currentLayer == "kpi" ? "#062D59" : "transparent"}
                as={Link}
                to={"/bess/kpi"}
            >
                <Text fontSize={"14px"} color={currentLayer == "kpi" ? "#FFFFFF" : "#062D59"}>KPI</Text>
            </Box>
            <Box
                py={"8px"}
                px={"12px"}
                border={"1px solid"}
                borderColor={currentLayer == "health" ? "#062D59": "#9BABBD"}
                bgColor={ currentLayer == "health" ? "#062D59" : "transparent"}
                as={Link}
                to={"/bess/health"}
            >
                <Text fontSize={"14px"} color={currentLayer == "health" ? "#FFFFFF" : "#062D59"}>Health</Text>
            </Box>
        </HStack>
    );
};

export default BESSLayerOptions