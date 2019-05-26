import React, { Component } from 'react'
import Axios from 'axios';

export default class Registration extends Component {

  state = {
    ticket_number: '',
    amount: 0,
  }

  componentDidMount() {
    const ticketNr = this.getTicketNr();
    if (ticketNr) {
      this.setState({ ticket_number: ticketNr });
    }
  }

  getTicketNr = () => {
    const ticketNr = this.props.match.params.ticketNr;
    if (
      ticketNr !== undefined &&
      ticketNr !== null &&
      !isNaN(ticketNr) &&
      ticketNr.length === 6
    )
      return ticketNr;
    else
      return false;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submit = () => {
    let { ticket_number, amount } = this.state;
    let data = { ticket_number, amount };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': '* / *',
      }
    }
    if (!isNaN(ticket_number) && ticket_number.length === 6 && !isNaN(amount)) {
      Axios.post('https://mac-cars.herokuapp.com/topup', data, config)
        .then(result => {
          console.log(result);
        })
        .catch(e => {
          console.log('error', e);
        })
    }
  }

  render() {
    return (
      <div>
        <h1 style={{ width: '60%', margin: '0 auto' }}>Deposit money to your account</h1>
        <table style={{ width: '60%', margin: '0 auto' }}>
          <tbody>
            <tr>
              <td>Ticket Number</td>
              <td><input type="number" name="ticket_number" onChange={this.handleChange} value={this.state.ticket_number} disabled={this.getTicketNr()} /></td>
            </tr>
            <tr>
              <td>Deposit Amount</td>
              <td><input type="number" name="amount" onChange={this.handleChange} />$</td>
            </tr>
            <tr>
              <td></td>
              <td><input type="submit" className="btn" value=" DEPOSIT " onClick={this.submit} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}