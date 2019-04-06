import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class TicketNumberInput extends Component {
  render() {
    return (
      <div className="input-box row">
        <input type="text" placeholder="Ticket number" className="width-80" />
        <button onClick={this.props.onRemove} disabled={this.props.disabled}> Remove </button>
      </div>
    )
  }
}

TicketNumberInput.propTypes = {
  onRemove: PropTypes.func,
  disabled: PropTypes.bool,
};