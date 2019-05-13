import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';

export default class MapSelect extends Component {
  regions = [
    'A1',
    'A1',
    'A1',
    'A1',
    'A1',
    'A1',
    'A1',
    'A1',
    'A1',
    'A1',
    'A1',
    'A1',
    'A1',
    'A1',
    'A1',
    'A1',
    'A1',
    'A1',
    'A1',
  ]

  // componentWillMount() {
  //   axios.get('https://mac-cars.herokuapp.com/camping/')
  //   .then( ({data}) => {this.regions = data})
  //   .catch( error => console.log(error));
  // }

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