import { createSlice } from '@reduxjs/toolkit'

export const PengaduanSlice = createSlice({
  name: 'pengaduan',
  initialState: {
    form:{
    nik:'',
    fullName:'',
    judul:'',
    tgl:'',
    detailPengaduan:'',
    },
  listdata:[]
  },

  reducers: {
    setId:(state, action)  => {
      state.form.id = action.payload
    },
    setNik: (state, action) => {
      state.nik = action.payload
      },
     setFullname: (state, action) => {
        state.fullName = action.payload
     },
     setJudulpengaduan: (state, action) => {
      state.judul = action.payload
     },
     setTglpengaduan: (state, action) => {
        state.tgl = action.payload
      },
     setDetailpengaduan: (state, action) => {
      state.detailPengaduan = action.payload
      },

    resetUser:(state) => {
           state = {
            nik:'',
            fullname:'',
            judul:'',
            tgl:'',
            detailPengaduan:'',
        }
    }
  }
})

export const{

  setFullname,
  setJudulpengaduan,
  setTglpengaduan,
  setDetailpengaduan,
  resetUser,
} = PengaduanSlice.actions


export default PengaduanSlice.reducer