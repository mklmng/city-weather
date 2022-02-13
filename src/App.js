import './App.css';
import { useState, useEffect } from 'react';

import Heading from './components/Heading/Heading.component';
import WeatherCard from './components/WeatherCard/WeatherCard.component';
import TextInput from './components/TextInput/TextInput.component';
import CountrySelector from './components/CountrySelector/CountrySelector.component';

const countryCodesList = require('country-codes-list');

const App = () => {
  const countryCodesObject = countryCodesList.customList('countryCode', '{countryNameEn}');
  const countryList = [];
  
  Object.entries(countryCodesObject).forEach(([key, value]) => {
    countryList.push({ 
      countryCode: key, 
      countryNameEn: value 
    });
  });

  const [cityInput, setCityInput] = useState('');
  const [countryInput, setCountryInput] = useState('');
  const [country, setCountry] = useState('GB');
  const [location, setLocation] = useState('London');
  const [unit, setUnits] = useState({
    isMetric: true,
    type: 'metric'
  });
  const [weatherInfo, setWeatherInfo] = useState({
    temperature: null,
    tempMin: null,
    tempMax: null,
    description: '',
    feelsLike: null,
    weatherIcon: '',
    windSpeed: null,
    humidity: null
  })

  useEffect(() => {
    loadData();
  },[country, location, unit]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const switchMeasures = () => {
    unit.type === "metric"
      ? setUnits({
          isMetric: !unit.isMetric,
          type: "imperial",
        })
      : setUnits({
          isMetric: !unit.isMetric,
          type: "metric",
        });
    loadData();
  }

  const handleChange = (event) => {
    event.persist();
    setCityInput(event.target.value);   
  };

  const handleCountryChange = (event) => {
    event.persist();
    setCountryInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();    
    if (!cityInput){
      return false;
    }
    setLocation(cityInput);
    setCountry(countryInput);
    loadData();
  }

  const loadData = async () => {
        let API_url = `https://api.openweathermap.org/data/2.5/weather?q=${location},${country}&appid=${process.env.REACT_APP_API_KEY}&units=${unit.type}`

        const response = await fetch(API_url).catch(error => {
          return ("Error connecting to the API", error);
        });
        try {
          const weatherData = await response.json();
          setWeatherInfo({
            temperature: Math.ceil(weatherData.main.temp),
            tempMin: Math.ceil(weatherData.main.temp_min),
            tempMax: Math.ceil(weatherData.main.temp_max),
            description: capitalizeFirstLetter(weatherData.weather[0].description),
            feelsLike: Math.ceil(weatherData.main.feels_like),
            weatherIcon: weatherData.weather[0].icon,
            windSpeed: weatherData.wind.speed,
            humidity: weatherData.main.humidity
          });
        } catch (error) {
          return (error);
        }  
    };
 
  const { temperature, tempMin, tempMax, description, feelsLike, weatherIcon, windSpeed, humidity } = weatherInfo;

  return (
    <>
      <Heading />
      <div className="container">
        <form onSubmit={handleSubmit} role="search">
          <div className="container-item">
            <TextInput
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              cityInput={cityInput}
              location={location}
            />
          </div>
          <div className="container-item">
            <CountrySelector
              handleCountryChange={handleCountryChange}
              countryList={countryList}
            />
          </div>
          <div className="container-buttons">
            <div className='button-group'>
              <button type="submit" value="Search" className="main-button">
                Get Weather
              </button>
              <button
                type="button"
                onClick={() => switchMeasures()}
                className="main-button"
              >
                °C / °F
              </button>
            </div>
          </div>
        </form>
        <div className="item-fullwidth">
          <div className="wrapper">
            <WeatherCard
              location={location}
              country={country}
              countryInput={countryInput}
              weatherIcon={weatherIcon}
              description={description}
              temperature={temperature}
              unit={unit}
              feelsLike={feelsLike}
              tempMin={tempMin}
              tempMax={tempMax}
              windSpeed={windSpeed}
              humidity={humidity}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;