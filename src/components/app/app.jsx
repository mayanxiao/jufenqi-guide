import React, {Component} from 'react'
import Jcard from '../Jcard/Jcard.jsx'
import './app.less'

const orders = [
  {
    userImg: 'http://lorempixel.com/60/60',
    userName: '郑家园',
    userTel: 18601230123,
    appointTime: '2016-10-16 06:30',
    appointShop: '北四环居然之家',
    butlerImg: 'http://lorempixel.com/60/60',
    butlerName: '郑家园',
    butlerTel: 18612341234,
    status: 0 // 0为未完成,1为已完成
  },
  {
    userImg: 'http://lorempixel.com/60/60',
    userName: '郑家园',
    userTel: 18601230123,
    appointTime: '2016-10-16 06:30',
    appointShop: '北四环居然之家',
    butlerImg: 'http://lorempixel.com/60/60',
    butlerName: '郑家园',
    butlerTel: 18612341234,
    status: 0 // 0为未完成,1为已完成
  },
  {
    userImg: 'http://lorempixel.com/60/60',
    userName: '郑家园',
    userTel: 18601230123,
    appointTime: '2016-10-11 06:30',
    appointShop: '北四环居然之家',
    butlerImg: 'http://lorempixel.com/60/60',
    butlerName: '郑家园',
    butlerTel: 18612341234,
    status: 1 // 0为未完成,1为已完成
  },
  {
    userImg: 'http://lorempixel.com/60/60',
    userName: '郑家园',
    userTel: 18601230123,
    appointTime: '2016-10-18 06:30',
    appointShop: '北四环居然之家',
    butlerImg: 'http://lorempixel.com/60/60',
    butlerName: '郑家园',
    butlerTel: 18612341234,
    status: 0 // 0为未完成,1为已完成
  }
]

export default class App extends Component {
  render () {
    let todayList = []
    let notToday = []
    orders.map((e, key) => {
      let c = e.appointTime.split(' ')[0]
      let d = new Date()
      let Y = d.getFullYear() + '-'
      let M = (d.getMonth() + 1 < 10
                ? '0' + (d.getMonth() + 1)
                : d.getMonth() + 1) + '-'
      let D = d.getDate() < 10
                ? '0' + d.getDate()
                : d.getDate()
      d = Y + M + D
      if (!e.status) {
        if (c === d) {
          todayList.push(
            <Jcard key={key} userImg={e.userImg} userName={e.userName} userTel={e.userTel} appointTime={e.appointTime} appointShop={e.appointShop} butlerImg={e.butlerImg} butlerName={e.butlerName} butlerTel={e.butlerTel} />
                    )
        } else {
          notToday.push(
            <Jcard key={key} userImg={e.userImg} userName={e.userName} userTel={e.userTel} appointTime={e.appointTime} appointShop={e.appointShop} butlerImg={e.butlerImg} butlerName={e.butlerName} butlerTel={e.butlerTel} />
                    )
        }
      }
    })
    return <div className='block'>
      {todayList.length
                ? <div className='title'>今日日程</div>
                : ''}
      {todayList}
      {notToday.length
                ? <div className='title'>未来日程</div>
                : ''}
      {notToday}
    </div>
  }
}
