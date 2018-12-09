import React, { Component } from 'react'
import { Launcher } from 'react-chat-window'
export default class Demo extends Component {
  render() {
    const { isOpen, handleClick, chatName, messageList, sendMessage } = this.props
    return (<div>
      <Launcher
        agentProfile={{
          teamName: chatName,
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={sendMessage}
        isOpen={isOpen}
        messageList={messageList}
        handleClick={handleClick}
        showEmoji
      />
    </div>)
  }

}