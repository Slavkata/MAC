import React, { Component } from 'react'
import Navigation from '../components/Navigation';
import TicketPurchase from '../components/TicketPurchase';

export default class Tickets extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="container">
          <TicketPurchase />
        </div>
      </div>
    )
  }
}