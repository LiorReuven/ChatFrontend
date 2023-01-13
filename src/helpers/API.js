import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('chatUser')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('chatUser')).token
    }`;
  }

  return req;
});

const url = process.env.REACT_APP_BASE_URL;

export const registerUrl = `${url}/users/register`;
export const loginrUrl = `${url}/users/login`;
export const getUsersUrl = `${url}/users/getusers`;

export const getMessagesUrl = `${url}/messages/getmessages`;
export const addMessageUrl = `${url}/messages/addmessage`;

export default API;
