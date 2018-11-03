import React, { Component } from 'react';
import helpers from '../helpers'
// import { NavLink, Link } from 'react-router-dom'
export default class Navigation extends Component {

  renderNav(login, logout, FbLoggedIn) {
    if (!login || login === null) {
      return (
        <nav className='navbar navbar-expand-lg'>
          <div>
            <a href="/signUp" >
              <button type="button" className="btn btn-info" style={{ marginLeft: 5 }}>
                <h5>הירשם</h5>
              </button>
            </a>
            <a href="/login" >
              <button type="button" className="btn btn-info" style={{ marginLeft: 5 }}>
                <h5>התחבר</h5>
              </button>
            </a>
          </div>
          <div>
            <a href="/search">
              <img id="rideme" src={require('../images/logonormal.png')} alt='car' />
            </a>
          </div>
        </nav>
      )
    } else {
      let userFromToken = helpers.getUserFromToken()
      return (
        <nav className='navbar navbar-expand-lg'>
          <div >
            <a href="/signUp" style={{ marginLeft: 5 }}>
              <button type="button" className="btn btn-info" onClick={logout}>
                <h5>התנתק</h5>
              </button>
            </a>
            <img style={{ borderRadius: '50%' }} src={userFromToken.image} alt={FbLoggedIn ? userFromToken.name : ''}></img>
          </div>
          <div>
            <a href="/search">
              <img id="rideme" src={require('../images/logonormal.png')} alt='car' />
            </a>
          </div>
        </nav>
      )
    }
  }

  render() {
    const { login, logout, fbClick, fbCallback } = this.props
    return (
      <div style={{}}>
        {this.renderNav(login, logout, fbClick, fbCallback)}
      </div >
    )
  }
}

