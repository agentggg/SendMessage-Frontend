import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, Alert, TouchableOpacity, TouchableWithoutFeedback, TextInput, Linking, AppState } from 'react-native'
import React, {useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import { LoginStatus } from '../context/LoginStatus';
import { SavedStatus } from '../context/SavedStatus';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import getIpAddress from '../../config';
import { Ionicons } from "@expo/vector-icons";

const Login = ({navigation}) => {
    const ipAddress = getIpAddress();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [activeUser, setActiveUser] = useState('')
    const [expoPushToken, setExpoPushToken] = useState('')
    const [isSignedIn, setIsSignedIn] = useContext(LoginStatus)
    const [isLoggedIn, setIsLoggedIn] = useContext(SavedStatus);
    const [showPassword, setShowPassword] = useState(false);

    // used to set sign in value
    useEffect(() => {
        // SecureStore.deleteItemAsync('isLoggedIn')
        // Check if the user is logged in on app start
        SecureStore.getItemAsync('isLoggedIn').then(value => {
          setIsLoggedIn(value === 'true');
        });
    
        // Save the login state when the app goes into the background
        AppState.addEventListener('change', state => {
          if (state === 'background') {
            SecureStore.setItemAsync('isLoggedIn', isLoggedIn ? 'true' : 'false');
            SecureStore.setItemAsync('username', username);
            SecureStore.setItemAsync('password', password);
          }
        });
    
        // Check the saved login state when the app comes back into the foreground
        AppState.addEventListener('change', state => {
          if (state === 'active') {
            SecureStore.getItemAsync('isLoggedIn').then(value => {
              setIsLoggedIn(value === 'true');
            });
          }
        });
      }, []);
    
    async function registerForPushNotificationsAsync() {
      let token;
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync({ projectId: 'a72504e9-e86d-4d23-9807-47e31ba51dcb'})).data;

      }
      // else {
      //     alert('Must use physical device for Push Notifications');
      // }
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      return token;
    }
      
    useEffect(()=>{ 
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
      })

    const postApiResponse = async () => {
        try {  
            const pushTokenData = {username:username, deviceMake:Device.brand, deviceModel:Device.modelName, token:expoPushToken}
            const postApiCall = await axios.post(`${ipAddress}/login_verification`,{username:username, password:password})
            const apiResponseEncode =  await JSON.stringify(postApiCall.data)
            await SecureStore.setItemAsync('userProfile', apiResponseEncode)
            const pushTokenApiCall = await axios.post(`${ipAddress}/save_push_token`,pushTokenData)
            const activeUser = postApiCall.data['active'] === 'true'
            const activeToken = pushTokenApiCall.data === 'successful'
            const userProfileInfo = await SecureStore.getItemAsync('userProfile');
            if (activeUser || activeToken) {
                setIsSignedIn(true)
                setActiveUser(true)
                setUsername(null)
                setPassword(null)
                navigation.navigate('Homepage')
            }else{
                Alert.alert('❌', 'Username and/or password is invalid. Please try again.')
                }
        }
        catch (err) {
            console.log(err)
            Alert.alert('❌', 'Username and/or password is invalid. Please try again.')
          }   
    }

    const PasswordReset = async() => {
        const url = `${ipAddress}/accounts/password_reset`;
        const supported = await Linking.canOpenURL(url);
      
        if (supported) {
          await Linking.openURL(url);
        } else {
          console.log(`Cannot open URL: ${url}`);
        }
        }
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.form}>
            <Text style={styles.header}>Welcome</Text>
          <TextInput
              style={styles.loginField}
              value={username}
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(text) => {
                  setUsername(text) 
              }}
              placeholder="username"
              placeholderTextColor="grey"
              clearButtonMode="always"
              returnKeyType="next"
              autoCompleteType="username"
          />
          <View style={{ position: "relative" }}>
          <TextInput
              style={styles.loginField}
              value={password}
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(text) => {
                  setPassword(text) 
              }}
              placeholder="password"
              secureTextEntry={!showPassword}
              returnKeyType="next"
              placeholderTextColor="grey"
              autoCompleteType="password"
          />
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#777"
              style={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.loginButton, {marginRight: 7}]} onPress={()=>navigation.navigate('Create')} title="Create">
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.loginButton, {marginRight: 7, marginLeft: 7}]} onPress={postApiResponse} title="Login">
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.loginButton, {marginLeft: 7}]} onPress={PasswordReset} title="Reset">
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
      </View>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    form: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    header: {
      fontSize: 48,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 40,
      textTransform: 'uppercase',
      letterSpacing: 5,
      textAlign: 'center',
      textShadowColor: '#999',
      textShadowOffset: { width: 3, height: 3 },
      textShadowRadius: 10,
    },
    loginField: {
      height: 90,
      backgroundColor: '#F0F0F0',
      borderRadius: 10,
      fontSize: 16,
      color: '#1F1F1F',
      paddingHorizontal: 20,
      marginBottom: 50,
    },
    buttons: {
      flexDirection: 'row',
      marginBottom: 80,
      
    },
    loginButton: {
      backgroundColor: '#1ABC9C',
      borderRadius: 10,
      paddingVertical: 20,
      paddingHorizontal: 40,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,
    },  
    icon: {
      position: "absolute",
      right: 40,
      top: 30,
    }
})