import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TouchableOpacity, View, StyleSheet, Text, Modal, SafeAreaView, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { useSecureStoreData } from './useSecureStoreData';
import { useQuery } from 'react-query';
import { ProfileInfo } from '../context/ProfileInfo'


const Admin = () => {
  const [profileInfo] = useContext(ProfileInfo)
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState(false);
  const [editedContact, setEditedContact] = useState('');
  const token = profileInfo.token
  const username = profileInfo.username
  const org = profileInfo.org


  /**
 * Gets Data from API
 * @author  Stevenson
 * @param    {object} // destructured object and getting the params from useQuery 
 * @description 			// makes call to API and sends body params via queryKey [1]
 * @return   {Object} 	return raw and full API call				
 * @route                /all_contact             
*/
  const userProfileInfoGet = async ({ queryKey: { 1: key} }) => {
    const allContacts = await axios.post(`https://agentofgod.pythonanywhere.com/all_contact`,{"org": key.org,"username": key.username});
    return(allContacts)
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
  
  const {data:contact, isLoading, error} = useQuery(["allContacts", profileInfo], userProfileInfoGet,  {enabled:Boolean(username)})
  if (isLoading) {
    return (
      <View style={styles.alertContainer}>
          <ActivityIndicator size="large" color="red"/>
          <Text style={styles.alert}>Fetching all the contacts 📝</Text>
      </View>
  )
  }

  if (error) {
    return (
      <View style={styles.alertContainer}>
          <Text style={styles.alert}>Error fetching the contacts 🥴. Try again later</Text>
      </View>
    )
  }


  const handleContactPress = (contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  const handleEditContactPress = () => {
    setEditingContact(true);
    setEditedContact(selectedContact);
  };

  const updateContact = async (contact) => {
    const updatedContacts = [...contacts];
    try {
      await axios.post(`https://agentofgod.pythonanywhere.com/update_api`,contact,{headers : {Authorization : `token ${token}`}})  
    } catch (error) {
      console.error("Error updating contact:", error);
  }
    const index = await updatedContacts.findIndex((c) => c.id === contact.id);
    updatedContacts[index] = contact;
    setContacts(updatedContacts);
  };

  const deleteContact = async(id) => {
    try {
      await axios.post(`https://agentofgod.pythonanywhere.com/admin_delete_user`,{"org":org, "user":id},{headers : {"Authorization" : `token ${token}`}})  
    } catch (error) {
      console.error("Error updating contact:", error);
  }
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    setModalVisible(false);
  };



  return (
    <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.safeContainer}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Contact Management</Text>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={styles.heading}>First Name</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.heading}>Last Name</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.heading}>Category</Text>
                </View>
              </View>
              {contact?.data?.map((contact, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.row}
                  onPress={() => handleContactPress(contact)}
                >
                  <View style={styles.cell}>
                    <Text style={styles.cellText}>{contact.first_name_info}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.cellText}>{contact.last_name_info}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.cellText}>{contact.category_name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalBox}>
                    <TouchableOpacity
                      style={styles.modalCloseButton}
                      onPress={() => {setModalVisible(false), setEditingContact(false)}}
                    >
                      <Text style={styles.modalCloseButtonText}>Close</Text>
                    </TouchableOpacity>
                    <View style={styles.modalContent}>
                      {editingContact ? (
                        <>
                        <View style={styles.viewModalRow}>
                        <Text style={styles.viewModalLabel}>First Name:</Text>
                        <TextInput
                          style={styles.viewModalInput}
                          value={editedContact.first_name_info}
                          onChangeText={(text) =>
                            setEditedContact({ ...editedContact, first_name_info: text })
                          }
                        />
                        </View>
                        <View style={styles.viewModalRow}>
                        <Text style={styles.viewModalLabel}>Last Name:</Text>
                        <TextInput
                          style={styles.viewModalInput}
                          value={editedContact.last_name_info}
                          onChangeText={(text) =>
                            setEditedContact({ ...editedContact, last_name_info: text })
                          }
                        />
                        </View>
                        <View style={styles.viewModalRow}>
                        <Text style={styles.viewModalLabel}>Category:</Text>
                        <TextInput
                          style={styles.viewModalInput}
                          value={editedContact.category_name}
                          onChangeText={(text) =>
                            setEditedContact({ ...editedContact, category_name: text })
                          }
                        />
                        </View>
                        <View style={styles.viewModalRow}>
                        <Text style={styles.viewModalLabel}>notes:</Text>
                        <TextInput
                          style={styles.viewModalInput}
                          value={editedContact.contact_notes_info}
                          onChangeText={(text) =>
                            setEditedContact({ ...editedContact, contact_notes_info: text })
                          }
                        />
                        </View>
                        <View style={styles.viewModalRow}>
                        <Text style={styles.viewModalLabel}>Phone:</Text>
                        <TextInput
                          style={styles.viewModalInput}
                          value={editedContact.phone_number_info}
                          onChangeText={(text) =>
                            setEditedContact({ ...editedContact, phone_number_info: text })
                          }
                        />
                        </View>
                        <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                          updateContact(editedContact);
                          setEditingContact(false);
                          setModalVisible(false);
                        }}
                        >
                        <Text style={styles.modalButtonText}>Save</Text>
                        </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          <Text style={styles.modalHeading}>
                            {selectedContact?.first_name_info} {selectedContact?.last_name_info}
                          </Text>
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Category:</Text>
                            <Text style={styles.modalValue}>{selectedContact?.category_name}</Text>
                          </View>
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>notes:</Text>
                            <Text numberOfLines={1}  style={styles.modalValue}>{selectedContact?.contact_notes_info}</Text>
                          </View>
                          <View style={styles.modalRow}>
                            <Text style={styles.modalLabel}>Phone:</Text>
                            <Text style={styles.modalValue}>{selectedContact?.phone_number_info}</Text>
                          </View>
                          <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                              style={styles.modalButtonEdit}
                              onPress={() => handleEditContactPress()}
                            >
                              <Text style={styles.modalButtonText}>Edit Contact</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.modalButtonDelete}
                              onPress={() => deleteContact(selectedContact?.id)}
                            >
                              <Text style={styles.modalButtonText}>Delete Contact</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
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
    height: '70%',
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
    fontSize: 24,
    fontWeight: 900,
    color: "#333333",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  modalValue: {
    fontSize: 24,
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
  modalButtonEdit: {
    backgroundColor: "#f9a602",
    padding: 15,
    borderRadius: 20,
  },
  modalButtonDelete: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 20,
  },
  modalButtonSave: {
    backgroundColor: "#4caf50",
  },
  modalLabel: {
    fontSize: 20,
    fontWeight: 900,
    color: "#666",
    marginBottom: 5,
    marginRight: 10,
    paddingTop: 20,
    textTransform: 'uppercase',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    color: "#333",
    flex: 1,
  },
  modalButton: {
    backgroundColor: "#2196f3",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
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




    
export default Admin