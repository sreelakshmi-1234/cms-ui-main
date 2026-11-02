import {
  Box,
  Flex,
  Text,
  Icon,
  Button,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  FaArrowUp,
  FaTools,
  FaUsers,
  FaClipboard,
  FaShieldAlt,
  FaCommentDots,
  FaExternalLinkAlt,
} from "react-icons/fa";

const RevenueAIInsights = () => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const borderColor = useColorModeValue(
    "rgba(0,0,0,0.06)",
    "rgba(255,255,255,0.08)"
  );

  const itemBoxBg = useColorModeValue("rgba(14,31,61,0.04)", "rgba(255,255,255,0.02)");
  const valueColor = useColorModeValue("#1A202C", "#DCE7F7");
  const descColor = useColorModeValue("#4A5568", "#B7C7E3");
  const buttonBg = useColorModeValue("#2F80ED", "#2F80ED");
  const buttonHover = useColorModeValue("#256EDB", "#256EDB");
  const iconColor = useColorModeValue("#1A202C", "#FFFFFF");

  const insights = [
    {
      icon: FaArrowUp,
      color: "#E74C3C",
      title: "Revenue leakage increased",
      value: "₹ 18,400/day vs yesterday.",
      desc: "Primary reason: Transformer loading increased from 76% to 91%.",
    },
    {
      icon: FaTools,
      color: "#F39C12",
      title: "Curtailment loss high",
      value: "₹ 1.32 Cr this month.",
      desc: "Peak impact window: 11:00 AM – 3:00 PM",
    },
    {
      icon: FaUsers,
      color: "#2ECC71",
      title: "Sungrow inverters leading",
      value: "27.4% of portfolio revenue",
      desc: "with 98.65% avg efficiency.",
    },
    {
      icon: FaClipboard,
      color: "#4A90FF",
      title: "TR-01 overloaded",
      value: "Impacting revenue by",
      desc: "₹ 18,400/day",
    },
    {
      icon: FaShieldAlt,
      color: "#9B59B6",
      title: "Optimize Block-7 cleaning",
      value: "Potential revenue gain",
      desc: "₹ 11,200/day",
    },
  ];

  return (
    <Box
      h="150px"
      w="100%"
      bg={cardBg}
      borderRadius="10px"
      border={`1px solid ${borderColor}`}
      overflow="hidden"
      px={3}
      py={2}
    >
      <Flex
        align="center"
        gap={2}
        h="100%"
      >
        {insights.map((item, index) => (
          <Box
            key={index}
            flex="1"
            h="100px"
            borderRadius="8px"
            border={`1px solid ${borderColor}`}
            bg={itemBoxBg}
            px={3}
            py={2}
          >
            <Flex
              gap={2}
              align="flex-start"
            >
              <Flex
                minW="30px"
                h="30px"
                borderRadius="full"
                bg={`${item.color}25`}
                align="center"
                justify="center"
              >
                <Icon
                  as={item.icon}
                  color={item.color}
                  fontSize="14px"
                />
              </Flex>

              <Box>
                <Text
                  color={item.color}
                  fontSize="12px"
                  fontWeight="600"
                  lineHeight="1.1"
                >
                  {item.title}
                </Text>

                <Text
                  color={valueColor}
                  fontSize="11px"
                  mt="2px"
                >
                  {item.value}
                </Text>

                <Text
                  color={descColor}
                  fontSize="11px"
                >
                  {item.desc}
                </Text>
              </Box>
            </Flex>
          </Box>
        ))}

        {/* AI Button */}

        <Box
          minW="210px"
          h="72px"
          borderRadius="8px"
          border={`1px solid ${borderColor}`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <HStack spacing={3}>
            <Button
              leftIcon={<FaCommentDots />}
              bg={buttonBg}
              color="white"
              size="md"
              _hover={{
                bg: buttonHover,
              }}
            >
              Ask ETAflux AI
            </Button>

            <Icon
              as={FaExternalLinkAlt}
              color={iconColor}
              fontSize="13px"
              cursor="pointer"
            />
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default RevenueAIInsights;