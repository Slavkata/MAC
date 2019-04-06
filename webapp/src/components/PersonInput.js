import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

export default class PersonInput extends Component {
  render() {
    return (
      <div className="input-box col">
        <input type="text" placeholder="First name" />
        <input type="text" placeholder="Last name" />
        <input type="email" placeholder="Email" />
        <input type="number" placeholder="Age" />
        <button onClick={this.props.onRemove} disabled={this.props.allowRemove}> Remove person </button>
        <hr />
      </div>
    )
  }
}

PersonInput.propTypes = {
  onRemove: PropTypes.func,
  allowRemove: PropTypes.bool,
}