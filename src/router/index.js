import React, { Component } from 'react';
import { Router, Route, Switch, Redirect,
  //  NavLink, Link 
  } from 'react-router-dom' // Redirect, withRouter 
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Search from '../components/Search'
import Adv from '../components/Adv'
import Contact from '../components/Contact'
import About from '../components/About'
import Tremps from '../components/Tremps'
import Error from '../components/Error'
import Navigation from '../components/Navigation'
import SecondNavigation from '../components/SecondNavigation'
import TrempiFooter from '../components/TrempiFooter'
import axios from 'axios'
import { createBrowserHistory } from 'history';
import config from '../config';
import '../style.css';
import '../media_screen.css';

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
      error: ''
    }
    this.onLogout = this.onLogout.bind(this)
  }
  componentWillMount() {

    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    console.log('config.BASE_URL', config.BASE_URL)
  }

  onSignUp({ name, email, password }) {
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
        debugger
        console.log(err.response.message);
        _this.setState({ error: err.response.message })
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
        debugger
        _this.setState({ error: err.response.data })
      })
  }

  onLogout() {
    localStorage.removeItem('token')
    console.log('now the token is', localStorage.getItem('token'))
    history.push('/login')
    this.setState({ loggedIn: false })
  }

  render() {
    return (
      <Router history={history}>
        <div>
          {/* <a href="index.html"></a> */}
          {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}> */}
          <Navigation
            login={localStorage.getItem('token')}
            logout={this.onLogout}
          />
          {/* </div> */}
          {/* <Link to="/search">
            <img id="rideme" src={require('../images/logonormal.png')} />
          </Link> */}

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
            <PrivateRoute path='/tremps' component={Tremps} />
            <PrivateRoute path='/contact' component={Contact} />
            <PrivateRoute path='/about' component={About} />
            <PrivateRouteRender path='/search' render={() => <div>
              <Search />

            </div>} />

            <PrivateRoute path='/adv' component={Adv} />
            <Route component={Error} />
          </Switch>
          <TrempiFooter />
        </div>
      </Router>
    )
  }
}

export default RouterContainer;

