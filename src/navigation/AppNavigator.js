import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import WeatherDetailsScreen from '../screens/WeatherDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="WeatherDetails" component={WeatherDetailsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
