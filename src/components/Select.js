import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SelectMessageOptionContext } from '../context/SelectMessageOption';
import { Ionicons } from '@expo/vector-icons';
import Logout from '../reuseableComponents/Logout';

function Select({navigation}) {
  const [selectOption, setSelectOption] = useContext(SelectMessageOptionContext);

  const SendCategory = async (buttonSelection) => {
    setSelectOption(buttonSelection)
    navigation.navigate('Text')
  };
  const goBack= () => {
    navigation.navigate('Authenticatie');
  }
  return (
    <View style={styles.container}>
      <Logout onPress={goBack} />
      <TouchableOpacity onPress={() => SendCategory('category_api')} style={[styles.button, styles.categoryButton]}>
        <Text style={[styles.buttonText, styles.categoryButtonText]}>Send by Category</Text>
        <Ionicons name="ios-arrow-forward" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => SendCategory('contact_api')} style={[styles.button, styles.contactButton]}>
        <Text style={[styles.buttonText, styles.contactButtonText]}>Send by Name</Text>
        <Ionicons name="ios-arrow-forward" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => SendCategory('outreach_api')} style={[styles.button, styles.ambassadorButton]}>
        <Text style={[styles.buttonText, styles.ambassadorButtonText]}>Send by Ambassador</Text>
        <Ionicons name="ios-arrow-forward" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => SendCategory('all_outreach')} style={[styles.button, styles.outreachButton]}>
        <Text style={[styles.buttonText, styles.outreachButtonText]}>Send by Outreach Contact</Text>
        <Ionicons name="ios-arrow-forward" size={24} color="#34090C" />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#34090C',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    marginRight: 16,
  },
  categoryButton: {
    backgroundColor: 'white',
  },
  categoryButtonText: {
    color: 'black',
  },
  contactButton: {
    backgroundColor: 'black',
  },
  contactButtonText: {
    color: 'white',
  },
  ambassadorButton: {
    backgroundColor: 'white',
  },
  ambassadorButtonText: {
    color: 'black',
  },
  outreachButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#34090C',
  },
  outreachButtonText: {
    color: '#34090C',
  },
});

export default Select;
