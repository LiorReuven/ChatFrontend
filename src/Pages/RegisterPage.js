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
  FormErrorMessage,
  Text,
  Link
} from '@chakra-ui/react';
import React from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate,Link as RouterLink } from 'react-router-dom';

const RegisterPage = ({socket, setIsLogged}) => {
  const navigate = useNavigate();

  const boxBg = useColorModeValue('whiteAlpha.800', 'gray.700');



  return (
    <Formik
      initialValues={{
        userName: '',
        password: '',
        password2: '',
      }}
      validationSchema={Yup.object({
        userName: Yup.string().min(6, 'Email must have 6 characters'),
        password: Yup.string()
          .min(6, 'Password must have 6 characters')
          .required('Must fill password'),
        room: Yup.string()
          .required('must choose a room')
          .oneOf(['Chat Room 1', 'Chat Room 2'])
          .label('Room'),
      })}
      onSubmit={(values, actions) => {
        setIsLogged(true)
        actions.setSubmitting(true)
        setTimeout(() => {
          actions.setSubmitting(false)
          socket.current.emit('join_room', values.room)
          actions.resetForm();
          navigate('/chat',{state:{email: values.email, room: values.room, password:values.password}});
        }, 5000);
        
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
                  isInvalid={formik.errors.email && formik.touched.email}
                  id="email"
                >
                  <FormLabel>User Name</FormLabel>
                  <Field as={Input} name="userName" type="name" />
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
                  isInvalid={formik.errors.password2 && formik.touched.password2}
                  id="password2"
                >
                  <FormLabel>Repeat Password</FormLabel>
                  <Field as={Input} name={'password2'} type="password" />
                  <FormErrorMessage>{formik.errors.password2}</FormErrorMessage>
                </FormControl>
                <Text>Already have an account? <Link to={'/login'} as={RouterLink} color='blue.500'>login</Link></Text>
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
