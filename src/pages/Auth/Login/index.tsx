import React, { useContext, useState } from "react";
import {
  Box,
  Text,
  Stack,
  InputGroup,
  Input,
  InputLeftElement,
  Icon,
  FormLabel,
  Checkbox,
  Link,
  Button,
  Divider,
  FormControl,
  Heading,
} from "@chakra-ui/react";

import { FaRegEnvelope, FaLock } from "react-icons/fa";

import { PageContainer, Footer } from "../Layout";
import { useNavigate } from "react-router-dom";
import { ILogin } from "../../../../types";
import { useAuth } from "../../../common/context/authContext";



export default function Login() {
  const { SignIn } = useAuth();
  const navigate  = useNavigate();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const handleFormSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
      event.preventDefault(); 
      const data: ILogin = {
        username: email,
        password: password  
      }
      // alert(JSON.stringify(data));
      // console.log(data)
      SignIn(data).then(()=>navigate('/employees')); 
     
  
  };


  return (
    <PageContainer>
      <Box
        width={{ base: "90%", md: "400px" }}
        bg="secondary.card"
        rounded="lg"
        p={5}
      >
        <Heading marginBottom="1.5rem">Sign in</Heading>
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={4} marginBottom="1rem">
            <FormControl>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <InputGroup>
                <InputLeftElement
                  children={
                    <Icon as={FaRegEnvelope} color="secondary.inputHelper" />
                  }
                />
                <Input
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                  focusBorderColor="main.500"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="name@example.com"
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <Stack justifyContent="space-between" isInline>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  href="#"
                  color="secondary.link"
                  fontSize="sm"
                  fontWeight="500"
                >
                  Forgot Password?
                </Link>
              </Stack>
              <InputGroup>
                <InputLeftElement
                  children={<Icon as={FaLock} color="secondary.inputHelper" />}
                />
                <Input
                  focusBorderColor="main.500"
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e)=>setPassword(e.target.value)}
                  value={password}
                />
              </InputGroup>
            </FormControl>
          </Stack>
          <Stack justifyContent="space-between" isInline marginBottom="1rem">
            <Stack isInline>
              <Checkbox
                size="md"
                fontWeight="500"
                colorScheme="main"
                name="remember_me"
                id="remember_me"
              >
                Remember me
              </Checkbox>
            </Stack>
          </Stack>
          <Stack marginBottom="1rem">
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Please wait.."
            
            >
              Sign in
            </Button>
          </Stack>
        </form>
        <Divider marginBottom="1rem" />
        <Stack>
          <Text textAlign="center" fontWeight="500">
            Don't have an account?
          </Text>
          <Button onClick={()=>navigate('/register')} colorScheme="main" variant="outline">
            Sign up
          </Button>
        </Stack>
      </Box>
      <Footer />
    </PageContainer>
  );
}


