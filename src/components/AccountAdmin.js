import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';
import axios from 'axios';
import getIpAddress from '../../config';
import { ProfileInfo } from '../context/ProfileInfo';

function AccountAdmin() {
  const [profileInfo, setProfileInfo] = useContext(ProfileInfo);
  const ipAddress = getIpAddress();
  const fetchTwilioTextInfo = async () => {
    const response = await axios.post(`${ipAddress}/twilio_text_info`, { user_org: profileInfo.org }, { enabled: Boolean(profileInfo) });
    return response.data;
  };
  const { data, status: textStatus } = useQuery('twilioTextInfo', fetchTwilioTextInfo);

  const fetchTwilioAccountBalance = async () => {
    const response = await axios.post(`${ipAddress}/get_account_balance`, { user_org: profileInfo.org }, { enabled: Boolean(profileInfo) });
    return response.data;
  };
  const { data: accountBalance, status: accountStatus } = useQuery('twilioAccountBalance', fetchTwilioAccountBalance);

  if (textStatus === 'loading' || accountStatus === 'loading') {
    return (
      <View style={styles.alertContainer}>
          <ActivityIndicator size="large" color="red"/>
          <Text style={styles.alert}>Fetching the account info</Text>
      </View>
  )
  }

  if (textStatus === 'error' || accountStatus === 'error') {
    return (
      <View style={styles.alertContainer}>
          <Text style={styles.alert}>Error fetching the account info 🥴. Try again later</Text>
      </View>
    )
    }

  const renderTextItem = ({ item }) => (
    <View key={item.sid} style={styles.message}>
      <Text style={styles.from}>From: {item.from}</Text>
      <Text style={styles.to}>To: {item.to}</Text>
      <Text style={styles.body}>{item.body}</Text>
      <Text style={styles.dateSent}>Date Sent: {item.date_sent}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.balanceBox}>
                <Text style={styles.balance}>Balance: ${accountBalance.balance}</Text>
            </View>
        </View>
        <Text style={styles.title}>Confirmations</Text>
        <FlatList data={data} renderItem={renderTextItem} keyExtractor={(item) => item.sid} contentContainerStyle={styles.messagesContainer}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F7F7',
      paddingHorizontal: 20,
      paddingVertical: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    messagesContainer: {
      paddingBottom: 20,
    },
    message: {
      padding: 20,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    from: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
      color: '#007AFF',
    },
    to: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
      color: '#007AFF',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 10,
      color: '#4F4F4F',
    },
    dateSent: {
      fontStyle: 'italic',
      fontSize: 12,
      color: '#888',
      marginTop: 10,
    },
    status: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#007AFF',
      marginTop: 10,
      textTransform: 'capitalize',
    },
    loading: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#007AFF',
    },
    error: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FF3B30',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
      },
    balanceBox: {
        backgroundColor: '#000',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#f00',
        padding: 10,
    },
    balance: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
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
  

export default AccountAdmin
