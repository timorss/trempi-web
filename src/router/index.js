import React, { Component } from 'react';
import {
  Router, Route, Switch, Redirect,
  //  NavLink, Link 
  //screens
} from 'react-router-dom' // Redirect, withRouter 
import jwt from 'jsonwebtoken'
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FacebookProvider, LoginButton } from 'react-facebook';
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
import ChatMenu from '../components/ChatMenu'
import Chat from '../components/Chat';
// import TrempiFooter from '../components/TrempiFooter'
import axios from 'axios'
// import jwt from 'jsonwebtoken'
import { createBrowserHistory } from 'history';
// import { getMessageList } from '../helpers/chatHelpers'
import helpers from '../helpers'
import config from '../config';
import '../style.css';
import '../media_screen.css';
import '../datePicker.css';

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
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      error: '',
      title: 'Welcome to trempi',
      user: {},
      showChat: false,
      messageList: [],
      chatName: '',
      conversations: [],
      conversation: '',
      chatConversationsOpen: false,
      facebook: {
        FbLoggedIn: false,
        name: '',
        image: '',
        userID: '',
        email: ''
      }
    }
    this.onLogout = this.onLogout.bind(this)
    this.handleChatClick = this.handleChatClick.bind(this)
    this.getMessageList = this.getMessageList.bind(this)
    this.clickMessage = this.clickMessage.bind(this)
    this.getConversation = this.getConversation.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.getConversations = this.getConversations.bind(this)
    this.clickOnConversation = this.clickOnConversation.bind(this)

  }


  /*chat */
  async clickOnConversation(conversation) {

    // let userFromToken = helpers.getUserFromToken()
    try {
      const res = await axios.get(`${config.BASE_URL}/messages`, {
        params: {
          conversationId: conversation._id,
        }
      })
      const messageList = res.data
      console.log('messageList is', messageList);
      // format the message to be in the chat format
      const formattedMessageList = messageList.map((data) => {
        const { message } = data
        return {
          author: message.author,
          type: message.type,
          data: { [message.type]: message.data[message.type] }
        }
      })


      this.setState({
        conversation,
        messageList: formattedMessageList,
        showChat: true,
        tremp: conversation.tremp
      })
    }
    catch (err) {

      console.log(err);
    }
  }


  async postTheMessage(message) {
    const { tremp, conversation } = this.state
    let userFromToken = helpers.getUserFromToken()
    const sender = conversation.tremp.user === userFromToken._id ? 'me' : 'them'
    const res = await axios.post(`${config.BASE_URL}/messages`, {
      conversationId: conversation._id,
      message: {
        author: sender,
        type: message.type,
        data: { [message.type]: message.data[message.type] }
      },
      user: userFromToken._id,
      tremp
    }
    )
    let _message = res.data
    console.log('message is: ', _message);
    this.getMessageList()
  }

  async sendMessage(message) {
    const { tremp, conversation } = this.state
    // console.log('function works!');
    let userFromToken = helpers.getUserFromToken()
    try {

      // const { name, source, destination, date, time, price, seats, phoneNumber, details, } = this.state
      if (!conversation) {

        const conversationData = await axios.post(`${config.BASE_URL}/conversations`, {
          user: userFromToken._id,
          secondUser: tremp.user._id,
          trempId: tremp._id
        }
        )
        const res = await axios.get(`${config.BASE_URL}/conversations/${userFromToken._id}`)
        let conversations = res.data

        const conversation = conversationData.data
        console.log('send message --conversation', conversation);
        debugger
        this.setState({ conversation, conversations }, () => this.postTheMessage(message))
      } else {
        this.postTheMessage(message)
      }


    } catch (err) {
      console.log(err.response);
      // console.log(err.response.data);
    }
  }



  handleChatClick() {
    this.setState({ showChat: false })
  }

  clickMessage(tremp) {
    this.setState({
      tremp,
      showChat: true
    }, () => this.getConversation())
  }

  async getConversations() {
    console.log('getConversation works!');
    let userFromToken = helpers.getUserFromToken()
    try {
      const res = await axios.get(`${config.BASE_URL}/conversations/${userFromToken._id}`)
      let conversations = res.data
      console.log('conversations are: ', conversations);

      this.setState({
        conversations,
        chatConversationsOpen: !this.state.chatConversationsOpen
      })
    } catch (err) {

      console.log(err.response);
    }
  }
  async getConversation() {
    const { tremp } = this.state
    console.log('getConversation works!');
    let userFromToken = helpers.getUserFromToken()


    try {
      debugger
      const res = await axios.get(`${config.BASE_URL}/conversations`, {
        params: {
          user: userFromToken._id,
          secondUser: tremp.user._id,
          trempId: tremp._id
        }
      },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      )
      debugger
      let conversation = res.data
      console.log(' conversation: ', conversation);
      debugger
      this.setState({ conversation }, () => {
        debugger
        this.getMessageList()
      })
    } catch (err) {

      console.log(err.response);
    }
  }

  async getMessageList() {
    const { conversation } = this.state
    // let userFromToken = helpers.getUserFromToken()
    debugger
    try {
      const res = await axios.get(`${config.BASE_URL}/messages`, {
        params: {
          conversationId: conversation._id,
        }
      })

      const messageList = res.data
      console.log('messageList is', messageList);
      // format the message to be in the chat fotmat
      const formattedmMessageList = messageList.map((data) => {
        const { message } = data

        return {
          author: message.author,
          type: message.type,
          data: { [message.type]: message.data[message.type] }
        }
      })
      if (!conversation) {
        this.setState({ messageList: [] })
      } else {
        this.setState({ messageList: formattedmMessageList })
      }
    }
    catch (err) {

      console.log(err);
    }
  }


  /*-------*/



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
        _this.setState({ error: '' })
        localStorage.setItem('token', res.data)
        this.setState({ loggedIn: true })
        history.push('/search')
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
      let token = localStorage.getItem('token')
      let userFromToken = jwt.verify(token, '1234')
      console.log('userFromToken', userFromToken);
      if (token) {
        return `שלום ${userFromToken.name}`
      }
      else {
        return 'ברוך הבא לטרמפי'
      }
    }
    catch (err) {
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

  handleResponse = (data) => {
    console.log('data from fb', data);
    this.setState({
      facebook: {
        name: data.profile.name,
        image: data.profile.picture.data.url,
        userID: data.profile.id,
        email: data.profile.email
      }
    })
    const { name, email, userID, image } = this.state.facebook
    this.facebookLogin({ name, email, password: userID, image })
  }

  handleError = (error) => {
    console.log('data from fb', error);
    this.setState({ error });
  }


  renderFb() {
    let token = localStorage.getItem('token')
    if (token) {
      return <div />
    } else {
      // return <FacebookLogin
      //   appId="555630241568464"
      //   autoLoad={false}
      //   fields="name,email,picture"
      //   onClick={this.componentClicked}
      //   callback={this.responseFacebook}
      //   cssClass="my-facebook-button-class"
      //   isMobile={true}
      //   disableMobileRedirect={true}
      //   // icon="fa-facebook"
      //   render={renderProps => (
      //     <button className="btn btn-info fb-button"
      //       style={{
      //         display: 'inline-flex', flexDirection: 'row', background: '#3b5998', color: 'white', width: 200,
      //         marginTop: 4, justifyContent: 'center'
      //       }}
      //       onClick={renderProps.onClick}>
      //       <h5 style={{ marginLeft: 3 }}>התחבר דרך</h5>
      //       <img src={require('../images/facebook-icon.png')} alt={'fb'}
      //         style={{ height: 30, width: 30 }} /></button>
      //   )}
      // />
      return <FacebookProvider appId="555630241568464">
        <LoginButton
          scope="email"
          onCompleted={this.handleResponse}
          onError={this.handleError}
        >
          <span>Login via Facebook</span>
        </LoginButton>
      </FacebookProvider>
    }
  }

  renderChatName() {
    const { conversation, tremp } = this.state
    let userFromToken = helpers.getUserFromToken()

    const participants = conversation && conversation.participants
    const user1 = conversation && conversation.participants[0]
    const user2 = conversation && conversation.participants[1]
    console.log('user1', user1);
    console.log('user2', user2);
    console.log('tremp', tremp);
    console.log('conversation', conversation);

    if (conversation && tremp) {
      const parti = participants.find((parti, i) => {
        return parti._id !== userFromToken._id
      })
      return parti.name
    } else {
      return tremp.user.name
    }
  }
  renderChat() {
    return <Chat isOpen={true}
      messageList={this.state.messageList}
      sendMessage={this.sendMessage}
      handleClick={this.handleChatClick}
      chatName={this.renderChatName()} />
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
          {localStorage.getItem('token') && <ChatMenu
            chatConversationsOpen={this.state.chatConversationsOpen}
            conversations={this.state.conversations}
            getConversations={this.getConversations}
            clickOnConversation={this.clickOnConversation}
          />}


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
              render={() =>
                localStorage.getItem('token')
                  ? <Redirect to='/search' />
                  : <SignUp error={this.state.error} onSignUp={(values) => this.onSignUp(values)} />}
            // render={(props) => (
            //   this.state.signedUp
            //     ? <Redirect to='/login' />
            //     : <SignUp {...props} onSignUp={(values) => this.signUp(values)} />
            // )}
            />
            <Route
              path='/login'
              render={() =>
                localStorage.getItem('token')
                  ? <Redirect to='/search' />
                  : <Login error={this.state.error} onLogin={(values) => this.onLogin(values)} />} />
            {/* <PrivateRoute path='/tremps' component={Tremps} /> */}
            <PrivateRoute path='/MyTremps' component={MyTremps} />
            <PrivateRoute path='/contact' component={Contact} />
            <PrivateRoute path='/about' component={About} />
            <PrivateRouteRender path='/search' render={() => <div>
              <Search
                clickMessage={this.clickMessage}
              />
            </div>} />

            <PrivateRoute path='/adv' component={Adv} />
            <Route component={Error} />
          </Switch>
          {this.renderFb()}
          {this.state.showChat
            && this.renderChat()}
        </div>
      </Router>
    )
  }
}

export default RouterContainer;

