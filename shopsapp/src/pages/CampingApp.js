import React from 'react'
import { Link } from 'react-router-dom';
import QRReader from '../components/QRReader/QRReader';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

class CampingApp extends React.Component {

  handleScan = ({ code }) => {
    Swal.fire({
      title: `Ticket Scanned <b>${code}</b>`,
      html: 'Checking ticket status...',
      type: 'warning',
      showCancelButton: false,
      showConfirmButton: false,
    });
    Swal.showLoading();
    const url = `https://mac-cars.herokuapp.com/check-in`;
    Axios.request({
      url,
      data: { ticket_number: code },
      method: this.state.isCheckIn ? 'POST' : 'DELETE'
    })
      .then(res => {
        Swal.close();
        if (res.code === 200) {
          Swal.fire({
            title: 'Ticket validated',
            html: 'This person is eligable to be checked in/out',
            type: 'success',
            showConfirmButton: true,
            showCancelButton: false,
            confirmButtonText: 'Okay',
          });
        } else {
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
        <AppBar color="secondary" position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">Camping Booth</Typography><Link to="/">Home</Link>
          </Toolbar>
        </AppBar>
        <QRReader onScan={this.handleScan} hideOnScan={false} />
      </div>
    )
  }
}

export default CampingApp;