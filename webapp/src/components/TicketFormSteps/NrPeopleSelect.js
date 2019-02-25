import React, { Fragment } from 'react'
import { TextField, MenuItem } from '@material-ui/core';
import './PersonalDataForm.css';

const possibleNrOfPeople = [
  {
    value: 1,
    label: 1,
  },
  {
    value: 2,
    label: 2,
  },
  {
    value: 3,
    label: 3,
  },
  {
    value: 4,
    label: 4,
  },
]

class NrPeopleSelect extends React.Component {
  render() {
    return (
      <Fragment>
        <TextField
          id="number-of-people"
          select
          label="Select"
          value={this.props.nrOfPeople}
          onChange={this.props.handleChange}
          helperText="How many people are you buying tickets for?"
          margin="normal"
          className="text-field"
        >
          {possibleNrOfPeople.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Fragment>
    )
  }
}

export default NrPeopleSelect;