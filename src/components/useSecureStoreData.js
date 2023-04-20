import React, { useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { ProfileInfo } from '../context/ProfileInfo'

export function useSecureStoreData() {
  const [data, setData] = useState({});
  const [profileInfo, setProfileInfo] = useContext(ProfileInfo)


  useEffect(() => {
    const fetchData = async () => {
      const userProfileInfo = await SecureStore.getItemAsync('userProfile')
      const userProfileJson = JSON.parse(userProfileInfo)
      setData(userProfileJson);
    };

    fetchData();
  }, []);
  setProfileInfo(data)
  return data;
}
