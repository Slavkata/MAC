import React, { Component } from 'react'

export default class Registration extends Component {
  render() {
    return (
      <div>
        <table style={{ width: '60%', margin: '0 auto' }}>
          <tbody>
            <tr>
              <td>Ticket Number</td>
              <td><input type="number" name="ticket-number" /></td>
            </tr>
            <tr>
              <td>Deposit Amount</td>
              <td><input type="number" name="deposit-amount" />$</td>
            </tr>
            <tr>
              <td></td>
              <td><input type="submit" className="btn" value=" DEPOSIT " /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}