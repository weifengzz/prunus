/**
 * 登录卡片
 * 2018-12-21 11:48
 * @author koohead
 * @description 登录卡片
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import { px } from '../../../../utils'

/**
 * @class
 * @classdesc 登录卡片
 */
class RegisterCard extends Component {
  render () {
    const { height, width, onFlipPress } = this.props
    return (
      <View style={[styles.container, { height, width }]}>
        <Text onPress={() => {
          onFlipPress()
        }}>翻转2</Text>
      </View>
    )
  }
}

RegisterCard.defaultProps = {
  height: 300,
  wdith: 200,
  onFlipPress: () => {}
}

const styles = StyleSheet.create({
  container: {
    borderWidth: px(2),
    borderColor: '#bdbdbd',
    borderRadius: 15
  }
})

export default RegisterCard
