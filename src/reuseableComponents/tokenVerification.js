import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import {Alert} from 'react-native'

export const tokenVerification = async({navigation}) =>{
        
        try {
          let result = await SecureStore.getItemAsync('userProfile1');
          const secureKeyDecoded = await JSON.parse(result)
          const token = await secureKeyDecoded['token']
          const username = await secureKeyDecoded['username']
        //   const postApiCall = await axios.post(`http://192.168.1.99:8000/token_validation`,{username:username,token:token})
        //   if (token === postApiCall.data[0]){
        //       return('successful')
        //   }
      } catch (err){
          Alert.alert('Access denied', 'please re-login');
          navigation.navigate('Login')
      }
      }

