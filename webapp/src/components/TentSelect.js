import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TentSelect extends Component {
  render() {
    return (
      <div className="tent-type-box">
        {this.props.campingTypes.map(t => (
          <div key={t.name} onClick={() => this.props.onTypeChange(t.id)} className="tent-select">
            <div className={`selected-line ${this.props.selected !== t.id ? 'hidden' : ''}`}></div>
            <img src={t.image} alt={`${t.name} img`} className="tent-image" />
            <div className="text">
              {t.name}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

TentSelect.propTypes = {
  name: PropTypes.string,
  onTypeChange: PropTypes.func,
  selected: PropTypes.number,
};