import { AttachmentIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Avatar, AvatarBadge, Box, Button, Flex, IconButton, Input, Menu, MenuButton, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import API, { addMessageUrl, getMessagesUrl } from '../helpers/API'
import Message from './Message'

const ChatBlock = ({recipient, thisUser, socket}) => {

  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('');
  const scrollRef = useRef()

  useEffect(() => {
    
    const getMessages = async() => {
      try {
        const response = await API.post(getMessagesUrl, {
          from: thisUser?._id,
          to: recipient?._id
        })
        if (response) {
          setMessages(response.data.messages)
        }
  
        setIsLoading(false)

      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    
    }

    getMessages()


  }, [recipient])

  const sendMessageOnSubmit = async (e) => {
    e.preventDefault();

    if (message === '' || !recipient){
      setMessage('');
      return;
    } 

    const response = await API.post(addMessageUrl,{
      from: thisUser?._id,
      to: recipient?._id,
      message: message
    } )

    await socket.current.emit('send_message',{
      from: thisUser?._id,
      to:recipient?._id,
      message: message,
      createdAt:response.data.createdMessage.createdAt
    });
    setMessages((prev) => [...prev, {fromMe: true, text: message, createdAt:response.data.createdMessage.createdAt}])
    setMessage('');
  };


  useEffect(() => {
      socket?.current.on('recieve-message', (data) => {
        console.log(data)
        setMessages((prev) => [...prev, {fromMe: false, text: data.text, createdAt:data.createdAt}])
        console.log('trigger')
      })

    // return () => {
    //   socket.off('recieve_message')
    // }
 
  },[])

  useEffect(() => {
    console.log(scrollRef)
    scrollRef?.current?.scrollIntoView({behavior:'smooth'})
  }, [messages])
  
  
  
  


  return (
    <>
    <Flex
          alignItems={'center'}
          backgroundColor={'gray.700'}
          h={'12%'}
          justifyContent={'space-between'}
        >
          <Flex align={'center'}>
            <Avatar ml={'2rem'} boxSize={10}>
            </Avatar>
            <Text  ml={'1rem'}>{recipient?.username}</Text>
          </Flex>
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
    <Flex overflowY={'scroll'}  direction={'column'} backgroundColor={'gray.300'} h={'78%'}>

          {recipient && !isLoading ?
          messages?.map((message, index) => {
            return (
              <Box key={index} ref={scrollRef}>
             <Message  message={message}/>
             </Box>
            ) 
          })
          : <Text>Welcome</Text>}


    </Flex>
    <Flex
    as={'form'}
    onSubmit={sendMessageOnSubmit}
    justifyContent={'space-evenly'}
    alignItems={'center'}
    backgroundColor={'gray.700'}
    h={'10%'}
  >
    <Input
      w={'70%'}
      mx={'3rem'}
      h={'100%'}
      variant={'unstyled'}
      placeholder="Type message"
      value={message}
      onChange={(e) => {
        setMessage(e.target.value);
      }}
      color={'black'}
      backgroundColor={'gray.400'}
      px={6}
      py={2}
    />
    <AttachmentIcon />
    <Button type="submit" backgroundColor={'blue.800'} mx={'1rem'}>
      Send
    </Button>
  </Flex>
  </>
  )
}

export default ChatBlock