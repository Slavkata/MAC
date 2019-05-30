import React, { Component } from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'

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

    if (!isNaN(ticket_number) && ticket_number.length === 6 && !isNaN(amount)) {
      Axios.post('https://mac-cars.herokuapp.com/topup/', data)
        .then(result => {
          Swal.fire({
            title: 'Money deposited',
            html: `You successfully deposited <b>${amount}€</b> to your account`,
            type: 'success',
            heightAuto: false,
          })
        })
        .catch(e => {
          Swal.fire({
            title: 'Something went wrong',
            html: `Please double check if <b>${ticket_number}</b> is the correct number of your ticket`,
            type: 'error',
            heightAuto: false,
          })
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