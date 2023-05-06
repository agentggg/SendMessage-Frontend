import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';
import { useQuery } from 'react-query';
import { ProfileInfo } from '../context/ProfileInfo'
import Logout from '../reuseableComponents/Logout';
import getIpAddress from '../../config';

export default function App({navigation}) {
  const ipAddress = getIpAddress();
  const [profileInfo] = useContext(ProfileInfo)
  const [markers, setMarkers] = useState([]);
  const [region, setRegion] = useState('');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const fireEmoji = require("../../assets/fire.png")
  const org = profileInfo.org
  const token = profileInfo.token
  const username = profileInfo.username

  
  const goBack= () => {
    navigation.navigate('Authenticatie');
  }
  const { isLoading, error, data: users } = useQuery('getUsers', async () => {
    const response = await axios.post(`${ipAddress}/analyticals`,{"org":org, "username":username}, {headers: {Authorization: `token ${token}`}});
    return response.data;
  }, {
    enabled: Boolean(username)
  });
  
  
      
  useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 2.5,
          longitudeDelta: 2.5
        });
      })();
    }, []);
  
  
  useEffect(() => {
    if (users) {
      const markers = users.map((user, index) => ({
        id: index,
        name: user[2],
        coordinate: {
          latitude: parseFloat(user[0]) + 0.001 * index,
          longitude: parseFloat(user[1]) + 0.001 * index,
        },
        notes:user[6],
        location:user[3],
        cat:user[4],
        ambassador:user[5],
      }));
      setMarkers(markers);
      
    }
  }, [users]);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  if (!region || isLoading) {
    return (
      <View style={styles.alertContainer}>
          <ActivityIndicator size="large" color="red"/>
          <Text style={styles.alert}>Fetching all the fires 🔥</Text>
      </View>
  )
  }

  if (error) {
    return (
      <View style={styles.alertContainer}>
          <Text style={styles.alert}>Error fetching the fires 🥴. Try again later</Text>
      </View>
    )
  }
  
  

  return (
    <SafeAreaView style={styles.container}>
       <Logout onPress={goBack} />
    <View>
      <Text style={styles.textHeader}>Light it up🔥🔥🔥</Text> 
      {region && (
        <MapView
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
        >
          {markers.map(marker => (
            <Marker key={marker.id} coordinate={marker.coordinate} title={marker.name}onPress={() => handleMarkerPress(marker)}>
              <Image source={fireEmoji} style={{ height: 30, width: 30 }} />
              <Callout 
                tooltip={true}
                style={styles.tooltipContainer}
                >
              <View>
                <View style={styles.row}>
                  <Text style={styles.tooltipTitle}>Name: </Text>
                  <Text style={styles.tooltipText}>{marker.name}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.tooltipTitle}>Notes: </Text>
                  <Text style={styles.tooltipText}>{marker.notes}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.tooltipTitle}>Location: </Text> 
                  <Text style={styles.tooltipText}>{marker.location}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.tooltipTitle}>Ambassador: </Text> 
                  <Text style={styles.tooltipText}>{marker.ambassador}</Text>
                </View>
              </View>
            </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    justifyContent: 'space-around',
    marginTop: 100
  },
  map: {
    height: '89%',
    borderWidth: 3, borderColor: 'black', borderRadius:20,
    marginLeft:2, marginRight: 2,
  },
  textHeader:{
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 10
  },
  alertContainer: {
    flexDirection: 'column', flex: 1,
    justifyContent: 'center', alignContent: 'center', 
    padding: 3
},
alert:{
    fontSize: 40,
    alignSelf: 'center', justifyContent: 'center', textAlign: 'center',
    marginTop: 40
}, 
row:{
  flexDirection: 'row'
},
tooltipContainer: {
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 10,
  borderColor: 'black',
  borderWidth: 1,
  maxWidth: 700,
  width:300,
  height: 140,
  justifyContent: 'space-around',
},
tooltipText: {
  fontSize: 16,
  marginBottom: 5,
},
tooltipTitle: {
  fontWeight: 'bold',
},
})