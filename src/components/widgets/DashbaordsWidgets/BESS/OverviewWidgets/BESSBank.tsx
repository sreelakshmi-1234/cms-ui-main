import { Flex, HStack, Text, VStack } from "@chakra-ui/react"
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout"
import PieChart from "../../../charts/PieChart"


const BESSBank = () => {
    return (
        <GraphLayout
            title="Bank"
            titleLengthSVG={30}
            titleLengthLongSVG={195}
            height={"344px"}
            width={["300px"]}
            downloadOption={false}
            WidgetProps={{
                transform: "rotate(0deg)",
                opacity: 1
            }}
        >
            <VStack width={"full"} spacing={0}>
                <PieChart />
                <VStack width={"full"} mt={-2} color={"#062D59"} align={"flex-start"}>
                    <Text fontWeight={600} fontSize={"12px"} >Module Temperature</Text>
                    <HStack width={"full"} borderBottom={"1px solid #DDE3E8"}>
                        <VStack spacing={0} alignItems={"flex-start"} width={"119px"}>
                            <Flex alignItems={"baseline"} gap={1}>
                                <Text fontWeight={700} fontSize={"22px"}>0°</Text>
                                <Text fontWeight={500} fontSize={"14px"}>C</Text>
                            </Flex>
                            <Text fontSize={"16px"} color={"#9BABBD"}>Max</Text>
                        </VStack>
                        <VStack spacing={0} alignItems={"flex-start"}>
                            <Flex alignItems={"baseline"} gap={1}>
                                <Text fontWeight={700} fontSize={"22px"}>0°</Text>
                                <Text fontWeight={500} fontSize={"14px"}>C</Text>
                            </Flex>
                            <Text fontSize={"16px"} color={"#9BABBD"}>Min</Text>
                        </VStack>
                    </HStack>
                    <HStack width={"full"}>
                        <VStack spacing={0} alignItems={"flex-start"} width={"119px"}>
                            <Flex alignItems={"baseline"} gap={1}>
                                <Text fontWeight={700} fontSize={"22px"}>{("0")}</Text>
                            </Flex>
                            <Text fontSize={"16px"} color={"#9BABBD"}>Connected</Text>
                        </VStack>
                        <VStack spacing={0} alignItems={"flex-start"}>
                            <Flex alignItems={"baseline"} gap={1}>
                                <Text fontWeight={700} fontSize={"22px"}>{("0")}</Text>
                            </Flex>
                            <Text fontSize={"16px"} color={"#9BABBD"}>Disabled</Text>
                        </VStack>
                    </HStack>
                </VStack>
            </VStack>
        </GraphLayout>
    );
};

export default BESSBank