import React from 'react'
import Axios from 'axios';

class PerTicket extends React.Component {
  state = {
    ticket_number: null,
    spent: 0,
    loaned: 0,
    deposited: 0,

  }

  getInfoForTicket = () => {
    let { ticket_number } = this.state;
    Axios.get('http://mac-cars.herokuapp.com/spending', { params: { ticket_number } })
      .then(res => {
        console.log(res.data);
        this.setState({ spent: res.data.amount });
      })
    Axios.get('http://mac-cars.herokuapp.com/loaning', { params: { ticket_number } })
      .then(res => {
        console.log(res.data)
        this.setState({ loaned: res.data.length });
      })
    Axios.get('http://mac-cars.herokuapp.com/depositing', { params: { ticket_number } })
      .then(res => {
        this.setState({ deposited: res.data.reduce((sum, curr) => sum += curr.amount, 0) });
      })
  }

  render() {
    return (
      <div>
        <input type="text" name="ticket_number" placeholder="Ticket number..." onChange={(e) => this.setState({ ticket_number: e.target.value })} />
        <button className="btn" onClick={this.getInfoForTicket}>Get Ticket Info</button>
        <table>
          <thead>
            <tr>
              <th>Total Spent</th>
              <th>Items loaned</th>
              <th>Total Deposited</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.spent}</td>
              <td>{this.state.loaned}</td>
              <td>{this.state.deposited}</td>
            </tr>
          </tbody>
        </table>

      </div>
    )
  }
}

export default PerTicket;