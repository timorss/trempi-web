import React, { Component } from 'react'
import helpers from '../helpers';
export default class ChatMenu extends Component {
  renderConversations(conversations) {
    const { clickOnConversation } = this.props
    const userFromToken = helpers.getUserFromToken()._id
    return conversations && conversations.map((conv) => {
      const name = conv.participants[0]._id === userFromToken ? conv.participants[1].name : conv.participants[0].name
      return <button key={conv._id} style={{ background: 'lightgreen', marginBottom: 5 }}
        onClick={() => clickOnConversation(conv)}>
        <div>{name}</div>
        <div>יעד:{conv.tremp.source}</div>
        <div>מוצא:{conv.tremp.destination}</div>
      </button>
    })
  }
  handleChatClick() {
    this.setState({ showChat: false })
  }

  render() {
    const { conversations, getConversations, chatConversationsOpen } = this.props
    return (
      <div>
        <div className='chat-menu'>
          <button type="button" className="btn btn-success" onClick={getConversations}>
            chatMenu
        </button>
        </div>
        <div>{chatConversationsOpen && this.renderConversations(conversations)}</div>
      </div>
    )
  }

}