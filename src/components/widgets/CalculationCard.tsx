import React from 'react'
import {
    Box,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    TabIndicator,
    Flex,
    Text
} from '@chakra-ui/react'
import { EnlargeWidgetSize } from '../../Services/EnlargeWidget';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

interface CalculatedCardContentProps {
  valueIndex : number;
  data : string[][];
  dataLabels : string[];
}

const CalculatedCardContent:React.FC<CalculatedCardContentProps> = ({valueIndex, data, dataLabels}) => {
  // const dataLabels = ["Grid kW:", "CUF %:", "Grid Hz:", "Consumption kWh:", "Feed kWh:"];
    // const data = [
    //     ["Grid kW", "Grid Hz", "Consumption kWh", "Feed kWh"],
    //     [299.79, 131, 49, 9999999.99],
    //     [399.79, 231, 59, 10999999.99],
    //     [499.79, 331, 69, 20999999.99]
    // ]
    return (
        <Box>
            {data[0].map((_, index) => (
                <Flex key={index} mx={-5} justifyContent="space-between">
                <Text color={"#4A4A4A"} fontWeight={400} fontSize={EnlargeWidgetSize(12)}>{dataLabels[index]}</Text>
                <Text color={"#8842E0"} fontWeight={600} fontSize={EnlargeWidgetSize(12)}>{ data[valueIndex][index] && typeof data[valueIndex][index] == "string"? ((data[valueIndex][index]).includes("404 error") ? (data[valueIndex][index].replace("404 error", "") + "⚠️") : data[valueIndex][index]) : "0" }</Text>
                </Flex>
            ))}
        </Box>
    )
}

interface CalculationCardProps {
    data : string[][];
    DataLabel : string[];
}

const CalculationCard:React.FC<CalculationCardProps> = ({data, DataLabel}) => {
  return (
    <Tabs position='relative' variant='unstyled' >
      <TabList color={"#8842E0"} >
        <Tab fontSize={EnlargeWidgetSize(12)} fontWeight={600}>Daily</Tab>
        <Tab fontSize={EnlargeWidgetSize(12)} fontWeight={600}>Monthly</Tab>
        <Tab fontSize={EnlargeWidgetSize(12)} fontWeight={600}>Yearly</Tab>
      </TabList>
      <TabIndicator mt='-1.5px' height={EnlargeWidgetSize(2) + "px"} bg='#8842E0' borderRadius='1px' />
      <TabPanels>
        <TabPanel>
          <CalculatedCardContent dataLabels={DataLabel} data = {data} valueIndex={0} />
        </TabPanel>
        <TabPanel>
          <CalculatedCardContent dataLabels={DataLabel} data = {data} valueIndex={1} />
        </TabPanel>
        <TabPanel>
          <CalculatedCardContent dataLabels={DataLabel} data = {data} valueIndex={2} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default CalculationCard