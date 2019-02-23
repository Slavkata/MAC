import React from 'react';
import { Route } from 'react-router-dom';

const Test1 = () => (
  <div>
    Test1
  </div>
);

const Test2 = () => (
  <div>
    Test2
  </div>
);

export default () => (
  <div>
    <Route exact path="/" component={Test1} />
    <Route path="/test" component={Test2} />
  </div>
);
