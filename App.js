import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Search from './Search';
import Menu from './Menu';
import PlaceOrder from './PlaceOrder';

const Stack = createStackNavigator();



function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="Menu" component={Menu}/>
        <Stack.Screen name="PlaceOrder" component={PlaceOrder}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
