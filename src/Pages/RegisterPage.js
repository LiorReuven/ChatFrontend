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
  Text,
  Link,
  Avatar,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import API from '../helpers/API';
import { registerUrl } from '../helpers/API';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState('');

  const boxBg = useColorModeValue('whiteAlpha.800', 'gray.700');

  function validateImage(e) {
    const file = e.target.files[0];
    if (file?.size >= 1048576) {
      return alert('Max file size is 1mb');
    } else {
      if (file) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  }

  async function uploadImage(image) {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', process.env.REACT_APP_PRESET_NAME);
    try {
      if (image) {
        let response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
          {
            method: 'post',
            body: data,
          }
        );

        const cloudData = await response.json();
        return cloudData;
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        password2: '',
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(4, 'Username must have 4 chars at minimum')
          .max(8, 'Username can be up to 8 chars total'),
        email: Yup.string()
          .email('Email must be valid')
          .required('Please insert your email'),
        password: Yup.string()
          .min(6, 'Password must have 6 chars at minimum')
          .max(16, 'Password can contain up yo 16 chars')
          .required('Please insert your password'),
        password2: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Please insert your password'),
      })}
      onSubmit={async (values, actions) => {
        try {
          const cloudData = await uploadImage(image);
          await API.post(registerUrl, {
            username: values.username,
            email: values.email,
            password: values.password,
            avatarImage: cloudData,
          });
          actions.resetForm();
          navigate('/login');
        } catch (error) {
          console.log(error);
          const data = error.response.data;
          actions.setFieldError(data.field, data.message);
          actions.setSubmitting(false);
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
              Register
            </Heading>

            <Box boxShadow={'lg'} rounded={'xl'} bg={boxBg} p={8}>
              <Stack spacing={5}>
                <FormControl
                  isInvalid={formik.errors.username && formik.touched.username}
                  id="username"
                >
                  <FormLabel>User Name</FormLabel>
                  <Field as={Input} name="username" type="text" />
                  <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={formik.errors.email && formik.touched.email}
                  id="email"
                >
                  <FormLabel>Email</FormLabel>
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

                <FormControl
                  isInvalid={
                    formik.errors.password2 && formik.touched.password2
                  }
                  id="password2"
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <Field as={Input} name={'password2'} type="password" />
                  <FormErrorMessage>{formik.errors.password2}</FormErrorMessage>
                </FormControl>

                <Flex alignItems={'center'}>
                  <Text
                    fontWeight={'semibold'}
                    pr={['1.5rem', '1.5rem', '1.5rem', '3rem', '3rem', '3rem']}
                  >
                    Click to add:
                  </Text>
                  <label
                    style={{ width: 'fit-content', textAlign: 'center' }}
                    htmlFor="upload"
                  >
                    <Avatar
                      cursor={'pointer'}
                      src={imagePreview}
                      boxSize={16}
                      justifySelf={'center'}
                      type={'file'}
                    />
                    <Input
                      id="upload"
                      display={'none'}
                      type={'file'}
                      accept={'image/png, image/jpeg'}
                      onChange={validateImage}
                    />
                  </label>
                </Flex>
                <Text>
                  Already have an account?{' '}
                  <Link to={'/login'} as={RouterLink} color="blue.500">
                    login
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
                  Register
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      )}
    </Formik>
  );
};

export default RegisterPage;
