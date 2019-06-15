import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class TicketNumberInput extends Component {

  state = {
    ticketNr: '',
  }

  render() {
    return (
      <div className="camping-spots-input">
        <input type="text" placeholder="Ticket number" className="width-80" onChange={(e) => this.setState({ ticketNr: e.target.value })} />
        <button onClick={() => this.props.onAdd(this.state.ticketNr)} className="btn small"> + </button>
      </div>
    )
  }
}

TicketNumberInput.propTypes = {
  onAdd: PropTypes.func,
  disabled: PropTypes.bool,
};