import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import HomeScreen from './Telas/HomeScreen';

const Tab = createNativeStackNavigator();


export default function Rotas() {
  return (
    <NavigationContainer>
      <Tab.Navigator>


        <Tab.Screen name="HomeScreen" options={{ headerShown: false }}
        component={HomeScreen}
        />




      </Tab.Navigator>
    </NavigationContainer>
  );
}
