import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';

export default class MapSelect extends Component {

  state = {
    regionsV2: []
  }

  componentDidMount() {
    axios.get('https://mac-cars.herokuapp.com/camping/')
      .then(result => {
        console.log(result);
        console.log(result.data);
        this.setState({ regionsV2: result.data });
      })
  }
  mapEntry = (plot, i) => {
    let classList = ["map-entry"]
    if (this.props.selected === `${plot.region}${plot.number}`) classList.push('selected');
    if (plot.reserved) classList.push('reserved');
    let classListString = classList.join(' ');
    return (
      <div
        className={classListString}
        onClick={() => this.props.onRegionChange(`${plot.region}${plot.number}`, plot.id)}
        key={i}
      >
        {plot.region}{plot.number}
      </div>
    )
  }

  getMapEntries = () => {
    return [...new Set(this.state.regionsV2.map(r => r.region))].map(region => {
      return (
        <div className={`map-region-${region.toLowerCase()}`} key={region}>
          {
            this.state.regionsV2.filter(r => r.region === region).map((plot, i) => {
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