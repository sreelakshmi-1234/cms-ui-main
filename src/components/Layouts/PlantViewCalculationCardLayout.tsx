import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Tab,
  Tabs,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { EnlargeWidgetSize, EnlargeWidgetSizeWidth } from '../../Services/EnlargeWidget';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';


interface PlantViewCalculatedCardContentProps {
  valueIndex : number;
  data : string[][];
  dataLabels : string[];
}

const PlantViewCalculatedCardContent:React.FC<PlantViewCalculatedCardContentProps> = ({dataLabels, valueIndex, data}) => {
    // const dataLabels = ["Grid kW:", "CUF %:", "Grid Hz:", "Consumption kWh:", "Feed kWh:"];
    // const data = [
    //     [299.79, 36, 131, 49, 9999999.99],  //Daily
    //     [399.79, 18, 231, 59, 10999999.99], //Monthly
    //     [499.79, 16, 331, 69, 20999999.99]  //Yearly
    // ]
    return (
        <Box h={"100%"}>
                <Flex mx={EnlargeWidgetSize(-5)} flexDirection={"column"} w={EnlargeWidgetSizeWidth(300) + "px"} flexWrap={"wrap"}>
                  {data[0].map((_, index) => (
                    <Flex key={index} mr={"30px"} ml={"20px"} justifyContent={"space-between"} mb={2} alignItems={"start"} textAlign={"left"}>
                      <Text color={"#3D3D3D"} fontWeight={600} fontSize={[12, 12, 12, 12, EnlargeWidgetSize(12)]}>{dataLabels[index]}:</Text>
                      <Text color={"#000000"} fontWeight={700} fontSize={[12, 12, 12, 12, EnlargeWidgetSize(12)]}>{ data[valueIndex][index] && typeof data[valueIndex][index] == "string"? ((data[valueIndex][index]).includes("404 error") ? (data[valueIndex][index].replace("404 error", "") + "⚠️") : data[valueIndex][index]) : "0" }</Text>
                    </Flex>
                  ))}
                  {/* {data[0].map((_, index) => (
                    <Flex key={index} mr={"30px"} ml={"20px"} justifyContent={"space-between"} mb={2} alignItems={"start"} textAlign={"left"}>
                      <Text color={"#3D3D3D"} fontWeight={600} fontSize={12}>{dataLabels[index]}:</Text>
                      <Text color={"#000000"} fontWeight={700} fontSize={12}>{parseFloat(data[valueIndex][index]).toFixed(2) || 0}</Text>
                    </Flex>
                  ))} */}
                </Flex>
        </Box>
    )
}



interface PlantViewCalculationCardLayoutProps {
  title: string;
  bg? : string;
  width: string[];
  height: string;
  px? : string;
  data : string[][];
  DataLabel : string[];
  tab0? : string;
  tab1?: string;
  tab2? : string;
}

const PlantViewCalculationCardLayout: React.FC<PlantViewCalculationCardLayoutProps> = ({ title, bg, width, height, px, data, DataLabel, tab0, tab1, tab2 }) => {
  return (
    <Box
      w={width}
      h={height}
      borderRadius="5px"
      bgColor={useColorModeValue('white', 'gray.800')}
      p={5}
      px={px}
      boxShadow="md"
      backgroundColor={"red"}
      // overflow={"auto"}
      // pos={"relative"}
      bg = {bg}
    >
      <HStack>
        <Text 
          mt={EnlargeWidgetSize(3)} // 6 when width is 317px //// 3 when width is 100%
          ml={EnlargeWidgetSize(4)}
          mb={EnlargeWidgetSize(5)}
         fontSize={["29px", "29px", "29px", "29px", EnlargeWidgetSize(29) + "px"]}
         fontFamily={"inter"} 
         fontWeight={600} 
         color={useColorModeValue('#000000', 'white')}
         letterSpacing={1}
         >{title}</Text>
      </HStack>
      <Box as='main' pb={EnlargeWidgetSize(6)} height={"100%"} width={"full"} _dark={{color : "white"}}>
      <Tabs variant='unstyled' >
        <TabList color={"#000000"} mt={EnlargeWidgetSize(window.screen.height < 950 ? -3 : 6)}>
          <Tab fontSize={EnlargeWidgetSize(12)} fontWeight={700}>{tab0 ? tab0 : "Daily"}</Tab>
          <Tab fontSize={EnlargeWidgetSize(12)} fontWeight={700}>{tab1? tab1 : "Monthly"}</Tab>
          <Tab fontSize={EnlargeWidgetSize(12)}fontWeight={700}>{tab2 ? tab2 : "Yearly"}</Tab>
        </TabList>
        <TabIndicator mt={ (-1 * (EnlargeWidgetSize(2.5))) + "px"} height= {EnlargeWidgetSize(4) + "px"} bg='#000000' borderRadius='1px' />
        <hr style={{border: "1px solid #000", width: EnlargeWidgetSizeWidth(280) + "px"}} />
        <TabPanels>
          <TabPanel>
            <PlantViewCalculatedCardContent dataLabels={DataLabel} data={data} valueIndex={0} />
          </TabPanel>
          <TabPanel>
            <PlantViewCalculatedCardContent dataLabels={DataLabel} data={data} valueIndex={1} />
          </TabPanel>
          <TabPanel>
            <PlantViewCalculatedCardContent dataLabels={DataLabel} data={data} valueIndex={2} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      </Box>
    </Box>
  );
};

export default PlantViewCalculationCardLayout;
