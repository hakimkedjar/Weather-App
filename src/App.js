import './App.css';
import { useState } from 'react';
import { fetchWeather } from './api';
import WeatherCard  from './Components/WeatherCard'

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const searchCity = async (e) => {
    e.preventDefault();
    try {
      const weather = await fetchWeather(city, setError);
      setWeather(weather);
    } catch (error) {
      setError("City not found");
    }
  };

  return (
    <div className="App">
      <h1 className='app_heading'>Weather App</h1>
      <div className='search'>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleChange}
        />
        <button onClick={searchCity}>Search</button>
      </div>

      {error ? (
        <p className='error'>{error}</p>
      ) : (
        <WeatherCard weather={weather} />
      )}
    </div>
  );
}

export default App;