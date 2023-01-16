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
  setSarana
 } from '../../store/reducers/ehacReducer'
const DATA = [
    {
        label: 'Udara',
        value: 'udara',
    },
    {
        label: 'Darat',
        value: 'darat',
    },
    {
        label: 'Laut',
        value: 'laut',
    },
];

const ListItem = ({data,navigation}) => {
    const dispatch = useDispatch()
    const onselect = (item)=>{
        dispatch(setSarana(item))
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
  
export default TransportasiScreen =({navigation})=> {
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