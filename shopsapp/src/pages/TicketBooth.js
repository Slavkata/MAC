import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Toolbar, Typography, AppBar } from '@material-ui/core';
import QRReader from '../components/QRReader/QRReader';
import Swal from 'sweetalert2';
import Axios from 'axios';

class TicketBooth extends React.Component {
  state = {
    isCheckIn: true,
    hideScan: false,
  }

  handleTypeSwitch = e => {
    this.setState({ isCheckIn: e });
  }

  handleScan = ({ code }) => {
    this.setState({ hideScan: true });
    Swal.fire({
      title: `Ticket Scanned <b>${code}</b>`,
      html: 'Checking ticket status...',
      type: 'warning',
      showCancelButton: false,
      showConfirmButton: false,
    });
    const data = { ticket_number: code };
    console.log(data);
    Swal.showLoading();
    const url = `https://mac-cars.herokuapp.com/check-in/`;
    Axios.request({
      url,
      data,
      method: this.state.isCheckIn ? 'POST' : 'DELETE'
    })
      .then(res => {
        Swal.close();
        if (res.status === 200) {
          Swal.fire({
            title: 'Ticket validated',
            html: 'This person is eligable to be checked in/out',
            type: 'success',
            showConfirmButton: true,
            showCancelButton: false,
            confirmButtonText: 'Okay',
          });
        } else {
          console.log(res);
          Swal.fire({
            title: 'Ticket not valid!',
            html: 'This person should not be allowed to be checked in/out',
            type: 'error',
            showConfirmButton: true,
            showCancelButton: false,
            confirmButtonText: 'Okay',
          });
        }
      })
      .catch(e => {
        console.error(e);
        Swal.fire({
          title: 'Ticket not valid!',
          html: 'This person should not be allowed to be checked in/out',
          type: 'error',
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonText: 'Okay',
        });
      });
  }

  render() {
    return (
      <div>
        <AppBar color="primary" position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">Ticket Booth</Typography><Link to="/">Home</Link>
          </Toolbar>
        </AppBar>

        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto' }}>
          <h2>Current operation: </h2>
          <div className="flex-row-center" style={{ marginBottom: '1rem' }}>
            <div onClick={() => this.handleTypeSwitch(true)}><Button variant="contained" color={this.state.isCheckIn ? 'primary' : 'default'}>Check-In</Button></div>
            <div onClick={() => this.handleTypeSwitch(false)}><Button variant="contained" color={!this.state.isCheckIn ? 'primary' : 'default'}>Check-Out</Button></div>
          </div>
          {this.state.hideScan && <Button variant="contained" color="secondary" onClick={() => { this.setState({ hideScan: false }) }}>Scan now</Button>}
          <QRReader onScan={this.handleScan} hideOnScan={this.state.hideScan} />
        </div>
      </div>
    )
  }
}

export default TicketBooth;