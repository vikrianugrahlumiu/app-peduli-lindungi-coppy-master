import * as React from 'react';
import { useSelector } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { 
    StyleSheet, 
    View, 
    Text,
    ImageBackground,
    Image,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import {
    PrimaryButton,
    LoadingUi
} from '../../components'

import { 
    setTglKeberangkatan
} from '../../store/reducers/ehacReducer'

export default EhcFormScreen =({navigation})=> {
    const dispatch = useDispatch()
    const BASE_URL = useSelector(state => state.config.baseUrl)
    const API_KEY = useSelector(state => state.config.apiKey)
    const user = useSelector(state => state.user)
    const ehacForm = useSelector(state => state.ehac.form)
    const [tmpDate, setTmpDate] = React.useState(new Date());
    const [showDate, setShowDate] = React.useState(false);
    const personalData = [
        {label:"NIK", value:user.nik},
        {label:"Nama", value: user.fullName},
        {label:"Tgl Lahir", value: user.tglLahir},
        {label:"Email", value: user.email},
        {label:"Phone Number", value: user.phoneNumber}
    ]

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || tmpDate;
        const tgl = currentDate.getDate() // DD
        const bulan = currentDate.getMonth()+1 // MM
        const tahun = currentDate.getFullYear() // YYYY
        
        setShowDate(false);
        setTmpDate(currentDate);
        dispatch(setTglKeberangkatan(tgl+"/"+bulan+"/"+tahun));
      };

    const onSaveData=async ()=>{
        try{
            const action = ehacForm.id !='' ? 'updateOne':'insertOne';
            let dataSender = {
                "document": {
                    nik:user.nik,
                    nama:user.fullName,
                    tgl_lahir:user.tglLahir,
                    phone_number:user.phoneNumber,
                    email:user.email,
                    sarana_trans:ehacForm.sarana,
                    kotaTujuan:ehacForm.kotaTujuan,
                    tglKeberangkatan:ehacForm.tglKeberangkatan,
                }
            }
            if(ehacForm.id !=''){
                dataSender={
                    "filter": { "nik": user.nik },
                    "update": { "$set": { 
                        nik:user.nik,
                        nama:user.fullName,
                        tgl_lahir:user.tglLahir,
                        phone_number:user.phoneNumber,
                        email:user.email,
                        sarana_trans:ehacForm.sarana,
                        kotaTujuan:ehacForm.kotaTujuan,
                        tglKeberangkatan:ehacForm.tglKeberangkatan,
                    } },
                }
            }

            console.log('dataSender',dataSender)
            const res = await axios.post(`${BASE_URL}/action/${action}`,{
                "dataSource": "Cluster0",
                "database": "app_taskita",
                "collection": "peduli_ehac",
                ...dataSender
            },{ headers: {"api-key": API_KEY}});

            navigation.navigate('EhcScreen')
        }catch(err){
            console.log(err)
        }
    }

    return (
        <SafeAreaView style={style.container}>
            <Text style={style.textGroupHeader}>Personal Detail</Text>
            
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

            <Text style={[style.textGroupHeader,{marginTop:20}]}>Travel Detail</Text>
            <View style={ style.formHeader}>
                <View style={{
                    flex:1,
                    justifyContent:'center',
                    }}>
                    <Text style={style.inputTextLabel}>Transportasi : </Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('TransportasiScreen')} style={style.inputStyle} >
                    <Text>{ehacForm.sarana.label ? ehacForm.sarana.label :'-'}</Text>
                </TouchableOpacity>
            </View>

            <View style={ style.formHeader}>
                <View style={{
                    flex:1,
                    justifyContent:'center',
                    }}>
                    <Text style={style.inputTextLabel}>Kota Tujuan : </Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('KotaTujuanScreen')} style={style.inputStyle} >
                    <Text>{ehacForm.kotaTujuan.label ? ehacForm.kotaTujuan.label:'-'}</Text>
                </TouchableOpacity>
            </View>

            <View style={ style.formHeader}>
                <View style={{
                    flex:1,
                    justifyContent:'center',
                    }}>
                    <Text style={style.inputTextLabel}>Keberangkatan : </Text>
                </View>
                <TouchableOpacity onPress={()=>setShowDate(true)} style={style.inputStyle} >
                    <Text>{ehacForm.tglKeberangkatan !=''? ehacForm.tglKeberangkatan : 'mm/dd/yyyy'}</Text>
                </TouchableOpacity>
                {showDate && (
                      <DateTimePicker
                      testID="dateTimePicker"
                      value={tmpDate}
                      mode={'date'}
                      is24Hour={true}
                      onChange={onChange}/>
                  )}
            </View>

            <View style={ style.formHeader}>
                <View style={{
                    flex:1,
                    justifyContent:'center',
                    }}>
                    <Text style={style.inputTextLabel}></Text>
                </View>
                <View style={style.inputStyleAction} >
                    <PrimaryButton
                        title="Save Data"
                        style={{ marginLeft: 0,
                            marginRight: 0,}}
                        onPress={onSaveData}/>
                </View>
            </View>

            
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        padding:15,
        backgroundColor:'white',
        flex:1
    },
    textGroupHeader:{
        fontWeight:'bold',
        fontSize:15
    },
    formHeader:{
        flexDirection:'row',
        marginTop:8
    },
    inputTextLabel:{
        fontWeight:'bold',
        textAlign:'right'
    },
    inputStyle:{
        backgroundColor:'#BDE6FA',
        flex:3, 
        borderRadius: 5, 
        borderWidth:1,
        padding:8,
        fontSize:14,
        borderColor:'#DDDDDD'
    },
    inputStyleAction:{
        flex:3, 
        
    }
})