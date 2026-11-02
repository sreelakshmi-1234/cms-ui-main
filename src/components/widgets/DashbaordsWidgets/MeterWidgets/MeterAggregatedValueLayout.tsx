import { Box, Flex, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react"

interface AggregatedValueLayoutType {
    title : string;
    line : string;
    value : number;
    minValue : number;
    maxValue : number;
    unit : string;
    barColor : string;
    filledColor : string;
    srcMax? : number;
    percentWhenValueInFill? : number;
}

function scaleValue(value : number, srcRange : number[], dstRange: number[]) : any {
    const [srcMin, srcMax] = srcRange;
    const [dstMin, dstMax] = dstRange;
  
    // Perform the scaling
    const scaledValue = dstMin + ((value - srcMin) / (srcMax - srcMin)) * (dstMax - dstMin);
    return scaledValue;
}

const MeterAggregatedValueLayout : React.FC<AggregatedValueLayoutType> = ( {title, line, value, minValue, maxValue, srcMax=100, unit, barColor, filledColor, percentWhenValueInFill=10} ) => {
    var srcRange = [0, srcMax];
    var dstRange = [0, 100];
    
    const FilledBar = scaleValue(value, srcRange, dstRange);
    return (
        <VStack
            color={useColorModeValue("#062D59", "#fff")}
            fontSize={"12px"}
            h={"54px"}
            w={"164px"}
            alignItems={"flex-start"}
        >
            <Flex fontWeight={600} gap={1}>
                <Text letterSpacing={"1px"}>{line}</Text>
                <Text>{title}</Text>
            </Flex>
            <Box position="relative" width="100%">
                <Box position="absolute" top="-18px" right="0">
                    <Text fontSize="11px" fontWeight="bold">
                        {value} <Text as="span" fontSize="10px">{unit}</Text>
                    </Text>
                </Box>

                {/* Bar */}
                <Flex
                    width={"100%"}
                    height={"4px"}
                    bg={barColor}
                    overflow={"hidden"}
                    borderRadius="full"
                >
                    <Box
                        height={"100%"}
                        width={`${FilledBar}%`}
                        bg={filledColor}
                        transition="width 0.3s ease-in-out"
                    ></Box>
                </Flex>
            </Box>
            <HStack>
                <Flex alignItems={"baseline"} gap={1}>
                    <Text fontSize={"11px"}>Min {minValue}</Text>
                    <Text fontSize={"9px"}>{unit}</Text>
                </Flex>
                <Flex alignItems={"baseline"} gap={1}>
                    <Text fontSize={"11px"}>Max {maxValue}</Text>
                    <Text fontSize={"9px"}>{unit}</Text>
                </Flex>
            </HStack>
        </VStack>
    );
};

export default MeterAggregatedValueLayout