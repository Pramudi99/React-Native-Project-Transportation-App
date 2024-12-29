import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Optionally, auto-navigate to the login screen after a delay
    const timer = setTimeout(() => {
      navigation.navigate('login');
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigation]);

  return (
    <View style={styles.animationContainer}>
      <Text style={styles.subtitle}>"Your Journey, Your Safety, Our Driver"</Text>
      <Text style={styles.title}>EasyGO</Text>
      <LottieView
        source={require('../assets/animation/Animation.json')}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />
      <View style={{ marginTop: 40 }} />
      <Pressable
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('login')}
      >
        <Text style={styles.getStartedButtonText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  getStartedButton: {
    marginTop: 20,
    backgroundColor: '#3399FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 10,
    color: '#000000',
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555555',
    marginBottom: 20,
    fontWeight: '500',
  },
});

export default SplashScreen;
