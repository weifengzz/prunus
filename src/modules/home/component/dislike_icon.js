/**
 * 不喜欢动画组件
 * 2018-12-28 11:24
 * @author koohead
 * @description 不喜欢动画组件
 */

import React, { Component } from 'react'
import {
  Animated
} from 'react-native'
import {
  Icon
} from '../../../components'

/**
 * @class
 * @classdesc 不喜欢动画组件
 */
class DisLikeIcon extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bounceValue: new Animated.Value(0.5)
    }
    this.state.bounceValue.setValue(1)
  }

  startAnimate () {
    this.state.bounceValue.setValue(0.5)
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 1,
        friction: 3,
        tension: 40
      }
    ).start()
  }

  render () {
    const { size } = this.props
    return (
      <Animated.View style={{
        transform: [{
          scale: this.state.bounceValue
        }]
      }}>
        <Icon size={size} color={'#bdbdbd'} name='close' type='ant_design' />
      </Animated.View>
    )
  }
}

export default DisLikeIcon
