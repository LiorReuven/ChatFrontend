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
  Link,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const LoginPage = ({socket, setIsLogged}) => {
  const navigate = useNavigate();

  const boxBg = useColorModeValue('whiteAlpha.800', 'gray.700');



  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        room: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().min(6, 'Email must have 6 characters'),
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

                <FormControl
                  isInvalid={formik.errors.room && formik.touched.room}
                >
                  <FormLabel>Room</FormLabel>
                  <Field as={Select} name={'room'} placeholder="Select Room">
                    <option value="Chat Room 1">Chat Room 1</option>
                    <option value="Chat Room 2">Chat Room 2</option>
                  </Field>
                  <FormErrorMessage>{formik.errors.room}</FormErrorMessage>
                </FormControl>
                <Text>Dont have an account? <Link to={'/register'} as={RouterLink} color='blue.500'>register</Link></Text>
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
