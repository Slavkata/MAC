import React from 'react'
import VisitorsOverTime from './Charts/VisitorsOverTime';
import TotalStats from './Charts/TotalStats';
import PerTicket from './Charts/PerTicket';


class AdminCharts extends React.Component {
  render() {
    return (
      <div>
        <VisitorsOverTime />
        <TotalStats />
        <PerTicket />
      </div>
    )
  }
}

export default AdminCharts;