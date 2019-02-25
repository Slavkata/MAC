import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
  }
});

function getSteps() {
  return ['Select number of people', 'Input personal data', 'Complete payment'];
}

class TicketFormStepper extends React.Component {


  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.props;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  }
}

TicketFormStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(TicketFormStepper);