import React, { Fragment } from 'react'
import { TextField } from '@material-ui/core';
import './PersonalDataForm.css';

class PersonalDataForm extends React.Component {
  render() {
    return (
      <Fragment>
        <TextField
          required
          id="first-name"
          label="First name"
          defaultValue=""
          margin="normal"
          placeholder="John"
          className="text-field"
        />
        <TextField
          required
          id="last-name"
          label="Last name"
          defaultValue=""
          margin="normal"
          placeholder="Doe"
          className="text-field"
        />
        <TextField
          required
          id="age"
          label="Age"
          defaultValue=""
          margin="normal"
          placeholder="18"
          className="text-field"
        />
      </Fragment>
    )
  }
}

export default PersonalDataForm;