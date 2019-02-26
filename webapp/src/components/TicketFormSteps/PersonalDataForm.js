import React, { Fragment } from 'react'
import { TextField, Grid } from '@material-ui/core';
import './PersonalDataForm.css';

class PersonalDataForm extends React.Component {
  render() {
    return (
      <Fragment>
        <Grid container spacing={16}>
          {
            [...Array(this.props.people)].map((e, i) => (
              <Grid item sm={12 / this.props.people} className="person-grid" key={i + 1}>
                <h3>Person {i + 1}</h3>
                <TextField
                  required
                  id="first-name"
                  name="firstName"
                  label="First name"
                  defaultValue=""
                  margin="normal"
                  placeholder="John"
                  className="text-field"
                  onChange={this.props.onInput(i)}
                />
                <TextField
                  required
                  id="last-name"
                  name="lastName"
                  label="Last name"
                  defaultValue=""
                  margin="normal"
                  placeholder="Doe"
                  className="text-field"
                  onChange={this.props.onInput(i)}
                />
                <TextField
                  required
                  id="age"
                  name="age"
                  label="Age"
                  defaultValue=""
                  margin="normal"
                  placeholder="18"
                  className="text-field"
                  onChange={this.props.onInput(i)}
                />
              </Grid>
            ))
          }
        </Grid>
      </Fragment>
    )
  }
}

export default PersonalDataForm;