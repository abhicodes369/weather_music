import React, { useState } from 'react';

// Use the relative path for the API
const API_URL = '/api';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeatherAndRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/weather-music?city=${city}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else {
          throw new Error('An error occurred while fetching data. Please try again later.');
        }
      }
      const data = await response.json();
      setWeatherData(data.weather);
      setRecommendations(data.recommendations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333741' }}>Weather-based Music Recommendations</h1>
      
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
          style={{
            flex: 1,
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px 0 0 4px'
          }}
        />
        <button
          onClick={fetchWeatherAndRecommendations}
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#040404',
            color: 'white',
            border: 'none',
            borderRadius: '0 4px 4px 0',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div style={{ marginBottom: '20px' }}>
          <h2>Weather in {city}</h2>
          <p>Condition: {weatherData.main}</p>
          <p>Temperature: {weatherData.temp}°C</p>
        </div>
      )}
      
      {recommendations && (
        <div>
          <h2>Music Recommendations</h2>
          <h3>Playlist: {recommendations.playlist_name}</h3>
          <h4>Top Tracks:</h4>
          <ul>
            {recommendations.tracks.map((track, index) => (
              <li key={index}>
                {track.name} by {track.artist}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Weather;