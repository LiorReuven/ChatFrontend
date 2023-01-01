import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Button,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { useFormik } from 'formik';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
  });

  console.log(formik);

  return (
    <Flex minH={'70vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} py={10} px={6} mx={'auto'} maxW={'lg'} minW={'50%'}>
        <Heading align={'center'} fontSize={'4xl'}>
          Login
        </Heading>

        <Box
          boxShadow={'lg'}
          rounded={'xl'}
          bg={useColorModeValue('whiteAlpha.800', 'gray.700')}
          p={8}
        >
          <Stack spacing={5}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                onBlur={formik.handleBlur}
              />
            </FormControl>
            <FormControl  id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Room</FormLabel>
              <Select placeholder="Select Room">
                <option>Chat room 1</option>
                <option>Chat room 2</option>
              </Select>
            </FormControl>
            <Button
            type='submit'
              bg={'#417fcc'}
              color={'white'}
              _hover={{
                bg: 'blue.600',
              }}
            >
              Sign in
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
