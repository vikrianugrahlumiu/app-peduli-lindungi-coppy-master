import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './App/store'
import { Provider } from 'react-redux'
import { 
  SplashScreen,
  LoginScreen,
  HomeScreen,
  EhcScreen,
  EhcFormScreen,
  EhcListScreen,
  PengaduanScreen,
  FormPengaduan
} from './App/pages'

const Stack = createNativeStackNavigator();

const  App = ()=> {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="EhcScreen" component={EhcScreen} options={{headerShown: false}}/>
        <Stack.Screen name="EhcFormScreen" component={EhcFormScreen} options={{title:'e-HAC Form'}}/>
        <Stack.Screen name="EhcListScreen" component={EhcListScreen} options={{title:'My e-HAC'}}/>
        <Stack.Screen name="KotaTujuanScreen" component={KotaTujuanScreen} options={{title:'Kota Tujuan'}}/>
          <Stack.Screen name="TransportasiScreen" component={TransportasiScreen} options={{title:'Transportations'}}/>
          <Stack.Screen name="PengaduanScreen" component={PengaduanScreen} options={{headerShown: false}}/>
        <Stack.Screen name="FormPengaduan" component={FormPengaduan} options={{title:'input pengaduan'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;