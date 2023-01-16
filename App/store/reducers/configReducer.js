import { createSlice } from '@reduxjs/toolkit'

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    baseUrl:'https://data.mongodb-api.com/app/data-yvczw/endpoint/data/v1',
    apiKey:'zYwAQaYVJ2hdF6WVlhy4gFM7i6IOGAcAJ5lips8IYEjIkXjoksjPpuTBZvGjt4uC'
  }
});

export default configSlice.reducer