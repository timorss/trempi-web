import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import { Navbar, NavItem, Nav, Button, Grid, Row, Col, Jumbotron } from 'react-bootstrap'
export default class Navigation extends Component {

  renderNav(login, logout) {


    if (!login || login === null) {
      return (

        <Nav bsStyle="pills" style={{ display: 'flex' }} >
          <NavItem eventKey={1} href="/signUp">
            <Button bsStyle="primary" bsSize="small"><h3>הירשם</h3></Button>
          </NavItem>
          <NavItem eventKey={2} href="/login">
            <Button bsStyle="primary" bsSize="small"><h3>התחבר</h3></Button>
          </NavItem>
        </Nav>
      )
    } else {
      return (<Nav style={{ display: 'flex' }}>
        <NavItem eventKey={1} href="/signUp">
          <Button onClick={logout} bsStyle="primary" bsSize="small"><h3>התנתק</h3></Button>
        </NavItem>


      </Nav>)
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

