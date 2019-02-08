import axios from 'axios'
import config from '../config'

const getMessageList = async (conversationId) => {
  // let userFromToken = helpers.getUserFromToken()
  try {
    const res = await axios.get(`${config.BASE_URL}/api/messages`, {
      params: {
        conversationId,
      }
    })
    const messageList = res.data
    console.log('messageList is', messageList);
    // format the message to be in the chat fotmat
    const formattedmMessageList = messageList.map((data) => {
      const { message } = data
      debugger
      return {
        author: message.author,
        type: message.type,
        data: { [message.type]: message.data[message.type] }
      }
    })
    return formattedmMessageList
    // this.setState({ messageList: formattedmMessageList })

  }
  catch (err) {
    debugger
    console.log(err);
  }
}

export {
  getMessageList
}
