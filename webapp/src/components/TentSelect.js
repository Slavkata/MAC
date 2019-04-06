import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TentSelect extends Component {
  render() {
    return (
      <div className="tent-type-box">
        {this.props.campingTypes.map(t => (
          <div key={t.name}>
            <input
              type="radio"
              name="tentType"
              value={t.name}
              onClick={() => this.props.onTypeChange(t.id)}
            />
            {t.name}
          </div>
        ))}
      </div>
    )
  }
}

TentSelect.propTypes = {
  name: PropTypes.string,
  onTypeChange: PropTypes.func,
};