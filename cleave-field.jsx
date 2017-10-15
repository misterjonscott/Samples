import React from 'react';
import Cleave from 'cleave.js/dist/cleave-react';
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.us';

export default class fieldWithError extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      input, meta: { touched, error, warning }, 
      autoComplete, labelName, required,
      id, type, name, options, min, max,
      step, className, placeholder
    } = this.props;
    return (
      <div>
        <Cleave
          name={name}
          min={min}
          max={max}
          step={step}
          type={type}
          placeholder={placeholder} 
          options={options}
          autoComplete={autoComplete} 
          className={className} 
          required={required} 
          id={id} 
          {...input}
          // DO NOT override onChange, onBlur because they'll break meta data transfer, etc.
          // onChange={}
          // onBlur={}
          />
        {labelName && <label htmlFor={name}>{labelName}</label>}
        {touched && ((error && <span className='error'>{error}</span>) || (warning && <span className='warning'>{warning}</span>))}
      </div>
    );
  }
}
