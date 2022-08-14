import './TextInput.styles.css';

const TextInput = ({handleChange, cityInput}) => {
  return (
    <>
      <p className='input-label'>
        <label htmlFor="city">Location</label>
      <input
        type="text"
        name="city"
        id="city"
        aria-label="Search"
        placeholder="Enter your location"
        onChange={(e) => handleChange(e)}
        value={cityInput}
        required
      />
      </p>
    </>
  );
};

export default TextInput;
