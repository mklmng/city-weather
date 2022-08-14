import './CountrySelector.styles.css';

const CountrySelector = ({handleCountryChange, countryList}) => { 
  countryList.sort((a,b) => a.countryNameEn > b.countryNameEn);
  countryList.unshift({countryCode: "Auto", countryNameEn: "Auto"})
  
  return (
  <>
    <p className='input-label'>
      <label htmlFor="country">Country:</label>
    </p>
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
