import React from 'react'
import Axios from 'axios';

class TotalStats extends React.Component {
  state = {
    tickets: 0,
    spent: 0,
    deposited: 0,
  }

  componentDidMount() {
    Axios.get('http://mac-cars.herokuapp.com/ticket')
      .then(res => this.setState({ tickets: res.data.total_tickets }));
    Axios.get('http://mac-cars.herokuapp.com/spending/')
      .then(res => this.setState({ spent: res.data.total_spent }));
    Axios.get('http://mac-cars.herokuapp.com/depositing/')
      .then(res => this.setState({ deposited: res.data.total_balance }));
  }

  render() {
    return (
      <table border="1">
        <thead>
          <tr>
            <th>Tickets purchased</th>
            <th>Money spent</th>
            <th>Deposited money</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.state.tickets}</td>
            <td>{this.state.spent}</td>
            <td>{this.state.deposited}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default TotalStats;