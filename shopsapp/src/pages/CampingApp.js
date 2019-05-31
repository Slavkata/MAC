import React from 'react'
import { Link } from 'react-router-dom';
import QRReader from '../components/QRReader/QRReader';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

class CampingApp extends React.Component {

  state = {
    hideScan: false,
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
    Swal.showLoading();
    const url = `https://mac-cars.herokuapp.com/camp-check/`;
    Axios.request({
      url,
      data: { ticket_number: code },
      method: 'POST'
    })
      .then(res => {
        Swal.close();
        if (res.status === 200) {
          Swal.fire({
            title: 'Ticket validated',
            html: `Send this person to spot <b>${res.data.name}</b>`,
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
        <div style={{ width: '300px', margin: '0 auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '2rem' }}>
          {this.state.hideScan && <Button variant="contained" color="secondary" onClick={() => { this.setState({ hideScan: false }) }}>Scan now</Button>}
        </div>
        <QRReader onScan={this.handleScan} hideOnScan={this.state.hideScan} />
      </div>
    )
  }
}

export default CampingApp;