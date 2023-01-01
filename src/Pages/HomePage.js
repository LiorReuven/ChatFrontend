import React from 'react';
import {
  Flex,
  Input,
  Button,
  Avatar,
  AvatarBadge,
  MenuButton,
  IconButton,
  Menu,
} from '@chakra-ui/react';
import { AttachmentIcon, HamburgerIcon } from '@chakra-ui/icons';

import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001')


const HomePage = () => {
  return (
    <Flex h={'66vh'} direction={'column'}>
      <Flex
        alignItems={'center'}
        borderTopRadius={'20px'}
        backgroundColor={'#417fcc'}
        h={'15%'}
        justifyContent={'space-between'}
      >
        <Avatar ml={'2rem'} size={'md'}>
          <AvatarBadge boxSize={'1.25em'} bg={'green.500'} />
        </Avatar>
        <Flex mr={'2rem'}>
        <Menu >
        <MenuButton
          as={IconButton}
          aria-label="options"
          icon={<HamburgerIcon />}
          variant={'outline'}
        />
        </Menu>
        </Flex>
      </Flex>
      <Flex backgroundColor={'gray'} h={'65%'}></Flex>
      <Flex
        justifyContent={'space-evenly'}
        alignItems={'center'}
        borderBottomRadius={'20px'}
        backgroundColor={'gray.500'}
        h={'15%'}
      >
        <Input
          w={'70%'}
          mx={'3rem'}
          h={'100%'}
          variant={'unstyled'}
          placeholder="Type message"
        />
        <AttachmentIcon />
        <Button backgroundColor={'#417fcc'} mx={'1rem'}>
          Send
        </Button>
      </Flex>
    </Flex>
  );
};

export default HomePage;
