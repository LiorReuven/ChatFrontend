import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Button,
  useColorModeValue,
  FormErrorMessage,
  Link,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// import API from '../helpers/API'
// import { loginrUrl } from '../helpers/API';
import { useDispatch } from 'react-redux';
import { login } from '../store/authThunk';
import { unwrapResult } from '@reduxjs/toolkit';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const boxBg = useColorModeValue('whiteAlpha.800', 'gray.700');

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Email must be valid')
          .required('Please insert your email'),
        password: Yup.string()
          .min(6, 'Password must have 6 chars at minimum')
          .max(16, 'Password can contain up yo 16 chars')
          .required('Please insert your password'),
      })}
      onSubmit={async (values, actions) => {
        try {
          // const response = await API.post(loginrUrl, {
          //   email: values.email,
          //   password: values.password
          // })
          // localStorage.setItem('chatUser', JSON.stringify(response.data))
          actions.setSubmitting(true);
          dispatch(login({ email: values.email, password: values.password }))
            .then(unwrapResult)
            .then((result) => {
              if (result.token) {
                actions.resetForm();
                navigate('/chat');
              } else {
                actions.setFieldError(result.field, result.message);
                actions.setSubmitting(false);
              }
            });
        } catch (error) {
          console.log(error);
          // const data = error.response.data
          // actions.setFieldError(data.field, data.message)
          // actions.setSubmitting(false)
        }
      }}
    >
      {(formik) => (
        <Flex
          as={'form'}
          onSubmit={formik.handleSubmit}
          minH={'70vh'}
          align={'center'}
          justify={'center'}
        >
          <Stack
            spacing={8}
            py={10}
            px={6}
            mx={'auto'}
            maxW={'lg'}
            minW={'50%'}
          >
            <Heading align={'center'} fontSize={'4xl'}>
              Login
            </Heading>

            <Box boxShadow={'lg'} rounded={'xl'} bg={boxBg} p={8}>
              <Stack spacing={5}>
                <FormControl
                  isInvalid={formik.errors.email && formik.touched.email}
                  id="email"
                >
                  <FormLabel>Email address</FormLabel>
                  <Field as={Input} name="email" type="email" />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={formik.errors.password && formik.touched.password}
                  id="password"
                >
                  <FormLabel>Password</FormLabel>
                  <Field as={Input} name={'password'} type="password" />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
                <Text>
                  Dont have an account?{' '}
                  <Link to={'/register'} as={RouterLink} color="blue.500">
                    register
                  </Link>
                </Text>
                <Button
                  type="submit"
                  isLoading={formik.isSubmitting}
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
      )}
    </Formik>
  );
};

export default LoginPage;
