import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

class SelectApp extends React.Component {
  render() {
    return (
      <div>
        <Link to="/shops/"><Button>Shops App</Button></Link>
        <Link to="/ticketBooth/"><Button>Ticket Booth</Button></Link>
        <Link to="/camping/"><Button>Camping App</Button></Link>
      </div>
    )
  }
}

export default SelectApp;