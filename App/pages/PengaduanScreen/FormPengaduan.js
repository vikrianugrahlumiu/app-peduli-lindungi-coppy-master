import * as React from 'react';
import { 
  kiRi,
  ICarrow
 } from '../../assets/images'
import {
  PrimaryButton,
  LoadingUi
} from '../../components'
import { 
  View,
  Image, 
  Text,
  TextArea,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity
 } from 'react-native';
 import DateTimePicker from '@react-native-community/datetimepicker';
 import axios from 'axios';
 import { useSelector } from 'react-redux'
 



export default FormPengaduan =({navigation})=> {
  const BASE_URL = useSelector(state => state.config.baseUrl)
  const API_KEY = useSelector(state => state.config.apiKey)
  const [tmpDate, setTmpDate] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const [nik, setNik] = React.useState(null);
  const [nama, setNama] = React.useState(null);
  const [judul, setJudulpengaduan] = React.useState(null);
  const [tgl, setTglpengaduan] = React.useState(null);
  const [detailPengaduan, setDetailpengaduan] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const user = useSelector(state => state.user)
  const pengaduanForm = useSelector(state => state.pengaduan.form)
  const personalData = [
    {label:"NIK", value: user.nik},
    {label:"Pelapor", value: user.fullName},
]

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const tgl = currentDate.getDate()//DD
    const bulan = currentDate.getMonth()+1 //MM
    const tahun = currentDate.getFullYear() //yyyy
    
    setShow(false);
    setTmpDate(currentDate);
    setTglpengaduan(tgl+"/"+bulan+"/"+tahun);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };
  
  

  const showDatepicker = () => {
    setShow(true);
  };


  const onClickBack=()=>{
    navigation.replace('LoginScreen')
  }
  const onSaveData=async ()=>{
    try{
        const action = pengaduanForm.id !='' ? 'updateOne':'insertOne';
        let dataSender = {
            "document": {
                nik:user.nik,
                nama:user.fullName,
                judul:pengaduanForm.judul,
                tgl:pengaduanForm.tgl,
                detailPengaduan:pengaduanForm.detailPengaduan,
            }
        }
        if(pengaduanForm.id !=''){
            dataSender={
                "filter": { "nik": user.nik },
                "update": { "$set": { 
                  nik:user.nik,
                  nama:user.fullName,
                  judul:pengaduanForm.judul,
                  tgl:pengaduanForm.tgl,
                  detailPengaduan:pengaduanForm.detailPengaduan,
                } },
            }
        }

        console.log('dataSender',dataSender)
        const res = await axios.post(`${BASE_URL}/action/${action}`,{
            "dataSource": "Cluster0",
            "database": "app_taskita",
            "collection": "peduli_pengaduan",
            ...dataSender
        },{ headers: {"api-key": API_KEY}});

        navigation.navigate('PengaduanScreen')
    }catch(err){
        console.log(err)
    }
}
    return (
      <SafeAreaView style={style.mainContainer}>
            <TouchableOpacity onPress={()=>navigation.navigate('PengaduanScreen')} style={{muyarginTop:40, marginLeft:30}}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={ICarrow}/>
                        <Text 
                            style={{fontSize:18,fontWeight:'bold', marginLeft:15}}>
                            Pengaduan
                        </Text>
                    </View>
                </TouchableOpacity>
                
    

           


      <View style={{marginTop:30,flexDirection:'column'}}>
        <View>

          <View>
              <Text style={style.TextTitle}>
               Pelapor
              </Text>
        
              {personalData.map((prop) => {
                return(
                    <View key={prop.label}>
                        <View style={ style.formHeader}>
                            <View style={{
                                flex:1,
                                justifyContent:'center',
                                }}>
                                <Text style={style.inputTextLabel}>
                                    {prop.label} : </Text>
                            </View>
                            <View style={style.inputStyle} >
                                <Text>{prop.value} </Text>
                            </View>
                        </View>
                    </View>
                )
            })}
          </View>
          
          <View>
              <Text style={style.TextTitle}>
               Judul Pengaduan
              </Text>
            
            <TextInput
              placeholder='input judul pengaduan'
              style={style.inputSytle}
              onChangeText={setJudulpengaduan}
              value={judul}
              />
          </View>

          <View>
              <Text style={style.TextTitle}>
                Tanggal Pengaduan
              </Text>
            <View style={{flexDirection:'row'}}>
                <TextInput
                    placeholder='MM/DD/YYYY'
                    style={style.inputDate}
                    editable = {false}
                    format='MM-DD-YYYY'
                    value={tgl}
                    />
                <PrimaryButton
                    title="DATE"
                    style={{marginTop:10,height:40}}
                    onPress={showDatepicker}
                    />
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={tmpDate}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
                )}
              </View>
           
          </View>

          <View>
              <Text style={style.TextTitle}>
               Detail Pengaduan
              </Text>
            
            <TextInput
              placeholder='input detail pengaduan'
              style={style.inputSytle}
              onChangeText={setDetailpengaduan}
              value={detailPengaduan}
              />
          </View>
 

          <PrimaryButton
           title="Simpan Data"
           onPress={onSaveData}/>

        </View>
      </View>
      <LoadingUi loading={isLoading}/>
      </SafeAreaView>
        
    );
}

const style = StyleSheet.create({
  container:{
    marginTop:50,
    marginLeft:15,
    flexDirection:'row'
  },  
  logoTopStyle:{
    width:150,
    height:150,
    resizeMode:'contain'

  },
  inputSytle:{
    height: 40,
    width:'90%',
    margin: 12,
    borderWidth: 1,
    borderColor:'#006175',
    borderRadius:9,
    padding: 10,
},
  inputDate:{
      height: 40,
      margin: 12,
      borderWidth: 1,
      borderColor:'#006175',
      borderRadius:9,
      padding: 10,
      backgroundColor:'#E0E0E0',
      flex:2
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
    width:75, 
    height:75, 
    resizeMode:'contain',
    marginLeft:7,
    marginTop:25
  },
  mainContainer:{
    flex:1, 
    backgroundColor:'white',
    padding:15
  },
  TextTitle:{
    fontWeight:'500',
    marginLeft:17 
  },
})