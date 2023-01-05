import {
  Avatar,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { MdMarkChatUnread } from 'react-icons/md';

const User = ({ user, onClick, unRead, recipient }) => {
  const checkUnRead = () => {
    let isTrue = false;
    for (const id of unRead) {
      if (recipient?._id !== id && id === user?._id) {
        isTrue = true;
      }
    }
    return isTrue;
  };

  const show = checkUnRead();

  return (
    <>
      <Flex
        _hover={{ backgroundColor: 'blue.900' }}
        cursor={'pointer'}
        onClick={onClick}
        p={4}
        alignItems={'center'}
        
      >
        <Avatar src={user?.avatarImage} boxSize={10}></Avatar>
        <Text
          ml={'1.5rem'}
          noOfLines={1}
          color={'white'}
          fontWeight={'semibold'}
          fontSize={'sm'}
        >
          {user.username}
        </Text>
        {show && <Icon  ml={'3rem'} boxSize={6} color={'green.600'} as={MdMarkChatUnread} />}
      </Flex>
      <Divider></Divider>
    </>
  );
};

export default User;
