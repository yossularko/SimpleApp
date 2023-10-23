import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeParamList} from '../types/navigation';
import {AddItem, Home} from '../screens';

const Stack = createNativeStackNavigator<HomeParamList>();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{animation: 'slide_from_right'}}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddItem"
        component={AddItem}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
