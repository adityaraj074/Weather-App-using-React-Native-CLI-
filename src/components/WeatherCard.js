import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const WeatherCard = ({city, temperature, description, humidity, windSpeed}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.temperature}>{temperature}°C</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.details}>
          <Text style={styles.label}>Humidity: </Text>
          <Text style={styles.value}>{humidity}%</Text>
        </Text>
        <Text style={styles.details}>
          <Text style={styles.label}>Wind Speed: </Text>
          <Text style={styles.value}>{windSpeed} m/s</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  description: {
    fontSize: 18,
    fontStyle: 'italic',
    marginVertical: 5,
  },
  detailsContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  details: {
    fontSize: 16,
    color: '#333',
    marginVertical: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  value: {
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
  },
});

export default WeatherCard;
