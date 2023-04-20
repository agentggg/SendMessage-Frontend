import * as Clipboard from 'expo-clipboard';
import { Alert } from "react-native";

const copyToClipboard = async(data) => {
    Alert.alert(
        "Got it ✅",
        "Text copied",
    )
    return await Clipboard.setStringAsync(data);
  };

export default copyToClipboard