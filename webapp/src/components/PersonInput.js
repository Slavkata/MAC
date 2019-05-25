import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CloseButton from './CloseButton';

export default class PersonInput extends Component {

  defaultState = {
    firstName: 'Person',
    lastName: 'Name',
    email: 'blank@gmail.com',
    age: 18,
  }

  state = {
    errors: [],
    firstName: 'Person',
    lastName: 'Name',
    email: 'blank@gmail.com',
    age: 18,
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  updatePerson = () => {
    let { errors, ...data } = this.state;
    errors = [];
    if (this.state.firstName === this.defaultState.firstName) {
      errors.push('Please enter your first name')
    }
    if (this.state.lastName === this.defaultState.lastName) {
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
      this.setState({ errors: [], added: true });
    } else {
      this.setState({ errors: errors });
      console.log(data);
    }
  }

  render() {
    return (
      <div className={`input-box slide-down col ${this.props.focused ? 'focused' : 'minimised'}`}>
        <div className="control-buttons">
          <div className="title">{`${this.state.firstName} ${this.state.lastName}`}</div>
          <div>
            <button className="round-but edit-but" onClick={this.props.onEdit} disabled={this.props.focused}> ✎ </button>
            <CloseButton onRemove={this.props.onRemove} allowRemove={true} />
          </div>
        </div>
        <div className="input-fields">
          <input type="text" placeholder="First name" name="firstName" onChange={this.handleChange} />
          <input type="text" placeholder="Last name" name="lastName" onChange={this.handleChange} />
          <input type="email" placeholder="Email" name="email" onChange={this.handleChange} />
          <input type="number" placeholder="Age" name="age" onChange={this.handleChange} />
          {
            this.state.errors.map((err, i) => (<span className="error-msg" key={i}> {err} </span>))
          }
          <div className="button-group-right">
            <button className="btn" onClick={this.updatePerson}> SET </button>
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