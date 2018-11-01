
import jwt from 'jsonwebtoken'

const helpers = {
  getUserFromToken() {
    let token = localStorage.getItem('token')
    let userFromToken = jwt.verify(token, '1234')
    console.log('userFromToken', userFromToken);
    return userFromToken
  }
}

export default helpers