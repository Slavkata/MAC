import React, { Fragment } from 'react'


class Admin extends React.Component {
  state = {
    username: '',
    password: '',
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <Fragment>
        <div className="input-fields input-box-short">
          <h1 style={{ textAlign: 'center' }}>Admin Panel Login</h1>
          <input type="text" name="username" placeholder="Username" onChange={this.handleInput} />
          <input type="password" name="password" placeholder="Password" onChange={this.handleInput} />
          <div className="button-group-right" style={{ marginRight: '5%' }}>
            <input type="submit" class="btn btn-small-width" value=" LOGIN " />
          </div>
        </div>
      </Fragment>
    )

  }
}

export default Admin;
