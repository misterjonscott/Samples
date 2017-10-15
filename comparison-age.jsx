import React from 'react';
import { reduxForm } from 'redux-form';

class AgeSliders extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const globalStyle = { display: 'none' };
    const {
      handleStartAge,
      handleInputState
    } = this.props;

    return (
      <div id="age-sliders">
        <div className='age-slider-left age-slider'>
          <div
            className='ageInput'
            style={globalStyle}>
            {/*<Field name="firstName" component="input" type="range"/>*/}
            <input
              type='range'
              min={this.minStartAge} max={this.maxStartAge}
              step={1}
              onMouseUp={handleStartAge}
              onMouseDown={handleInputState.bind(this, 'age', FOCI.START_AGE, 'onDown') }
              onInput={handleInputState.bind(this, 'age', FOCI.START_AGE, 'onChange') }
              onChange={handleInputState.bind(this, 'age', FOCI.START_AGE, 'onChange') }
              {...age} />
          </div>
          <div
            className='age-label-holder'
            style={leftAgeStyle}>
            <label className='main-label'>AGE</label><br></br>
            <label className='age-label'>{currentAge}</label>
            <div className='right-arrow' style={globalStyle}></div>
          </div>
        </div>
        <div className='age-slider-right age-slider'>
          <div
            className='ageInput'
            style={globalStyle}>
            <input
              type='range'
              min={this.minRetireAge} max={this.maxRetireAge}
              step={1}
              onMouseUp={this.handleInputState.bind(this, 'retirementAge',
                FOCI.RETIRE_AGE, 'onUp') }
              onMouseDown={this.handleInputState.bind(this, 'retirementAge',
                FOCI.RETIRE_AGE, 'onDown') }
              onInput={this.handleInputState.bind(this, 'retirementAge',
                FOCI.RETIRE_AGE, 'onChange') }
              onChange={this.handleInputState.bind(this, 'retirementAge',
                FOCI.RETIRE_AGE, 'onChange') }
              {...retireAge} />
          </div>
          <div
            className='age-label-holder'
            style={rightAgeStyle}>
            <label className='main-label'>AGE</label><br></br>
            <label className='age-label'>{retirementAge}</label>
            <div className='right-arrow' style={globalStyle}></div>
            <div className='left-arrow' style={globalStyle}></div>
          </div>
        </div>
      </div>
    )
  }
}

const AgeSlidersForm = reduxForm({
  form: 'getting-started',
  destroyOnUnmount: false
})(AgeSliders);

export default AgeSlidersForm;