import { StyleSheet, View } from 'react-native'
import { ThemedButton } from 'react-native-really-awesome-button';
import React from 'react'
import * as Linking from 'expo-linking';

const DonationButton = () => {
  const donationPage = () => {
    Linking.openURL('https://givebutter.com/tech-faith');
  }

  return (
    <View style={styles.donateButtonHeader}>
        <ThemedButton 
          name="cartman" 
          type="anchor" 
          onPress={donationPage} 
          textColor='white'
          borderRadius='30%'
          style={styles.donateButton}>Partnership</ThemedButton>
    </View>
  )
}

export default DonationButton

const styles = StyleSheet.create({
  donateButtonHeader:{
    alignItems:'center', justifyContent: 'center'
  }
})