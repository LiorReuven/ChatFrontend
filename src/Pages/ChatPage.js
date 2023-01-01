import React,{useEffect, useState} from 'react';
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
import { useLocation } from 'react-router-dom';
import User from '../components/User';

const ChatPage = ({ socket }) => {
  const location = useLocation();

  const [message, setMessage] = useState('')

  useEffect(() => {
    
   socket.current.on('incoming_message', (data) => {
    console.log(data)
   })

  }, [socket])
  

  const sendMessOnSubmit = async (e) => {
 
    e.preventDefault()
    
    if(message === '') return

    const data = {
      room: location.state.room,
      email: location.state.email,
      message: message,
      time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
    };

    await socket.current.emit('send_message', data)

    setMessage('')

  }




  return (
    <Flex h={'70vh'} overflow={'hidden'} borderBottomRadius={'20px'} borderTopRadius={'20px'}>
      <Flex backgroundColor={'teal'} minW={'30%'} direction={'column'}>
      <Flex
          alignItems={'center'}
          backgroundColor={'purple'}
          h={'15%'}
          justifyContent={'space-between'}
        ></Flex>
        <User></User>
        <User></User>
        <User></User>
      </Flex>
      <Flex minW={'70%'}  direction={'column'}>
        <Flex
          alignItems={'center'}
          backgroundColor={'#417fcc'}
          h={'15%'}
          justifyContent={'space-between'}
        >
          <Avatar ml={'2rem'} size={'md'}>
            <AvatarBadge boxSize={'1.25em'} bg={'green.500'} />
          </Avatar>
          <Flex mr={'2rem'}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="options"
                icon={<HamburgerIcon />}
                variant={'outline'}
              />
            </Menu>
          </Flex>
        </Flex>
        <Flex backgroundColor={'gray'} h={'70%'}></Flex>
        <Flex
        as={'form'}
        onSubmit={sendMessOnSubmit}
          justifyContent={'space-evenly'}
          alignItems={'center'}
          backgroundColor={'gray.500'}
          h={'15%'}
        >
          <Input
            w={'70%'}
            mx={'3rem'}
            h={'100%'}
            variant={'unstyled'}
            placeholder="Type message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          />
          <AttachmentIcon />
          <Button type='submit' backgroundColor={'#417fcc'} mx={'1rem'}>
            Send
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatPage;
