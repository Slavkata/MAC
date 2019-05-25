import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';

export default class MapSelect extends Component {

  regionsV2 = [
    { id: 1, region: 'A', number: '1', reserved: false },
    { id: 2, region: 'A', number: '2', reserved: false },
    { id: 3, region: 'A', number: '3', reserved: false },
    { id: 4, region: 'A', number: '4', reserved: false },
    { id: 5, region: 'A', number: '5', reserved: false },
    { id: 6, region: 'B', number: '1', reserved: false },
    { id: 7, region: 'B', number: '2', reserved: false },
    { id: 8, region: 'B', number: '3', reserved: false },
    { id: 9, region: 'B', number: '4', reserved: false },
    { id: 10, region: 'B', number: '5', reserved: false },
  ]
  // regions = {
  //   A: [
  //     { loc: 1, taken: false },
  //     { loc: 2, taken: false },
  //     { loc: 3, taken: false },
  //     { loc: 4, taken: false },
  //     { loc: 5, taken: false },
  //   ],
  //   B: [
  //     { loc: 1, taken: false },
  //     { loc: 2, taken: false },
  //     { loc: 3, taken: false },
  //     { loc: 4, taken: false },
  //     { loc: 5, taken: false },
  //   ],
  //   C: [
  //     { loc: 1, taken: false },
  //     { loc: 2, taken: false },
  //     { loc: 3, taken: false },
  //     { loc: 4, taken: false },
  //     { loc: 5, taken: false },
  //   ],
  //   D: [
  //     { loc: 1, taken: false },
  //     { loc: 2, taken: false },
  //     { loc: 3, taken: false },
  //     { loc: 4, taken: false },
  //     { loc: 5, taken: false },
  //   ],
  //   E: [
  //     { loc: 1, taken: false },
  //     { loc: 2, taken: false },
  //     { loc: 3, taken: false },
  //     { loc: 4, taken: false },
  //     { loc: 5, taken: false },
  //     { loc: 6, taken: false },
  //     { loc: 7, taken: false },
  //   ],
  //   F: [
  //     { loc: 1, taken: false },
  //     { loc: 2, taken: false },
  //     { loc: 3, taken: false },
  //     { loc: 4, taken: false },
  //     { loc: 5, taken: false },
  //     { loc: 6, taken: false },
  //     { loc: 7, taken: false },
  //   ],
  //   G: [
  //     { loc: 1, taken: false },
  //     { loc: 2, taken: false },
  //     { loc: 3, taken: false },
  //     { loc: 4, taken: false },
  //     { loc: 5, taken: false },
  //     { loc: 6, taken: false },
  //     { loc: 7, taken: false },
  //   ],
  //   H: [
  //     { loc: 1, taken: false },
  //     { loc: 2, taken: false },
  //     { loc: 3, taken: false },
  //   ],
  //   I: [
  //     { loc: 1, taken: false },
  //     { loc: 2, taken: false },
  //   ],
  //   J: [
  //     { loc: 1, taken: false },
  //     { loc: 2, taken: false },
  //   ],
  //   K: [
  //     { loc: 1, taken: false },
  //     { loc: 2, taken: false },
  //     { loc: 3, taken: false },
  //   ],
  //   L: [
  //     { loc: 1, taken: false },
  //   ],
  // }

  // componentWillMount() {
  //   axios.get('https://mac-cars.herokuapp.com/camping/')
  //   .then( ({data}) => {this.regions = data})
  //   .catch( error => console.log(error));
  // }

  mapEntry = (plot, i) => {
    return (
      <div
        className={"map-entry" + (this.props.selected === `${plot.region}${plot.number}` ? " selected" : "")}
        onClick={() => this.props.onRegionChange(`${plot.region}${plot.number}`)}
        key={i}
      >
        {plot.region}{plot.number}
      </div>
    )
  }

  getMapEntries = () => {
    return [...new Set(this.regionsV2.map(r => r.region))].map(region => {
      return (
        <div className={`map-region-${region.toLowerCase()}`} key={region}>
          {
            this.regionsV2.filter(r => r.region === region).map((plot, i) => {
              return this.mapEntry(plot, i, region);
            })
          }
        </div>
      )
    })
  }

  render() {
    return (
      <div className="map">
        {this.getMapEntries()}
      </div>
    )
  }
}

MapSelect.propTypes = {
  selected: PropTypes.string,
  onRegionChange: PropTypes.func,
};