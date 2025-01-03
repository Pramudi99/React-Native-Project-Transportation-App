
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen'; 
import home from '../screens/home';
import CardScreen from '../screens/CardScreen';
import SignUpScreen from '../screens/Register';
import Login from '../screens/home'; 
import { DriverProvider } from '../context/DriverContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <DriverProvider>
      <Stack.Navigator initialRouteName="Splash">
        {/* Splash Screen */}
        <Stack.Screen
          component={SplashScreen}
          name="Splash"
          options={{ headerShown: false }}
        />
        {/* Home Screen */}
        <Stack.Screen
          component={home}
          name="Home"
          options={{ headerShown: false }}
        />
        {/* CardScreen for displaying driver profile */}
        <Stack.Screen
          component={CardScreen}
          name="card"
          options={{ headerShown: false }}
        />
        {/* SignUp Screen */}
        <Stack.Screen
          component={SignUpScreen}
          name="signup"
          options={{ headerShown: false }}
        />
        {/* Login Screen */}
        <Stack.Screen
          component={Login}
          name="login"
          options={{ headerShown: false }}
        />
        {/* Profile Screen with Driver data */}
        <Stack.Screen name="Profile" component={CardScreen} />
      </Stack.Navigator>
    </DriverProvider>
  );
};

export default App;

