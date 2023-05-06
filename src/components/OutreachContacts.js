import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TouchableOpacity, View, StyleSheet, Text, Modal, SafeAreaView, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';
import { ProfileInfo } from '../context/ProfileInfo'
import Logout from '../reuseableComponents/Logout';
import getIpAddress from '../../config';


const OutreachContacts = ({navigation}) => {
  const ipAddress = getIpAddress();
  const [profileInfo] = useContext(ProfileInfo)
  const [Outreachs, setOutreachs] = useState([]);
  const [selectedOutreach, setSelectedOutreach] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const token = profileInfo.token
  const username = profileInfo.username
  const org = profileInfo.org

  const goBack= () => {
    navigation.navigate('Authenticatie');
  }
  /**
 * Gets Data from API
 * @author  Stevenson
 * @param    {object} // destructured object and getting the params from useQuery 
 * @description 			// makes call to API and sends body params via queryKey [1]
 * @return   {Object} 	return raw and full API call				
 * @route                /all_Outreach             
*/
  const userProfileInfoGet = async ({ queryKey: { 1: key} }) => {
    const allOutreachs = await axios.post(`${ipAddress}/all_outreach`,{"org": key.org,"username": key.username});
    return(allOutreachs)
  }


  //enabled -> enabled trys to look for a boolean value - falsey value (null, undefind, 0, false)
  //if the value of the key enabled if falsey it DOES NOT RUN. it waits until the value is true
  //when the value is true. we pass that value as a 2nd value in they queryKey which can then be found via queryFn above
  // Boolean(userProfileInfo.org) - if userProfileInfo.org does not exsist it becomes undefind. 
  // it converts to a BOOLEAN which then comes to be false. 
  //when it has a .org value, it becomes true and runs the query. 
  //anything else?
  // i think this is good. Thank you. Let me try and implement to other 
  //yes yes ! but yea console.log the data coming in and when mapping to dispplay use they key that the data comes in as,


  // ex / data in [{name: 'hasan'}] - data.map((each)=> <h4> {each.name} </h4> dont change it to first_name because you Will get bugs 
  // looks good awesome ! if you need any help give me shout ! thank you
  
  const {data:Outreach, isLoading, error} = useQuery(["allOutreachs", profileInfo], userProfileInfoGet,  {enabled:Boolean(username)})
  if (isLoading) {
    return (
      <View style={styles.alertContainer}>
          <ActivityIndicator size="large" color="red"/>
          <Text style={styles.alert}>Fetching all the Outreachs 📝</Text>
      </View>
  )
  }

  if (error) {
    return (
      <View style={styles.alertContainer}>
          <Text style={styles.alert}>Error fetching the Outreachs 🥴. Try again later</Text>
      </View>
    )
  }


  const handleOutreachPress = (Outreach) => {
    setSelectedOutreach(Outreach);
    setModalVisible(true);
  };


  const deleteOutreach = async(id) => {
    try {
      await axios.post(`${ipAddress}/admin_delete_user`,{"org":org, "user":id, setView:'outreach'},{headers : {"Authorization" : `token ${token}`}})  
    } catch (error) {
      console.error("Error updating Outreach:", error);
  }
    const updatedOutreachs = Outreachs.filter((Outreach) => Outreach.id !== id);
    setOutreachs(updatedOutreachs);
    setModalVisible(false);
  };



  return (
    <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
        <Logout onPress={goBack} />
          <ScrollView style={styles.scrollView}>
            <View style={styles.safeContainer}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Outreach Management</Text>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={styles.heading}>First Name</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.heading}>Last Name</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.heading}>Location</Text>
                </View>
              </View>
              {Outreach?.data?.map((Outreach, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.row}
                  onPress={() => handleOutreachPress(Outreach)}
                >
                  <View style={styles.cell}>
                    <Text style={styles.cellText}>{Outreach.outreach_first_name}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.cellText}>{Outreach.outreach_last_name}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.cellText}>{Outreach.outreach_spot}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalBox}>
                    <TouchableOpacity
                      style={styles.modalCloseButton}
                      onPress={() => {setModalVisible(false)}}
                    >
                      <Text style={styles.modalCloseButtonText}>Close</Text>
                    </TouchableOpacity>
                    <View style={styles.modalContent}>
                          <Text style={styles.modalHeading}>
                            {selectedOutreach?.outreach_first_name} {selectedOutreach?.outreach_last_name}
                          </Text>
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Minister:</Text>
                            <Text style={styles.modalValue}>{selectedOutreach?.minister_category}</Text>
                          </View>
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>notes:</Text>
                            <Text numberOfLines={1}  style={styles.modalValue}>{selectedOutreach?.contact_notes}</Text>
                          </View>
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Phone:</Text>
                            <Text style={styles.modalValue}>{selectedOutreach?.outreach_phone_number}</Text>
                          </View>
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Location:</Text>
                            <Text style={styles.modalValue}>{selectedOutreach?.outreach_spot}</Text>
                          </View>
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Date:</Text>
                            <Text style={styles.modalValue}>{selectedOutreach?.outreach_date} at {selectedOutreach?.outreach_time}  </Text>
                          </View>
                          <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                              style={styles.modalButtonDelete}
                              onPress={() => deleteOutreach(selectedOutreach?.id)}
                            >
                              <Text style={styles.modalButtonText}>Delete Contact</Text>
                            </TouchableOpacity>
                          </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </ScrollView>
        </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e10',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row'
  },
  box: {
    height: 200,
    width: '50%',
    marginHorizontal: '2.5%',
    backgroundColor: '#1d1d1f',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollView: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
    padding: 5
  },
  header: {
    paddingVertical: 10, paddingHorizontal: 20,
    borderRadius: 10, marginBottom: 20, borderBottomWidth: 4, borderBottomColor: 'red'
  },
  headerText: {
    fontSize: 24, fontWeight: 'bold',
    color: 'white',
  },
  table: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1, 
    borderBottomColor: 'white'
  },
  cellHeading: {
    backgroundColor: 'black',
    paddingVertical: 5,
  },
  heading: {
    fontWeight: 900,
    fontSize: 19,
    color: 'white',
    textAlign: 'center',
  },
  cellText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',    
  },
  cell: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    maxHeight: 500,
    height: '100%',
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingVertical: 20,
    // paddingHorizontal: 30,
    width: "100%",
    maxWidth: 500,
    elevation: 5,
  },
  modalCloseButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalCloseButtonText: {
    color: "#333333",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContent: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  modalRow: {
    alignItems: "center",
    marginVertical: 10,
    width: "80%",
  },
  modalHeading: {
    fontSize: 22,
    fontWeight: 700,
    color: "#333333",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  modalValue: {
    fontWeight: 400,
    fontSize: 20,
    color: "#333333",
    textAlign: 'center',
    // ellipsizeMode:'tail',
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  }, 
  modalButtonDelete: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 20,
  },
  modalLabel: {
    fontSize: 18,
    fontWeight: 900,
    color: "#666",
    marginBottom: 5,
    marginRight: 10,
    paddingTop: 20,
    textTransform: 'uppercase',
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
    marginTop: 20,
  },
  modalButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
viewModalRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginVertical: 10,
  width: "100%",
},
viewModalLabel: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#333333",
  letterSpacing: 0.5,
  width: "30%",
},
viewModalInput: {
  borderWidth: 1,
  borderColor: "#cccccc",
  borderRadius: 5,
  padding: 10,
  width: "70%",
  fontSize: 18,
  color: "#333333",
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




    
export default OutreachContacts