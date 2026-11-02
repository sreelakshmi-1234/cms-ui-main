import { Box, Button, Flex, HStack, Image, Popover, PopoverAnchor, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Text, VStack } from "@chakra-ui/react";
import React from "react";
import UseInfoSymbol from "../../Services/Hooks/UseInfoSymbol";
import { EnlargeWidgetSize, EnlargeWidgetSizeWidth } from "../../Services/EnlargeWidget";

const InfoSymbol: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

    const infoKeys = ["Project", "Location", "Commissioned", "Energy System", "PV Capacity", "BESS Capacity", "DG Capacity"];
    const keys = ["image_url", "Plant_Name", "location", "commissioned", "Energy_System", "pv_capacity", "bess_capacity", "dg_capacity"];
    const data = UseInfoSymbol(keys);
  return (
    <Popover placement="left-start" isLazy>
      <PopoverTrigger>
        <Box as="span" display="inline-block">
          {children}
        </Box>
      </PopoverTrigger>
      <PopoverContent width={"auto"} height={"auto"} overflow={"hidden"} bgColor={"rgba(255, 255, 255, 1)"}>
        <PopoverArrow />
        <PopoverHeader borderColor={"transparent"} pos={"absolute"} right={0}>
            <PopoverCloseButton bg={"rgba(255, 255, 255, 0.3)"} backdropFilter={"blur(25px) saturate(20%)"} borderRadius={"50%"} />
        </PopoverHeader>
        <PopoverBody overflow={"auto"} scrollBehavior={"smooth"}>
          <HStack justifyContent={"space-between"} p={"0px"}>
            <Flex flexDirection={"column"} color={"#062D59"} alignItems={"flex-start"}>
              <VStack align={"flex-start"} borderBottom={"1px solid #DDE3E8"} mb={3} >
                <Text fontWeight={700} fontSize={"26px"} >{data[1]}</Text>
                <Text fontSize={"14px"} color={"#9BABBD"} mb={3} >{data[2]} <Text as={"span"} fontSize={"18px"}>.</Text> {data[3]}</Text>
              </VStack>
                {data.slice(4).map((value, i) => (
                  <VStack py={EnlargeWidgetSize(2) + "px"} alignItems={"flex-start"} spacing={0} mb={5}>
                      <Text fontSize={"16px"} fontWeight={600} color={"#062D59"} >{data[4+i]}</Text>
                      <Text color={"#9BABBD"} fontWeight={400} fontSize={"12px"}>{infoKeys[3+i]} </Text>
                  </VStack>
                ))}
            </Flex>
            <Image src={data[0]} alt="PlantImage" width={"458px"} height={"334px"} />
          </HStack>
        </PopoverBody>
        {/* <PopoverFooter>

        </PopoverFooter> */}
      </PopoverContent>
    </Popover>
  );
};

export default InfoSymbol;
