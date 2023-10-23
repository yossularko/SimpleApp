import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginParamList} from '../types/navigation';
import {Login} from '../screens';

const Stack = createNativeStackNavigator<LoginParamList>();

const LoginNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{animation: 'slide_from_right'}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default LoginNavigation;
