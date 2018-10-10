import React, { Component } from 'react';
// const tremps = [
//   {
//     id: 1,
//     source: 'tlv',
//     dest: 'bat-yam',
//     date: '21.4.12',
//     time: '9:00',
//     price: 10,
//     driver: 3,
//     seats: 3,
//     number: 3,
//     details: 3,
//   },
//   {
//     id: 2,
//     source: 'tlv',
//     dest: 'bat-yam',
//     date: '21.4.12',
//     time: '9:00',
//     price: 10,
//     driver: 3,
//     seats: 3,
//     number: 3,
//     details: 3,
//   },
//   {
//     id: 3,
//     source: 'tlv',
//     dest: 'bat-yam',
//     date: '21.4.12',
//     time: '9:00',
//     price: 10,
//     driver: 3,
//     seats: 3,
//     number: 3,
//     details: 3,
//   }
// ]

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

  renderTremps(tremps) {
    debugger
    return tremps.map((tremp) => {
      const open = this.state.selected.indexOf(tremp._id) > -1
      return <div key={tremp._id}
        className={open ? 'is-open' : 'is-closed'}

      >
        <div className='up' style={{ height: open ? '20%' : '100%' }}>
          <div >
            {tremp.source}
          </div>
          <div  >
            {tremp.destination}
          </div>
          <div  >
            {tremp.date}
          </div>
          <div onClick={() => this.openTremp(tremp._id)}>
            <img
              style={{ width: 25, height: 25 }}
              alt={'arrow'}
              src={require('../images/arrowdown.png')} />
          </div>
        </div>

        {this.state.selected.indexOf(tremp._id) > -1
          && <div className='down'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ marginLeft: 100 }}>
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
                <div> <strong>שעה:</strong> <span>{tremp.time}</span></div>
                <div> <strong>מחיר:</strong> <span>{tremp.participate}</span></div>
              </div>
            </div>


          </ div >
        }
      </ div >

    })

  }

  render() {
    const { data } = this.props
    return (
      <div id='big-div-table' >
        <div id='head'>
          <div>
            מוצא:
						</div>
          <div>
            יעד:
						</div>
          <div>
            תאריך:
						</div>
          <div ></div>
        </div>
        {
          data.length === 0
            ? <div>אנו מצטערים, אין טרמפ העונה לבקשתך.</div>
            : this.renderTremps(data)
        }
      </div>
    )
  }
}