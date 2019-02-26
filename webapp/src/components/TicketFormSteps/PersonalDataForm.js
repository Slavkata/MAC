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
              <Fragment>
                <Grid item sm={12 / this.props.people} className="person-grid">
                  <h3>Person {i + 1}</h3>
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
                </Grid>
              </Fragment>
            ))
          }
        </Grid>
      </Fragment>
    )
  }
}

export default PersonalDataForm;