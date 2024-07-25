import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/assets/screens/Welcome';
import Home from './app/assets/screens/Home';
import LoginScreen from './app/assets/screens/Login';
import SignUpScreen from './app/assets/screens/SignUp';
import AnalysisResult from './app/assets/screens/AnalysisResult';
import UserDetailsScreen from './app/assets/screens/UserDetails';
import EditProfile from './app/assets/screens/EditProfile'; // Import the EditProfile component
import Recipes from './app/assets/screens/Recipes'; // Import the Recipes component
import RecipeDetail from './app/assets/screens/RecipeDetail'; // Import the RecipeDetail component
import Register2 from './app/assets/screens/Register2';
import Register3 from './app/assets/screens/Register3';
import Register4 from './app/assets/screens/Register4';
import Register5 from './app/assets/screens/Register5';
import Register6 from './app/assets/screens/Register6';
import TrackCalories from './app/assets/screens/TrackCalories';
import ForgotPassword from './app/assets/screens/ForgotPassword';
import EmailSent from './app/assets/screens/EmailSent'; 



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Register6'>
        <Stack.Screen name="Welcome" component={HomeScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Register2" component={Register2} />
        <Stack.Screen name="Register3" component={Register3} />
        <Stack.Screen name="Register4" component={Register4} />
        <Stack.Screen name="Register5" component={Register5} />
        <Stack.Screen name="Register6" component={Register6} />
        <Stack.Screen name="AnalysisResult" component={AnalysisResult} />
        <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Recipes" component={Recipes} /> 
        <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
        <Stack.Screen name="TrackCalories" component={TrackCalories} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="EmailSent" component={EmailSent} /> 
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
