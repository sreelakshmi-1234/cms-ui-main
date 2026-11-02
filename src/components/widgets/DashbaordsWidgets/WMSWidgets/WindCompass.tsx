import React from "react";

import {

    Box,

    Text,

    Flex,

    useColorModeValue,

    chakra,

} from "@chakra-ui/react";

interface WindCompassProps {

    windAngle: number; // in degrees

}

const getCardinalDirection = (angle: number): string => {

    const directions = [

        "N", "NE", "E", "SE", "S", "SW", "W", "NW", "N",

    ];

    const index = Math.round(angle / 45);

    return directions[index];

};

const WindCompass: React.FC<WindCompassProps> = ({ windAngle }) => {

    const direction = getCardinalDirection(windAngle);

    const ringColor = useColorModeValue("gray.300", "gray.600");

    const arrowColor = useColorModeValue("red.500", "red.400");

    const background = useColorModeValue("radial-gradient(circle at 30% 30%, #f0f0f0, #c0c0c0)", "radial-gradient(circle at 30% 30%, #2d3748, #1a202c)");

    const tickColor = useColorModeValue("gray.500", "gray.400");

    const tickMarks = Array.from({ length: 36 }, (_, i) => {

        const angle = i * 10;

        const isMajor = angle % 90 === 0;

        const isMedium = angle % 30 === 0;

        const length = isMajor ? 12 : isMedium ? 8 : 4;

        const width = isMajor ? 2 : 1;

        return (
            <Box

                key={angle}

                position="absolute"

                top="50%"

                left="50%"

                width={`${width}px`}

                height={`${length}px`}

                bg={tickColor}

                transform={`rotate(${angle}deg) translateY(-120px)`}

                transformOrigin="bottom center"

            />

        );

    });

    const compassLabels = [

        { label: "N", angle: 0 },

        { label: "NE", angle: 45 },

        { label: "E", angle: 90 },

        { label: "SE", angle: 135 },

        { label: "S", angle: 180 },

        { label: "SW", angle: 225 },

        { label: "W", angle: 270 },

        { label: "NW", angle: 315 },

    ];

    return (
        <Flex

            direction="column"

            align="center"

            justify="center"

            // p={6}

            bg="#fff"
        >
            <Box

                position="relative"

                w="260px"

                h="260px"

                borderRadius="full"

                background={background}

                boxShadow="inset 0 6px 12px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.3)"

                border="6px solid"

                borderColor={ringColor}

                overflow="hidden"
            >

                {/* Tick marks */}

                {tickMarks}

                {/* Cardinal Labels */}

                {compassLabels.map(({ label, angle }) => (
                    <Text

                        key={label}

                        position="absolute"

                        top="50%"

                        left="50%"

                        transform={`rotate(${angle}deg) translateY(-110px) rotate(-${angle}deg)`}

                        transformOrigin="center"

                        fontWeight="bold"

                        fontSize="sm"

                        color={tickColor}
                    >

                        {label}
                    </Text>

                ))}

                {/* Rotating Needle */}
                <Box

                    position="absolute"

                    top="50%"

                    left="50%"

                    transform={`translate(-50%, -100%) rotate(${windAngle}deg)`}

                    transformOrigin="bottom center"

                    w="4px"

                    h="100px"

                    bg={arrowColor}

                    borderRadius="xl"

                    boxShadow="0 0 6px rgba(0,0,0,0.5)"

                    transition="transform 0.5s ease"

                    zIndex={2}

                />

                {/* Center Pin */}
                <Box

                    position="absolute"

                    top="50%"

                    left="50%"

                    transform="translate(-50%, -50%)"

                    w="18px"

                    h="18px"

                    bg="white"

                    borderRadius="full"

                    boxShadow="0 0 4px rgba(0,0,0,0.5)"

                    zIndex={3}

                />
            </Box>

            {/* Readout */}
            <Flex direction="column" align="center" mt={4}>
                <Text fontSize="3xl" fontWeight="bold" color="gray.700">

                    {windAngle}°
                </Text>
                <Text fontSize="md" color="gray.500">

                    {direction}
                </Text>
            </Flex>
        </Flex>

    );

};

export default WindCompass;

