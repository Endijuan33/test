import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import InputHPScreen from '../screens/Inventory/InputHPScreen';
import IMEIScanInScreen from '../screens/Scanner/IMEIScanInScreen';
import IMEIScanOutScreen from '../screens/Scanner/IMEIScanOutScreen';
import RekapScreen from '../screens/Reports/RekapScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="InputHP" component={InputHPScreen} />
        <Stack.Screen name="IMEIScanIn" component={IMEIScanInScreen} />
        <Stack.Screen name="IMEIScanOut" component={IMEIScanOutScreen} />
        <Stack.Screen name="Rekap" component={RekapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
