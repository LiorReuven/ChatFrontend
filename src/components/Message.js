import { Avatar, Container, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import moment from 'moment-timezone'

const Message = ({ message }) => {
  console.log(message.createdAt);

  const date = moment(message.createdAt).tz('Asia/Jerusalem').format('LT'); 


  return (
    <>
      {message.fromMe ? (
        <Flex marginY={'0.5rem'} ml={'1rem'}>
          <Avatar size={'sm'} />
          <Flex ml={'10px'} direction={'column'}>
            <Container
              m={'0'}
              maxWidth={'40ch'}
              borderRadius={'lg'}
              borderTopLeftRadius={'none'}
              p={'16px'}
              h={'auto'}
              w={'fit-content'}
              backgroundColor={'whiteAlpha.800'}
            >
              <Text color={'black'}>{message.text}</Text>
            </Container>
            <Text p={'2px'} fontSize={'xs'} color={'black'}>{date}</Text>
          </Flex>
        </Flex>
      ) : (
        <Flex marginY={'0.5rem'} mr={'1rem'} justifyContent={'flex-end'}>
          <Flex alignItems={'flex-end'} mr={'10px'} direction={'column'}>
            <Container
              m={'0'}
              ch={'60'}
              borderRadius={'lg'}
              borderTopRightRadius={'none'}
              p={'16px'}
              h={'auto'}
              w={'fit-content'}
              backgroundColor={'blue.800'}
            >
              <Text  color={'white'}>{message.text}</Text>
            </Container>
            <Text p={'2px'} fontSize={'xs'} color={'black'}>{date}</Text>
          </Flex>
          <Avatar size={'sm'} />
        </Flex>
      )}
    </>
  );
};

export default Message;
