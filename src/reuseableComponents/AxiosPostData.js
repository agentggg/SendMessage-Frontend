import axios from "axios";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query"

const AxiosPostData = async (subdomain, body, headers, dataLoaded, dataIsLoading, dataLoadingError) => {
    const postApiCall = await axios.axios.post('http://192.168.0.194:8000/' + subdomain, body, {headers: headers || {}})
    return(postApiCall.data)
    // returns an array of arrays
}

const ApiCall = async() => { 
  const {data:dataLoaded, isLoading: dataIsLoading, error: dataLoadingError} = useQuery("postApiCall", AxiosPostData)

  if (forumPostLoading)  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="red"/>
      <Text style={styles.alert}>Unlocking the revelations</Text>
    </View>
  );
  if (forumPostError )return (
    <View style={styles.container}>
      <Text style={styles.alert}>Error unlocking the revelations. Try again later 😃</Text>
    </View>
  )
}

export default AxiosPostData

const styles = StyleSheet.create({
  container: {
    alignContent: 'center', justifyContent: 'center',
    flex: 1 
  },

  alert: {
    fontSize: '100%',
    width: '100%',
    marginLeft: '15%', 

  }
})