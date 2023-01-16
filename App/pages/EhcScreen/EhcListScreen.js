import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { 
    StyleSheet, 
    View, 
    Text,
    ImageBackground,
    Image,
    Button,
    SafeAreaView,
    TouchableOpacity,
    FlatList
} from 'react-native';
import {
    PrimaryButton,
    LoadingUi
} from '../../components'
import { 
    addMultipeData,
    setSarana,
    setKotaTujuan,
    setTglKeberangkatan,
    setId
} from '../../store/reducers/ehacReducer'

export default EhcListScreen =({navigation})=> {
    const BASE_URL = useSelector(state => state.config.baseUrl)
    const API_KEY = useSelector(state => state.config.apiKey)
    const ehacData = useSelector(state => state.ehac.listdata)
    const dispatch = useDispatch()

    const getData=async()=>{
        try{
            const res = await axios.post(`${BASE_URL}/action/find`,{
                    dataSource: "Cluster0",
                    database: "app_taskita",
                    collection: "peduli_ehac",
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
        dispatch(setSarana(data.sarana_trans))
        dispatch(setKotaTujuan(data.kotaTujuan))
        dispatch(setTglKeberangkatan(data.tglKeberangkatan))
        navigation.navigate('EhcFormScreen')
    }

    const onDelete=async(nik)=>{
        try{
            const res = await axios.post(`${BASE_URL}/action/deleteOne`,{
                    dataSource: "Cluster0",
                    database: "app_taskita",
                    collection: "peduli_ehac",
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
                    <Text style={style.sub}>{data.tglKeberangkatan}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    <Button
                        onPress={()=>onEdit(data)}
                        title="Edit"
                        color="#841584"
                        accessibilityLabel="Edit Data"
                        />
                    <Button
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
            <FlatList
                data={ehacData}
                renderItem={({item}) => <Item data={item} />}
                keyExtractor={item => item._id}/>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    item:{
        padding:15,
        borderRadius:10,
        borderWidth:1,
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        borderColor:'#ECECEC'
    },
    title:{
        fontWeight:'bold',
        fontSize:16
    }
})