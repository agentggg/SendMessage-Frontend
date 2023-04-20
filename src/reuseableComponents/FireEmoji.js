import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Fire = () => {
const fireEmoji = require("../assets/fire.png");

  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -10,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          delay: 200,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
        <Animated.Text style={[styles.text, { opacity, transform: [{ translateY }] }]}>{fireEmoji}</Animated.Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 100,
  },
});

export default Fire;
