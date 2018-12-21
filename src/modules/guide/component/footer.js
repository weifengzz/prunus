/**
 * 引导页底部组件
 * 2018-12-21 10:02
 * @author koohead
 * @description 引导页底部组件
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView
} from 'react-native'

import {
  TouchableOpacity
} from '../../../components'

import { withNavigation } from 'react-navigation'

const BG_COLOR = [
  '#83ede0',
  '#8bb1e6',
  '#ddb46c'
]

class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      aBackgroundColor: BG_COLOR[0],
      hasShow: false
    }
  }
  chageIndex (index) {
    this.setState({
      aBackgroundColor: BG_COLOR[index]
    })
  }
  render () {
    const { navigation } = this.props
    return (
      <SafeAreaView style={[styles.saView, { backgroundColor: this.state.aBackgroundColor }]}>
        <View style={styles.loginView}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
            }}>
            <View style={[styles.btnRegisterView, { backgroundColor: '#fabd82' }]}>
              <Text style={styles.signinText}>注册</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 3 }}
            onPress={() => {
              navigation.navigate('signin')
            }}>
            <View style={[styles.btnSigniniView, { backgroundColor: '#28b11a' }]}>
              <Text style={styles.signinText}>登录</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              navigation.navigate('main')
            }}>
            <View style={[styles.btnSigniniView, { backgroundColor: '#bdbdbd' }]}>
              <Text style={styles.signinText}>跳过</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  loginView: {
    height: 50,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#bdbdbd'
  },
  btnRegisterView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8
  },
  btnSigniniView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    opacity: 0.8
  },
  saView: {
  },
  signinText: {
    fontSize: 16,
    color: 'white'
  }
})

export default withNavigation(Footer)
