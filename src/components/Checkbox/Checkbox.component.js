import './Checkbox.styles.css'

const Checkbox = ({isChecked, handleCheckbox}) => {
  return (
    <label htmlFor='metric-switcher' className='checkbox'>
      <input
        id='metric-switcher'
        type="checkbox"
        defaultChecked={isChecked}
        onChange={() => handleCheckbox()}
      />
      <span className='slider'></span>
    </label>
  );
};

export default Checkbox;
