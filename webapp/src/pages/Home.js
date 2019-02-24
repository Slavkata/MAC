import React, { Component } from 'react'
import ExpandingCell from '../components/ExpandingCell/ExpandingCell';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router';

import './Home.css';
import Background from '../components/Background/Background';




export default class Home extends Component {
  state = {
    clicked: false,
    redirectTo: '',
  }

  redirectTo = (page) => {
    this.setState({
      clicked: true,
    }, () => {
      setTimeout(() => this.setState({
        redirectTo: page,
      }), 500);
    })
  }

  render() {
    if (this.state.redirectTo !== '') {
      return <Redirect push to={`/${this.state.redirectTo}`} />;
    }

    return (
      <div>
        <Background />
        <div className="outer">
          <div className={`middle ${this.state.clicked ? 'hide' : 'show'}`}>
            <div className="inner">
              <Grid container spacing={16} style={{ width: '100%' }}>
                <Grid item sm={1}></Grid>

                <Grid item sm={7}>
                  <Grid container spacing={16}>
                    <Grid item sm={4}>
                      <ExpandingCell
                        background="logo.png"
                        text=""
                        height={1}
                      />
                    </Grid>
                    <Grid item sm={8}>
                      <ExpandingCell
                        background="registration.jpg"
                        text="MY REGISTRATION"
                        height={1}
                        clicked={() => this.redirectTo('registration')}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <ExpandingCell
                        background="info.jpg"
                        text="INFORMATION"
                        height={1}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <ExpandingCell
                        background="tickets.jpg"
                        text="TICKETS"
                        height={1}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sm={3}>
                  <ExpandingCell
                    background="camping.jpg"
                    text="CAMPING"
                    height={2.09}
                  />
                </Grid>

                <Grid item sm={1}></Grid>

              </ Grid>
            </div>
          </div>
        </div>
      </div>
    );
  }
}