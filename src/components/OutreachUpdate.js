import { StyleSheet, Text, View, Keyboard, Pressable, TouchableWithoutFeedback, TextInput, SafeAreaView, Alert } from 'react-native'
import React, {useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Picker} from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { ProfileInfo } from '../context/ProfileInfo'
import Logout from '../reuseableComponents/Logout';
import getIpAddress from '../../config';

const OutreachUpdate = ({navigation}) => {
    const ipAddress = getIpAddress();
    const [profileInfo] = useContext(ProfileInfo)
    const [notes, setNotes] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [meetUpSpot, setMeetUpSpot] = useState('')
    const [category, setCategory] = useState('Prayer')
    const [errorMsg, setErrorMsg] = useState('');
    const {org, token, username, email, name} = profileInfo;

    const goBack= () => {
        navigation.navigate('Authenticatie');
      }

    useEffect(() => {
        return navigation.addListener('focus', async() => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLatitude(location.coords.latitude)
            setLongitude(location.coords.longitude)
            let text = 'Waiting..';
            if (errorMsg) {
                text = errorMsg;
            } 
            else if (location) {
                text = JSON.stringify(location);
            }
        });
      }, [navigation]);

    const updateContact = async(e) => {
    const userTime =  new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })
    const data = {
        firstName:firstName, lastName:lastName, phoneNumber:phoneNumber,
        latitude:latitude, longitude:longitude ,notes:notes, category:category, saveOption: e,
        org:org, username:name, time:userTime, email:email, location:meetUpSpot
    }
    // data that will be sent to the API endpoint
    axios.post(`${ipAddress}/outreach_registration_api`,data,{ Authorization: `token ${token}`});
    Alert.alert('Contact Registered Successfully')
    // sets the value of the form input fields to "empty". If not, the prevent default will hinder the page from re-rendering, and all the data will remain on screen.
    setNotes(''),setFirstName(''), setLastName(''), setPhoneNumber(''), setLatitude(), setLongitude(), setMeetUpSpot('')
    }
        
    return (
        <SafeAreaView>
            <KeyboardAwareScrollView>
            <Logout onPress={goBack} />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>
                        <Text style={styles.greeter}> {org} Outreach Update</Text>
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
                            value={meetUpSpot}
                            autoCorrect={false}
                            onChangeText={(text) => {
                                setMeetUpSpot(text) 
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
                        <Text style={styles.category}>Select Outreach Category</Text>
                        <Picker selectedValue={category} onValueChange={(itemValue, itemIndex) => {
                                setCategory(itemValue);
                            }}
                            style={styles.picker}
                            >
                            
                            <Picker.Item label="Prayer" value="Prayer"/>
                            <Picker.Item label="Healing" value="Healing"/>
                            <Picker.Item label="Prophetic Experience" value="Prophetic"/>
                            <Picker.Item label="New Convert" value="Convert"/>
                            <Picker.Item label="All" value="All"/>
                        </Picker>
                        <View style={styles.buttons}>
                            <Pressable onPress={() => updateContact('contactUpdate')} style={styles.OutreachUpdatePressable}><Text style={styles.OutreachUpdateText}>Update</Text></Pressable>
                            {/* <Pressable onPress={() => updateContact('guestUpdate')} style={styles.firstTimePressable}><Text style={styles.firstTimeOutreachUpdate}>Update and Guest</Text></Pressable> */}
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
            marginBottom: 10,
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
        }
    })