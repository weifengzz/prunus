/**
 * 注册卡片
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
import {
  TouchableOpacity,
  Toast
} from '../../../../components'
import { phoneAvailable } from '../../../../utils'
import CommonTextInput from './common_textinput'
import { withNavigation } from 'react-navigation'

/**
 * @class
 * @classdesc 注册卡片
 */
class RegisterCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      registerLoading: false,
      registerSuccess: false
    }
    this.userName = ''
    this.password = ''
    this.verificationCode = ''
  }

  /**
   * 登录验证
   */
  registerAvailable () {
    const { onJiggle } = this.props
    if (!this.userName) {
      Toast.show('请输入手机号！', {
        position: Toast.positions.CENTER
      })
      return onJiggle()
    }
    if (!this.password) {
      Toast.show('请输入密码！', {
        position: Toast.positions.CENTER
      })
      return onJiggle()
    }
    if (!this.verificationCode) {
      Toast.show('请输入验证码！', {
        position: Toast.positions.CENTER
      })
      return onJiggle()
    }
    if (!phoneAvailable(this.userName)) {
      Toast.show('手机号格式不正确！', {
        position: Toast.positions.CENTER
      })
      return onJiggle()
    }
    if (this.password.length < 6) {
      Toast.show('密码不能小于6位！', {
        position: Toast.positions.CENTER
      })
      return onJiggle()
    }
    this.setState({
      registerLoading: true
    })
    setTimeout(() => {
      this.setState({
        registerLoading: false,
        registerSuccess: true
      })
      setTimeout(() => {
        this.props.navigation.goBack(null)
      }, 500)
    }, 2000)
  }

  /**
   * 输入框界面
   */
  _renderTextInput () {
    return (
      <View>
        <View style={{ height: 50 }}>
          <CommonTextInput
            selectionColor={'white'}
            label={'手机号'}
            iconType={'ant_design'}
            iconName={'user'}
            iconColor={'#bdbdbd'}
            labelStyle={{ color: '#bdbdbd' }}
            inputStyle={{ color: 'white' }}
            useNativeDriver
            keyboardType={'numeric'}
            iconSize={25}
            onChange={(e) => {
              this.userName = e.nativeEvent.text
            }}
          />
        </View>
        <View style={{ height: 20 }} />
        <View style={{ height: 50 }}>
          <CommonTextInput
            selectionColor={'white'}
            label={'密    码'}
            iconType={'ant_design'}
            secureTextEntry
            iconName={'key'}
            iconColor={'#bdbdbd'}
            labelStyle={{ color: '#bdbdbd' }}
            inputStyle={{ color: 'white' }}
            useNativeDriver
            iconSize={25}
            onChange={(e) => {
              this.password = e.nativeEvent.text
            }}
          />
        </View>
        <View style={{ height: 20 }} />
        <View style={{ height: 50, flexDirection: 'row' }}>
          <View style={{ flex: 3 }}>
            <CommonTextInput
              selectionColor={'white'}
              label={'验证码'}
              iconType={'ant_design'}
              iconName={'Safety'}
              iconColor={'#bdbdbd'}
              labelStyle={{ color: '#bdbdbd' }}
              inputStyle={{ color: 'white' }}
              useNativeDriver
              iconSize={25}
              onChange={(e) => {
                this.verificationCode = e.nativeEvent.text
              }}
            />
          </View>
          <View style={[styles.verificationCodeView, { backgroundColor: '#51a9e7' }]}>
            <Text style={styles.verificationCodeText}>获取</Text>
          </View>
        </View>
      </View>
    )
  }

  /**
   * 头部标题界面
   */
  _renderTopView () {
    return (
      <View style={[styles.topView]}>
        <Text style={styles.registerText}>手机号注册</Text>
      </View>
    )
  }

  /**
   * 底部操作界面
   */
  _renderFooterView () {
    const { onFlipPress } = this.props
    return (
      <View style={{ flex: 5 }}>
        <TouchableOpacity
          disabled={this.state.registerLoading || this.state.registerSuccess}
          onPress={() => {
            this.registerAvailable()
          }}
          style={[styles.registerBtn, { backgroundColor: this.state.registerLoading ? '#bdbdbd' : '#51a9e7' }]}>
          <Text style={styles.registerBtnText}>{ this.state.registerLoading ? '注册中...' : (this.state.registerSuccess ? '注册成功' : '注册') }</Text>
        </TouchableOpacity>
        <View style={styles.footerBottomView}>
          <Text
            style={styles.smallText}
            onPress={() => {
              onFlipPress()
            }}
          >返回登录</Text>
          <Text style={[styles.smallText]}>    |    </Text>
          <Text
            style={styles.smallText}
            onPress={() => {
              this.props.navigation.navigate('forget_password')
            }}
          >忘记密码？</Text>
        </View>
      </View>
    )
  }

  render () {
    const { height, width } = this.props
    return (
      <View style={[styles.container, { height, width }]}>
        <View style={{ height, width, position: 'absolute', top: 0, left: 0, backgroundColor: 'black', opacity: 0.1, borderRadius: 20 }} />
        { this._renderTopView() }
        { this._renderTextInput() }
        { this._renderFooterView() }
      </View>
    )
  }
}

RegisterCard.defaultProps = {
  height: 300,
  wdith: 200,
  onFlipPress: () => {},
  onJiggle: () => {}
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: px(2),
    // borderColor: '#bdbdbd',
    borderRadius: 15,
    padding: 10
  },
  topView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2
  },
  registerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  registerBtn: {
    marginTop: 20,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  registerBtnText: {
    fontSize: 16,
    color: 'white'
  },
  footerBottomView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20
  },
  smallText: {
    color: '#bdbdbd',
    fontSize: 14
  },
  verificationCodeView: {
    flex: 2,
    marginLeft: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8
  },
  verificationCodeText: {
    fontSize: 16,
    color: 'white'
  }
})

export default withNavigation(RegisterCard)
