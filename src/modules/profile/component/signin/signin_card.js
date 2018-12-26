/**
 * 登录卡片
 * 2018-12-21 11:48
 * @author koohead
 * @description 登录卡片
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import { px } from '../../../../utils'
import CommonTextInput from './common_textinput'
/**
 * @class
 * @classdesc 登录卡片
 */
class SigninCard extends Component {
  render () {
    // onFlipPress
    const { height, width } = this.props
    return (
      <View style={[styles.container, { height, width }]}>
        <View style={{ height: 40 }}>
          <CommonTextInput
            style={{ backgroundColor: '#f9f5ed' }}
            label={'用户名'}
            iconType={'icon_font'}
            iconName={'p_home'}
            iconColor={'#bdbdbd'}
            labelStyle={{ color: '#bdbdbd' }}
            inputStyle={{ color: '#bdbdbd' }}
            useNativeDriver
            iconSize={25}
          />
        </View>
      </View>
    )
  }
}

SigninCard.defaultProps = {
  height: 300,
  wdith: 200,
  onFlipPress: () => {}
}

const styles = StyleSheet.create({
  container: {
    borderWidth: px(2),
    borderColor: '#bdbdbd',
    borderRadius: 15,
    padding: 10
  }
})

export default SigninCard
