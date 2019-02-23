import React, { Component } from 'react'
import ExpandingCell from '../components/ExpandingCell/ExpandingCell';
import Grid from '@material-ui/core/Grid'

const styles = {
  background: {
    backgroundImage: `url(images/background${Math.floor(Math.random() * 3) + 1}.jpg)`,
    backgroundSize: 'cover',
    filter: 'blur(5px)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  outer: {
    display: 'table',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  middle: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  inner: {
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}

export default class Home extends Component {
  render() {
    return (
      <div>
        <div style={styles.background}></div>
        <div style={styles.outer}>
          <div style={styles.middle}>
            <div style={styles.inner}>
              <Grid container spacing={16} style={{ width: '100%' }}>
                <Grid item sm={1}></Grid>

                <Grid item sm={7}>
                  <Grid container spacing={16}>
                    <Grid item sm={4}>
                      <ExpandingCell background="logo.png" text="" height={1} />
                    </Grid>
                    <Grid item sm={8}>
                      <ExpandingCell background="registration.jpg" text="MY REGISTRATION" height={1} />
                    </Grid>
                    <Grid item sm={6}>
                      <ExpandingCell background="info.jpg" text="INFO" height={1} />
                    </Grid>
                    <Grid item sm={6}>
                      <ExpandingCell background="tickets.jpg" text="TICKETS" height={1} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sm={3}>
                  <ExpandingCell background="camping.jpg" text="CAMPING" height={2.09} />
                </Grid>

                <Grid item sm={1}></Grid>

              </ Grid>
            </div>
          </div>
        </div>
      </div>
    );
  }
}