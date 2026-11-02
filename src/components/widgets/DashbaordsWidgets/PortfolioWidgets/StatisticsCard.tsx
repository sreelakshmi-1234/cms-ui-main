import {
  Box,
  Image,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  StatArrow,
  Text,
  HStack,
  Stack,
} from '@chakra-ui/react';
import SparklineChart from '../../charts/SparkLineChart';
import { EnlargeWidgetSize } from '../../../../Services/EnlargeWidget';
import UseStatisticsCard from '../../../../Services/Hooks/UseStatisticsCard';
import { EnergyIcon, GreenIcon, LifetimeIcon, PowerIcon, RevenueIcon, PR, CUF } from '../../../../assets/Portfolio/Icons';
import { energyUnitScaling } from '../../../../Services/DynamicUnitScaling/EnergyUnitScaling';

interface StatsCardProps {
  title: string;
  unit : string;
  Icon: React.FC;
  w: number;
  bg: string;
  telemetry: string;
  deviceLabel: string;
  statLabel? : string;
  tooltip? : boolean;
}

function StatsCard(props: StatsCardProps) {
  const { title, unit, Icon, w, telemetry, deviceLabel, statLabel, tooltip } = props;
  let statValue : [number, number, number[]] = UseStatisticsCard(deviceLabel, telemetry, title) || [0, 0, [0]];
  let latestValue = telemetry == "PV_Total_Energy_kWh" ? statValue[0] ? energyUnitScaling(statValue[0]).value : 0 : Number(statValue[0] ?? "0");
  let stat = (statValue[1]) as number;
  let data =  statValue[2] ?? [0] as number[];
  if(telemetry == "PV_Total_Energy_kWh" && statValue[2].length > 0) {
    // console.log("data in MWh", data);
    data = data.map((val : number) => energyUnitScaling(val).value);
  }

  return (
    <Stat
      p={"20px"}
      h={"132px"}
      w={w + "px"}
      bg={"#FFFFFF"}
      _dark={{ bg: "#131512" }}
      overflow={"hidden"}
    >
      <Flex justifyContent={'space-between'} flexDir={"column"} overflow={"hidden"}>
        <Box
          color={useColorModeValue('#062D59', 'white')}
        >
          <HStack >
            <Icon />
            <Text fontSize={"16px"} fontWeight={600}>{title}</Text>
          </HStack>
        </Box>
        <Flex gap={"10px"}>
          <Flex flexDir={"column"} mt={5} alignItems={"baseline"} color={useColorModeValue('#062D59', 'white')}>
            <StatNumber fontSize={"16px"} fontWeight={'600'}>
              {(latestValue).toFixed(1)}{telemetry == "PV_Total_Energy_kWh" ? statValue[0] ? energyUnitScaling(statValue[0]).unit : "kWh" : unit}
            </StatNumber>
            <Flex alignItems={'center'} >
              <Text ml={1} fontSize={"12px"} fontWeight={500} color={Number(stat)>=0?"#05BA3B":"#FF4848"}>{stat? (stat < 0 ? (stat*(-1)) : stat): "0"}%</Text>
              <StatArrow type={Number(stat)>=0?"increase":"decrease"} ml={1} />
            </Flex>
            <Text fontSize={"8px"}>{statLabel || "Since yesterday"}</Text>
          </Flex>
          <Box>
            <SparklineChart tooltip={tooltip} data = {data} stat = {Number(stat)}/>
          </Box>
        </Flex>
      </Flex>
    </Stat>
  );
}

export default function StatisticsCard() {
  return (
    <Box w="1816px">
      <Stack direction={["column", "row"]} gap={3}>
        <StatsCard
          title={'Power'}
          unit = {"kW"}
          w={224}
          bg={"#FFECC1"}
          Icon={PowerIcon}
          telemetry={"Total_Portfolio_Power"}
          deviceLabel={"portfolio"}
        />
        <StatsCard
          title={'Daily Energy'}
          unit = {"kWh"}
          w={222}
          bg={"#FAE4DE"}
          Icon={EnergyIcon}
          telemetry={"Total_Portfolio_Energy"}
          deviceLabel={"Portfolio"}
        />
        <StatsCard
          title={'Lifetime Energy'}
          unit = {"MWh"}
          w={222}
          bg={"#EFFFBC"}
          Icon={LifetimeIcon}
          telemetry={"PV_Total_Energy_kWh"}
          deviceLabel={"calculation"}
          statLabel='% YoY Change (5Y)'
          tooltip={true}
        />
        <StatsCard
          title={'CUF'}
          unit = {"%"}
          w={224}
          bg={"#F3F3EB"}
          Icon={CUF}
          telemetry = {"AVG_Portfolio_CUF_AC"}
          deviceLabel= {"Portfolio"}
        />
        <StatsCard
          title={'PR'}
          unit = {"%"}
          w={224}
          bg={"#F3F3EB"}
          Icon={PR}
          telemetry = {"AVG_Portfolio_PR_Percent"}
          deviceLabel= {"Portfolio"}
        />
        <StatsCard
          title={'PV Total Revenue'}
          unit = {"₹"}
          w={234}
          bg={"#ACE1FF"}
          Icon={RevenueIcon}
          telemetry={"PV_Portfolio_Revenue"}
          deviceLabel={"Portfolio"}
        />
        <StatsCard
          title={'CO2'}
          unit = {"kg"}
          w={224}
          bg={"#F3F3EB"}
          Icon={GreenIcon}
          telemetry = {"CO2_EmissionsKg_Saved"}
          deviceLabel= {"calculation"}
        />

        {/* <StatsCard
          title={'CO2'}
          unit = {"kg"}
          w={224}
          bg={"#F3F3EB"}
          Icon={GreenIcon}
          telemetry = {"CO2_EmissionsKg_Saved"}
          deviceLabel= {"calculation"}
        /> */}
      </Stack>
    </Box>
  );
}
