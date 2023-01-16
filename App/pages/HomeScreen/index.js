import * as React from 'react';
import { useSelector } from 'react-redux'
import { 
    View,
    Text,
    Image,
    SafeAreaView,
    StyleSheet
   } from 'react-native';
import{
    ICNotification,
    ICAccount
} from '../../assets/images'

import{
    MainCard,
    BoxCard
} from '../../components'

import{
    ICImunization,
    ICCovidTest,
    ICEhac,
    ICTravel,
    ICTelemedicine,
    ICHealthFacility,
    ICCovitStatistic,
    ICHospital,
    ICPengaduan
} from '../../assets/images'

export default HomeScreen =({navigation})=> {
    const fullName = useSelector(state => state.user.fullName)
    return (
        <SafeAreaView  style={style.mainContainer}>
            <View style={style.header}>
                <View style={{flex:1}}>
                    <Image source={ICAccount}/>
                </View>
                <View style={{flex:10, flexDirection:'row'}}>
                    <Text  style={{fontWeight:'bold'}}>
                        Hi
                    </Text>
                    <Text style={style.haderText}>
                        {fullName}
                    </Text>
                </View>
                <View style={{flex:1}}>
                    <Image source={ICNotification}/>
                </View>
            </View>
            <View>
                <MainCard></MainCard>
            </View>
            <View>
                <View style={{marginTop:15, flexDirection:'row', justifyContent:'space-between'}}>
                    <BoxCard 
                        title="Vaccine and Immunization"
                        source={ICImunization}
                        style={{backgroundColor:'#FFBF43'}}
                    />

                    <BoxCard 
                        title="Covid-19 Test Results"
                        source={ICCovidTest}
                        style={{backgroundColor:'#D34539'}}
                    />

                    <BoxCard 
                        title="EHC"
                        onPress={()=>navigation.navigate('EhcScreen')}
                        source={ICEhac}
                        style={{backgroundColor:'#1E9E61'}}
                    />
                    
                    <BoxCard 
                        title="Travel Regulations"
                        source={ICTravel}
                        style={{backgroundColor:'#1E9E61'}}
                    />
                </View>

                <View style={{marginTop:15, flexDirection:'row', justifyContent:'space-between'}}>
                    <BoxCard 
                        title="Telemedicine"
                        source={ICTelemedicine}
                        style={{backgroundColor:'#FFC557'}}
                    />

                    <BoxCard 
                        title="Healthcare Facility"
                        source={ICHealthFacility}
                        style={{backgroundColor:'#1E9E61'}}
                    />

                    <BoxCard 
                        title="Covid-19 Statistic"
                        source={ICCovitStatistic}
                        style={{backgroundColor:'#D7574C'}}
                    />
                    
                    <BoxCard 
                        title="Find Hospital Bed"
                        source={ICHospital}
                        style={{backgroundColor:'#FFC557'}}
                    />
                </View>
                <View>
                <BoxCard 
                        title="Pengaduan"
                        onPress={()=>navigation.navigate('PengaduanScreen')}
                        source={ICPengaduan}
                        style={{backgroundColor:'#FFC557'}}
                    />
                </View>
            </View>
            <Text style={style.headerInfo}>Health Information</Text>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    mainContainer:{
        flex:1, 
        backgroundColor:'white',
        padding:15
    },
    header:{
        marginTop:20,
        flexDirection:'row'
    },
    haderText:{
        fontWeight:'bold',
        marginLeft:5,
        textDecorationLine:'underline'
    },
    headerInfo:{
        marginTop:25,
        marginBottom:10,
        fontWeight:'bold',
        fontSize:18
    }
})