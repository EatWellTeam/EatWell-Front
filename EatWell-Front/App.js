import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/assets/screens/Welcome';
import Home from './app/assets/screens/Home';
import LoginScreen from './app/assets/screens/Login';
import SignUpScreen from './app/assets/screens/SignUp';
import AnalasysResult from './app/assets/screens/AnalasysResult';
import UserDetailsScreen from './app/assets/screens/UserDetails';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Welcome" component={HomeScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="AnalasysResult" component={AnalasysResult} />
        <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
