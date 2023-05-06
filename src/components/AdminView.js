import { View, StyleSheet, Text, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';



const AdminView = ({navigation}) => {
    const adminView = async(category) => {
        if (category === "contact"){
            navigation.navigate('Contact Admin')
        }
        else if (category === "account"){
            navigation.navigate('Account Admin')
        }
        else if (category === "outreach"){
            navigation.navigate('Outreach Contacts')
        }
      }
    
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <View>
                <TouchableOpacity style={styles.contact} onPress={() => adminView('contact')}>
                    <Text style={styles.contactManagement}>Contact Management</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.account} onPress={() => adminView("account")}>
                    <Text style={styles.accountManagement}>Account Management</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.outreach} onPress={() => adminView('outreach')}>
                    <Text style={styles.outreachContacts}>Outreach Contacts</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
    }

const screenWidth = Dimensions.get('window').width

export default AdminView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
      },
      contact: {
        backgroundColor: 'black',
        padding: screenWidth * 0.1,
        borderRadius: 5,
        marginBottom: 70,
      },
      contactManagement: {
        color: 'white',
        textAlign: 'center',
        fontSize: screenWidth * 0.06,
      },
      account: {
        backgroundColor: 'white',
        padding: screenWidth * 0.089,
        borderWidth: 5,
        borderColor: 'black',
        marginBottom: 70,
      },
      accountManagement: {
        color: 'black',
        textAlign: 'center',
        fontSize: screenWidth * 0.07,
      },
      outreach: {
        backgroundColor: 'black',
        padding: screenWidth * 0.089,
        borderWidth: 5,
        borderColor: 'black',
      },
      outreachContacts: {
        color: 'white',
        textAlign: 'center',
        fontSize: screenWidth * 0.07,
      },

  });