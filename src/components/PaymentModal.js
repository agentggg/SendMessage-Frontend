import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView, ScrollView, TextInput } from 'react-native';
import axios from 'axios'
import getIpAddress from '../../config';

const PaymentModal = ({ modalVisible, setModalVisible }) => {
  const ipAddress = getIpAddress();
  const { stripe } = useStripe();
  const [email, setEmail] = useState('gersard@yahoo.com');
  const [phoneNumber, setPhoneNumber] = useState('6786820502');
  const [name, setName] = useState('Stevenson Gerard Eustache');
  const [addressLine1, setAddressLine1] = useState('1979 Roxey Lane');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('Winder');
  const [state, setState] = useState('GA');
  const [postalCode, setPostalCode] = useState('30680');
  const [country, setCountry] = useState('USA');
  const [isPaying, setIsPaying] = useState(false);
  const [card, setCard] = useState()
// 374245455400126 0526 123
const handlePayment = async () => {
  const { paymentMethod, error } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardRef.current,
      billing_details: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '555-555-5555',
        address: {
          line1: '123 Main St',
          line2: 'Apt 1',
          city: 'Anytown',
          state: 'CA',
          postal_code: '12345',
          country: 'US'
        }
      }
    }
  });

  if (error) {
    console.log('Error processing payment:', error);
  } else {
    console.log('Payment processed successfully:', paymentMethod);

    // Send the paymentMethod to your backend
    const response = await fetch('/api/payments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payment_method_id: paymentMethod.id,
        amount: 1000, // Replace with your desired amount
        currency: 'USD', // Replace with your desired currency
        // Include any additional data you want to send to your backend
      })
    });

    const data = await response.json();
    console.log('Response from backend:', data);
  }
};



  return (
      <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Text style={styles.modalTitle}>Payment Information</Text>
            <View style={styles.cardFieldContainer}>
              <CardField
                postalCodeEnabled={false}
                placeholder={{
                  number: '4242 4242 4242 4242',
                  cvc: 'CVC',
                  expiry: 'MM/YY',
                }}
                cardStyle={{
                  backgroundColor: '#FFFFFF',
                  textColor: '#000000',
                }}
                style={styles.cardField}
                onCardChange={(cardDetails) => {
                  setCard(cardDetails)
                }}
              />
            </View>
            <View style={styles.billingContainer}>
              <Text style={styles.billingTitle}>Billing Details</Text>
              <TextInput
                value={email}
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
              />
              <TextInput
                value={phoneNumber}
                style={styles.input}
                placeholder="Phone Number"
                onChangeText={setPhoneNumber}
              />
              <TextInput
                value={name}
                style={styles.input}
                placeholder="Full Name"
                onChangeText={setName}
              />
              <TextInput
                value={addressLine1}
                style={styles.input}
                placeholder="Address Line 1"
                onChangeText={setAddressLine1}
              />
              <TextInput
                value={addressLine2}
                style={styles.input}
                placeholder="Address Line 2"
                onChangeText={setAddressLine2}
              />
              <TextInput
                value={city}
                style={styles.input}
                placeholder="City"
                onChangeText={setCity}
              />
              <TextInput
                value={state}
                style={styles.input}
                placeholder="State"
                onChangeText={setState}
              />
              <TextInput
                value={postalCode}
                style={styles.input}
                placeholder="Postal Code"
                onChangeText={setPostalCode}
              />
              <TextInput
                value={country}
                style={styles.input}
                placeholder="Country"
                onChangeText={setCountry}
              />
            </View>
            <TouchableOpacity 
                style={styles.payButton} 
                onPress={handlePayment} 
                disabled={isPaying}
              >
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
  )
            }
  export default PaymentModal;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 20,
      textAlign: 'center',
    },
    cardFieldContainer: {
      height: 50,
      marginHorizontal: 20,
      marginBottom: 20,
      backgroundColor: 'white',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    cardField: {
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
    },
    billingContainer: {
      marginHorizontal: 20,
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    billingTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      backgroundColor: '#f9f9f9',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    payButton: {
      backgroundColor: '#4285F4',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 20,
      marginHorizontal: 40,
    },
    payButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    });
    
