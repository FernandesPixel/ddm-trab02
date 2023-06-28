import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../../src/screen/MainScreen';
import LoginScreen from '../../src/screen/LoginScreen';
import RegisterScreen from '../../src/screen/RegisterScreen';
import ReceipeDetailsScreen from '../../src/screen/ReceipeDetailsScreen'

const MainStack = createStackNavigator();

//declara a stack de telas e seus nomes
const MainStackNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Register" component={RegisterScreen} />
    <MainStack.Screen name="Main" component={MainScreen} />
    <MainStack.Screen name="Login" component={LoginScreen} />
    <MainStack.Screen name="ReceipeDetails" component={ReceipeDetailsScreen} />
  </MainStack.Navigator>
);

export default MainStackNavigator;
