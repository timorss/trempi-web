
import jwt from 'jsonwebtoken'

const helpers = {
  getUserFromToken() {
    let token = localStorage.getItem('token')
    if (token) {
      let userFromToken = jwt.verify(token, '1234')
      return userFromToken
    }
  }
}

export default helpers