import React, { Component } from 'react';
import axios from 'axios'
import config from '../config';
import Tremps from '../components/Tremps';
import helpers from '../helpers';

export default class MyTremps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tremps: []
    }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.getTremps()
  }

  getTremps() {
    let userFromToken = helpers.getUserFromToken()
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    console.log('config.BASE_URL', config.BASE_URL)
    axios.get(`${config.BASE_URL}/api/tremps/${userFromToken._id}`)
      .then((res) => {
        const tremps = res.data
        console.log('tremps are', tremps);
        this.setState({ tremps })
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  render() {
    return (<div style={{ marginTop: '7%', marginBottom: '10%' }}>
      <Tremps data={this.state.tremps}
        get={() => this.getTremps()}
        buttons
        titleIfNoTremps={'טרמפ שתפרסם יוצג כאן.'} />
    </div>
    )
  }
}

