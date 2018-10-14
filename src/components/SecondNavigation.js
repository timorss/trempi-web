import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class Navigation extends Component {

  renderNav(login, logout) {
    return <div style={{ width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <div className='li'>
        <NavLink to="/search">
          <h1>חפש טרמפ</h1>
          <img className="car" src={require('../images/thumb.png')} />
        </NavLink>
      </div>
      <div className='li'>
        <NavLink to="/adv" >
          <h1> פרסם טרמפ</h1>
          <img className="car" src={require('../images/thumb.png')} />
        </NavLink>
      </div>
      <div className='li'>
        <NavLink to="/contact" >
          <h1>צור קשר</h1>
          <img className="car" src={require('../images/thumb.png')} />
        </NavLink>
      </div>
      <div className='li'>
        <NavLink to="/contact" >
          <h1>טרמפים שפרסמתי</h1>
          <img className="car" src={require('../images/thumb.png')} />
        </NavLink>
      </div>
    </div>
  }

  //   <li id="search">
  //   <a href="search.html"> חיפוש טרמפים </a><img class="car" src="img/thumb.png">
  // </li>
  // <li id="adv">
  //   <a href="adv.html"> פרסום טרמפים </a><img class="car" src="img/thumb.png">
  // </li>
  // <li id="contact">
  //   <a href="contact.html"> צור קשר </a><img class="car" src="img/thumb.png">
  // </li>

  render() {
    const { login, logout } = this.props
    return (
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 50 }}>
        {this.renderNav(login, logout)}
      </div >
    )
  }
}

