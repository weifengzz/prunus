/**
 * StatckNavigator通用配置
 * 2018-12-12 11:05
 * @author koohead
 * @description StatckNavigator通用配置
 */
import React from 'react'
import {
  View,
  Keyboard
} from 'react-native'
import commonStyles from '../styles'
import {
  Icon,
  TouchableOpacity
} from '../components'

/**
 * 头部返回界面
 * @param {any} navigation react-navigation
 * @param {any} color 颜色
 */
const headerLeft = (navigation, color = '#ffffff') => {
  return (
    <TouchableOpacity
      onPress={() => goBackAction(navigation)}
      style={{ paddingHorizontal: 15, height: 45, justifyContent: 'center' }}>
      <Icon size={20} color={color} name='arrow-left' type='simple_line_icon' />
    </TouchableOpacity>
  )
}

/**
 * 设置配置
 * @param {any} navigation react-navigation
 * @param {string} title 标题
 * @param {any} autoHeaderLeft 自动填充导航左边组件
 * @param {any} autoHeaderRight 自动填充导航右边组件
 */
const setStackOptions = (navigation, title, autoHeaderLeft, autoHeaderRight = true) => {
  let option = {
    title,
    headerStyle: {
      backgroundColor: commonStyles.primaryColor.color,
      borderBottomWidth: 0,
      height: 45,
      elevation: 0,
      shadowOpacity: 0
    },
    headerTitleStyle: {
      color: 'white',
      textAlign: 'center',
      flex: 1
    }
  }
  if (autoHeaderLeft) {
    option['headerLeft'] = headerLeft(navigation)
  }
  if (autoHeaderRight) {
    option['headerRight'] = <View />
  }
  return option
}

/**
 * 返回事件
 * @param {*} navigation react-navigation
 */
const goBackAction = navigation => {
  Keyboard.dismiss()
  navigation.goBack(null)
}

export default setStackOptions
