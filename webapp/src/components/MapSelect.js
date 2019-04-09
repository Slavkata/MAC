import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class MapSelect extends Component {
  regions = [
    'North-West (NW)',
    'North (N)',
    'North-East (NE)',
    'West (W)',
    'Center (CEN)',
    'East (E)',
    'South-West (SW)',
    'South (S)',
    'South-East (SE)',
  ]

  render() {
    return (
      <div className="map">
        {
          this.regions.map((r, i) => (
            <div
              className={"map-entry" + (this.props.selected === i ? " selected" : "")}
              onClick={() => this.props.onRegionChange(i)}
              key={i}
            >
              {r}
            </div>
          ))
        }
      </div>
    )
  }
}

MapSelect.propTypes = {
  selected: PropTypes.number,
  onRegionChange: PropTypes.func,
};