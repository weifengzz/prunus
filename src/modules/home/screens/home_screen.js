/**
 * 引导界面
 * 2018-12-11 09:51
 * @author koohead
 * @description 主页面
 */
import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import {
  SplashScreen
} from '../../../components'
import {
  HeaderLeft,
  HeaderRight
} from '../component'
import setStackOptions from '../../../config/stackNavigatorOptions'

/**
 * @class
 * @classdesc 主界面
 * @description 主界面
 */
class HomeScreen extends Component {
  componentDidMount () {
    this.openMenu()
    this.timmer = setTimeout(() => {
      SplashScreen.hide()
    }, 50)
  }

  componentWillUnmount () {
    this.timmer && clearTimeout(this.timmer)
  }

  /**
   * 打开deawermenu
   */
  openMenu () {
    this.props.navigation.setParams({
      openMenu: () => {
        this.props.navigation.openDrawer()
      }
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text
          onPress={() => {
            this.props.navigation.navigate('signin')
          }}
        >首页</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

HomeScreen.navigationOptions = props => {
  const { navigation } = props
  return setStackOptions({
    navigation: navigation,
    title: '首页',
    headerLeftComponent: () => <HeaderLeft navigation={navigation} />,
    headerRightComponent: () => <HeaderRight navigation={navigation} />
  })
}

export default HomeScreen
