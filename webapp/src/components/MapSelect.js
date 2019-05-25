import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';

export default class MapSelect extends Component {
  regions = {
    A: [
      { loc: 1, taken: false },
      { loc: 2, taken: false },
      { loc: 3, taken: false },
      { loc: 4, taken: false },
      { loc: 5, taken: false },
    ],
    B: [
      { loc: 1, taken: false },
      { loc: 2, taken: false },
      { loc: 3, taken: false },
      { loc: 4, taken: false },
      { loc: 5, taken: false },
    ],
    C: [
      { loc: 1, taken: false },
      { loc: 2, taken: false },
      { loc: 3, taken: false },
      { loc: 4, taken: false },
      { loc: 5, taken: false },
    ],
    D: [
      { loc: 1, taken: false },
      { loc: 2, taken: false },
      { loc: 3, taken: false },
      { loc: 4, taken: false },
      { loc: 5, taken: false },
    ],
    E: [
      { loc: 1, taken: false },
      { loc: 2, taken: false },
      { loc: 3, taken: false },
      { loc: 4, taken: false },
      { loc: 5, taken: false },
      { loc: 6, taken: false },
      { loc: 7, taken: false },
    ],
    F: [
      { loc: 1, taken: false },
      { loc: 2, taken: false },
      { loc: 3, taken: false },
      { loc: 4, taken: false },
      { loc: 5, taken: false },
      { loc: 6, taken: false },
      { loc: 7, taken: false },
    ],
    G: [
      { loc: 1, taken: false },
      { loc: 2, taken: false },
      { loc: 3, taken: false },
      { loc: 4, taken: false },
      { loc: 5, taken: false },
      { loc: 6, taken: false },
      { loc: 7, taken: false },
    ],
    H: [
      { loc: 1, taken: false },
      { loc: 2, taken: false },
      { loc: 3, taken: false },
    ],
    I: [
      { loc: 1, taken: false },
      { loc: 2, taken: false },
    ],
    J: [
      { loc: 1, taken: false },
      { loc: 2, taken: false },
    ],
    K: [
      { loc: 1, taken: false },
      { loc: 2, taken: false },
      { loc: 3, taken: false },
    ],
    L: [
      { loc: 1, taken: false },
    ],
  }

  // componentWillMount() {
  //   axios.get('https://mac-cars.herokuapp.com/camping/')
  //   .then( ({data}) => {this.regions = data})
  //   .catch( error => console.log(error));
  // }

  mapEntry = (plot, i, region) => {
    return (
      <div
        className={"map-entry" + (this.props.selected === `${plot}${i}` ? " selected" : "")}
        onClick={() => this.props.onRegionChange(i)}
        key={i}
      >
        {region}{plot.loc}
      </div>
    )
  }

  render() {
    return (
      <div className="map">
        {

        }
        <div className="map-region-a">
          {
            this.regions.A.map((plot, i) => {
              return this.mapEntry(plot, i, 'A');
            })
          }
        </div>
        <div className="map-region-b">
          {
            this.regions.B.map((plot, i) => {
              return this.mapEntry(plot, i, 'B');
            })
          }
        </div>
        <div className="map-region-c">
          {
            this.regions.C.map((plot, i) => {
              return this.mapEntry(plot, i, 'C');
            })
          }
        </div>
        <div className="map-region-d">
          {
            this.regions.D.map((plot, i) => {
              return this.mapEntry(plot, i, 'D');
            })
          }
        </div>
        <div className="map-region-e">
          {
            this.regions.E.map((plot, i) => {
              return this.mapEntry(plot, i, 'E');
            })
          }
        </div>
        <div className="map-region-f">
          {
            this.regions.F.map((plot, i) => {
              return this.mapEntry(plot, i, 'F');
            })
          }
        </div>
        <div className="map-region-g">
          {
            this.regions.G.map((plot, i) => {
              return this.mapEntry(plot, i, 'G');
            })
          }
        </div>
        <div className="map-region-h">
          {
            this.regions.H.map((plot, i) => {
              return this.mapEntry(plot, i, 'H');
            })
          }
        </div>
        <div className="map-region-i">
          {
            this.regions.I.map((plot, i) => {
              return this.mapEntry(plot, i, 'I');
            })
          }
        </div>
        <div className="map-region-j">
          {
            this.regions.J.map((plot, i) => {
              return this.mapEntry(plot, i, 'J');
            })
          }
        </div>
        <div className="map-region-k">
          {
            this.regions.K.map((plot, i) => {
              return this.mapEntry(plot, i, 'K');
            })
          }
        </div>
        <div className="map-region-l">
          {
            this.regions.L.map((plot, i) => {
              return this.mapEntry(plot, i, 'L');
            })
          }
        </div>
      </div>
    )
  }
}

MapSelect.propTypes = {
  selected: PropTypes.number,
  onRegionChange: PropTypes.func,
};