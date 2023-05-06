import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert
} from 'react-native';
import axios from "axios"
import * as Linking from 'expo-linking';
import * as MailComposer from 'expo-mail-composer';
import TermsAndConditionsModal from './TermsAndConditionsModal';
import getIpAddress from '../../config';

const CreateAccount = ({ navigation }) => {
  const ipAddress = getIpAddress();
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('')
  const [orgAddress, setOrgAddress] = useState('')
  const [orgRedirect, setOrgRedirect] = useState('')
  const [instagram, setInstagram] = useState('')
  const [facebook, setFacebook] = useState('')
  const [tikTok, setTikTok] = useState('')
  const [youTube, setYouTube] = useState('')
  const [inputs, setInputs] = useState(['First time guest', 'Guest', 'Board', 'Members', 'Remote Members']); // initialize with one empty input field
  const emailSubject = 'Account Creation Error';
  const emailBody = 'Tech Support, \n\nI tried creating an account for the All Nations App with the following info: \n' + '\nUsername: ' + username + '\nEmail: ' + email + '\nPhone: ' + phoneNumber + '\n\n However I am running into issues. Please take a look at the errors.'
  
  const handleAddInput = () => {
    setInputs([...inputs, '']); // add another empty input field to the array
  };

  const handleInputChange = (text, index) => {
    const newInputs = [...inputs];
    newInputs[index] = text;
    setInputs(newInputs);
  };

  const postApiResponse = async () => {
    const data = {
      "firstName":firstName,
      "lastName":lastName,
      "email":email,
      "phoneNumber":phoneNumber,
      "username":username,
      "password":password,
      "orgName":orgName,
      "orgAddress":orgAddress,
      "orgRedirect":orgRedirect,
      "instagram":instagram,
      "facebook":facebook,
      "tikTok":tikTok,
      "youTube":youTube,
      "inputs":inputs
    }
    data.inputs = data.inputs;
    try {
      const api_resp = await axios.post(`${ipAddress}/create_account`, data);
      // used to post data to the backend using external component
      if (api_resp.data === "account created") {
        // if account is created without error, then the following code is processed. 
        // the data will come from backend, and React Native will catch it in the frontend
        Alert.alert(
          "Account is created",
          "Keep an eye out on your spam/junk email for account creation approval. Contact admin if you do not receive account activation confirmation email within 48 hours.",
          [
            {
              text: "Next step",
              onPress: () => {
                Alert.alert(
                  "Onboarding",
                  "Please select 'next step' if this is the first time that your organization is signing up.",
                  [
                    {
                      text: "Next step",
                      onPress: () => {
                        Linking.openURL('https://www.youtube.com/watch?v=6fa3BDtSRKs&list=PLn_L2l-aq7k3hwtXDP9UKUOr90pvfUCEc')
                      }
                    },
                    {
                      text: "Not first time",
                      onPress: () => {
                        navigation.navigate('Login')
                      }
                    }
                  ]
                );
              }
            }
          ]
        );
      } else {
        Alert.alert(
          "Oops...",
          "Account was not created.",
          [
            {
              text: "Try again!",
            },
            {
              text: "Click here if issue persist more then 3 times",
              onPress: () => {
                MailComposer.composeAsync({
                  recipients: ['tech.and.faith.contact@gmail.com'],
                  subject: emailSubject,
                  body: emailBody,
                })
                  .then(result => {
                    // handle the result
                    console.log(result);
                  })
                  .catch(error => {
                    // handle the error
                    console.log(error);
                    alert('Failed to send email. Please try again later.');
                  });
              }
            }
          ]
        );
        setFirstName(''), setLastName(''), setEmail(''), setPhoneNumber(''), setUserName(''), setPassword(''), setOrgName(''), setOrgAddress(''), setOrgRedirect(''), setInstagram(''), setFacebook(''), setTikTok(''), setYouTube('')
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Oops...",
        "Something went wrong.",
        [
          {
            text: "OK",
            onPress: () => {
              MailComposer.composeAsync({
                recipients: ['tech.and.faith.contact@gmail.com'],
                subject: emailSubject,
                body: emailBody,
              })
                .then(result => {
                  setFirstName(''), setLastName(''), setEmail(''), setPhoneNumber(''), setUserName(''), setPassword(''), setOrgName(''), setOrgAddress(''), setOrgRedirect(''), setInstagram(''), setFacebook(''), setTikTok(''), setYouTube('')
                  console.log(result);
                })
                .catch(error => {
                  // handle the error
                  console.log(error);
                  alert('Failed to send email. Please try again later.');
                });
            }
            
          }
        ]
      );
    }
  }


  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.form}>
              <View  style={styles.textInputContainer}>
                <Text style={styles.textInputHeaders}>User info:</Text>
                <TextInput
                  style={styles.fieldData}
                  value={firstName}
                  autoCorrect={false}
                  onChangeText={setFirstName}
                  placeholder="First name"
                  clearButtonMode="always"
                  returnKeyType="next"
                  placeholderTextColor="grey"
                  autoCompleteType='name'
                  textContentType="givenName"
                />
                <TextInput
                  style={styles.fieldData}
                  value={lastName}
                  autoCorrect={false}
                  onChangeText={setLastName}
                  placeholder="Last name"
                  clearButtonMode="always"
                  returnKeyType="next"
                  placeholderTextColor="grey"
                  autoCompleteType="name"
                  textContentType="familyName"
                />
                <TextInput
                  style={styles.fieldData}
                  value={phoneNumber}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={setPhoneNumber}
                  placeholder="Phone number"
                  clearButtonMode="always"
                  returnKeyType="next"
                  placeholderTextColor="grey"
                  autoCompleteType="tel"
                  textContentType="telephoneNumber"
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.fieldData}
                  value={email}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={setEmail}
                  placeholder="Email"
                  clearButtonMode="always"
                  returnKeyType="next"
                  placeholderTextColor="grey"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                />
              </View>
              <View  style={styles.textInputContainer}>
                <Text style={styles.textInputHeaders}>Login Info:</Text>
                <TextInput
                    style={styles.fieldData}
                    value={username}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={setUserName}
                    placeholder="Username"
                    clearButtonMode="always"
                    autoCompleteType="username"
                    textContentType="none"
                    returnKeyType="next"
                    placeholderTextColor="grey"
                  />
                <TextInput
                  style={styles.fieldData}
                  value={password}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry={true}
                  autoCompleteType="password"
                  textContentType="newPassword"
                  clearButtonMode="always"
                  placeholderTextColor="grey"
                  returnKeyType="next"
                  pattern={[
                    '^.{8,}$', // min 8 chars
                    '(?=.*\\d)', // number required
                    '(?=.*[A-Z])', // uppercase letter
                  ]}
                  onValidation={isValid => this.setState({ isValid })}
                />
              </View>
              <View  style={styles.textInputContainer}>
                <Text style={styles.textInputHeaders}>Organization Information:</Text>
                <TextInput
                  style={styles.fieldData}
                  value={orgName}
                  autoCorrect={false}
                  onChangeText={setOrgName}
                  placeholder="Organization name"
                  clearButtonMode="always"
                  returnKeyType="next"
                  placeholderTextColor="grey"
                />
                <TextInput
                  style={styles.fieldData}
                  value={orgRedirect}
                  autoCorrect={false}
                  onChangeText={setOrgRedirect}
                  placeholder="Organization website"
                  clearButtonMode="always"
                  returnKeyType="next"
                  placeholderTextColor="grey"
                />
                <TextInput
                  style={styles.fieldData}
                  value={orgAddress}
                  autoCorrect={false}
                  onChangeText={setOrgAddress}
                  placeholder="Organization address"
                  clearButtonMode="always"
                  returnKeyType="next"
                  secureTextEntry={false}
                  placeholderTextColor="grey"
                />
                <View  style={styles.socialMediaLinks}>
                  <Text style={styles.subText}>Organization Social Media Links (leave blank if none)</Text>
                  <TextInput
                    style={styles.fieldData}
                    value={instagram}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={setInstagram}
                    placeholder="Instagram link"
                    clearButtonMode="always"
                    returnKeyType="next"
                    placeholderTextColor="grey"
                  />
                  <TextInput
                    style={styles.fieldData}
                    value={facebook}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={setFacebook}
                    placeholder="Facebook Link"
                    clearButtonMode="always"
                    returnKeyType="next"
                    placeholderTextColor="grey"
                  />
                  <TextInput
                    style={styles.fieldData}
                    value={tikTok}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={setTikTok}
                    placeholder="TikTok link"
                    clearButtonMode="always"
                    returnKeyType="next"
                    placeholderTextColor="grey"
                  />
                  <TextInput
                    style={styles.fieldData}
                    value={youTube}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={setYouTube}
                    placeholder="YouTube link"
                    clearButtonMode="always"
                    returnKeyType="next"
                    placeholderTextColor="grey"
                  />
                </View>
                <View  style={styles.textInputContainer}>
                <Text style={styles.textInputHeaders}>Category Buckets:</Text>
                <Text style={styles.subText}>Category names that you will group/categorize your contacts. Common bucket provided below</Text>
                    {inputs.map((value, index) => (
                      <TextInput
                        key={index}
                        value={value}
                        onChangeText={(text) => handleInputChange(text, index)}
                        placeholder="Category Bucket"
                        clearButtonMode="always"
                        placeholderTextColor="grey"
                        returnKeyType="next"
                        style={styles.categoryBucket}
                      />
                    ))}
                    <Button title="Add Field" onPress={handleAddInput} />
              </View>
              </View>
              {/* <View  style={styles.textInputContainer}>
                <Text style={styles.textInputHeaders}>Payment Info:</Text>
                <Text style={styles.priceBreakDownHeader}>‼️PLEASE READ‼️</Text>
                <Text style={styles.priceBreakDown}>$50 app yearly cost $8 for every 100 text that is sent - that is less than 0.0079 per text. The amount listed on next question already includes the $50 app yearly cost. Anything more than $50 will be towards funding your text account. The text cost is a "pay for what you use" system. ‼️You only pay for whatever text that you send‼️</Text>
              </View> */}
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={postApiResponse} title="Register">
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')} title="Login">
                  <Text style={styles.buttonText}>Back to login</Text>
                </TouchableOpacity>
              </View>
            </View>    
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
    )
  }
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  form: {
    paddingHorizontal: 20,
  },
  fieldData: {
  backgroundColor: 'white',
  height: 50,
  fontSize: 18,
  borderRadius: 25,
  paddingHorizontal: 20,
  marginBottom: 20,
  },
  buttons: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 20,
  },
  button: {
  backgroundColor: '#28B463',
  height: 50,
  width: '45%',
  borderRadius: 25,
  alignItems: 'center',
  justifyContent: 'center',
  },
  buttonText: {
  color: 'white',
  fontSize: 18,
  },
