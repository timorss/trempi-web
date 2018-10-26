import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import { Navbar, NavItem, Nav, Button, Grid, Row, Col, Jumbotron } from 'react-bootstrap'
export default class Navigation extends Component {

  renderNav(login, logout) {


    if (!login || login === null) {
      return (
        <Navbar>
          <Nav style={{ display: 'flex' }} >
            <NavItem eventKey={1} href="/signUp">
              <Button bsStyle="primary" bsSize="small"><h4>הירשם</h4></Button>
            </NavItem>
            <NavItem eventKey={2} href="/login">
              <Button bsStyle="primary" bsSize="small"><h4>התחבר</h4></Button>
            </NavItem>
          </Nav>
        </Navbar>
      )
    } else {
      return (
        <Navbar fluid collapseOnSelect>
          <Nav pullLeft style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <NavItem eventKey={3} href="/signUp" >
              <Button onClick={logout} bsStyle="primary" bsSize="small"><h4>התנתק</h4></Button>
            </NavItem>
          </Nav>
        </Navbar>)
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

