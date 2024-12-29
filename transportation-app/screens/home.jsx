
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    let currentErrors = {};
  
    if (!username.trim()) {
      currentErrors.username = 'Username is required.';
    }
    if (!password.trim()) {
      currentErrors.password = 'Password is required.';
    }
  
    setErrors(currentErrors);
  
    if (Object.keys(currentErrors).length === 0) {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const user = JSON.parse(storedUser);
  
        // Validate login with name (username) and password
        if (user && user.name === username && user.password === password) {
          alert('Login successful!');
          navigation.navigate('card', { username });
        } else {
          alert('Invalid username or password!');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>"Your Journey, Your Safety, Our Driver"</Text>
      <Text style={styles.title}>EasyGO</Text>
      <View style={styles.logoContainer}>
        <LottieView
          source={require('../assets/animation/Animation.json')}
          autoPlay
          style={{ width: 150, height: 150 }}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#555555"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setErrors({ ...errors, username: '' });
        }}
      />
      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#555555"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrors({ ...errors, password: '' });
        }}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('signup')}>
        <Text>
          <Text style={[styles.signupText, { color: '#555555' }]}>Don't have an account?{' '}</Text>
          <Text style={[styles.signupText, { color: 'blue' }]}>Register</Text>
        </Text>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  input: {
    borderWidth: 1,
    borderColor: '#3399FF',
    marginBottom: 5,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    fontSize: 16,
    height: 50,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#3399FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: 'blue',
    marginTop: 10,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: 10,
  },
});

export default Login;
