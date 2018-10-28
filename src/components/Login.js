import React, { Component } from 'react';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value })
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onLogin(this.state)
  }

  render() {
    const { email, password } = this.state
    const { error } = this.props
    debugger
    return (
      <div className="App" >

        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '10%' }}>
          {/* <h5>התחבר לטרמפי כדי לתפוס טרמפ!</h5> */}
          <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
            <div class="form-group">
              <input type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="אימייל"
                value={email}
                onChange={this.onChangeEmail}
              />
              <small id="emailHelp" class="form-text text-muted">האימייל לא ישותף עם אף אחד אחר</small>
            </div>
            <div class="form-group">
              <input type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword} />
            </div>
            <button type="submit" class="btn btn-info">התחבר</button>
            {/* <input type="text" value={email} onChange={this.onChangeEmail} placeholder="email" /> */}
            {/* <input type="text" value={password} onChange={this.onChangePassword} placeholder="password" /> */}
            {/* <input type="submit" value="signIn" className="calculate-button" /> */}
          </form>
          <div>{error}</div>
        </div>


      </div >
    );
  }
}

export default Login;
