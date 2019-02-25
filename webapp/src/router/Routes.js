import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../pages/Home';
import Registration from '../pages/Registration';
import Tickets from '../pages/Tickets';
import Camping from '../pages/Camping';
import Information from '../pages/Information';


export default () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/registration" component={Registration} />
    <Route path="/tickets" component={Tickets} />
    <Route path="/camping" component={Camping} />
    <Route path="/info" component={Information} />
  </div>
);
