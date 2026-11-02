import {
    Box,
    Image,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    StatHelpText,
    StatArrow,
    Text,
  } from '@chakra-ui/react';
import UseLatestCard from '../../Services/Hooks/UseLatestCard';
import { EnlargeWidgetSize } from '../../Services/EnlargeWidget';

  
  interface LatestValueLayoutProps {
    title: string;
    deviceLabel : string;
    telemetry : string;
    titleColor : string;
    stat: string;
    statColor : string;
    src: string;
    w: number[];
    h: number[];
    border : string;
    bg: string;
    value2: string;
    value2Color : string;
    showArrow : boolean;
    sparkline: React.ReactNode;
    unit? : string;
    width? : string | string[];
    height? : string;
  }
  
  export default function LatestValueCardLayout(props: LatestValueLayoutProps) {
    const { title, deviceLabel, telemetry, titleColor, src, w, h, border,value2,value2Color ,showArrow, sparkline, statColor, unit="" , width, height} = props;
    
    const latestValue = UseLatestCard(deviceLabel, telemetry , title) || [0];
    let stat = Number(latestValue[0]);
    
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        bg={"#FFFFFF"}
        _dark={{bg:"gray.800"}}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        border={border}
        shadow={'xl'}
        rounded={'lg'}
        width={ width || "289px"}
        height={height ||"110px"}
        mb={2}
      >
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}>
            <Image src={src} w={EnlargeWidgetSize(w[w.length - 1])} h={EnlargeWidgetSize(h[h.length - 1])} borderRadius={"50%"} />
          </Box>
          <Box pl={{ base: 2, md: 5 }}>
            <StatLabel fontWeight={'500'} fontSize={EnlargeWidgetSize(16) + "px"} fontFamily={"inter"} color={titleColor} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={EnlargeWidgetSize(22) + "px"} color={statColor} fontWeight={'600'}>
              {stat + unit}
            </StatNumber>
            <Flex alignItems={'center'}>
              <Text ml={1} fontSize={EnlargeWidgetSize(12)} color={value2Color}>{value2}</Text>
              {showArrow &&<StatArrow type="increase" ml={1} />}
            </Flex>
          </Box>
          <Box>
            {sparkline}
          </Box>
        </Flex>
      </Stat>
    );
  }