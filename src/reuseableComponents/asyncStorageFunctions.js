import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorageData = async (key, value=[], overwrite = false) => {
    try {
        if(overwrite === false){
            let exisitingStoredObject = await AsyncStorage.getItem(key);
            exisitingStoredObject = exisitingStoredObject?JSON.parse(exisitingStoredObject): []
            const mergedArray = [...value, ...exisitingStoredObject];
            await AsyncStorage.setItem(key, JSON.stringify(mergedArray))
       
        }else{
            await AsyncStorage.setItem(key, JSON.stringify([...value]))
          
        }
        return {nextPage: true}
      } catch (e) {
        console.log(e)
        return {nextPage:false}
      }

}



export  const getStorageData =  async(key) => {
  
    try {
      


    const result = await AsyncStorage.getItem(key)
     
    return result? result : null

return get()

    
      
    } catch (error) {
      console.log(error);
    }
  };

  export  const removeData = async () => {
       try {
         const savedUser = await AsyncStorage.clear();
       } catch (error) {
         console.log(error);
       }
     };
    