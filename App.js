// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/assets/screens/Welcome';
import Home from './app/assets/screens/Home';
import LoginScreen from './app/assets/screens/Login';
import SignUpScreen from './app/assets/screens/SignUp';
import AnalysisResult from './app/assets/screens/AnalysisResult';
import EditProfile from './app/assets/screens/EditProfile';
import Recipes from './app/assets/screens/Recipes';
import RecipeDetail from './app/assets/screens/RecipeDetail';
import Register2 from './app/assets/screens/Register2';
import Register3 from './app/assets/screens/Register3';
import Register4 from './app/assets/screens/Register4';
import Register5 from './app/assets/screens/Register5';
import Register6 from './app/assets/screens/Register6';
import TrackCalories from './app/assets/screens/TrackCalories';
import ForgotPassword from './app/assets/screens/ForgotPassword';
import EmailSent from './app/assets/screens/EmailSent';
import Dashboard from './app/assets/screens/Dashboard';
import { SignUpProvider } from './app/assets/context/SignUpContext'; // Import the SignUpProvider
import MyLastMeals from './app/assets/screens/MyLastMeals';
import PictureMeal from './app/assets/screens/PictureMeal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SignUpProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name="Welcome" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register2" component={Register2} options={{ headerShown: false }} />
          <Stack.Screen name="Register3" component={Register3} options={{ headerShown: false }} />
          <Stack.Screen name="Register4" component={Register4} options={{ headerShown: false }} />
          <Stack.Screen name="Register5" component={Register5} options={{ headerShown: false }} />
          <Stack.Screen name="Register6" component={Register6} options={{ headerShown: false }} />
          <Stack.Screen name="AnalysisResult" component={AnalysisResult} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
          <Stack.Screen name="Recipes" component={Recipes} options={{ headerShown: false }} />
          <Stack.Screen name="RecipeDetail" component={RecipeDetail} options={{ headerShown: false }} />
          <Stack.Screen name="TrackCalories" component={TrackCalories} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="EmailSent" component={EmailSent} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="MyLastMeals" component={MyLastMeals} options={{ headerShown: false }} />
          <Stack.Screen name="PictureMeal" component={PictureMeal} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SignUpProvider>
    </GestureHandlerRootView>

  );
}

export default App;
