import React, { Component } from 'react';
import Tremps from '../components/Tremps'
import axios from 'axios'
import config from '../config';
import moment from 'moment';
import SearchForm from '../components/SearchForm';
export default class RouterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tremps: [],
      source: '',
      destination: '',
      date: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.clearField = this.clearField.bind(this)
    this.clearAllFields = this.clearAllFields.bind(this)
  }

  componentWillMount() {
    console.log('willmount')
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    console.log('config.BASE_URL', config.BASE_URL)
    const { source, destination } = this.state
    axios.get(`${config.BASE_URL}/api/tremps`, {
      params: {
        source,
        destination
      }
    })
      .then((res) => {
        const tremps = res.data
        console.log(`you have ${tremps.length} tremps`);
        this.setState({ tremps })
      })
      .catch(function (err) {
        console.log(err);
      })
  }


  getTremps() {
    const { source, destination, date } = this.state
    axios.get(`${config.BASE_URL}/api/tremps`, {
      params: {
        source,
        destination,
        date: (date === '') ? '' : moment(date).format('DD/MM'),
      }
    })
      .then((res) => {
        const tremps = res.data
        console.log('tremps are', tremps);
        this.setState({ tremps })
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  clearField(name) {
    switch (name) {
      case 'source':
        this.setState({ source: '' }, () => this.getTremps());
        break;
      case 'destination':
        this.setState({ destination: '' }, () => this.getTremps());
        break;
      case 'date':
        this.setState({ date: '' }, () => this.getTremps());
        break;
      default:
        break;
    }
  }
  clearAllFields() {
    this.setState({
      source: '',
      destination: '',
      date: ''
    }, () => this.getTremps())
  }

  handleChange(event, name) {
    debugger
    switch (name) {
      case 'source':
        console.log('source', event.target.value);
        this.setState({ source: event.target.value }, () => this.getTremps());
        break;
      case 'destination':
        console.log('destination', event.target.value);
        this.setState({ destination: event.target.value }, () => this.getTremps());
        break;
      default:
        break;
    }
  }

  handleChangeDate(date) {
    this.setState({ date }, () => this.getTremps());
  }

  render() {
    const {
      source,
      destination,
      date } = this.state
    const { clickMessage } = this.props
    return (<div style={{ marginBottom: '10%' }}>
      <SearchForm
        source={source}
        destination={destination}
        date={date}
        onChange={this.handleChange}
        handleChangeDate={this.handleChangeDate}
        clearField={this.clearField}
        clearAllFields={this.clearAllFields}
      />
      <Tremps data={this.state.tremps}
        get={() => this.getTremps()}
        clickMessage={clickMessage}
        titleIfNoTremps={'אנו מצטערים, אין טרמפ העונה לבקשתך.'} />
    </div >
    )
  }
}