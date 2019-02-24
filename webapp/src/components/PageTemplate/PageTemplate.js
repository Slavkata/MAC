import React, { Component } from 'react'
import ExpandingCell from '../ExpandingCell/ExpandingCell';
import Grid from '@material-ui/core/Grid';
import './PageTemplate.css';


export default class PageTemplate extends Component {
  render() {
    return (
      <Grid container spacing={16}>
        <Grid item sm={1}></Grid>
        <Grid item container sm={10} spacing={16}>
          <Grid item sm={3}>
            <ExpandingCell
              background="home.jpg"
              text="HOME"
              height={2}
              clicked={this.props.returnClick}
            />
          </Grid>
          <Grid item sm={9}>
            <div className="page-title">{this.props.title}</div>
            <div className="page-content page-content-top">
              Here come some content
            </div>
          </Grid>
        </Grid>
        <Grid item sm={1}></Grid>
      </Grid>
    )
  }
}
