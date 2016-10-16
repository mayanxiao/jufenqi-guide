import React, {Component} from 'react'
import './Jcard.less'

export default class Jcard extends Component {
  render () {
    return <div className='schedule'>
      <div className='user-icon'>
        <img src={this.props.userImg} />
      </div>
      <div className='user-name'>{this.userName}</div>
      <div className='user-appointment-time'>预约时间：{this.props.appointTime}</div>
      <div className='user-appointment-shop'>{this.props.appointShop}</div>
      <div className='user-tel'>{this.props.userTel}</div>
      <div className='line' />
      <div className='butler-icon'>
        <img src={this.props.butlerImg} />
      </div>
      <div className='butler-name'>{this.props.butlerName}</div>
      <div className='butler-tel'>{this.props.butlerTel}</div>
    </div>
  }
}
