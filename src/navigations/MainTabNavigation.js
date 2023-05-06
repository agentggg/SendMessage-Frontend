import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../components/Homepage';
import Register from '../components/Register';
import OutreachUpdate from '../components/OutreachUpdate';
import FireTracker from '../components/FireTracker';
import Icon from 'react-native-vector-icons/Ionicons';  
import {TextStackScreen, AdminStackScreen, LoginStackScreen} from './MainStackNavigation';
import { LoginStatus } from '../context/LoginStatus';
import React, {useContext, useState, useEffect} from 'react'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import Logout from '../reuseableComponents/Logout';


const Tab = createBottomTabNavigator();
const MainTabNavigation = () => {
    const [autoSignIn, setAutoSignIn] = useState(false);
    const [isSignedIn, setIsSignedIn] = useContext(LoginStatus)
    // used to control isSignedIn state for variables
    useEffect(() => {
      const getUserProfile = async () => {
        const userProfileInfo = await SecureStore.getItemAsync('userProfile');
        if (!userProfileInfo === null){
        const userProfileJson = JSON.parse(userProfileInfo);
        const userToken = (userProfileJson['token']);
        const userName = (userProfileJson['username']);
        const tokenCheck = await axios.post(`http://agentofgod.pythonanywhere.com/token_validation`,{username:userName})
        const backendToken = tokenCheck.data
        if (backendToken[0] === userToken){
            setAutoSignIn(true)
        }
        else{
            setAutoSignIn(false)
        }
    }
    else{
        setAutoSignIn(false)
    }
      };
  
      getUserProfile();
    }, []);


    return (
        <Tab.Navigator screenOptions={{headerShown: false}}> 
        {autoSignIn ? 
        <>
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
            <Tab.Screen name="Logout" component={Logout} options={{tabBarStyle: { display: "none" }, tabBarButton: () => null, tabBarVisible: false}}/> 
            <Tab.Screen name="Authenticatie" component={LoginStackScreen} options={{tabBarStyle: { display: "none" }, tabBarButton: () => null, tabBarVisible: false}}/> 

        </> : 
        <>
            <Tab.Screen name="Authenticatie" component={LoginStackScreen} options={{tabBarStyle: { display: "none" }, tabBarButton: () => null, tabBarVisible: false}}/> 
            <Tab.Screen name="Logout" component={Logout} options={{tabBarStyle: { display: "none" }, tabBarButton: () => null, tabBarVisible: false}}/> 
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
        </>
        }
        </Tab.Navigator>
            )
    }


export default MainTabNavigation