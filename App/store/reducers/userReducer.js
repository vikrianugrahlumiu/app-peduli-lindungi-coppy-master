import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id:'',
    nik:'',
    fullName:'',
    email:'',
    tglLahir:'',
    phoneNumber:'',
  },
  reducers: {
    setNik: (state, action)  => {
        state.nik = action.payload
    },
    setFullName: (state, action)  => {
        state.fullName = action.payload
    },
    setEmail: (state, action)  => {
        state.email = action.payload
    },
    setTglLahir: (state, action)  => {
        state.tglLahir = action.payload
    },
    setPhoneNumber: (state, action)  => {
        state.phoneNumber = action.payload
    },
    resetUser:(state)=>{
        state = {
            nik:'',
            fullName:'',
            email:'',
            tglLahir:'',
            phoneNumber:'',
        }
    }
  }
})

export const { 
    setNik,
    setFullName,
    setEmail,
    setTglLahir,
    setPhoneNumber,
    resetUser,
 } = userSlice.actions

export default userSlice.reducer