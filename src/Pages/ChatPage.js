import React, { useEffect, useState, useRef } from 'react';
import {
  Flex,
  Avatar,
  AvatarBadge,
  MenuButton,
  IconButton,
  Menu,
  Text,
  Icon,
  Input,
  Box,
  FormControl
} from '@chakra-ui/react';
import {  HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import User from '../components/User';
import API from '../helpers/API';
import { getUsersUrl } from '../helpers/API';
import ChatBlock from '../components/ChatBlock';
import io from 'socket.io-client'



const ChatPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [thisUser, setThisUser] = useState(undefined);
  const [recipient, setRecipient] = useState(undefined);
  const socket = useRef()
  const [loading, setLoading] = useState(true)


  


  useEffect(() => {


    const setThisUserHandler = async () => {
      const storage = await JSON.parse(localStorage.getItem('chatUser'))
      setThisUser(storage.user)
    };


    if (!localStorage.getItem('chatUser')) {
      navigate('/login');
    } else {
      setThisUserHandler();
    }


  }, []);

  useEffect(() => {

   

    const fetchAllUsers = async (data) => {
      try {
        const response = await API.post(getUsersUrl, {
          data:data,
          _id:thisUser._id
        });
           console.log(response.data.users)
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    if (thisUser) {
       socket.current = io(process.env.REACT_APP_BASE_URL)
       socket.current.emit('add_user', thisUser._id)
       socket.current.on('get_online_users', (data) => {
        fetchAllUsers(data)
      }) 
      setLoading(false)
    }

  
  }, [thisUser])

 



  

  return (
    <>
    { !loading ?
    <Flex
      h={'70vh'}
      overflow={'hidden'}
      borderBottomRadius={'20px'}
      borderTopRadius={'20px'}
    >
      <Flex backgroundColor={'blue.800'} minW={'25%'} direction={'column'}>
        <Flex
          alignItems={'center'}
          backgroundColor={'blue.800'}
          h={'15%'}
          justifyContent={'center'}
        >
          
          <Avatar size={'md'}>
          </Avatar>
        </Flex>
        {users.map((user) => {
          return (
            <User
              key={user._id}
              onClick={() => {
                setRecipient(user);
              }}
              user={user}
            />
          );
        })}
      </Flex>
      <Flex minW={'75%'} direction={'column'}>
         <ChatBlock socket={socket} recipient={recipient} thisUser={thisUser}/>
      </Flex>
    </Flex>
     : <Text>loading</Text> 
    }
    </>
  );
};

export default ChatPage;
