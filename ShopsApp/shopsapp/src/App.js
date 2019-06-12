import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import ShopsApp from './pages/ShopsApp';
import TicketBooth from './pages/TicketBooth';
import CampingApp from './pages/CampingApp';
import SelectApp from './pages/SelectApp';


class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={SelectApp} />
        <Route path="/shops/" exact component={ShopsApp} />
        <Route path="/ticketBooth/" exact component={TicketBooth} />
        <Route path="/camping/" exact component={CampingApp} />
      </Router>
    )
  }
}

export default App;
