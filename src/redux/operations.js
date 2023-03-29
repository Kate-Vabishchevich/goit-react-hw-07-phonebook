import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://64241fb1d6152a4d480723dd.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fatchAll',
  async (_, thunkApi) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue();
    }
  }
);
