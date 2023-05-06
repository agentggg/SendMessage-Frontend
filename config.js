import Constants from 'expo-constants';

const ipAddress = {
  // physicalDevice: 'http://10.0.0.211:8000',
  physicalDevice: 'https://agentofgod.pythonanywhere.com',
  simulator: 'http://10.0.0.211:8000'
};

const getIpAddress = () => {
  if (Constants.isDevice) {
    return ipAddress.physicalDevice;
  } else {
    return ipAddress.simulator;
  }
};

export default getIpAddress;
