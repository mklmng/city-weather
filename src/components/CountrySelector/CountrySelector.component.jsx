import './CountrySelector.styles.css';

const CountrySelector = ({handleCountryChange, countryList}) => {
  return (
  <>
    <label htmlFor="country">Select the country:</label>
    <select
      className="dropdown"
      name="country"
      id="country"
      onChange={(e) => handleCountryChange(e)}
    >
      {countryList.map((country, index) => (
        <option key={index} value={country.countryCode}>
          {country.countryNameEn}
        </option>
      ))}
    </select>
  </>
  );
};

export default CountrySelector;