form: {
  padding: 20,
  backgroundColor: '#fff',
  borderRadius: 10,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 6,
  elevation: 3,
},
textInputContainer: {
  marginBottom: 20,
  paddingHorizontal: 10,
  paddingVertical: 20,
  backgroundColor: '#f9f9f9',
  borderRadius: 10,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 6,
  elevation: 3,
},
textInputHeaders: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#333',
},
fieldData: {
  fontSize: 16,
  paddingVertical: 10,
  paddingHorizontal: 10,
  backgroundColor: '#fff',
  borderRadius: 5,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#ccc',
},
socialMediaLinks: {
  marginBottom: 10,
  paddingHorizontal: 10,
  paddingVertical: 10,
  backgroundColor: '#f9f9f9',
  borderRadius: 10,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 6,
  elevation: 3,
},
subText: {
  fontSize: 16,
  // fontWeight: 'bold',
  marginBottom: 10,
  color: '#333',
},
categoryBucket: {
  fontSize: 16,
  paddingVertical: 10,
  paddingHorizontal: 10,
  backgroundColor: '#fff',
  borderRadius: 5,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#ccc',
},
buttons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
button: {
  backgroundColor: '#007aff',
  borderRadius: 5,
  paddingHorizontal: 20,
  paddingVertical: 10,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 6,
  elevation: 3,
},
buttonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},
priceBreakDownHeader: {
  fontSize: 14,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#333',
},
priceBreakDown: {
  fontSize: 12,
  marginBottom: 10,
  color: '#333',
},
});

export default CreateAccount