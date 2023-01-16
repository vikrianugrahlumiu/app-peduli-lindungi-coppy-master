import * as React from 'react';
import { 
  LogoTop,
  LogoBumn,
  LogoKemkes,
  LogoKominfo,
  LogoKpc
 } from '../../assets/images'
import {
  PrimaryButton,
  LoadingUi
} from '../../components'
import { 
  View,
  Image, 
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { 
  setEmail, 
  setFullName,
  setNik,
  setTglLahir,
  setPhoneNumber
 } from '../../store/reducers/userReducer'

export default LoginScreen =({navigation})=> {
  const [email, onSetEmail] = React.useState(null);
  const [password, onSetPassword] = React.useState(null);
  const [errorMsg, onSetErrorMsg] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false)
  const BASE_URL = useSelector(state => state.config.baseUrl)
  const API_KEY = useSelector(state => state.config.apiKey)

  const dispatch = useDispatch()

  const onSubmitLogin= async ()=>{
    setIsLoading(true)
    onSetErrorMsg('')
    if(email !='' && email != null && password !='' && password != null){
      try{
        const res = await axios.post(`${BASE_URL}/action/findOne`,{
          "dataSource": "Cluster0",
          "database": "app_taskita",
          "collection": "peduli_member",
          "filter": {
            email:email,
            password:password
          }
        }, {
          headers: {"api-key": API_KEY}
        });
        
        setIsLoading(false)
        const document = res.data.document;
        if(document != null){
          dispatch(setEmail(email))
          dispatch(setFullName(document.nama))
          dispatch(setNik(document.nik))
          dispatch(setTglLahir(document.tgl_lahir))
          dispatch(setPhoneNumber(document.phone_number))

          navigation.replace('HomeScreen')
        }else{
          onSetErrorMsg("Username & password tidak sesuai")
        }

      }catch(err){
        onSetErrorMsg(err.message)
      }
      
    }else{
      onSetErrorMsg('username & password hasus di isi')
      
    }
  }


    return (
      <View style={style.mainContainer}>
        <View style={style.container}>
          <View style={style.logoContainer}>
            <Image source={LogoTop}  style={style.logoTopStyle} />
          </View>
          <TextInput
            placeholder='Masukan email'
            onChangeText={onSetEmail}
            style={style.inputSytle}
            value={email}
          />

          <TextInput
            placeholder='Masukan password'
            onChangeText={onSetPassword}
            style={style.inputSytle}
            secureTextEntry
            value={password}
          />

          <PrimaryButton
            title="Login"
            onPress={onSubmitLogin}/>

          <PrimaryButton
            title="Register"
            style={{margin:10}}
            onPress={()=>navigation.navigate('RegisterScreen')}/>
        
        {(errorMsg !='') && (
            <Text 
              style={{color:'red', margin:10, textAlign:'center'}}>
                {errorMsg}
            </Text>
          )}
        </View>

        <Text style={style.footherText}>Bekerjasama dengan</Text>
        <View style={style.footherLogo}>
          <Image source={LogoKpc} style={style.logoImage}/>
          <Image source={LogoKominfo} style={{width:100, height:60,resizeMode:'contain'}}/>
          <Image source={LogoKemkes} style={style.logoImage}/>
          <Image source={LogoBumn} style={style.logoImage}/>
        </View>
        <LoadingUi loading={isLoading}/>
      </View>
    );
}

const style = StyleSheet.create({
  container:{
    flex: 1, 
    padding:25,
    justifyContent: 'center',
    backgroundColor:'white'
  },  
  logoTopStyle:{
    width:150,
    height:150,
    
  },
  logoContainer:{
    alignItems:'center'
  },  
  inputSytle:{
      height: 40,
      margin: 12,
      borderWidth: 1,
      borderColor:'#006175',
      borderRadius:5,
      padding: 10,
  },
  footherText:{
    fontWeight:'bold',
    marginBottom:-30
  },
  footherLogo :{
    alignItems:'center',
    flexDirection:'row'
  },
  logoImage:{
    width:100, 
    height:130, 
    resizeMode:'contain',
    marginLeft:10
  },
  mainContainer:{
    flex:1, 
    backgroundColor:'white',
    padding:15
  }
})