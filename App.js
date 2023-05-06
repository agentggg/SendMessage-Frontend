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
import { AppState, Alert } from 'react-native';
// import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
  async function checkForUpdates() {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      Alert.alert(
        "New Update Available",
        "The app needs to be rebooted.",
        [
          {
            text: "No",
            onPress: () => console.log("No Pressed"),
            style: "cancel"
          },
          { 
            text: "Reboot App",
            onPress: async() => {
              await Updates.fetchUpdateAsync();
              await Updates.reloadAsync();
            }
          }
        ]
      )
    }
  }

  useEffect(() => {
    async function initializeApp() {
      await Constants.getWebViewUserAgentAsync();
      if (__DEV__) {
        console.log('Running in local development environment');
      } else if (Updates.isAvailableAsync()) {
        checkForUpdates();
      }
    }

    initializeApp();
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        checkForUpdates();
      }
    });

    return () => {
      AppState.removeEventListener('change');
    };
  }, []);

  const queryClient = new QueryClient()

  return (
    // <StripeProvider 
    //   publishableKey="pk_live_51MExhkFyqw9tERmV5VuW4BSwsstS5sLxeT4YVrBgU8Lj1HY9mZj2c8fppYs415d41vJpfAS2nQP3Yiv4KCMILRTf00pSgHkLyd"
    //   merchantIdentifier="merchant.com.revealed"
    //   urlScheme="www.raw-ministry.com" 
    // >
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
    // </StripeProvider>

  );
}
