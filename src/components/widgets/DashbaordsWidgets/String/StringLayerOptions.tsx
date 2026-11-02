import { Box, HStack, Text } from "@chakra-ui/react";
import { color } from "highcharts";
import { Link } from "react-router-dom";

interface LayerOptionType {
    currentLayer : "SMB"|"string";
    mb? : number;
}

const StringLayerOptions : React.FC<LayerOptionType> = ({currentLayer, mb=5}) => {
    return (
        <HStack ml={2} spacing={3} mb={mb}>
            <Box
                py={"8px"}
                px={"12px"}
                border={"1px solid"}
                borderColor={currentLayer == "SMB" ? "#062D59": "#9BABBD"}
                bgColor={ currentLayer == "SMB" ? "#062D59" : "transparent"}
                as={Link}
                to={"/smb"}
            >
                <Text fontSize={"14px"} color={currentLayer == "SMB" ? "#FFFFFF" : "#062D59"}>SMBs</Text>
            </Box>
            <Box
                py={"8px"}
                px={"12px"}
                border={"1px solid"}
                borderColor={currentLayer == "string" ? "#062D59": "#9BABBD"}
                bgColor={ currentLayer == "string" ? "#062D59" : "transparent"}
                as={Link}
                to={"/string"}
            >
                <Text fontSize={"14px"} color={currentLayer == "string" ? "#FFFFFF" : "#062D59"}>Strings</Text>
            </Box>
        </HStack>
    );
};

export default StringLayerOptions