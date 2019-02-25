import React, { Fragment } from 'react'
import { TextField, Button, MenuItem, Grid } from '@material-ui/core';
import TicketFormStepper from './TicketFormStepper';
import PersonalDataForm from '../PersonalDataForm/PersonalDataForm';
import NrPeopleSelect from '../TicketFormSteps/NrPeopleSelect';



class TicketForm extends React.Component {
  state = {
    nrOfPeople: 1,
    activeStep: 0,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { activeStep } = this.state;

    return (
      <Grid container spacing={16}>
        <Grid item sm={12}>
          <TicketFormStepper activeStep={activeStep} />
        </Grid>
        <Grid item sm={12}>
          {activeStep === 0 ? (
            <NrPeopleSelect
              handleChange={this.handleChange('nrOfPeople')}
              nrOfPeople={this.state.nrOfPeople}
            />
          ) : activeStep === 1 ? (
            <PersonalDataForm />
          ) : (
                <p>payment</p>
              )
          }
        </Grid>
        <Grid item sm={6}>
          <Button
            disabled={activeStep === 0}
            onClick={this.handleBack}
          >
            Back
          </Button>
        </Grid>
        <Grid item sm={6} style={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary" onClick={this.handleNext}>
            {activeStep === 2 ? 'Finish' : 'Next'}
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export default TicketForm;