import React from 'react';
import { Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

// import pages
import Registration from '../pages/Registration';
import Tickets from '../pages/Tickets';
import Camping from '../pages/Camping';
import Information from '../pages/Information';
import Navigation from '../components/Navigation';


export default () => (
  <Grid container spacing={0} style={{ height: '100%' }}>
    <Grid item sm={9} style={{ position: 'relative' }}>
      <Navigation />
      <Route path="/registration" component={Registration} />
      <Route path="/tickets" component={Tickets} />
      <Route path="/camping" component={Camping} />
      <Route exact path="/" component={Information} />
      <div className="car-vector"></div>
    </Grid>
    <Grid item sm={3} style={{ height: '100%' }}>
      <div className="left-col">
        <img src="/images/logo.png" className="logo" />
        <div className="round-image">TICKETS</div>
      </div>
    </Grid>
  </Grid>
);
