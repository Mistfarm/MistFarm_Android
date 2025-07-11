import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import {
  Login,
  Email,
  Role,
  Password,
  Game,
  HouseDevice,
  HouseSection,
} from './src/screens/index';

enableScreens();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Role" component={Role} />
          <Stack.Screen name="Email" component={Email} />
          <Stack.Screen name="Password" component={Password} />
          <Stack.Screen name="HouseDevice" component={HouseDevice} />
          <Stack.Screen name="HouseSection" component={HouseSection} />
          <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
