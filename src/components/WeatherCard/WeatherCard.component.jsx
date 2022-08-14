import './WeatherCard.styles.css';

const WeatherCard = (props) => {
  const {
    location,
    country,
    weatherIcon,
    description,
    temperature,
    unit,
    feelsLike,
    tempMin,
    tempMax,
    windSpeed,
    humidity,
    localDate
  } = props;
  return (
    <section className="weather-card">
      {location === "city not found" && 
        <>
        <h2 className='error-header'>
        Sorry, we haven't found any matches for this location.
        </h2>
        </>
      }

      {location !== "city not found" && 
      <>
      <div className="weather-card-info">
        <h2 className='weather-date'>
          {localDate}
        </h2>
        <h2>
          <strong>
            {location}, <span>{country}</span>
          </strong>
        </h2>
        <div className="weather-main-details">
          <div className='weather-temperature'>
            <span>
              {temperature}°{unit.isMetric ? <sup>C</sup> : <sup>F</sup>}
            </span>
          </div>
          <div className='weather-icon'>
            <img
              src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt={description}
            />
          </div>
          <div className='text-detail'>
            <span className="temp-feel">
              Feels like {feelsLike}°
              {unit.isMetric ? <span>C</span> : <span>F</span>}
            </span>

            <span className="weather-description">
              {description}.
            </span>
          </div>
        </div>
      </div>
      <div className="weather-card-info info-details">
        <div className="weather-extended-details">
          <span className="weather-terms-info">Min: </span>
          <span className="weather-terms-value">
            {tempMin}°{unit.isMetric ? <span>C</span> : <span>F</span>}
          </span>
        </div>
        <div className='weather-extended-details'>
          <span className="weather-terms-info">Max: </span>
            <span className="weather-terms-value">
              {tempMax}°{unit.isMetric ? <span>C</span> : <span>F</span>}
            </span>
        </div>

        <div className="weather-extended-details">
          <span className="weather-terms-info">Wind: </span>
          <span className="weather-terms-value">{windSpeed}{unit.isMetric ? "m/s" : "mph"}</span>
        </div>

        <div className='weather-extended-details'>
          <span className="weather-terms-info">Humidity: </span>
          <span className="weather-terms-value">{humidity}%</span>
        </div>
      </div>
      </>
      }
    </section>
  );
};

export default WeatherCard;
