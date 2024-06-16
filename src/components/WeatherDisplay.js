import React from 'react';

function WeatherDisplay({ currentWeather, forecast, unit }) {
  return (
    <div className="weather-display fadeIn">
      <h2>{currentWeather.name} ({unit === 'metric' ? 'Celsius' : 'Fahrenheit'})</h2>
      <p>{currentWeather.weather[0].description}</p>
      <p>Temperature: {currentWeather.main.temp}°</p>
      <h3>5-Day Forecast</h3>
      <div className="forecast">
        {forecast.slice(0, 5).map((day, index) => (
          <div key={index} className="forecast-day fadeIn">
            <p>{new Date(day.dt_txt).toDateString()}</p>
            <p>{day.weather[0].description}</p>
            <p>Temp: {day.main.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDisplay;
