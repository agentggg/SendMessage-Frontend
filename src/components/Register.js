import { StyleSheet, Text, View, Keyboard, Pressable, TouchableWithoutFeedback, TextInput, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useContext } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios'
import { useQuery } from "react-query"
import { ProfileInfo } from '../context/ProfileInfo'

const OutreachUpdate = () => {
    const [profileInfo] = useContext(ProfileInfo)
    const [notes, setNotes] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [location, setLocation] = useState('')
    const [category, setCategory] = useState('Guest')
    const org = profileInfo.org
    const token = profileInfo.token
    const username = profileInfo.username
    const updateContact = async(e) => {
      const data = {
        firstName:firstName, lastName:lastName, phoneNumber:phoneNumber,
        location:location, notes:notes, category:category, saveOption: e,
        org:org, username:username
      }
      // data that will be sent to the API endpoint
      await axios.post(`https://agentofgod.pythonanywhere.com/register_api`,data,{ Authorization: `token ${process.env.REACT_APP_API_TOKEN}`});
      Alert.alert('Contact Registered Successfully')
      // sets the value of the form input fields to "empty". If not, the prevent default will hinder the page from re-rendering, and all the data will remain on screen.
      setNotes(''),setFirstName(''), setLastName(''), setPhoneNumber(''), setLocation('')
    }
    const getCategory = async () => {
        const getApiData = await axios.post(`https://agentofgod.pythonanywhere.com/category_api`,{
            "org":org, 
            "username":username, 
            "pageName":"register"
        },{headers : {"Authorization" : `token ${token}`}})
        return(getApiData.data)
        // retrieves all the categroy data from the backend
      };
      const {data:dataLoaded, isLoading: catgeoryApiLoading, error: categoryApiError} = useQuery("getApiData", getCategory, {enabled:Boolean(username)});
      // uses the useQuery pacakge data to pass data to the frontend
      if (catgeoryApiLoading === undefined) {
        return (
          <View style={styles.alertContainer}>
              <ActivityIndicator size="large" color="red"/>
              <Text style={styles.alert}>Fetching all the data</Text>
          </View>
      )
      }
    
      if (categoryApiError) {
        return (
          <View style={styles.alertContainer}>
              <Text style={styles.alert}>Error fetching the data 🥴. Try again later</Text>
          </View>
        )
      }
      if (dataLoaded === undefined) { // show "None" until dataLoaded is defined
        return (
          <View style={styles.alertContainer}>
            <Text style={styles.alert}>Fetching all the data</Text>
          </View>
        )
      }
return (
    <SafeAreaView>
        <KeyboardAwareScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Text style={styles.greeter}> {org} Contact Update</Text>
                    <TextInput
                        style={styles.fieldData}
                        value={firstName}
                        autoCorrect={false}
                        onChangeText={(text) => {
                            setFirstName(text) 
                        }}
                        placeholder="First name"
                        clearButtonMode="always"
                        returnKeyType="next"
                    />
                    <TextInput
                        style={styles.fieldData}
                        value={lastName}
                        autoCorrect={false}
                        onChangeText={(text) => {
                            setLastName(text) 
                        }}
                        placeholder="Last name"
                        clearButtonMode="always"
                        returnKeyType="next"
                    />
                    <TextInput
                        style={styles.fieldData}
                        value={phoneNumber}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(text) => {
                            setPhoneNumber(text) 
                        }}
                        placeholder="1112223333"
                        clearButtonMode="always"
                        returnKeyType="next"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.fieldData}
                        value={location}
                        autoCorrect={false}
                        onChangeText={(text) => {
                            setLocation(text) 
                        }}
                        placeholder="Location"
                        clearButtonMode="always"
                        returnKeyType="next"
                    />
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={styles.fieldDataNotes}
                        value={notes}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(text) => {
                            setNotes(text) 
                        }}
                        placeholder="Note about contact"
                        clearButtonMode="always"
                        returnKeyType="next"
                    />
                    <Text style={styles.category}>Select {firstName} Category</Text>
                    <Picker selectedValue={category} onValueChange={(itemValue, itemIndex) => {
                        setCategory(itemValue);
                        }} style={styles.picker}>
                        {dataLoaded.map(category => (
                            <Picker.Item key={category} label={category} value={category} />
                        ))}
                    </Picker>
                    <View style={styles.buttons}>
                        <Pressable onPress={() => updateContact('contactUpdate')} style={styles.OutreachUpdatePressable}><Text style={styles.OutreachUpdateText}>Update</Text></Pressable>
                        <Pressable onPress={() => updateContact('guestUpdate')} style={styles.firstTimePressable}><Text style={styles.firstTimeOutreachUpdate}>Update and Guest</Text></Pressable>
                    </View>                   
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    </SafeAreaView>
    )
}

export default OutreachUpdate

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
    },
    greeter: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333333',
    },
    fieldData: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        marginBottom: 20,
        fontSize: 18,
        color: '#333333',
    },
    fieldDataNotes: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        marginBottom: 20,
        fontSize: 18,
        color: '#333333',
        textAlignVertical: 'top',
    },
    category: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    OutreachUpdatePressable: {
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginRight: 10,
    },
    OutreachUpdateText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    firstTimePressable: {
        backgroundColor: '#1E88E5',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginLeft: 10,
    },
    firstTimeOutreachUpdate: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    picker: {
        width: '100%',
        height: 50,
        paddingHorizontal: 20,
        marginBottom: '35%',
        fontSize: 18,
        color: '#333333',
      },
      alertContainer: {
        flexDirection: 'column', flex: 1,
        justifyContent: 'center', alignContent: 'center', 
        padding: '3%'
    },
    alert:{
        fontSize: 40,
        alignSelf: 'center', justifyContent: 'center', textAlign: 'center',
        marginTop: '40%'
    }, 
      
    });