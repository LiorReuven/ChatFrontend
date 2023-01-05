import API from '../helpers/API';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginrUrl } from '../helpers/API';

export const login = createAsyncThunk(
  'auth/login',
  async (loginInfo) => {
    try {
      const response = await API.post(
        loginrUrl,
        loginInfo
        );

       return response.data;
       
    } catch (error) {
      console.log(error);
      return error.response.data
    }
  }
);