import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigation from "./src/navigations/MainTabNavigation"
import {QueryClient, QueryClientProvider} from 'react-query'
import { SelectMessageOptionProvider } from "./src/context/SelectMessageOption";
import { ProfileInfoProvider } from "./src/context/ProfileInfo";
import { LoginStatusProvider } from "./src/context/LoginStatus";
import { SavedStatusProvider } from "./src/context/SavedStatus";
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import React, {useEffect } from 'react'
import { Device } from 'expo';

export default function App() {
  useEffect(() => {
    async function checkForUpdates() {
      // Check for updates
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          // Download the update
          await Updates.fetchUpdateAsync();
  
          // Wait for the update to be downloaded
          // (you can show a loading indicator here)
          await Updates.reloadAsync();
        }
      } catch (e) {
        console.error('Failed to check for updates', e);
      }
    }
  
    checkForUpdates();
  }, []);
  async function initializeApp() {
    await Constants.getWebViewUserAgentAsync();
    if (__DEV__) {
      console.log('Running in local development environment');
    } else {
      if (Device.isDevice) {
        async function checkForUpdate() {
          const update = await Updates.checkForUpdateAsync();
          console.log(update)
          if (update.isAvailable) {
            await Updates.fetchUpdatenAsync();
            await Updates.reloadAsync();
          }
        }
        checkForUpdate();
      }
    }
  }
  
  useEffect(() => {
    initializeApp();
  }, []);


  const queryClient = new QueryClient()

  return (
    <SavedStatusProvider>
    <LoginStatusProvider>
    <ProfileInfoProvider>
    <SelectMessageOptionProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <MainTabNavigation/>
        </NavigationContainer>
      </QueryClientProvider>
    </SelectMessageOptionProvider>
    </ProfileInfoProvider>
    </LoginStatusProvider>
    </SavedStatusProvider>

  );
}
