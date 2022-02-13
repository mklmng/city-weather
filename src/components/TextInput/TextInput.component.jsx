import './TextInput.styles.css'

const TextInput = ({handleChange, handleSubmit, cityInput, location}) => {
  return (
    <>
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
    </>
  );
};

export default TextInput;
