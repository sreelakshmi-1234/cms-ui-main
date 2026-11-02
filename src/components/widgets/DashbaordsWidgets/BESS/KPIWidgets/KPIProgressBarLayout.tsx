import { Box, Flex, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react"

interface ProgressBarType {
    title : string;
    secondaryTitle? : string;
    value : number;
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

const KPIProgressBarLayout : React.FC<ProgressBarType> = ( {title, secondaryTitle="", value, srcMax=100, unit, barColor, filledColor, percentWhenValueInFill=10} ) => {
    var srcRange = [0, srcMax];
    var dstRange = [0, 100];
    
    const FilledBar = scaleValue(value, srcRange, dstRange);

    return (
        <Box
            width={"439px"}
            height={"79px"}
            bg={useColorModeValue("white", "#131512")}
            overflow={"hidden"}
        >
            <VStack color={useColorModeValue("#062D59", "#FFFFFF")} width={"100%"} height={"100%"} align={"flex-start"} justifyContent={"space-between"}>
                <HStack
                    spacing={1}
                    width={"100%"}
                >
                    <Text
                        fontSize={"18px"}
                        fontWeight={600}
                        pl={3}
                        pt={3}
                        textAlign={"left"}
                        alignContent={"center"}
                    >
                        {title}
                    </Text>
                    <Text
                        fontSize={"18px"}
                        fontWeight={600}
                        pt={3}
                        textAlign={"left"}
                        alignContent={"center"}
                        color={"#9BABBD"}
                    >
                        {secondaryTitle}
                    </Text>
                </HStack>
                <Flex
                    width={"100%"}
                    height={"32px"}
                    bg={barColor}
                >
                    <Box
                        height={"100%"}
                        width={FilledBar + "%"}
                        bg={filledColor}
                    >
                        {
                            FilledBar >= percentWhenValueInFill ? (
                                <Text
                                    width={"100%"}
                                    height={"100%"}
                                    alignContent={"center"}
                                    textAlign={"center"}
                                    fontSize={"12px"}
                                    fontWeight={600}
                                    color={"#062D59"}
                                >
                                    {value + ` ${unit}`}
                                </Text>
                            ) : <></>
                        }
                    </Box>
                    {
                        FilledBar < percentWhenValueInFill ? (
                            <Text
                                width={"100%"}
                                height={"100%"}
                                alignContent={"center"}
                                textAlign={"left"}
                                fontSize={"12px"}
                                fontWeight={600}
                                color={"#062D59"}
                                pl={1}
                            >
                                {value + ` ${unit}`}
                            </Text>
                        ) : <></>
                    }
                </Flex>
            </VStack>
        </Box>
    );
};

export default KPIProgressBarLayout