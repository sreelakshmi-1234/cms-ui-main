import { Box, HStack, useColorModeValue, VStack } from "@chakra-ui/react"
import GridAggregatedValueLayout from "./GridAggregatedValueLayout"
import UseBatteryStatus from "../../../../Services/Hooks/Battery/UseBatteryStatus";


const GridAggregatedBlocks = () => {
    // ********* Current **********
    var search1Current = {
        devName : localStorage.getItem("currentGridMeter") || "Grid Meter-1",
        keys : "AGC_AMP_L1,AGC_AMP_L2,AGC_AMP_L3"
    }
    const MeterLiveTagCurrent = UseBatteryStatus(search1Current) || [0, 0, 0];
    var search2Current = {
        devName : localStorage.getItem("currentGridMeter") || "Grid Meter-1",
        keys : "AGC_AMP_L1,AGC_AMP_L2,AGC_AMP_L3",
        special : "currentDayMin"
    }
    const MeterMinCurrent = UseBatteryStatus(search2Current) || [0, 0, 0];
    var search3Current = {
        devName : localStorage.getItem("currentGridMeter") || "Grid Meter-1",
        keys : "AGC_AMP_L1,AGC_AMP_L2,AGC_AMP_L3",
        special : "currentDayMAX"
    }
    const MeterMaxCurrent = UseBatteryStatus(search3Current) || [0, 0, 0];

    // ********* Voltage **********
    var search1Voltage = {
        devName : localStorage.getItem("currentGridMeter") || "Grid Meter-1",
        keys : "Bus_B_voltage_L1_L2,Bus_B_voltage_L2_L3,Bus_B_voltage_L3_L1"
    }
    const MeterLiveTagVoltage = UseBatteryStatus(search1Voltage) || [0, 0, 0];
    var search2Voltage = {
        devName : localStorage.getItem("currentGridMeter") || "Grid Meter-1",
        keys : "Bus_B_voltage_L1_L2,Bus_B_voltage_L2_L3,Bus_B_voltage_L3_L1",
        special : "currentDayMin"
    }
    const MeterMinVoltage = UseBatteryStatus(search2Voltage) || [0, 0, 0];
    var search3Voltage = {
        devName : localStorage.getItem("currentGridMeter") || "Grid Meter-1",
        keys : "Bus_B_voltage_L1_L2,Bus_B_voltage_L2_L3,Bus_B_voltage_L3_L1",
        special : "currentDayMAX"
    }
    const MeterMaxVoltage = UseBatteryStatus(search3Voltage) || [0, 0, 0];

    // ********* Frequency **********
    var search1Frequency = {
        devName : localStorage.getItem("currentGridMeter") || "Grid Meter-1",
        keys : "Bus_B_frequency_L1,Bus_B_frequency_L2,Bus_B_frequency_L3"
    }
    const MeterLiveTagFrequency = UseBatteryStatus(search1Frequency) || [0, 0, 0];
    var search2Frequency = {
        devName : localStorage.getItem("currentGridMeter") || "Grid Meter-1",
        keys : "Bus_B_frequency_L1,Bus_B_frequency_L2,Bus_B_frequency_L3",
        special : "currentDayMin"
    }
    const MeterMinFrequency = UseBatteryStatus(search2Frequency) || [0, 0, 0];
    var search3Frequency = {
        devName : localStorage.getItem("currentGridMeter") || "Grid Meter-1",
        keys : "Bus_B_frequency_L1,Bus_B_frequency_L2,Bus_B_frequency_L3",
        special : "currentDayMAX"
    }
    const MeterMaxFrequency = UseBatteryStatus(search3Frequency) || [0, 0, 0];
    return (
        <HStack
            mt={5}
            spacing={5}
        >
            <Box
                h={"152px"}
                w={"590px"}
                p={"20px"}
                bg={useColorModeValue("#fff", "#131512")}
            >
                <VStack
                    alignItems={"flex-start"}
                    width={"100%"}
                >
                    <GridAggregatedValueLayout
                        title="Current"
                        line="L1"
                        unit="A"
                        value={MeterLiveTagCurrent[0]}
                        minValue={MeterMinCurrent[0]}
                        maxValue={MeterMaxCurrent[0]}
                        barColor="rgba(227, 112, 253, 0.2)"
                        filledColor="rgba(227, 112, 253, 1)"
                    />
                    <HStack
                        spacing={"100px"}
                        width={"100%"}
                    >
                        <GridAggregatedValueLayout
                            title="Voltage"
                            line="L1"
                            unit="V"
                            value={MeterLiveTagVoltage[0]}
                            minValue={MeterMinVoltage[0]}
                            maxValue={MeterMaxVoltage[0]}
                            srcMax={450}
                            barColor="rgba(234, 37, 34, 0.2)"
                            filledColor="rgba(234, 37, 34, 1)"
                        />
                        <GridAggregatedValueLayout
                            title="Frequency"
                            line="L1"
                            unit="Hz"
                            value={MeterLiveTagFrequency[0]}
                            minValue={MeterMinFrequency[0]}
                            maxValue={MeterMaxFrequency[0]}
                            barColor="rgba(33, 210, 116, 0.2)"
                            filledColor="rgba(33, 210, 116, 1)"
                        />
                    </HStack>
                </VStack>
            </Box>
            <Box
                h={"152px"}
                w={"590px"}
                p={"20px"}
                bg={useColorModeValue("#fff", "#131512")}
            >
                <VStack
                    alignItems={"flex-start"}
                    width={"100%"}
                >
                    <GridAggregatedValueLayout
                        title="Current"
                        line="L2"
                        unit="A"
                        value={MeterLiveTagCurrent[1]}
                        minValue={MeterMinCurrent[1]}
                        maxValue={MeterMaxCurrent[1]}
                        barColor="rgba(227, 112, 253, 0.2)"
                        filledColor="rgba(227, 112, 253, 1)"
                    />
                    <HStack
                        spacing={"100px"}
                        width={"100%"}
                    >
                        <GridAggregatedValueLayout
                            title="Voltage"
                            line="L2"
                            unit="V"
                            value={MeterLiveTagVoltage[1]}
                            minValue={MeterMinVoltage[1]}
                            maxValue={MeterMaxVoltage[1]}
                            srcMax={450}
                            barColor="rgba(234, 37, 34, 0.2)"
                            filledColor="rgba(234, 37, 34, 1)"
                        />
                        <GridAggregatedValueLayout
                            title="Frequency"
                            line="L2"
                            unit="Hz"
                            value={MeterLiveTagFrequency[1]}
                            minValue={MeterMinFrequency[1]}
                            maxValue={MeterMaxFrequency[1]}
                            barColor="rgba(33, 210, 116, 0.2)"
                            filledColor="rgba(33, 210, 116, 1)"
                        />
                    </HStack>
                </VStack>
            </Box>
            <Box
                h={"152px"}
                w={"590px"}
                p={"20px"}
                bg={useColorModeValue("#fff", "#131512")}
            >
                <VStack
                    alignItems={"flex-start"}
                    width={"100%"}
                >
                    <GridAggregatedValueLayout
                        title="Current"
                        line="L3"
                        unit="A"
                        value={MeterLiveTagCurrent[2]}
                        minValue={MeterMinCurrent[2]}
                        maxValue={MeterMaxCurrent[2]}
                        barColor="rgba(227, 112, 253, 0.2)"
                        filledColor="rgba(227, 112, 253, 1)"
                    />
                    <HStack
                        spacing={"100px"}
                        width={"100%"}
                    >
                        <GridAggregatedValueLayout
                            title="Voltage"
                            line="L3"
                            unit="V"
                            value={MeterLiveTagVoltage[2]}
                            minValue={MeterMinVoltage[2]}
                            maxValue={MeterMaxVoltage[2]}
                            srcMax={450}
                            barColor="rgba(234, 37, 34, 0.2)"
                            filledColor="rgba(234, 37, 34, 1)"
                        />
                        <GridAggregatedValueLayout
                            title="Frequency"
                            line="L3"
                            unit="Hz"
                            value={MeterLiveTagFrequency[2]}
                            minValue={MeterMinFrequency[2]}
                            maxValue={MeterMaxFrequency[2]}
                            barColor="rgba(33, 210, 116, 0.2)"
                            filledColor="rgba(33, 210, 116, 1)"
                        />
                    </HStack>
                </VStack>
            </Box>
        </HStack>
    );
};

export default GridAggregatedBlocks