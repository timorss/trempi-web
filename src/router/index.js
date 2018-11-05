import React, { Component } from 'react';
import {
  Router, Route, Switch, Redirect,
  //  NavLink, Link 
  //screens
} from 'react-router-dom' // Redirect, withRouter 
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// import FacebookLogin from 'react-facebook-login'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import Search from '../screens/Search'
import MyTremps from '../screens/MyTremps'
import Adv from '../screens/Adv'
import Contact from '../screens/Contact'
import About from '../screens/About'
// components
import Error from '../components/Error'
import Navigation from '../components/Navigation'
import SecondNavigation from '../components/SecondNavigation'
// import TrempiFooter from '../components/TrempiFooter'
import axios from 'axios'
// import jwt from 'jsonwebtoken'
import { createBrowserHistory } from 'history';
import helpers from '../helpers'
import config from '../config';
import '../style.css';
import '../media_screen.css';
import '../datePicker.css';
// let userFromToken = helpers.getUserFromToken()
const history = createBrowserHistory()

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route render={(props) => (
    localStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
}
const PrivateRouteRender = ({ render: Component, ...rest }) => {
  return <Route render={(props) => (
    localStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
}

class RouterContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loggedIn: false,
      error: '',
      title: 'Welcome to trempi',
      user: {},
      facebook: {
        FbLoggedIn: false,
        name: '',
        image: '',
        userID: '',
        email: ''
      }
    }
    this.onLogout = this.onLogout.bind(this)
  }

  onSignUp({ name, email, password, isAlreadySigned }) {
    let _this = this
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    console.log('config.BASE_URL', config.BASE_URL)
    axios.post(`${config.BASE_URL}/users`, {
      name,
      email,
      password
    })
      .then((res) => {
        console.log('user is: ', res.data);
        history.push('/login')
        _this.setState({ error: '' })
      })
      .catch(function (err) {
        console.log(err.response.data);
        _this.setState({ error: err.response.data })
      })
  }

  onLogin(values) {
    const { email, password } = values
    let _this = this
    axios.post(`${config.BASE_URL}/auth`, {
      email,
      password
    })
      .then((res) => {
        console.log('token is: ', res.data);
        localStorage.setItem('token', res.data)
        console.log('LOCAL TOKEN', localStorage.getItem('token'));
        history.push('/search')
        this.setState({ loggedIn: true })
      })
      .catch(function (err) {
        console.log(err.response && err.response.data);
        _this.setState({ error: err.response.data })
      })
  }

  onLogout() {
    localStorage.removeItem('token')
    console.log('now the token is', localStorage.getItem('token'))
    history.push('/login')
    this.setState({ loggedIn: false, facebook: { FbLoggedIn: false } })
  }

  renderTitle() {
    try {
      let userFromToken = helpers.getUserFromToken()
      console.log('userFromToken', userFromToken);
      return `שלום ${userFromToken.name}`
    } catch (err) {
      return 'ברוך הבא לטרמפי'
    }
  }
  facebookLogin({ name, email, password: userID, image }) {
    let _this = this
    axios.post(`${config.BASE_URL}/auth/facebookLogin`, {
      name,
      email, //
      password: userID,
      image
    })
      .then((res) => {
        console.log('token is: ', res.data.token);
        localStorage.setItem('token', res.data.token)
        console.log('LOCAL TOKEN', localStorage.getItem('token'));
        history.push('/search')
        this.setState({ loggedIn: true, facebook: { FbLoggedIn: true } })
      })
      .catch(function (err) {
        console.log(err.response && err.response.data);
        _this.setState({ error: err.response.data })
      })

  }

  responseFacebook = (response) => {
    console.log('response from fb', response);
    this.setState({
      facebook: {
        name: response.name,
        image: response.picture.data.url,
        userID: response.userID,
        email: response.email
      }
    })

    const { name, email, userID, image } = this.state.facebook
    this.facebookLogin({ name, email, password: userID, image })
  }

  componentClicked = () => {
    console.log('fb button clicked');
  }

  renderFb() {
    let token = localStorage.getItem('token')
    if (token) {
      return <div />
    } else {
      return <FacebookLogin
      appId="555630241568464"
      autoLoad={false}
      fields="name,email,picture"
      onClick={this.componentClicked}
      callback={this.responseFacebook}
      cssClass="my-facebook-button-class"
      // isMobile={true}
      // disableMobileRedirect={true}
        // icon="fa-facebook"
        render={renderProps => (
          <button className="btn btn-info fb-button"
            style={{
              display: 'inline-flex', flexDirection: 'row', background: '#3b5998', color: 'white', width: 200,
              marginTop: 4, justifyContent: 'center'
            }}
            onClick={renderProps.onClick}>
            <h5 style={{ marginLeft: 3 }}>התחבר דרך</h5>
            <img src={require('../images/facebook-icon.png')} alt={'fb'}
              style={{ height: 30, width: 30 }} /></button>
        )}
      />
    }
  }


  render() {
    const { FbLoggedIn } = this.state.facebook
    return (
      <Router history={history}>
        <div>
          {/* <a href="index.html"></a> */}
          {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}> */}
          <Navigation
            login={localStorage.getItem('token')}
            logout={this.onLogout}
            FbLoggedIn={FbLoggedIn}
          />

          {/* </div> */}
          {/* <Link to="/search">
            <img id="rideme" src={require('../images/logonormal.png')} />
          </Link> */}
          <h2 style={{ marginTop: '10%' }}>
            {this.renderTitle()}
          </h2>
          {/* {this.renderFb()} */}
          {localStorage.getItem('token') && <SecondNavigation />}
          <Switch>
            <Route path='/' exact
              render={() => (
                localStorage.getItem('token')
                  ? <Redirect to='/search' />
                  : <Redirect to='/login' />
              )} />
            <Route
              path={'/signUp'}
              render={() => <SignUp error={this.state.error} onSignUp={(values) => this.onSignUp(values)} />}
            // render={(props) => (
            //   this.state.signedUp
            //     ? <Redirect to='/login' />
            //     : <SignUp {...props} onSignUp={(values) => this.signUp(values)} />
            // )}
            />
            <Route
              path='/login'
              render={() => <Login error={this.state.error} onLogin={(values) => this.onLogin(values)} />} />
            {/* <PrivateRoute path='/tremps' component={Tremps} /> */}
            <PrivateRoute path='/MyTremps' component={MyTremps} />
            <PrivateRoute path='/contact' component={Contact} />
            <PrivateRoute path='/about' component={About} />
            <PrivateRouteRender path='/search' render={() => <div>
              <Search />
            </div>} />

            <PrivateRoute path='/adv' component={Adv} />
            <Route component={Error} />
          </Switch>
          {this.renderFb()}
          {/* <TrempiFooter /> */}
        </div>
      </Router>
    )
  }
}

export default RouterContainer;

