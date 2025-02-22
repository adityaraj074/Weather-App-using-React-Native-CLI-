import axios from 'axios';

const API_KEY = '54e38e56e662810acc6cbac8898670e7';
const BASE_URL = 'https://api.openweathermap.org/';

export const fetchWeather = async city => {
  try {
    const response = await axios.get(`${BASE_URL}data/2.5/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};
