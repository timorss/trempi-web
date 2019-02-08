import React, { PureComponent } from 'react'
import helpers from '../helpers';
import socket from '../socket';
import axios from 'axios'
import config from '../config';

export default class ChatMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      chatOpen: false,
      usersOnline: []
    }
    this.getConversations = this.getConversations.bind(this)
  }
  // componentDidMount() {
  //   let userFromToken = helpers.getUserFromToken()
  //   socket.emit('leave loby', userFromToken._id)
  //   socket.on('get users', (data) => {
  //     console.log('usersOnline', data);
  //     this.setState({
  //       usersOnline: data,
  //       chatOpen: false
  //     })
  //   })
  // }

  async getConversations() {
    console.log('getConversations!!!!!!!!!!!!!!!!!!!!!');
    console.log('socketId from chat menu', socket);
    let _this = this
    const { chatOpen } = this.state
    let userFromToken = helpers.getUserFromToken()
    try {

      const res = await axios.get(`${config.BASE_URL}/api/conversations/${userFromToken._id}`)
      let conversations = res.data
      console.log('conversations are: ', conversations);
      console.log('conversations length are: ', conversations.length);
      if (chatOpen) {
        socket.emit('leave loby', userFromToken._id)
        // debugger
        socket.on('get users', (data) => {
          console.log('data&&&&&&&&&&&&&&&&&&&&&&&&&&&&&', data);
          this.setState({
            usersOnline: data,
            conversations,
            chatOpen: false
          })
        })
        // this.setState({ chatOpen: false })
      } else {
        socket.emit('join loby', userFromToken._id)
        socket.on('get users', (data) => {
          // console.log('usersOnline', data);
          this.setState({
            usersOnline: data,
            conversations,
            chatOpen: true
          })
        })
      }

    } catch (err) {
      console.log(err.response);
    }
  }



  renderConversations(conversations) {
    const { clickOnConversation } = this.props
    const { usersOnline } = this.state
    console.log('usersOnline', usersOnline);
    const userFromToken = helpers.getUserFromToken()
    return conversations && conversations.map((conv) => {
      const name = conv.participants[0]._id === userFromToken._id ? conv.participants[1].name : conv.participants[0].name

      const id = conv.participants[0]._id === userFromToken._id ? conv.participants[1]._id : conv.participants[0]._id
      const connected = usersOnline.find((userId) => {
        return userId === id
      })


      return <button key={conv._id} style={{ background: 'lightgreen', marginBottom: 5, marginRight: 5, position: 'relative' }}
        onClick={() => clickOnConversation(conv)}>
        <div>{name}</div>
        <div>יעד:{conv.tremp.source}</div>
        <div>מוצא:{conv.tremp.destination}</div>
        {connected && <div style={{ width: 10, height: 10, background: 'rgb(66, 183, 42)', borderRadius: '50%', position: 'absolute', top: -5, right: -5 }}></div>}
      </button>
    })
  }
  // handleChatClick() {
  //   this.setState({ showChat: false })
  // }

  render() {
    // const { conversations, getConversations } = this.props
    const { chatOpen, conversations } = this.state
    console.log('chatOpen', chatOpen);

    return (
      <div>
        <div className='chat-menu'>
          <button type="button" className="btn btn-success" onClick={this.getConversations}>
            chatMenu
        </button>
        </div>
        <div>{chatOpen && this.renderConversations(conversations)}</div>
      </div>
    )
  }
}