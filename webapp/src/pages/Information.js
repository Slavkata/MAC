import React, { Component } from 'react'
import { Redirect } from 'react-router';

export default class Information extends Component {
  state = {
    redirect: 0,
  }

  redirect = () => {
    this.setState({ redirect: 1 });
  }

  render() {
    if (this.state.redirect === 1) {
      return <Redirect push to="/tickets" />;
    }

    return (
      <div className="container">
        <h1>Are you a car maniac?</h1>
        <h3>because if you are, we have prepared the most special event for you</h3>
        <div className="home-text">
          We will host an amazing car exhibition show on the <strong>weekend of 25 June to 27 June</strong> at West Park Philadelphia. We are waiting for you!
            </div>
        <div className="content-center">
          <button className="btn" onClick={this.redirect}>Buy tickets</button>
          <h6>or you can read more <a href="#">here</a></h6>
        </div>
      </div >
    )
  }
}