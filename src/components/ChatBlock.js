import { AttachmentIcon } from '@chakra-ui/icons'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import API, { addMessageUrl, getMessagesUrl } from '../helpers/API'
import Message from './Message'

const ChatBlock = ({recipient, thisUser, socket}) => {

  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('');

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

    await API.post(addMessageUrl,{
      from: thisUser?._id,
      to: recipient?._id,
      message: message
    } )
    await socket.emit('send_message',{
      from: thisUser?._id,
      to:recipient?._id,
      message: message
    });
    setMessages((prev) => [...prev, {fromMe: true, message: message}])
    setMessage('');
  };


  useEffect(() => {
    socket?.on('recieve-message', (message) => {
      setMessages((prev) => [...prev, {fromMe: false, message: message}])
      console.log('trigger')
    })

    return () => {
      socket.off('recieve_message')
    }
 
  },[])
  
  
  


  return (
    <>
    <Flex overflow={'scroll'} direction={'column'} backgroundColor={'gray'} h={'70%'}>

          {recipient && !isLoading ?
          messages?.map((message, index) => {
            return (
             <Message key={index} message={message}/>
            ) 
          })
          : <Text>Welcome</Text>}


    </Flex>
    <Flex
    as={'form'}
    onSubmit={sendMessageOnSubmit}
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
        setMessage(e.target.value);
      }}
    />
    <AttachmentIcon />
    <Button type="submit" backgroundColor={'#417fcc'} mx={'1rem'}>
      Send
    </Button>
  </Flex>
  </>
  )
}

export default ChatBlock