import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'
export default class Navigation extends Component {

  renderNav() {
    return (
      <Grid >
        <Row>
          <Col xs={12} sm={6} md={3} className='navCol'>
            <div className='li'>
              <NavLink to="/search">
                <h1>חפש טרמפ</h1>
                {/* <img className="car" src={require('../images/thumb.png')} alt='car'/> */}
              </NavLink>
            </div>

          </Col>
          <Col xs={12} sm={6} md={3} className='navCol'>
            <div className='li'>
              <NavLink to="/adv" >
                <h1> פרסם טרמפ</h1>
                {/* <img className="car" src={require('../images/thumb.png')} alt='car'/> */}
              </NavLink>
            </div>
          </Col>
          <Col xs={12} sm={6} md={3} className='navCol'>
            <div className='li'>
              <NavLink to="/contact" >
                <h1>צור קשר</h1>
                {/* <img className="car" src={require('../images/thumb.png')} alt='car'/> */}
              </NavLink>
            </div>
          </Col>
          <Col xs={12} sm={6} md={3} className='navCol'>
            <div className='li'>
              <NavLink to="/contact" >
                <h1>טרמפים שפרסמתי</h1>
                {/* <img className="car" src={require('../images/thumb.png')} alt='car'/> */}
              </NavLink>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }


  render() {
    return (
      <div style={{ paddingTop: 50 }}>
        {this.renderNav()}
      </div >
    )
  }
}

