import React, { Fragment } from 'react'
import { TextField, Button, MenuItem, Grid } from '@material-ui/core';
import TicketFormStepper from './TicketFormStepper';
import PersonalDataForm from '../TicketFormSteps/PersonalDataForm';
import NrPeopleSelect from '../TicketFormSteps/NrPeopleSelect';



class TicketForm extends React.Component {
  state = {
    nrOfPeople: 1,
    peopleInfo: [],
    activeStep: 0,
  };

  handlePeopleInfo = index => event => {
    const peopleInfoUpdated = this.state.peopleInfo.slice();
    peopleInfoUpdated[index][event.target.name] = event.target.value;
    this.setState({
      peopleInfo: peopleInfoUpdated,
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }), this.afterStateChange);
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  afterStateChange = () => {
    let { activeStep } = this.state;
    let people = [];
    [...Array(this.state.nrOfPeople)].forEach(e => {
      people.push({
        firstName: '',
        lastName: '',
        age: 0,
      })
    });
    switch (activeStep) {
      case 1:
        this.setState({
          peopleInfo: people,
        });
        break;
      case 2:
        console.log(this.state.peopleInfo);
        break;
      default:
        break;
    }
  }

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
            <PersonalDataForm people={this.state.nrOfPeople} onInput={this.handlePeopleInfo} />
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