/**
 * 自定义按钮，防止重复点击
 * 2018-12-11 11:46
 * @author koohead
 * @description 自定义按钮，防止重复点击
 */
import React, { Component } from 'react'
import {
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native'
import Platform from 'Platform'

/**
 * @class
 * @classdesc 自定义按钮，防止重复点击
 */
class NormalTouchableOpacity extends Component {
  constructor (props) {
    super(props)
    this.clickable = true
  }
  componentWillUnmount () {
    this.timer && clearTimeout(this.timer)
  }
  // 不使用feedback
  _renderNoUseFeedback () {
    const { intervalTime, style, onPress, children, noInterval, disableCallback, ...props } = this.props
    return (
      <TouchableOpacity {...props} onPress={() => {
        if (noInterval) {
          onPress()
        } else {
          if (this.clickable) {
            onPress()
            this.clickable = false
            this.timer = setTimeout(() => {
              this.clickable = true
            }, intervalTime)
          } else {
            disableCallback()
          }
        }
      }} style={style}>
        {children}
      </TouchableOpacity>
    )
  }
  // 使用feedback
  _renderUseFeedBack () {
    const { intervalTime, style, onPress, children, noInterval, disableCallback, ...props } = this.props
    return (
      <TouchableNativeFeedback {...props} onPress={() => {
        if (noInterval) {
          onPress()
        } else {
          if (this.clickable) {
            onPress()
            this.clickable = false
            this.timer = setTimeout(() => {
              this.clickable = true
            }, intervalTime)
          } else {
            disableCallback()
          }
        }
      }} style={style}>
        {children}
      </TouchableNativeFeedback>
    )
  }
  render () {
    const { useFeedBack } = this.props
    if (Platform.OS === 'android' && useFeedBack) {
      return this._renderUseFeedBack()
    } else {
      return this._renderNoUseFeedback()
    }
  }
}

NormalTouchableOpacity.defaultProps = {
  onPress: () => {},
  style: null,
  noInterval: false,
  intervalTime: 1000,
  useFeedBack: false,
  disableCallback: () => {}
}

export default NormalTouchableOpacity
