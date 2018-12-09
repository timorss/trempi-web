import React, { Component } from 'react'
import axios from 'axios'
import config from '../config';
import helpers from '../helpers';
import Chat from '../components/Chat';

export default class ChatMenu extends Component {
  renderConversations(conversations) {
    const { clickOnConversation } = this.props
    const userFromToken = helpers.getUserFromToken().name
    debugger
    return conversations && conversations.map((conv) => {
      return <button key={conv._id} style={{ background: 'lightgreen', marginBottom: 5 }}
        onClick={() => clickOnConversation(conv)}>
        <div>{conv.participants[0].name === userFromToken ? conv.participants[1].name : conv.participants[0].name}</div>
        <div>יעד:{conv.tremp.source}</div>
        <div>מוצא:{conv.tremp.destination}</div>
      </button>
    })
  }
  handleChatClick() {
    this.setState({ showChat: false })
  }

  render() {
    const { conversations, getConversations } = this.props
    return (
      <div>
        <div className='chat-menu'>
          <button type="button" className="btn btn-success" onClick={getConversations}>
            chatMenu
        </button>
        </div>
        <div>{this.renderConversations(conversations)}</div>
      </div>
    )
  }

}