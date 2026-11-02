import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Image,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import UseAuth from '../../Services/Hooks/UseAuth'
import { useNavigate } from 'react-router';
import CustomerHandlingService from '../../Services/CustomerHandlingService';
import { useCustomerOptionsContext } from '../../Context/CustomerOptionsContext';
import { useSelectedCustomerIDContext } from '../../Context/SelectedCustomerIDContext';
import LoginBG from '../../assets/LoginBG.svg';
import NewEtaFluxLogo from '../../assets/NewEtaFluxLogo.svg';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { EnlargeWidgetSize, EnlargeWidgetSizeWidth } from '../../Services/EnlargeWidget';
import LoginImageCarousel from './LoginImageCarousel';
import RouteProtectionService from '../../Services/RouteProtectionService';

export default function Login() {

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const { login } = UseAuth();

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigate = useNavigate();
  const goToForgotPassword = () => {
    navigate('/forgotPassword')
  }

  const { setCustomerOptions } = useCustomerOptionsContext();
  const { setSelectedCustomerID } = useSelectedCustomerIDContext();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await login(username, password);
    if (response === false) {
      swal({
        title: "Authentication Failed!",
        text: "Invalid Username or Password!",
        icon: "error",
      });
    } else {
      try {
        await CustomerHandlingService(setCustomerOptions, setSelectedCustomerID);

      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
      const location = RouteProtectionService()
      navigate(location);
    }
  }

  // Resizing Logic
  const [scale, setScale] = useState(1);
  const [scaleHeight, setScaleHeight] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const baseWidth = 1280; // design's base resolution width
      const baseHeight = 832; // design's base resolution height
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      // Calculate scale factor based on width or height
      const widthScale = currentWidth / baseWidth;
      const heightScale = currentHeight / baseHeight;
      const scaleFactor = Math.max(widthScale, heightScale); // Maintain aspect ratio

      setScale(widthScale);
      setScaleHeight(heightScale);
    };

    updateScale(); // Initial scale calculation
    window.addEventListener("resize", updateScale); // Update on window resize
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <Flex
      h={"100vh"}
      w={"full"}
      overflow={"hidden"}
      align={'center'}
      justify={'center'}
      justifyContent={"space-between"}
      // transform={`scale(${scale})`} 
      // transformOrigin={"top left"} 
      bg={"black"}
      borderColor={"transparent"}
    >
      <Box width={"100%"} height={'100%'} overflow={"hidden"}><LoginImageCarousel /></Box>
      <Stack spacing={0} align={"center"} height={"100%"} bg={"white"} width={"477px"} py={"45px"} px={6}>
        <Stack align={'center'}>
          <Image src={NewEtaFluxLogo} />
        </Stack>
        <Box
          mt={"181px"}
          rounded={'lg'}
          bg={["white", useColorModeValue('transparent', '#3D3F3D')]}
          color={"#062D59"}
        >
          <Text fontSize={"26px"} fontWeight={600} textAlign={"center"} mb={"40px"}>
            Login
          </Text>
          <form onSubmit={handleSubmit}>
            <Stack width={"360px"}>
              <FormControl id="email">
                {/* <FormLabel fontSize={EnlargeWidgetSize(16) + "px"} color={"#000"} fontWeight={300}>Username (email)</FormLabel> */}
                <Input 
                  color={"#062D59"}
                  rounded={"none"} 
                  focusBorderColor='transparent' 
                  px={1} 
                  sx={{_placeholder : {color: "#062D59"}, _focus : {borderBottomColor: "#062D59"}}} 
                  h={"37px"} 
                  border={"none"} 
                  borderBottom={"1px solid #DDE3E8"} 
                  fontSize={"14px"} 
                  type="email" 
                  placeholder='Email/Username' 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                />
              </FormControl>
              <FormControl id="password" mt={"30px"}>
                {/* <FormLabel fontSize={EnlargeWidgetSize(16) + "px"} color={"#000"} appearance={"none"} fontWeight={300}>Password</FormLabel> */}
                <InputGroup>
                  <Input 
                    color={"#062D59"} 
                    rounded={"none"} 
                    focusBorderColor='transparent' 
                    px={1} 
                    sx={{_placeholder : {color: "#062D59"}, _focus : {borderBottomColor: "#062D59"}}} 
                    h={"37px"} 
                    border={"none"} 
                    borderBottom={"1px solid #DDE3E8"} 
                    fontSize={"14px"} 
                    placeholder='Password'  
                    type={"password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </InputGroup>
              </FormControl>
              <Stack>
                {/* <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox visibility={'hidden'}>Remember me</Checkbox>
                  <Text
                    color={'blue.400'}
                    cursor={'pointer'}
                    onClick={goToForgotPassword}
                    fontSize={EnlargeWidgetSize(16) + "px"}
                  >
                    Forgot password?
                  </Text>
                </Stack> */}
                <InputGroup mt={"40px"}>
                  <Button
                    bg={'#062D59'}
                    width={"100%"}
                    rounded={"none"}
                    h={"40px"}
                    fontSize={EnlargeWidgetSize(22) + "px"}
                    fontWeight={400}
                    color={'white'}
                    type='submit'
                  >
                    Login
                  </Button>
                </InputGroup>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}