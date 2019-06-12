import React from 'react'
import Chart from "react-apexcharts";
import Axios from 'axios';
class VisitorsOverTime extends React.Component {
  state = {
    options: {
      chart: {
        id: "basic-line",
        zoom: {
          enabled: true,
          type: 'x',
        }
      },
      xaxis: {
        type: 'datetime',
        categories: []
      },

    },
    series: [],
    data: []
  };

  componentDidMount() {
    Axios.get('https://mac-cars.herokuapp.com/visitors/')
      .then(res => {
        this.setState({ data: res.data }, this.getData)
      });
  }
  getData = () => {
    let data = this.parseData(this.state.data);
    this.setState({ options: { xaxis: { categories: data.map(d => d.time) } }, series: [{ name: 'stats', data: data.map(d => d.total) }] })

  }

  parseData = (data) => {
    let result = {};
    data.forEach(d => {
      let date = new Date(d.createdAt);
      const objKey = date.getTime().toString();
      result[objKey] = result[objKey] || 0;
      if (d.isCheckIn) result[objKey]++;
      else result[objKey]--;
    });
    let total = 0;
    return Object.keys(result).map(key => {
      total += result[key];
      return { time: parseInt(key), change: result[key], total };
    });
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="800"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default VisitorsOverTime;