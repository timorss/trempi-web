import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class Navigation extends Component {

  renderNav(login, logout) {
    if (!login || login === null) {
      return (
        <div style={{ width: 300, display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <NavLink to="/signUp"><h1>signUp</h1></NavLink>
          </div>
          <div>
            <NavLink to="/login"> <h1>login</h1></NavLink>
          </div>
        </div>)
    } else {
      return (<div style={{ width: 300, display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <button onClick={logout}><h1>logout</h1></button>
        </div>
      </div>)
    }
  }

  render() {
    const { login, logout } = this.props
    return (
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 50 }}>
        {this.renderNav(login, logout)}
      </div >
    )
  }
}

