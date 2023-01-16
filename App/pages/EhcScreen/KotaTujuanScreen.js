import * as React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    FlatList,
    SafeAreaView,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    ICArrowRight
} from '../../assets/images'
import { useDispatch } from 'react-redux'
import { 
  setKotaTujuan
 } from '../../store/reducers/ehacReducer'
const DATA = [
    { label: 'Bekasi', value: 'bekasi'},
    { label: 'Jakarta', value: 'jakarta'},
    { label: 'Jambi', value: 'jabi'},
    { label: 'Padang', value: 'padang'},
    { label: 'Palembang', value: 'palembang'},
    { label: 'Surabaya', value: 'surabaya'},
    { label: 'Jogja', value: 'jogja'},
    { label: 'Bali', value: 'bali'},
    { label: 'Maluku', value: 'jambi'},
    { label: 'Makasar', value: 'makasar'},
    { label: 'Banda Aceh', value: 'aceh'},
    { label: 'Lampung', value: 'lampung'},
];

const ListItem = ({data,navigation}) => {
    const dispatch = useDispatch()
    const onselect = (item)=>{
        dispatch(setKotaTujuan(item))
       navigation.navigate('EhcFormScreen')
    }

    return(
        <TouchableOpacity onPress={()=>onselect(data)}>
            <View style={style.item}>
                <View style={{flexDirection:'row'}}>
                    <Text style={style.title}>{data.label}</Text>
                    <View style={{flex:1, alignItems:'flex-end'}}>
                        <Image source={ICArrowRight} style={{}}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
};
  
export default KotaTujuanScreen =({navigation})=> {
    return (
        <SafeAreaView style={style.container}>
             <FlatList
                data={DATA}
                renderItem={({item}) => <ListItem data={item} navigation={navigation}/>}
                keyExtractor={item => item.value}
            />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white'
    },
    item:{
        borderBottomWidth:1,
        borderColor:'#F0F0F0',
        padding:15
        
    },
    title:{
        marginLeft:20,
        fontSize:15,
        flex:3,
        fontWeight:'bold'
    }
    
})