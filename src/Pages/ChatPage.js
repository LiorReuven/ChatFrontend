import React, { useEffect, useState, useRef } from 'react';
import { Flex, Avatar, Text, Divider, Box } from '@chakra-ui/react';
import BarLoader from 'react-spinners/BarLoader';
import { useNavigate } from 'react-router-dom';
import User from '../components/User';
import API from '../helpers/API';
import { getUsersUrl } from '../helpers/API';
import ChatBlock from '../components/ChatBlock';
import io from 'socket.io-client';

const ChatPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [thisUser, setThisUser] = useState(undefined);
  const [recipient, setRecipient] = useState(undefined);
  const socket = useRef();
  const [loading, setLoading] = useState(true);
  const [unRead, setUnRead] = useState([]);

  useEffect(() => {
    const setThisUserHandler = async () => {
      const storage = await JSON.parse(localStorage.getItem('chatUser'));
      setThisUser(storage.user);
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
          data: data,
          _id: thisUser._id,
        });
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    if (thisUser) {
      socket.current = io(process.env.REACT_APP_BASE_URL);
      socket.current.emit('add_user', thisUser._id);
      socket.current.on('get_online_users', (data) => {
        fetchAllUsers(data);
      });
      setLoading(false);
    }
  }, [thisUser]);

  return (
    <>
      {!loading ? (
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
              <Box
                backgroundColor={'green.400'}
                borderRadius={'full'}
                p={'4px'}
              >
                <Avatar src={thisUser?.avatarImage} size={'md'}></Avatar>
              </Box>
              <Text
                color={'white'}
                noOfLines={1}
                maxW={'50%'}
                ml={'1rem'}
                fontWeight={'semibold'}
              >
                {thisUser?.username}
              </Text>
            </Flex>
            <Divider />
            {users.map((user) => {
              return (
                <User
                  key={user._id}
                  onClick={() => {
                    setRecipient(user);
                    const indexOfRec = unRead.indexOf(recipient?._id);
                    if (indexOfRec !== -1) {
                      const array = [...unRead];
                      array.splice(indexOfRec, 1);
                      setUnRead([...array]);
                    }
                  }}
                  user={user}
                  unRead={unRead}
                  recipient={recipient}
                />
              );
            })}
          </Flex>
          <Flex minW={'75%'} direction={'column'}>
            <ChatBlock
              socket={socket}
              recipient={recipient}
              thisUser={thisUser}
              setUnRead={setUnRead}
            />
          </Flex>
        </Flex>
      ) : (
        <Flex justifyContent={'center'} alignItems={'center'}>
          <BarLoader color="rgb(65, 127, 204)" />
        </Flex>
      )}
    </>
  );
};

export default ChatPage;
