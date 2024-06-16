import React, { useState, useEffect } from 'react';
import SearchComponent from './SearchComponent';
import WeatherDisplay from './WeatherDisplay';
import FavoriteComponent from './FavoriteComponent';
import axios from 'axios';

const API_KEY = '475e98006692f42f99e8d7b7a802246c';

function WeatherDashboard() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    const lastSearchedCity = localStorage.getItem('lastSearchedCity');
    if (lastSearchedCity) {
      fetchWeatherData(lastSearchedCity);
    }
    fetchFavorites();
  }, []);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`);
      setCurrentWeather(response.data);
      fetchForecastData(city);
      localStorage.setItem('lastSearchedCity', city);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  const fetchForecastData = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`);
      setForecast(response.data.list);
    } catch (error) {
      console.error('Error fetching forecast data', error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:5000/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites', error);
    }
  };

  const addFavorite = async (city) => {
    try {
      const response = await axios.post('http://localhost:5000/favorites', { city });
      setFavorites([...favorites, response.data]);
    } catch (error) {
      console.error('Error adding favorite', error);
    }
  };

  const removeFavorite = async (city) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/${city}`);
      setFavorites(favorites.filter(fav => fav.city !== city));
    } catch (error) {
      console.error('Error removing favorite', error);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    if (currentWeather) {
      fetchWeatherData(currentWeather.name);
    }
  };

  return (
    <div className="weather-dashboard fadeIn">
      <SearchComponent onSearch={fetchWeatherData} />
      {currentWeather && <WeatherDisplay currentWeather={currentWeather} forecast={forecast} unit={unit} />}
      <button className="toggle-button btn btn-primary" onClick={toggleUnit}>Toggle Unit</button>
      <FavoriteComponent
        favorites={favorites}
        onAddFavorite={addFavorite}
        onRemoveFavorite={removeFavorite}
        onCitySelect={fetchWeatherData}
      />
    </div>
  );
}

export default WeatherDashboard;
