/**
 * StatckNavigator通用配置
 * 2018-12-12 11:05
 * @author koohead
 * @description StatckNavigator通用配置
 */
import React from 'react'
import {
  View,
  Keyboard,
  Platform,
  StatusBar
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
      onPress={() => goBackAction(navigation)}>
      <View style={{ paddingHorizontal: 15, height: commonStyles.headerHeight.height, justifyContent: 'center' }}>
        <Icon size={20} color={color} name='arrow-left' type='simple_line_icon' />
      </View>
    </TouchableOpacity>
  )
}

/**
 * 设置配置
 */
const setStackOptions = ({
  navigation, // react-navigation
  title, // 标题
  autoHeaderLeft, // 自动填充导航左边组件
  autoHeaderRight, // 自动填充导航右边组件
  headerLeftComponent, // 左边组件
  headerRightComponent // 右边组件
}) => {
  let option = {
    title,
    headerStyle: {
      backgroundColor: commonStyles.primaryColor.color,
      borderBottomWidth: 0,
      height: Platform.OS === 'ios' ? commonStyles.headerHeight.height : StatusBar.currentHeight + commonStyles.headerHeight.height,
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
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
  } else {
    if (headerLeftComponent) {
      option['headerLeft'] = headerLeftComponent()
    } else {
      option['headerLeft'] = null
    }
  }
  if (autoHeaderRight) {
    option['headerRight'] = <View />
  } else {
    if (headerRightComponent) {
      option['headerRight'] = headerRightComponent()
    }
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
