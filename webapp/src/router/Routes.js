import React from 'react';
import { Route } from 'react-router-dom';

// import pages
import Registration from '../pages/Registration';
import Tickets from '../pages/Tickets';
import Camping from '../pages/Camping';
import Information from '../pages/Information';


export default () => (
  <div>
    <Route path="/registration" component={Registration} />
    <Route path="/tickets" component={Tickets} />
    <Route path="/camping" component={Camping} />
    <Route exact path="/" component={Information} />
  </div>
);
