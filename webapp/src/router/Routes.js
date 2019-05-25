import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

// import pages
import Registration from '../pages/Registration';
import Tickets from '../pages/Tickets';
import Camping from '../pages/Camping';
import Information from '../pages/Information';
import Navigation from '../components/Navigation';
import Admin from '../pages/Admin';
import Reviews from '../pages/Reviews';


const Routes = (props) => {
  let route = props.location.pathname.substr(1);
  if (route === 'admin') {
    return (
      <Route path="/admin" component={Admin} />
    )
  }
  else {
    return (
      <Grid container spacing={0} style={{ height: '100%' }}>
        <Grid item sm={9} style={{ position: 'relative' }}>
          <Navigation />
          <Route path="/registration/:ticketNr?" component={Registration} />
          <Route path="/tickets" component={Tickets} />
          <Route path="/camping/:ticketNr?" component={Camping} />
          <Route path="/reviews" component={Reviews} />
          <Route exact path="/" component={Information} />
          <div className="car-vector"></div>
        </Grid>
        <Grid item sm={3} style={{ height: '100%' }}>
          <div className="left-col">
            <img src={`/images/logo.png`} className="logo" alt="logo" />
            <div className={`round-image ${route}bg`}>{route !== '' ? route.toUpperCase() : 'INFO'}</div>
          </div>
        </Grid>
      </Grid>
    )
  }
};

export default withRouter(Routes);