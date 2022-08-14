import "./App.css";
import { useState, useEffect } from "react";

import Heading from "./components/Heading/Heading.component";
import WeatherCard from "./components/WeatherCard/WeatherCard.component";
import TextInput from "./components/TextInput/TextInput.component";
import CountrySelector from "./components/CountrySelector/CountrySelector.component";
import Checkbox from "./components/Checkbox/Checkbox.component";

const countryCodesList = require("country-codes-list");

const App = () => {
  const countryCodesObject = countryCodesList.customList(
    "countryCode",
    "{countryNameEn}"
  );
  const countryList = [];

  Object.entries(countryCodesObject).forEach(([key, value]) => {
    countryList.push({
      countryCode: key,
      countryNameEn: value,
    });
  });

  const [cityInput, setCityInput] = useState("");
  const [countryInput, setCountryInput] = useState("Auto");
  const [country, setCountry] = useState("GB");
  const [location, setLocation] = useState("London");
  const [isChecked, setIsChecked] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [unit, setUnits] = useState({
    isMetric: true,
    type: "metric",
  });

  const [weatherInfo, setWeatherInfo] = useState({
    temperature: null,
    tempMin: null,
    tempMax: null,
    description: "",
    feelsLike: null,
    weatherIcon: "",
    windSpeed: null,
    humidity: null,
    latitude: 51.5085,
    longitude: -0.1257,
    localTime: null,
    localDate: null,
  });

  useEffect(() => {
    const loadData = async () => {
      let API_url = `https://api.openweathermap.org/data/2.5/weather?q=`;

      countryInput !== "Auto"
        ? (API_url += `${location},${country}&appid=${process.env.REACT_APP_API_KEY}&units=${unit.type}`)
        : (API_url += `${location}&appid=${process.env.REACT_APP_API_KEY}&units=${unit.type}`);

      const response = await fetch(API_url).catch((error) => {
        return ("Error connecting to the API", error)
      });

      try {
        const weatherData = await response.json();

        if (weatherData.cod === "404"){
          setLocation(weatherData.message)
        }

        setWeatherInfo({
          temperature: Math.ceil(weatherData.main.temp),
          tempMin: Math.ceil(weatherData.main.temp_min),
          tempMax: Math.ceil(weatherData.main.temp_max),
          description: capitalizeFirstLetter(
            weatherData.weather[0].description
          ),
          feelsLike: Math.ceil(weatherData.main.feels_like),
          weatherIcon: weatherData.weather[0].icon,
          windSpeed: weatherData.wind.speed,
          humidity: weatherData.main.humidity,
          latitude: weatherData.coord.lat,
          longitude: weatherData.coord.lon,
          localDate: new Date(weatherData.dt * 1000).toLocaleDateString(
            "en-GB",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          ),
        });

        if (countryInput === "Auto") {
          setCountry(weatherData.sys.country);
        }
      } catch (error) {
        return error;
      }
    };
    loadData();

  }, [cityInput, location, country, isSubmitted, countryInput, unit]);

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleCheckbox = () => {
    setIsChecked(prevState => !prevState)
    let unitType = "";
    unit.type === "metric" ? unitType = "imperial" : unitType = "metric"

    setUnits({
      isMetric: !unit.isMetric,
      type: unitType
    })
  }

  const handleChange = (event) => {
    event.persist();
    setCityInput(event.target.value);
  };

  const handleCountryChange = (event) => {
    event.persist();

    event.target.value === "Auto"
      ? setCountryInput("Auto")
      : setCountryInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocation(cityInput);
    setCountry(countryInput);
    setIsSubmitted(!isSubmitted);
  };

  const {
    temperature,
    tempMin,
    tempMax,
    description,
    feelsLike,
    weatherIcon,
    windSpeed,
    humidity,
    localDate,
  } = weatherInfo;

  return (
    <>
      <Heading />
      <main className="container">
        <form onSubmit={handleSubmit} role="search">
          <div className="container-item">
            <TextInput
              handleChange={handleChange}
              cityInput={cityInput}
            />
          </div>
          <div className="container-item">
            <CountrySelector
              handleCountryChange={handleCountryChange}
              countryList={countryList}
            />
          </div>
          <div className="container-buttons">
            <div className="button-group">
              <button type="submit" value="Search" className="main-button">
                Search
              </button>

              <Checkbox 
                isChecked={isChecked} 
                handleCheckbox={handleCheckbox} 
              />

            </div>
          </div>
        </form>
        <div className="item-fullwidth">
          <div className="wrapper">
            <WeatherCard
              location={location}
              country={country}
              weatherIcon={weatherIcon}
              description={description}
              temperature={temperature}
              unit={unit}
              feelsLike={feelsLike}
              tempMin={tempMin}
              tempMax={tempMax}
              windSpeed={windSpeed}
              humidity={humidity}
              localDate={localDate}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
