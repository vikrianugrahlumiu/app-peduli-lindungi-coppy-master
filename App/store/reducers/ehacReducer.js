import { createSlice } from '@reduxjs/toolkit'

export const ehacSlice = createSlice({
    name: 'ehac',
    initialState: {
        form:{
            id:'',
            nik:'',
            fullName:'',
            email:'',
            tglLahir:'',
            phoneNumber:'',
            sarana:{},
            kotaTujuan:{},
            tglKeberangkatan:''
        },
        listdata:[]
    },
    reducers: {
        setId:(state, action)  => {
            state.form.id = action.payload
        },
        setSarana: (state, action)  => {
            state.form.sarana = action.payload
        },
        setKotaTujuan: (state, action)  => {
            state.form.kotaTujuan = action.payload
        },
        setTglKeberangkatan:(state, action) =>{
            state.form.tglKeberangkatan =  action.payload
        },
        addMultipeData:(state, action) =>{
            state.listdata =  action.payload
        }
    }
})

export const { 
    setSarana,
    setKotaTujuan,
    setTglKeberangkatan,
    addMultipeData,
    setId
 } = ehacSlice.actions
export default ehacSlice.reducer