import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CloseButton from './CloseButton';

export default class PersonInput extends Component {

  defaultState = {
    firstname: 'Person',
    lastname: 'Name',
    email: 'blank@gmail.com',
    age: 18,
  }

  state = {
    errors: [],
    hideSetButton: false,
    firstname: 'Person',
    lastname: 'Name',
    email: 'blank@gmail.com',
    age: 18,
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, hideSetButton: false }, console.log(this.state));
  }

  updatePerson = () => {
    let { errors, ...data } = this.state;
    errors = [];
    if (this.state.firstname === this.defaultState.firstname) {
      errors.push('Please enter your first name')
    }
    if (this.state.lastname === this.defaultState.lastname) {
      errors.push('Please enter your last name')
    }
    if (this.state.email === this.defaultState.email) {
      errors.push('Please enter your email')
    }
    if (this.state.age === this.defaultState.age) {
      errors.push('Please enter your age')
    }
    if (errors.length === 0) {
      this.props.onUpdate(data);
      this.setState({ errors: [], hideSetButton: true });
    } else {
      this.setState({ errors: errors, hideSetButton: false });
      console.log(data);
    }
  }

  render() {
    return (
      <div className={`input-box slide-down col ${this.props.focused ? 'focused' : 'minimised'}`}>
        <div className="control-buttons">
          <div className="title">
            {this.state.hideSetButton && <img src="https://img.icons8.com/flat_round/24/000000/checkmark.png" alt="confirmed" />}
            {!this.state.hideSetButton && <img src="https://img.icons8.com/color/48/000000/high-priority.png" width="24px" alt="not-saved" />}
            <div style={{ marginLeft: '1rem' }}>{`${this.state.firstname} ${this.state.lastname}`} </div>
          </div>
          <div>
            <button className="round-but edit-but" onClick={this.props.onEdit} disabled={this.props.focused}> ✎ </button>
            <CloseButton onRemove={this.props.onRemove} allowRemove={true} />
          </div>
        </div>
        <div className="input-fields">
          <input type="text" placeholder="First name" name="firstname" onChange={this.handleChange} />
          <input type="text" placeholder="Last name" name="lastname" onChange={this.handleChange} />
          <input type="email" placeholder="Email" name="email" onChange={this.handleChange} />
          <input type="number" placeholder="Age" name="age" onChange={this.handleChange} />
          {
            this.state.errors.map((err, i) => (<span className="error-msg" key={i}> {err} </span>))
          }
          <div className="button-group-right">
            <button className="btn" onClick={this.updatePerson} style={{ display: this.state.hideSetButton ? 'none' : 'block' }}> SET </button>
          </div>
        </div>
      </div>
    )
  }
}

PersonInput.propTypes = {
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
  focused: PropTypes.bool,
}