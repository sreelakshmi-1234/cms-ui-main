import { Box, HStack, Text } from "@chakra-ui/react";
import { color } from "highcharts";
import { Link } from "react-router-dom";
import { useGetUserReport } from "../../../../Services/Hooks/Report/useGetUserReports";
import { useEffect } from "react";

interface LayerOptionType {
    currentLayer : "report"|"dataexport"|"createreport"|"savedreport";
    mb? : number;
}

const ReportLayerOptions : React.FC<LayerOptionType> = ({currentLayer, mb=5}) => {

    const {getUserReport, data} = useGetUserReport();

    useEffect(() => {
        if(currentLayer == 'report') {
            getUserReport();
            if(data) {
                localStorage.setItem("UserReportCount", (`${data.TotalReportCount} / ${data.ReportLimit}` || "0/8"))
            }
        }
    }, []);

    return (
        <HStack ml={2} spacing={3} mb={mb} pos={"relative"}>
            <Box
                py={"8px"}
                px={"12px"}
                border={"1px solid"}
                borderColor={currentLayer == "report" ? "#062D59": "#9BABBD"}
                bgColor={ currentLayer == "report" ? "#062D59" : "transparent"}
                as={Link}
                to={"/report"}
            >
                <Text fontSize={"14px"} color={currentLayer == "report" ? "#FFFFFF" : "#062D59"}>Templates</Text>
            </Box>
            {/* <Box
                py={"8px"}
                px={"12px"}
                border={"1px solid"}
                borderColor={currentLayer == "dataexport" ? "#062D59": "#9BABBD"}
                bgColor={ currentLayer == "dataexport" ? "#062D59" : "transparent"}
                as={Link}
                to={"/dataexport"}
            >
                <Text fontSize={"14px"} color={currentLayer == "dataexport" ? "#FFFFFF" : "#062D59"}>Data Export</Text>
            </Box> */}
            <Box
                py={"8px"}
                px={"12px"}
                border={"1px solid"}
                borderColor={currentLayer == "createreport" ? "#062D59": "#9BABBD"}
                bgColor={ currentLayer == "createreport" ? "#062D59" : "transparent"}
                as={Link}
                to={"/createreport"}
            >
                <Text fontSize={"14px"} color={currentLayer == "createreport" ? "#FFFFFF" : "#062D59"}>Create Report</Text>
            </Box>
            <Box
                py={"8px"}
                px={"12px"}
                border={"1px solid"}
                borderColor={currentLayer == "savedreport" ? "#062D59": "#9BABBD"}
                bgColor={ currentLayer == "savedreport" ? "#062D59" : "transparent"}
                as={Link}
                to={"/savedreport"}
                position={'relative'}
            >
                <Box
                    width={"auto"}
                    bg={'red.500'}
                    rounded={'xl'}
                    pos={'absolute'}
                    top={-1}
                    right={-1}
                    px={"2px"}
                >
                    <Text fontSize={"8px"} textAlign={'right'} color={"#FFFFFF"}>{localStorage.getItem("UserReportCount") || "0 / 8"}</Text>
                </Box>
                <Text fontSize={"14px"} color={currentLayer == "savedreport" ? "#FFFFFF" : "#062D59"}>Saved Reports</Text>
            </Box>
        </HStack>
    );
};

export default ReportLayerOptions