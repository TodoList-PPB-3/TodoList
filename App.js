import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Index from './app/index';
import HomeScreen from './app/HomeScreen';
import DetailScreen from './app/DetailScreen';
import SearchScreen from './app/SearchScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    const initializeApp = async () => {
      await initDB(); // Inisialisasi database
      await checkTableStructure();
    };

    initializeApp();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;