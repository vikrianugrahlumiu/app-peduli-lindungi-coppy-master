import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import configReducer from './reducers/configReducer'
import ehacReducer from './reducers/ehacReducer'
import PengaduanSlice from './reducers/PengaduanSlice'

export default configureStore({
  reducer: {
    user:userReducer,
    config:configReducer,
    ehac:ehacReducer,
    pengaduan:PengaduanSlice
    
  }
})