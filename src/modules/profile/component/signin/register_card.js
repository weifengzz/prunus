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
import { px } from '../../../../utils'
import CommonTextInput from './common_textinput'
/**
 * @class
 * @classdesc 注册卡片
 */
class RegisterCard extends Component {
  _renderText () {
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
            iconSize={25}
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
            />
          </View>
          <View style={[styles.verificationCodeView, { backgroundColor: '#3682ff' }]}>
            <Text style={styles.verificationCodeText}>获取</Text>
          </View>
        </View>
      </View>
    )
  }

  _renderTopView () {
    return (
      <View style={[styles.topView]}>
        <Text style={styles.signinText}>用户注册</Text>
      </View>
    )
  }

  _renderFooterView () {
    const { onFlipPress } = this.props
    return (
      <View style={{ flex: 3 }}>
        <View style={styles.signinBtn}>
          <Text style={styles.signinBtnText}>注册</Text>
        </View>
        <View style={styles.footerBottomView}>
          <Text
            style={styles.smallText}
            onPress={() => {
              onFlipPress()
            }}
          >返回登录</Text>
          <Text style={[styles.smallText]}>    |    </Text>
          <Text style={styles.smallText}>忘记密码？</Text>
        </View>
      </View>
    )
  }

  render () {
    const { height, width } = this.props
    return (
      <View style={[styles.container, { height, width }]}>
        { this._renderTopView() }
        { this._renderText() }
        { this._renderFooterView() }
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
    borderRadius: 15,
    padding: 10
  },
  topView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2
  },
  signinText: {
    fontSize: 23,
    color: 'white',
    fontWeight: 'bold'
  },
  signinBtn: {
    marginTop: 20,
    height: 50,
    backgroundColor: '#3682ff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signinBtnText: {
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

export default RegisterCard
