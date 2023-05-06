import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Logout = ({ onPress }) => {

    const handleLogout = async () => {
        // Delete everything in secure store
        try {
            await SecureStore.deleteItemAsync('token');
                console.log('All data deleted successfully!');
        } catch (error) {
                console.log('Error deleting data:', error);
        }
        onPress()
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={24} color="red" />
        <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
    textAlign: 'center',
  },
});

export default Logout;
