import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router';
import './Home.css';
import Background from '../components/Background/Background';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import TicketForm from '../components/TicketForm/TicketForm';

export default class Tickets extends Component {
  state = {
    clicked: false,
    redirectTo: '',
  }

  redirectHome = () => {
    this.setState({
      clicked: true,
    }, () => {
      setTimeout(() => this.setState({
        redirectTo: '/',
      }), 500);
    })
  }

  render() {
    if (this.state.redirectTo !== '') {
      return <Redirect push to='/' />;
    }

    return (
      <Fragment>
        <Background />
        <div className="outer">
          <div className={`middle ${this.state.clicked ? 'hide' : 'show'}`} >
            <div className="inner">
              <PageTemplate
                title="PURCHASE TICKETS"
                returnClick={this.redirectHome}
              >
                <TicketForm />
              </PageTemplate>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}