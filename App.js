import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import COLORS from './src/consts/colors';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import ChatScreen from './src/views/screens/ChatScreen';
import SignUpScreen1 from './src/views/screens/SignUpScreen1';
import LoginScreen from './src/views/screens/LoginScreen';
import MessageScreen from './src/views/screens/MessageScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="SignUpScreen1" component={SignUpScreen1} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MessageScreen" component={MessageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
