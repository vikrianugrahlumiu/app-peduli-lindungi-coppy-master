import * as React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    ImageBackground,
    Image,
    SafeAreaView,
    TouchableOpacity,
    FlatList
} from 'react-native';
import {
    BoxList
} from '../../components'
import {
    PrimaryButton
} from '../../components'
import{
    BGEhac,
    ICCreateEhac,
    ICMyEhac,
    ICBack,
    ICArrowRight,
    ICDate,
    ICFace
} from '../../assets/images'
import { useSelector } from 'react-redux'
import { 
    addMultipeData,
    setJudulpengaduan,
    setTglpengaduan,
    setDetailpengaduan,
    setId
} from '../../store/reducers/PengaduanSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios';

export default PengaduanScreen =({navigation})=> {
    const fullname = useSelector(state => state.user.fullname)
    const date = useSelector(state => state.user.date)
    const BASE_URL = useSelector(state => state.config.baseUrl)
    const API_KEY = useSelector(state => state.config.apiKey)
    const ehacData = useSelector(state => state.ehac.listdata)
    const dispatch = useDispatch()
    const getData=async()=>{
        try{
            const res = await axios.post(`${BASE_URL}/action/find`,{
                    dataSource: "Cluster0",
                    database: "app_taskita",
                    collection: "peduli_pengaduan",
                    filter: {},
                },{ headers: {"api-key": API_KEY}});
            
            const data = res.data.documents;
            dispatch(addMultipeData(data))

        }catch(err){
            console.log(err)
        }
    }

    const onEdit=(data)=>{
        dispatch(setId(data._id))
        dispatch(setJudulpengaduan(data.judul))
        dispatch(setTglpengaduan(data.tgl))
        dispatch(setDetailpengaduan(data.detailPengaduan))
        navigation.navigate('FormPengaduan')
    }

    const onDelete=async(nik)=>{
        try{
            const res = await axios.post(`${BASE_URL}/action/deleteOne`,{
                    dataSource: "Cluster0",
                    database: "app_taskita",
                    collection: "peduli_pengaduan",
                    filter: {nik:nik},
                },{ headers: {"api-key": API_KEY}});
            
                getData()

        }catch(err){
            console.log(err)
        }
    }

    React.useEffect(()=>{
        getData()
    },[])

    const Item = ({data}) => {
        return(
            <View style={style.item}>
                <Text style={style.title}>{data.nama}</Text>
                
                <Text style={style.sub}>{data.nik}</Text>
                <View>
                    <Text style={style.sub}>{data.tgl}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    <PrimaryButton
                        onPress={()=>onEdit(data)}
                        title="Edit"
                        color="#841584"
                        accessibilityLabel="Edit Data"
                        />
                    <PrimaryButton
                        onPress={()=>onDelete(data.nik)}
                        title="Delete Data"
                        color="#841584"
                        accessibilityLabel="Delete Data"
                        />
                </View>
            </View>
        )
    };
    

    return (

        <SafeAreaView style={style.container}>
                <View>
                <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')} style={{marginTop:40, marginLeft:30}}>
                    <View style={{flexDirection:'row'}}>
                    <Image source={ICBack}/>
                        <Text 
                            style={{fontSize:18,fontWeight:'bold', marginLeft:15}}>
                            Pengaduan
                        </Text>
                    </View>
             
                </TouchableOpacity>
                
                <PrimaryButton
                title="Buat Pengaduan"
                onPress={()=>navigation.navigate('FormPengaduan')}/>
                </View>
            <FlatList
                data={ehacData}
                renderItem={({item}) => <Item data={item} />}
                keyExtractor={item => item._id}/>
                
 
        </SafeAreaView>
        

    )
    
}


const style = StyleSheet.create({
    container:{
        padding:13,
        backgroundColor:'white',
        flex:1
    },
    textGroupHeader:{
        fontWeight:'bold',
        fontSize:12
    },
    formHeader:{
        flexDirection:'row',
        marginTop:1
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
        flex:2, 
        
    }
})

    