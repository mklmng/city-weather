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
  } = props;
  return (
    <div className="weather-card">
      <div className="weather-card-info">
        <h2>
          <strong>
            {location}, <span>{country}</span>
          </strong>
        </h2>
        <div className="weather-icon">
          <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt={description}
          />
          <span className="temp">
            {temperature}°{unit.isMetric ? <sup>C</sup> : <sup>F</sup>}
          </span>
          <span className="temp-feel">
            Feels like {feelsLike}°
            {unit.isMetric ? <span>C</span> : <span>F</span>}
          </span>

          <div id="weather-description">
            {description}.
          </div>
        </div>
      </div>
      <div className="weather-card-info info-details">
        <div className="weather-details">
          <span className="weather-terms-info">Min: </span>
          <span className="weather-terms-value">
            {tempMin}°{unit.isMetric ? <span>C</span> : <span>F</span>}
          </span>
        </div>
        <div className='weather-details'>
          <span className="weather-terms-info">Max: </span>
            <span className="weather-terms-value">
              {tempMax}°{unit.isMetric ? <span>C</span> : <span>F</span>}
            </span>
        </div>

        <div className="weather-details">
          <span className="weather-terms-info">Wind: </span>
          <span className="weather-terms-value">{windSpeed}m/s</span>
        </div>

        <div className='weather-details'>
          <span className="weather-terms-info">Humidity: </span>
          <span className="weather-terms-value">{humidity}%</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
