import { Avatar, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const User = ({user, onClick}) => {
  return (
    <Flex _hover={{backgroundColor: 'gray.400'}} cursor={'pointer'} onClick={onClick} p={2}>
      <HStack align={'center'} w={'100%'}  spacing={10}>
      <Avatar boxSize={10}></Avatar>
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
