import * as React from 'react';
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
    BoxList
} from '../../components'
import{
    BGEhac,
    ICCreateEhac,
    ICMyEhac,
    ICBack
} from '../../assets/images'
import { useDispatch, useSelector } from 'react-redux'
import { 
    setId
} from '../../store/reducers/ehacReducer'

export default EhcScreen =({navigation})=> {
    const dispatch = useDispatch()
    const onAddNew =()=>{
        dispatch(setId(''))
        navigation.navigate('EhcFormScreen')
    }

    return (
        <SafeAreaView style={style.container}>
            <ImageBackground source={BGEhac} style={style.imgContainer}>
                <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')} style={{marginTop:40, marginLeft:30}}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={ICBack}/>
                        <Text 
                            style={{fontSize:18,fontWeight:'bold', marginLeft:15}}>
                            EHac
                        </Text>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
           
            <View style={style.cardContainer}>
                <View style={style.cardList}>
                <BoxList 
                    title="Create e-HAC"
                    subtitle="Electronic Health Alert Card"
                    onPress={()=>onAddNew()}
                    source={ICCreateEhac}
                    style={{backgroundColor:'#1E9E61'}}
                    cardStyle={{
                        borderBottomWidth:1, 
                        borderColor:'#DFDADA',
                        paddingBottom:10
                    }}
                />
                <BoxList 
                    cardStyle={{paddingTop:5}}
                    title="My e-HAC"
                    subtitle="Check your history eHAC here"
                    onPress={()=>navigation.navigate('EhcListScreen')}
                    source={ICMyEhac}
                    style={{backgroundColor:'#F49A5C'}}
                />
                </View>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1
    },
    imgContainer:{
        height:200
    },
    cardContainer:{
        padding:30,
    },
    cardList:{
        borderWidth:1,
        padding:15,
        borderRadius:15,
        borderColor:'#DFDADA'        
    }
})