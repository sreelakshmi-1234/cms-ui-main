import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const PRDecomposition = () => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const cardBorder = useColorModeValue(
    "1px solid rgba(0,0,0,0.08)",
    "1px solid rgba(255,255,255,0.08)"
  );

  const titleColor = useColorModeValue(
    "#1A202C",
    "#FFFFFF"
  );

  const muted = useColorModeValue(
    "#4A5568",
    "#D6E4FF"
  );

  const centerTextColor = useColorModeValue(
    "#0F172A",
    "#FFFFFF"
  );

  const segments = [
    { color: "#4CAF50", label: "Temperature Loss", value: "4%" },
    { color: "#81C784", label: "Soiling Loss", value: "5%" },
    { color: "#FDD835", label: "Curtailment Loss", value: "3%" },
    { color: "#FF7043", label: "Mismatch Loss", value: "2%" },
    { color: "#AB47BC", label: "Availability Loss", value: "4%" },
    { color: "#42A5F5", label: "Conversion Loss", value: "0%" },
  ];

  const donutGradient = `
    conic-gradient(
      #1E88E5 0deg 240deg,
      #4CAF50 240deg 255deg,
      #81C784 255deg 273deg,
      #FDD835 273deg 284deg,
      #FF7043 284deg 292deg,
      #AB47BC 292deg 307deg,
      #42A5F5 307deg 315deg,
      #90CAF9 315deg 360deg
    )
  `;

  return (
    <Box
      flex={1}
      bg={cardBg}
      borderRadius="10px"
      border={cardBorder}
      p={3}
      minH="300px"
      overflow="hidden"
      w="368px"
    >
      {/* Header */}

      <Flex
        justify="space-between"
        align="center"
        mb={3}
      >
        <Flex
          align="center"
          gap={2}
        >
          <Box
            w="18px"
            h="18px"
            borderRadius="full"
            bg="#2563EB"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              fontSize="10px"
              color="white"
              fontWeight="700"
            >
              4
            </Text>
          </Box>

          <Text
            color={titleColor}
            fontSize="12px"
            fontWeight="700"
          >
            PR DECOMPOSITION
          </Text>
        </Flex>
      </Flex>

      {/* Donut + Legend */}

      <Flex
        justify="space-between"
        align="center"
        mb={4}
      >
        {/* Donut */}

        <Box
          position="relative"
          w="120px"
          h="120px"
          flexShrink={0}
        >
          <Box
            w="120px"
            h="120px"
            borderRadius="50%"
            bg={donutGradient}
          />

          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
            w="76px"
            h="76px"
            borderRadius="50%"
            bg={useColorModeValue(
              "#ffffff",
              "#07182F"
            )}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              color={centerTextColor}
              fontSize="13px"
              fontWeight="700"
              lineHeight="1"
            >
              PR
            </Text>

            <Text
              color={centerTextColor}
              fontSize="28px"
              fontWeight="800"
              lineHeight="1"
            >
              82%
            </Text>
          </Box>
        </Box>

        {/* Legend */}

        <Box
          flex={1}
          ml={3}
        >
          {segments.map((item) => (
            <Flex
              key={item.label}
              justify="space-between"
              align="center"
              mb={2}
            >
              <Flex
                align="center"
                gap={2}
              >
                <Box
                  w="7px"
                  h="7px"
                  borderRadius="full"
                  bg={item.color}
                />

                <Text
                  fontSize="10px"
                  color={muted}
                >
                  {item.label}
                </Text>
              </Flex>

              <Text
                fontSize="10px"
                color={titleColor}
                fontWeight="600"
              >
                {item.value}
              </Text>
            </Flex>
          ))}
        </Box>
      </Flex>

      {/* Bottom Stats */}

      <Flex
        justify="space-between"
        pt={2}
        borderTop={useColorModeValue(
          "1px solid rgba(0,0,0,0.08)",
          "1px solid rgba(255,255,255,0.08)"
        )}
      >
        <Box>
          <Text
            fontSize="11px"
            color={muted}
          >
            Ideal PR
          </Text>

          <Text
            fontSize="24px"
            fontWeight="700"
            color={titleColor}
          >
            100%
          </Text>
        </Box>

        <Box textAlign="right">
          <Text
            fontSize="11px"
            color={muted}
          >
            Total Losses
          </Text>

          <Text
            fontSize="24px"
            fontWeight="700"
            color="#FF5252"
          >
            18%
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default PRDecomposition;