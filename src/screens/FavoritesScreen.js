import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import CustomButton from '../components/CustomButton';

const API_KEY = '54e38e56e662810acc6cbac8898670e7';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const storedFavorites =
        JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    } catch (error) {
      Alert.alert('Error', 'Failed to load favorites');
    }
    setLoading(false);
  };

  const deleteFavorite = async city => {
    setLoading(true);
    try {
      const updatedFavorites = favorites.filter(item => item !== city);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      // Alert.alert('Success', `${city} removed from favorites`);
    } catch (error) {
      Alert.alert('Error', 'Failed to remove city');
    }
    setLoading(false);
  };

  const fetchWeatherAndNavigate = async city => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      );
      const data = await response.json();

      if (response.ok) {
        navigation.navigate('WeatherDetails', {weather: data});
      } else {
        Alert.alert('Error', 'Failed to fetch weather details');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Cities</Text>

      {loading ? (
        <LoadingIndicator />
      ) : favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite cities yet</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <View style={styles.cityContainer}>
              <TouchableOpacity
                style={styles.cityButton}
                onPress={() => fetchWeatherAndNavigate(item)}>
                <Text style={styles.cityText}>{item}</Text>
              </TouchableOpacity>
              <CustomButton
                title="Remove"
                type="delete"
                onPress={() => deleteFavorite(item)}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007AFF',
    marginBottom: 15,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#555',
    marginTop: 20,
  },
  cityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cityButton: {
    flex: 1,
  },
  cityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default FavoritesScreen;
