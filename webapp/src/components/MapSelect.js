import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class MapSelect extends Component {
  render() {
    return (
      <div className="map">
        <div
          className={"map-entry" + (this.props.selected === 0 ? " selected" : "")}
          onClick={() => this.props.onRegionChange(0)}
        >
          North-west (NW)
        </div>
        <div
          className={"map-entry" + (this.props.selected === 1 ? " selected" : "")}
          onClick={() => this.props.onRegionChange(1)}
        >
          North-east (NE)
        </div>
        <div
          className={"map-entry" + (this.props.selected === 2 ? " selected" : "")}
          onClick={() => this.props.onRegionChange(2)}
        >
          South-west (SW)
        </div>
        <div
          className={"map-entry" + (this.props.selected === 3 ? " selected" : "")}
          onClick={() => this.props.onRegionChange(3)}
        >
          South-east (SE)
        </div>
      </div>
    )
  }
}

MapSelect.propTypes = {
  selected: PropTypes.number,
  onRegionChange: PropTypes.func,
};