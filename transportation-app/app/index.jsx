
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import home from '../screens/home';
import CardScreen from '../screens/CardScreen';
import SignUpScreen from '../screens/Register';
import { DriverProvider } from '../context/DriverContext'; // Use DriverContext

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <DriverProvider> {/* Use DriverProvider instead of HospitalProvider */}
      <Stack.Navigator initialRouteName="Home">
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
        {/* Profile Screen with Driver data */}
        <Stack.Screen name="Profile" component={CardScreen} />
      </Stack.Navigator>
    </DriverProvider>
  );
};

export default App;
