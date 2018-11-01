import React, { Component } from 'react';
import moment from 'moment'
import axios from 'axios'
import config from '../config';
import helpers from '../helpers';
export default class Tremps extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: [],
    }
  }

  openTremp(id) {
    let arr = this.state.selected
    if (arr.indexOf(id) > -1) {
      arr.splice(arr.indexOf(id), 1)
    } else {
      arr.push(id)
    }
    this.setState({ selected: arr })
  }

  deleteTremp(id) {
    let { get } = this.props
    let headers = { 'x-auth-token': localStorage.getItem('token') }
    let user = helpers.getUserFromToken()
    axios.delete(`${config.BASE_URL}/tremps/${id}`,
      { headers, user: user._id }
    )
      .then((res) => {
        get()
      })
      .catch(function (err) {
        console.log(err.response);
        // console.log(err.response.data);
      })
  }

  renderTremps(tremps, buttons) {
    return tremps.map((tremp) => {
      const open = this.state.selected.indexOf(tremp._id) > -1
      return <div key={tremp._id}
        className={open ? 'is-open' : 'is-closed'}
      >
        <div className='up' style={{ height: open ? '20%' : '100%' }}>
          {buttons && <button type='button'
            style={{ width: '5%', color: 'black' }}
            onClick={() => this.deleteTremp(tremp._id)}
          >
            X
          </button>}
          <div style={{ width: '45%' }}>
            {tremp.source}
          </div>
          <div style={{ width: '45%' }}>
            {tremp.destination}
          </div>
          {/* <div style={{ width: '20%' }}>
            {tremp.date}
          </div> */}
          <div style={{ width: '5%', display: 'flex', justifyContent: 'flex-end' }} onClick={() => this.openTremp(tremp._id)}>
            <img
              style={{ width: 20, height: 20 }}
              alt={'arrow'}
              src={open ? require('../images/upArrow.png') : require('../images/downArrow.png')} />
          </div>
        </div>

        {this.state.selected.indexOf(tremp._id) > -1
          && <div className='down'>
            <div className='down-inside'>
              <div className='details-inside'>
                <div>
                  <strong>שם הנהג:</strong> {tremp.name}
                </div>
                <div>
                  <strong>מס' מקומות:</strong> {tremp.seats}
                </div>
                <div>
                  <strong>צור קשר:</strong> {tremp.phoneNumber}
                </div>
                <div>
                  <strong>הערות:</strong> <span>{tremp.details}</span>
                </div>
              </div>
              <div>
                <div> <strong>תאריך:</strong> <span>{tremp.date}</span></div>
                <div> <strong>שעה:</strong> <span>{moment(tremp.time).format('HH:mm')}</span></div>
                <div> <strong>מחיר:</strong> <span>{tremp.participate}</span></div>
              </div>

            </div>
          </ div >
        }
      </ div >

    })

  }

  render() {
    const { data, titleIfNoTremps, buttons } = this.props
    return (
      <div id='big-div-table' >
        <div id='head'>
          <div style={{ width: '45%' }}>
            מוצא:
						</div>
          <div style={{ width: '45%' }}>
            יעד:
						</div>
          {/* <div style={{ width: '20%' }}>
            תאריך:
						</div> */}
          <div style={{ width: '10%' }}></div>
        </div>
        {
          data.length === 0
            ? <div>{titleIfNoTremps}</div>
            : this.renderTremps(data, buttons)
        }
      </div>
    )
  }
}