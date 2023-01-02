import { Avatar, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const User = ({user, onClick}) => {
  return (
    <Flex onClick={onClick} p={4}>
      <HStack align={'center'} w={'100%'}  spacing={10}>
      <Avatar size={'md'}></Avatar>
      <VStack>
      <Text fontWeight={'semibold'} fontSize={'xs'}>
      {user.username}
      </Text>
      </VStack>
      </HStack>
    </Flex>
  );
};

export default User;
