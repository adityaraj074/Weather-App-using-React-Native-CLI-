import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {fetchWeather} from '../services/weatherService';
import CustomButton from '../components/CustomButton';

const SearchScreen = () => {
  const [city, setCity] = useState('');
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!city.trim()) return Alert.alert('Error', 'Please enter a city name');

    try {
      const weatherData = await fetchWeather(city);
      setCity('');
      navigation.navigate('WeatherDetails', {weather: weatherData});
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Explorer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        placeholderTextColor="#aaa"
        value={city}
        onChangeText={setCity}
      />

      {/* Using CustomButton Component */}
      <CustomButton title="Search" onPress={handleSearch} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007AFF',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#007AFF',
    padding: 12,
    marginBottom: 25,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
});

export default SearchScreen;
