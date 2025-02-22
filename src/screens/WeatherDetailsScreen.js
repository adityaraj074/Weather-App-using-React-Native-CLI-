import React, {useState} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeatherCard from '../components/WeatherCard';
import CustomButton from '../components/CustomButton';

const WeatherDetailsScreen = ({route, navigation}) => {
  const {weather} = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const saveToFavorites = async () => {
    try {
      const favorites =
        JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      if (!favorites.includes(weather.name)) {
        favorites.push(weather.name);
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(true);
        Alert.alert('Success', 'City added to favorites');
      } else {
        Alert.alert('Info', 'City is already in favorites');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save city');
    }
  };

  return (
    <View style={styles.container}>
      {/* Weather Card Component */}
      <WeatherCard
        city={weather.name}
        temperature={weather.main.temp}
        description={weather.weather[0].description}
        humidity={weather.main.humidity}
        windSpeed={weather.wind.speed}
      />

      {/* Buttons Components using CustomButton */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Go to Favorites"
          onPress={() => navigation.navigate('Favorites')}
          type="secondary"
        />
        <CustomButton title="Save as Favorite" onPress={saveToFavorites} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default WeatherDetailsScreen;
