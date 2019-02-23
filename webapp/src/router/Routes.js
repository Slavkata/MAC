import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../pages/Home';

const Test2 = () => (
  <div>
    Test2
  </div>
);

export default () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/test" component={Test2} />
  </div>
);
