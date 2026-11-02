import { Box, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import Image1 from '../../assets/LoginImages/31152.jpg'
import Image2 from '../../assets/LoginImages/6qm0ev7d.png'
import Image1 from '../../assets/LoginImages/eosbfnbn.png'
import Image4 from '../../assets/LoginImages/reduce-co2-emissions-limit-climate-change-net-zero-carbon-dioxide-reduction-concepts-net-zero-icon-surrounded-with-renewable-energy-symbol-circular-tall-trees-forest-background-bottom-view_36367-9351.jpg'
import Image5 from '../../assets/LoginImages/28797fc5f9b712f71f71497cf992dc5d726e511e.png'
import NewCognetaLogo from '../../assets/NewCognetaLogo.svg';


const LoginImageCarousel = () => {

    const slides = [
        {
            img: Image4,
            label: ["Scalable", "Asset Agnostic", "Insightful"],
            description: "Smart Energy Manager for a Greener Tomorrow",
        },
        {
            img: Image5,
            label: ["IoT 4.0", "Simple Integration"],
            description: "Illuminating homes through seamless digital integration of renewable energy",
        },
        {
            img: Image1,
            label: ["Evolving Repositories", "Preventive Models"],
            description:
                "Complex Energy Systems? ETAFlux does it all...",
        },
        {
            img: Image2,
            label: ["Synchronized Controls", "Data Security", "Integrable"],
            description: "Command center managing localised Microgrids",
        }
    ];
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesCount = slides.length;

    const setSlide = (slide: number) => {
        setCurrentSlide(slide);
    };
    const carouselStyle = {
        transition: "all .5s",
        ml: `-${currentSlide * 100}%`,
    };
    const SLIDES_INTERVAL_TIME = 3000;
    const ANIMATION_DIRECTION = "right";
    useEffect(() => {
        const prevSlide = () => {
            setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
        };
        const nextSlide = () => {
            setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
        };
        const automatedSlide = setInterval(() => {
            ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
        }, SLIDES_INTERVAL_TIME);
        return () => clearInterval(automatedSlide);
    }, [slidesCount]);
    return (
        <Flex
            w="100%"
            height={"100%"}
            overflow={"hidden"}
            p={0}
            bg="transparent"
            alignItems="center"
            justifyContent="center"
        >
            <Flex w="100%" h={"100%"} pos="relative" overflow="hidden">
                <Flex h="100%" w="100%" {...carouselStyle}>
                    {slides.map((slide, sid) => (
                        <Box key={`slide-${sid}`} boxSize="100%" shadow="md" flex="none">
                            <Box pos="relative" height="100%" w="100%" mb="8">
                                    {/* {sid + 1} / {slidesCount} */}
                                {/* </Text> */}
                                <Box
                                    pos="absolute"
                                    top="0"
                                    left="0"
                                    right="0"
                                    bottom="0"
                                    bg={`url(${slide.img})`}
                                    backgroundSize="cover"
                                    backgroundPosition="center"
                                    opacity={0.46}
                                    zIndex={0}
                                    height={"100%"}
                                />
                                <Image
                                    src={NewCognetaLogo}
                                    position={"relative"}
                                    top={"40px"}
                                    left={"50px"}
                                />
                                <Stack
                                    p="0 51px"
                                    align="center"
                                    textAlign="center"
                                    position={"relative"}
                                    color="white"
                                    alignItems={"flex-start"}
                                    justify={"center"}
                                    zIndex={100}
                                    height="100%"
                                    w="100%"
                                    spacing={0}
                                >
                                    <Text fontSize={"44px"}>Welcome to ETAFlux</Text>
                                    <Text fontWeight={700} fontSize={"50px"} mt={-3}>Energy Management Platform</Text>
                                    <Text fontWeight={500} fontSize={"16px"} mb={5}>{slide.description}</Text>
                                    <HStack spacing={"20px"}>
                                        {slide.label.map((item, _) => (
                                            <HStack
                                                bg={"rgba(255,255,255,0.2)"}
                                                // width={"79px"}
                                                // height={"34px"}
                                                p={"5px"}
                                                color={"white"}
                                                fontSize={"18px"}
                                                fontWeight={"400"}
                                            >
                                                <Text>{item}</Text>
                                            </HStack>
                                        ))}
                                    </HStack>
                                </Stack>
                            </Box>
                        </Box>
                    ))}
                </Flex>
                <HStack pos="absolute" bottom="20px" right="20px" zIndex={900}>
                    {Array.from({ length: slidesCount }).map((_, slide) =>
                        currentSlide === slide ? (
                            <Flex
                                key={`dots-${slide}`}
                                cursor="pointer"
                                w="31px"
                                h="6px"
                                borderRadius="4px"
                                m="0 2px"
                                bg="rgba(255,255,255,0.5)"
                                display="inline-block"
                                transition="background-color 0.6s ease"
                                _hover={{
                                    bg: "blackAlpha.800",
                                }}
                                onClick={() => setSlide(slide)}
                            >
                                <Box width="50%" height="100%" borderLeftRadius={"4px"} bg="white" />
                            </Flex>
                        ) : (
                            <Box
                                key={`dots-${slide}`}
                                cursor="pointer"
                                boxSize="6px"
                                m="0 2px"
                                bg="rgba(255,255,255,0.5)"
                                rounded="50%"
                                display="inline-block"
                                transition="background-color 0.6s ease"
                                _hover={{
                                    bg: "blackAlpha.800",
                                }}
                                onClick={() => setSlide(slide)}
                            />
                        )
                    )}
                </HStack>
            </Flex>
        </Flex>
    );
};


export default LoginImageCarousel