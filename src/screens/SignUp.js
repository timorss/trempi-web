import React, { Component } from 'react';
import axios from 'axios'
import config from '../config';
class SignUp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      users: [],
      name: '',
      email: '',
      password: ''
    }
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.getUsers()
  }

  onChangeName(event) {
    this.setState({ name: event.target.value })
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value })
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value })
  }

  getUsers() {
    axios.get(`${config.BASE_URL}/users`)
      .then((res) => {
        const users = res.data
        console.log('users are: ', users);
        this.setState({ users: users })
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSignUp(this.state)
  }

  renderUsers(users) {
    return users.map((user, i) => {
      return <div key={i}>
        <div>{user.name}</div>
        <div>{user.email}</div>
        <div>{user.password}</div>
      </div>
    })
  }

  render() {
    const { name, email, password } = this.state
    const { error } = this.props
    return (
      <div className="App" >
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '10%' }}>
          {/* <h1 className="App-title">Users</h1>
          {this.renderUsers(this.state.users)} */}
          <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 200 }}>

            <div className="form-group">
              <input type="text"
                className="form-control"
                // id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="שם"
                value={name}
                onChange={this.onChangeName}
              />

            </div>
            <div className="form-group">
              <input type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="אימייל"
                value={email}
                onChange={this.onChangeEmail}
              />
              <small id="emailHelp" className="form-text text-muted">האימייל לא ישותף עם אף אחד אחר</small>
            </div>
            <div className="form-group">
              <input type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword} />
            </div>

            {/* <input type="text" value={name} onChange={this.onChangeName} placeholder="שם" /> */}
            {/* <input type="text" value={email} onChange={this.onChangeEmail} placeholder="אימייל" /> */}
            {/* <input type="text" placeholder="סיסמה" /> */}
            <button type="submit" className="btn btn-info">הירשם</button>
          </form>
          <div>{error}</div>
        </div>



      </div >
    );
  }
}

export default SignUp;
