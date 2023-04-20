import React, { useState, useEffect, useContext, useRef } from 'react';
import { useQuery } from 'react-query';
import { Text, View, Pressable, TextInput, SafeAreaView, ActivityIndicator, ScrollView, Alert } from 'react-native';
import axios  from 'axios';
import CheckBox from 'expo-checkbox';
import { useForm, Controller } from 'react-hook-form';
import { Avatar } from 'react-native-elements';
import { SelectMessageOptionContext } from '../context/SelectMessageOption'
import { ProfileInfo } from '../context/ProfileInfo'



const COLORS = ['black', '#6366F1'];

const Send = ({navigation}) => {
  const [profileInfo] = useContext(ProfileInfo)
  const [contactColors, setContactColors] = useState({});
  const [height, setHeight] = useState(5)
  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const [textView, setTextView] = useState(false)
  const [message, setMessage] = useState('');
  const [showRecipient, setShowRecipient] = useState([]);
  const [selectContact, setSelectContact] = useState('');
  const [selectContactView, setSelectContactView] = useState(true);
  const [selectOption] = useContext(SelectMessageOptionContext)
  const [imageRemoval, setImageRemoval] = useState(null)
  const [viewRecipient, setViewRecipient] = useState(false)
  const [image, setImage] = useState(null);
const [imageUrl, setImageUrl] = useState(null);
  const scrollViewRef = useRef();


  const cloudName = 'dxhcnn7k3'
  const {org, token, username} = profileInfo;
  
  const assignRandomColor = (contactId) => {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setContactColors((prevColors) => ({ ...prevColors, [contactId]: randomColor }));
    // random color for contact icon used in the view recipient
  };
  const onSubmit = (data) => {
    setSelectContact(data)
    // assigns the id number for the contact to the state that will be passed
    // to the sendText to the function that will post the text to the backend
    setSelectContactView(false)
    setTextView(data.value)
    // shows the text screen view
  }
  const sendText = async(data) => {
    data.value = selectContact
    // view sent to backend to determine who to send text to
    Alert.alert(
      'Did you proofread yet?',
      message,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            const apiData = {
              "username":username, 
              "message":message,
              "org":org,
              "contactSelection":selectContact,
              "file":image,              
            }
            if (selectOption === "contact_api"){
              await axios.post(`https://agentofgod.pythonanywhere.com/contact_email_api`,apiData,{headers: {Authorization: `token ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json'}}, {enabled:Boolean(username)}) 
              setMessage('')
              setSelectContact('')
              setImage('')
              navigation.goBack()  
            }
            else if (selectOption === "category_api"){
              await axios.post(`https://agentofgod.pythonanywhere.com/category_email_api`,apiData,{headers: {Authorization: `token ${token}`}}, {enabled:Boolean(username)})
              setMessage('')
              setSelectContact('')
              setImage('')
              navigation.goBack()
            }
            else if (selectOption === "outreach_api"){
              await axios.post(`https://agentofgod.pythonanywhere.com/minister_email_api`,apiData,{headers: {Authorization: `token ${token}`}}, {enabled:Boolean(username)})
              setMessage('')
              setSelectContact('')
              setImage('')
              navigation.goBack()
            }
            else if (selectOption === "all_outreach"){
              await axios.post(`https://agentofgod.pythonanywhere.com/outreach_contact_email_api_data`,apiData,{headers: {Authorization: `token ${token}`}}, {enabled:Boolean(username)})
              setMessage('')
              setSelectContact('')
              setImage('')
              navigation.goBack()
            }
          },
        },
      ],
      { cancelable: true }
    );
  }
  useEffect(() => {
    const uploadImage = async () => {
      if (!image) {
        return;
      }
      const formData = new FormData();
      formData.append('file', {
        uri: image,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      formData.append('upload_preset', 'your_upload_preset');
  
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
  
        setImageUrl(response.data.secure_url);
          console.log('Upload successful!');
      } catch (error) {
          console.error(error);
          console.log('Upload failed!');
      }
    };
  
    uploadImage();
  }, [image]);
  
  const api_fetch = async () => {
    const apiData = await axios.post(`https://agentofgod.pythonanywhere.com/${selectOption}?format=json`,{"org":org, "username":username, "userView":"outreachContacts"},{headers : {"Authorization" : `token ${token}`}}, {enabled:Boolean(username)});
    return (apiData.data)
  };
  const recipientApiRequest = async() => {
    const apiRecipientApiRequestData = await axios.post(`https://agentofgod.pythonanywhere.com/view_recipient`,{
      "org":org, 
      "username":username, 
      "groupType": selectOption, 
      "contactType":selectContact.contact
    },{headers : {"Authorization" : `token ${token}`}})
    await setShowRecipient(apiRecipientApiRequestData.data)
    setViewRecipient(true)
  }
  const removeUpload = () => {
    if (image){
      setImageRemoval("File is unattached")
      setImage(null)
    }
    else{
      setImageRemoval("No file to unattach")
    }

  }
  const { isLoading, error, data } = useQuery('apiData', api_fetch)
  if (isLoading) {
    return (
      <View style={styles.alertContainer}>
          <ActivityIndicator size="large" color="red"/>
          <Text style={styles.alert}>Fetching the contacts</Text>
      </View>
  )
  }
  if (error) {
    console.log(error)
    return (
      <View style={styles.alertContainer}>
          <Text style={styles.alert}>Error fetching the contacts 🥴. Try again later</Text>
      </View>
    )
  }

  
  return (
      <SafeAreaView style={styles.container}>
        {}
        <ScrollView>
        {selectContactView ? 
          <>
            <Text style={styles.title}>Select Contact</Text>
            <View style={styles.checkboxWrapper}>
              <Controller
                control={control}
                name="contact"
                defaultValue={[]}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    {data.map((eachItem, index) => {
                    return (
                      <View key={index} style={styles.checkboxContainer}>
                        <View style={styles.checkboxInnerContainer}>
                          <CheckBox
                            key={index}
                            value={value.includes(eachItem)}
                            onValueChange={(isChecked) => onChange(isChecked ? [...value, eachItem] : value.filter((index) => index !== eachItem))}
                            style={{ marginBottom: 10 }}
                            color="#6366F1"
                            uncheckedColor="#E5E7EB"
                            ios_backgroundColor="#E5E7EB"
                            android_backgroundColor="#E5E7EB"
                            textStyle={styles.checkboxLabel}
                            checkedColor="#6366F1"
                            checkedIcon="check-circle"
                            uncheckedIcon="circle"
                          />
                          <Text style={styles.checkboxName}>{eachItem}</Text>
                        </View>
                      </View>
                    )}
                    )}
                  </View>
                )}
              />
            </View>
            <View style={styles.container}>
              <Pressable onPress={handleSubmit(onSubmit)} style={styles.nextButtonContainer}>
                <Text style={styles.buttonText}>Next</Text>
              </Pressable>
            </View>
          </> 
        : 
          <>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Text to Send</Text>
              <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                <TextInput
                  style={[styles.messageData, { height: 150 }]}
                  value={message}
                  autoCorrect={false}
                  onChangeText={setMessage}
                  onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
                  placeholder="Enter text"
                  clearButtonMode="always"
                  returnKeyType="done"
                  multiline={true}
                  textAlignVertical="top"
                />
    </ScrollView>
              <Pressable onPress={sendText} style={styles.sendNextButtonContainer}>
                <Text style={styles.sendMessageButtonText}>Send message</Text>
              </Pressable>
              {selectOption == 'category_api' || selectOption == 'outreach_api' ? 
              <Pressable onPress={recipientApiRequest} style={styles.sendNextButtonContainer}>
                <Text style={styles.sendMessageButtonText}>View recipient</Text>
              </Pressable>
              : <></>
            }
              {/* <Pressable style={styles.sendUpload} onPress={uploadImage}>
                <Text style={styles.sendMessageButtonText}>Upload</Text>
              </Pressable>
              <Pressable onPress={removeUpload} style={styles.sendUpload}>
                <Text style={styles.sendMessageButtonText}>Remove upload</Text>
              </Pressable> */}
              <Text>{imageRemoval}</Text>
            </View>
            <ScrollView style={styles.container}>
        {showRecipient.map((eachContact, index) => {
          const contactColor = contactColors[eachContact.index] || assignRandomColor(eachContact.index);
          return (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center',}}>
              <Avatar
                rounded
                title={eachContact.charAt(0)}
                titleStyle={{ color: 'white' }}
                containerStyle={{ backgroundColor: contactColor, marginRight: 10 }}
                size={50}
              />
              <Text style={{ marginLeft: 5 }}>{eachContact}</Text>
            </View>
          );
        })}
      </ScrollView>
          </>
        }
        </ScrollView>
      </SafeAreaView>
  );
};

const styles = {
  container:{
    flex: 1,
    marginTop: 15,
  },
  title: {
    fontSize: 24, fontWeight: 'bold',
    marginTop: 15, marginBottom: 15,
    textAlign: 'center'
  },
  checkboxWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    marginBottom: 10,
  },
  checkboxInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  checkboxName: {
    fontSize: 16,
    marginLeft: 10,
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
  nextButtonContainer: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  messageData: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    height: '30%',
    padding: 20, paddingTop: 20,
    fontSize: 18,
    borderWidth: 2, 
    borderColor: 'gray',
    borderRadius: 20
  },
  sendMessageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sendNextButtonContainer: {
    backgroundColor: '#6C63FF',
    borderRadius: 18,
    padding: 10,
    marginTop: 20,
  },
  sendUpload: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
  },
  listItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
};
      
export default Send;