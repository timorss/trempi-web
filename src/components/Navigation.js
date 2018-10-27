import React, { Component } from 'react';
// import { NavLink, Link } from 'react-router-dom'
export default class Navigation extends Component {

  renderNav(login, logout) {
    if (!login || login === null) {
      return (
        <nav className='navbar navbar-expand-lg'>
          <div>
            <a href="/signUp" >
              <button type="button" class="btn btn-info" style={{ marginLeft: 5 }}>
                <h5>הירשם</h5>
              </button>
            </a>
            <a href="/login" >
              <button type="button" class="btn btn-info">
                <h5>התחבר</h5>
              </button>
            </a>
          </div>
          <div>
            <a href="/search">
              <img id="rideme" src={require('../images/logonormal.png')} alt='car'/>
            </a>
          </div>
        </nav>

      )
    } else {
      return (
        <nav className='navbar navbar-expand-lg'>
          <div>
            <a href="/signUp" >
              <button type="button" class="btn btn-info" onClick={logout}>
                <h5>התנתק</h5>
              </button>
            </a>
          </div>
          <div>
            <a href="/search">
              <img id="rideme" src={require('../images/logonormal.png')} alt='car'/>
            </a>
          </div>
        </nav>
      )
    }
  }

  render() {
    const { login, logout } = this.props
    return (
      <div style={{}}>
        {this.renderNav(login, logout)}
      </div >
    )
  }
}

