import UseBatteryStatus from "../../../../Services/Hooks/Battery/UseBatteryStatus";
import PowerFlowSvg from "../../../../assets/PlantView/PowerFlowSvg";
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import InfoSymbol from "../../../Layouts/InfoSymbolLayout";
import PlantInfoIcon from "../../../../assets/PlantView/PlantInfoIcon";
import PVPowerFlowSvg from "../../../../assets/PlantView/PVPowerFlow";


const PowerFlow = () => {
    // *********************************Power FLow****************
    var search = {
        devName: "Calculation",
        keys: "INV_Total_Power"
    }
    const batteryStatus = UseBatteryStatus(search);

    var search2 = {
        devName: "Calculation",
        keys: "Total_Grid_Power"
    }
    const batteryStatus2 = UseBatteryStatus(search2);

    var search3 = {
        devName: "calculation",
        keys: "DG_Total_Power"
    }

    const batteryStatus3 = UseBatteryStatus(search3);

    var search4 = {
        devName: "calculation",
        keys: "PCS_Total_Power"
    }
    const batteryStatus4 = UseBatteryStatus(search4);

    var search5 = {
        devName: "calculation",
        keys: "Total_Solar_Meter_kW"
    }
    const batteryStatus5 = UseBatteryStatus(search5);

    const combinePowerFlowResult = [(batteryStatus ? batteryStatus[0] : "NA"), (batteryStatus2 ? batteryStatus2[0] : "NA"), (batteryStatus3 ? batteryStatus3[0] : "NA"), (batteryStatus4 ? batteryStatus4[0] : "NA")];

    const combinePVPowerFlowResult = [(batteryStatus ? batteryStatus[0] : "NA"), (batteryStatus2 ? batteryStatus2[0] : "NA"), (batteryStatus5 ? batteryStatus5[0] : "NA")];

    const plantType = localStorage.getItem("PlantType") || ""

    return (
        <Box
            height={"100%"}
            width={"100%"}
            bg={useColorModeValue("white", "#131512")}
            overflow={"hidden"}
        >
            <Flex flexDirection={"column"}>
                <HStack fontSize={"18px"} height={"56px"} justifyContent={"space-between"} px={5} borderBottom={"2px solid #DDE3E8"}>
                    <Text fontWeight={600} color={useColorModeValue("#062D59", "#fff")}>Plant</Text>
                    <InfoSymbol>
                        <PlantInfoIcon />
                    </InfoSymbol>
                </HStack>
                {plantType == "PV" ? (
                    <PVPowerFlowSvg
                        SolarValue={batteryStatus ? batteryStatus[0] : 0}
                        GridValue={batteryStatus2 ? batteryStatus2[0] : 0}
                        PVMeterValue={batteryStatus5 ? batteryStatus5[0] : 0}
                        combineResult={combinePVPowerFlowResult}
                    />
                ) : (
                    <PowerFlowSvg
                        SolarValue={batteryStatus ? batteryStatus[0] : 0}
                        DGValue={batteryStatus3 ? batteryStatus3[0] : 0}
                        BatteryValue={batteryStatus4 ? batteryStatus4[0] : 0}
                        GridValue={batteryStatus2 ? batteryStatus2[0] : 0}
                        LoadValue={parseFloat(((batteryStatus ? batteryStatus[0] : 0) + (batteryStatus2 ? batteryStatus2[0] : 0) + (batteryStatus3 ? batteryStatus3[0] : 0) + ((batteryStatus4 ? batteryStatus4[0] >= 0 ? batteryStatus4[0] : 0 : 0))).toFixed(2)) || 0}
                        combineResult={combinePowerFlowResult}
                    />
                )}
            </Flex>
        </Box>
    );
};

export default PowerFlow