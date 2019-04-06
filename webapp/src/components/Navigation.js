import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
  render() {
    return (
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/tickets"> Tickets </Link>
        <Link to="/camping"> Camping </Link>
        <Link to="/registration"> My registration </Link>
      </nav>
    )
  }
}
