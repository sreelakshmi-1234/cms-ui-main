import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import useAuth from '../../Services/Hooks/UseAuth'
import swal from 'sweetalert'
import { useNavigate } from 'react-router'
import LoginBG from '../../assets/LoginBG.svg';
import { EnlargeWidgetContent, EnlargeWidgetSize } from '../../Services/EnlargeWidget'

type ForgotPasswordFormInputs = {
  email: string
}

export default function ForgotPassword() {

    const [email, setEmail] = useState<string>("");
    const {forgotPasswordHandle} = useAuth();
    const navigate = useNavigate();
    const sendResetRequst = async (event : any) => {
        event.preventDefault();
        const response = await forgotPasswordHandle(email);
        if(response === true) {
            swal({
                title: "Request Sent!",
                text: "Reset link has been sent!",
                icon: "success",
            });
            navigate('/login');
        }else {
            swal({
                title: "Request Email is not send!",
                text: "Invalid Email!",
                icon: "error",
            });
        }
    }

  return (
    <Flex
      minH={'100vh'}
      maxW={"9xl"}
      align={'center'}
      justify={'center'}
      bg={[useColorModeValue('gray.50', 'gray.800'),`url(${LoginBG}) no-repeat center/cover`]}>
      <Stack
        spacing={EnlargeWidgetSize(4)}
        w={'full'}
        maxW={['100%','100%', '30%']}
        bg={useColorModeValue('transparent', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        position={["relative","absolute"]}
        left={[0, 20]}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: (EnlargeWidgetSize(24) + "px") }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: EnlargeWidgetSize(16) + "px" }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            bg={"#FFFFFF"}
            h={EnlargeWidgetSize(24) + "px"}
            fontSize={EnlargeWidgetSize(16) + "px"}
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'#0DC39A'}
            color={'white'}
            h={"auto"}
            fontSize={EnlargeWidgetSize(20) + "px"}
            fontWeight={700}
            _hover={{
              bg: 'green.400'
            }}
            onClick={sendResetRequst}
            >
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}