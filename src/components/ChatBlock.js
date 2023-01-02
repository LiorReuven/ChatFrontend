import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import API, { getMessagesUrl } from '../helpers/API'
import Message from './Message'

const ChatBlock = ({recipient, thisUser}) => {

  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
  


  return (
    <Flex direction={'column'} backgroundColor={'gray'} h={'70%'}>

          {recipient && !isLoading ?
          messages?.map((message, index) => {
            return (
             <Message key={index} message={message}/>
            ) 
          })
          : <Text>Welcome</Text>}


    </Flex>
  )
}

export default ChatBlock