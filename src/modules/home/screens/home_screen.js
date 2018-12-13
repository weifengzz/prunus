/**
 * 引导界面
 * 2018-12-11 09:51
 * @author koohead
 * @description 主页面
 */
import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import {
  SplashScreen,
  PulseLoader
} from '../../../components'
import {
  HeaderLeft,
  HeaderRight,
  HomeSwipe
} from '../component'
import setStackOptions from '../../../config/stackNavigatorOptions'
import commonStyles from '../../../styles'

/**
 * @class
 * @classdesc 主界面
 * @description 主界面
 */
class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  componentDidMount () {
    this.openMenu()
    this.timmer = setTimeout(() => {
      SplashScreen.hide()
      setTimeout(() => {
        this.setState({
          loading: false
        })
      }, 8000)
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
    if (this.state.loading) {
      return (
        <PulseLoader
          borderColor={commonStyles.primaryColor.color}
          avatar={require('../../../assets/images/header.jpg')}
        />
      )
    }
    return (
      <View style={styles.container}>
        <HomeSwipe />
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
