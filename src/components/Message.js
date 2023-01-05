import { Avatar, Container, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import moment from 'moment-timezone'

const Message = ({ message, recipient, thisUser, scrollRef }) => {

  const date = moment(message.createdAt).tz('Asia/Jerusalem').format('HH:mm A'); 


  return (
    <>
      {!message.fromMe && message.from === recipient._id && message.to === thisUser._id ? (
        <Flex ref={scrollRef} marginY={'0.5rem'} ml={'1rem'}>
          <Avatar src={recipient?.avatarImage} size={'sm'} />
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
      ) : message.fromMe && message.to === recipient._id && message.from === thisUser._id ? (
        <Flex ref={scrollRef} marginY={'0.5rem'} mr={'1rem'} justifyContent={'flex-end'}>
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
          <Avatar src={thisUser?.avatarImage} size={'sm'} />
        </Flex>
      ) : <></>}
    </>
  );
};

export default Message;
