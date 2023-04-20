import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Select from '../components/Select';
import Send from '../components/Send';
import Admin from '../components/Admin';
import Login from '../components/Login';
import CreateAccount from '../components/CreateAccount';


const Stack = createStackNavigator()

export const TextStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Select" component={Select} />
      <Stack.Screen name="Text" component={Send} />
    </Stack.Navigator>
  );
};

export const AdminStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Nation Admin" component={Admin} />
    </Stack.Navigator>
  );
};

export const LoginStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Create" component={CreateAccount} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};