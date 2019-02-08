import config from '../config';
import _socket from 'socket.io-client';
// import io from 'socket.io';
import helpers from '../helpers';
const userFromToken = helpers.getUserFromToken()


const socket = _socket.connect(config.BASE_URL, {
  query: {
    idFromTtoken: userFromToken && userFromToken._id
  }
})







export default socket