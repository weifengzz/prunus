/**
 * 引导界面
 * 2018-12-11 09:49
 * @author koohead
 * @description 引导界面
 */
import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  Image
} from 'react-native'
import {
  SplashScreen,
  RNSwiper
} from '../../../components'
import {
  Footer
} from '../component'

/**
 * @class
 * @classdesc 引导页
 * @description 引导页
 */
class GuideScreen extends Component {
  componentDidMount () {
    this.timmer = setTimeout(() => {
      SplashScreen.hide()
    }, 50)
  }

  componentWillUnmount () {
    this.timmer && clearTimeout(this.timmer)
  }

  render () {
    return (
      <View style={styles.container}>
        <RNSwiper
          autoplay
          showsPagination={false}
          style={styles.wrapper}
          onIndexChanged={(index) => {
            this.footer && this.footer.chageIndex(index)
          }}
        >
          <Image source={require('../../../assets/images/intro_top_1.png')} style={styles.image} />
          <Image source={require('../../../assets/images/intro_top_2.png')} style={styles.image} />
          <Image source={require('../../../assets/images/intro_top_3.png')} style={styles.image} />
        </RNSwiper>
        <Footer onRef={(footer) => { this.footer = footer }} />
        <StatusBar hidden />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch'
  },
  wrapper: {
  },
  loginView: {
    height: 50,
    flexDirection: 'row'
  },
  btnRegisterView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue'
  },
  btnSigniniView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  saView: {
  }
})

export default GuideScreen
