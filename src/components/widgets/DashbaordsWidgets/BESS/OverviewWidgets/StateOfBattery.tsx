import { Box, Flex, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import UseBatteryStatus from "../../../../../Services/Hooks/Battery/UseBatteryStatus";
import { ElevenToTwenty, FiftyToSixty, FourtyToFifty, NinetyToHundred, SeventyToNinety, SixtyToSeventy, ThirtyToFourty, TwentyToThirty, ZeroToTan } from "../../../../../assets/BESS/Overview/BatterySVGs";


const StateOfBattery = () => {
    // ********* Dynamic Battery Widget Value ************
    var searchStatus = {
        devName : "PCS-1",
        keys : "ESS_SOC"
    }
    const batteryStatus = UseBatteryStatus(searchStatus) || [0];

    // ******** State of BAttery Below Dynamic Battery Widget ***************
    var searchPower = {
        devName : "PCS-1",
        keys : "AC_Active_Power_Watt"
    }
    const batteryPower = UseBatteryStatus(searchPower) || [0];
    return (
        <Box
            width={"100%"}
            height={"100%"}
            p={"20px"}
            bg={useColorModeValue("white", "#131512")}
            mt={5}
            overflow={"hidden"}
        >
            <Flex flexDir={"column"}>
                <VStack spacing={2} alignItems={"flex-start"}>
                    <Text fontSize={"16px"} color={"#9BABBD"}>State of Battery</Text>
                    <Flex alignItems={"baseline"} gap={1}>
                        <Text fontWeight={700} fontSize={"22px"}>{(batteryStatus[0] || "0")}</Text>
                        <Text fontWeight={500} fontSize={"14px"}>%</Text>
                    </Flex>
                    <Text 
                        fontSize={"14px"} 
                        fontWeight={500}
                        color={batteryPower[0] > 0 ? "#B11F24" : batteryPower[0] == 0? "red" : "#03BB7D"}
                    >
                        {batteryPower[0] > 0 ? "DISCHARGING..." : batteryPower[0] == 0? "IDLE" : "CHARGING..."}
                    </Text>
                </VStack>
                <Box alignSelf={"flex-end"} mt={-14}>
                    {
                        // batteryStatus[0] <= 0 ? <ZeroToTan /> : batteryStatus[0] <= 20 ? <ElevenToTwenty /> : batteryStatus[0] <= 30 ? <TwentyToThirty /> : batteryStatus[0] <= 40 ? <ThirtyToFourty /> : batteryStatus[0] <= 50 ? <FourtyToFifty /> : batteryStatus[0] <= 60 ? <FiftyToSixty /> : batteryStatus[0] <= 70 ? <SixtyToSeventy /> : batteryStatus[0] <= 90 ? <SeventyToNinety /> : batteryStatus[0] <= 100 ? <NinetyToHundred /> : <Box></Box>
                        batteryStatus[0] <= 0 ? <ZeroToTan /> : batteryStatus[0] <= 30 ? <ElevenToTwenty /> : batteryStatus[0] <= 50 ? <ThirtyToFourty /> : batteryStatus[0] <= 70 ? <SixtyToSeventy /> : batteryStatus[0] <= 90 ? <SeventyToNinety /> : batteryStatus[0] <= 100 ? <NinetyToHundred /> : <Box></Box>
                    }
                </Box>
            </Flex>
        </Box>
    );
};

export default StateOfBattery