import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../components/Homepage';
import Register from '../components/Register';
import OutreachUpdate from '../components/OutreachUpdate';
import FireTracker from '../components/FireTracker';
import Icon from 'react-native-vector-icons/Ionicons';  
import {TextStackScreen, AdminStackScreen, LoginStackScreen} from './MainStackNavigation';
import { LoginStatus } from '../context/LoginStatus';
import React, {useContext} from 'react'


const Tab = createBottomTabNavigator();

const MainTabNavigation = () => {
    const [isSignedIn, setIsSignedIn] = useContext(LoginStatus)
    // used to control isSignedIn state for variables

    



    return (
        <Tab.Navigator screenOptions={{headerShown: false}}> 
            <Tab.Screen name="Authenticatie" component={LoginStackScreen} options={{tabBarStyle: { display: "none" }, tabBarButton: () => null, tabBarVisible: false}}/> 
            <Tab.Screen name="Homepage" component={Homepage} options={{title:"Home", tabBarIcon: ({ color, size }) => (
                <Icon name="home-outline" color={'black'} size={25}/>)}}/> 
            <Tab.Screen name="OutreachUpdate" component={OutreachUpdate} options={{title:"Outreach", tabBarIcon: ({ color, size }) => (
                <Icon name="people-outline" color={'black'} size={25}/>)}}/>  
            <Tab.Screen name="Register" component={Register} options={{title:"Register", tabBarIcon: ({ color, size }) => (
                <Icon name="create-outline" color={'black'} size={25}/>)}}/>  
            <Tab.Screen name="Send" component={TextStackScreen} options={{title:"Text", tabBarIcon: ({ color, size }) => (
                <Icon name="mail-outline" color={'black'} size={25}/>)}}/> 
            <Tab.Screen name="FireTracker" component={FireTracker} options={{title:"FireTracker", tabBarIcon: ({ color, size }) => (
                <Icon name="flame" color={'orange'} size={25}/>)}}/>  
            <Tab.Screen name="Admin" component={AdminStackScreen} options={{title:"Admin", tabBarIcon: ({ color, size }) => (
                <Icon name="business" color={'black'} size={25}/>)}}/> 
        </Tab.Navigator>
            )

    }


export default MainTabNavigation