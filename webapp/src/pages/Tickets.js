import React, { Component } from 'react'
import TicketPurchase from '../components/TicketPurchase';

export default class Tickets extends Component {
  render() {
    return (
      <div className="container">
        <TicketPurchase />
      </div>
    )
  }
}