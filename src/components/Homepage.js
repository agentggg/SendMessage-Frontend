import {SafeAreaView, StyleSheet, Pressable, Text, Alert, View, ScrollView} from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import ResponsiveImage from 'react-native-responsive-image';
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { ProfileInfo } from '../context/ProfileInfo'
import Logout from '../reuseableComponents/Logout';


const Homepage = ({navigation}) => {
  const [profileInfo, setProfileInfo] = useContext(ProfileInfo)
  const [isLoading, setLoading] = useState(true);
  const [defaultVerse, setDefaultVerse] = useState("'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.'")
  const homePageImage = require('../../assets/homePageImage.png')
  const text = require('../../assets/send_text.jpg')
  const register = require('../../assets/register.jpg')
  const outreach_Logo = require('../../assets/2535_black.jpg')
  const firetracker = require('../../assets/firetracker.png')
  const admin = require('../../assets/admin.png')
  console.log(profileInfo)
  const randomVerseSelection = async()=>{
    try{
        const apiFetch = await axios.get('https://labs.bible.org/api/?passage=random&formatting=plain')
        // API call to get random verse
        const apiData = apiFetch.data
        // retrieving data from API call
        setDefaultVerse(apiData)
        // Destructor array. State update
    }catch(err)
      {
        Alert(err)
      }
  } 
  useEffect(() => {
    const fetchData = async () => {
      const userProfileInfo = await SecureStore.getItemAsync('userProfile');
      const userProfileJson = JSON.parse(userProfileInfo);
      setProfileInfo(userProfileJson);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  const goBack= () => {
    navigation.navigate('Authenticatie');
  }
  return (    
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Logout onPress={goBack} />
          <Text style={styles.greeter}>Welcome {profileInfo.name} from {profileInfo.org}</Text>
          <ResponsiveImage style={styles.homePageImage} source={homePageImage} initWidth="400" initHeight="385"/>
          <Text style={styles.randomVerseSelection}>{defaultVerse}</Text>
          <Pressable onPress={() => randomVerseSelection()}><Text style={styles.randomVerseButton}>Show a new verse</Text></Pressable>
          <View>
            <View style={styles.cardGroup}>
              <ResponsiveImage source={register} initWidth="360" initHeight="238" style={styles.registerImage}/>
            </View>
            <Pressable onPress={() => navigation.navigate('Register')}><Text style={styles.registerPressable}>Register</Text></Pressable>
            
            <View style={styles.cardGroup}>
              <ResponsiveImage source={text} initWidth="365" initHeight="238" style={styles.textImage}/>
            </View>
            <Pressable onPress={() => navigation.navigate('Send')}><Text style={styles.textPressable}>Compose Message</Text></Pressable>
            
            <View style={styles.cardGroup}>
              <ResponsiveImage source={outreach_Logo} initWidth="365" initHeight="238" style={styles.outreachImage}/>
            </View>
            <Pressable onPress={() => navigation.navigate("OutreachUpdate")}><Text style={styles.outreachPressable}>Outreach Update</Text></Pressable>
            <View style={styles.cardGroup}>
              <ResponsiveImage source={firetracker} initWidth="365" initHeight="238" style={styles.fireTrackerImage}/>
            </View>
            <Pressable onPress={() => navigation.navigate("FireTracker")}><Text style={styles.fireTrackerPressable}>Fire Tracker</Text></Pressable>
            <View style={styles.cardGroup}>
              <ResponsiveImage source={admin} initWidth="365" initHeight="238" style={styles.adminImage}/>
            </View>
            <Pressable onPress={() => navigation.navigate("Admin")}><Text style={styles.adminPressable}>Admin</Text></Pressable> 
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Homepage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  greeter: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  homePageImage: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
  },
  randomVerseSelection: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  randomVerseButton: {
    backgroundColor: '#FFD700',
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 30,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardGroup: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  registerImage: {
    width: '100%',
    height: 238,
  },
  registerPressable: {
    backgroundColor: '#333',
    color: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  textImage: {
    width: '100%',
    height: 238,
  },
  textPressable: {
    backgroundColor: '#333',
    color: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  outreachImage: {
    width: '100%',
    height: 238,
  },
  outreachPressable: {
    backgroundColor: '#333',
    color: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  fireTrackerImage: {
    width: '100%',
    height: 238,
  },
  fireTrackerPressable: {
    backgroundColor: '#333',
    color: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  adminImage: {
    width: '100%',
    height: 238,
  },
  adminPressable: {
    backgroundColor: '#333',
    color: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
})