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
import {
  Icon,
  TouchableOpacity
} from '../../../../components'
import { px } from '../../../../utils'
import CommonTextInput from './common_textinput'
/**
 * @class
 * @classdesc 登录卡片
 */
class SigninCard extends Component {
  _renderText () {
    return (
      <View>
        <View style={{ height: 50 }}>
          <CommonTextInput
            selectionColor={'white'}
            label={'用户名'}
            iconType={'ant_design'}
            iconName={'user'}
            iconColor={'#bdbdbd'}
            labelStyle={{ color: '#bdbdbd' }}
            inputStyle={{ color: 'white' }}
            useNativeDriver
            keyboardType={'numeric'}
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
      </View>
    )
  }

  _renderTopView () {
    return (
      <View style={[styles.topView]}>
        <Text style={styles.signinText}>用户登录</Text>
      </View>
    )
  }

  _renderFooterView () {
    const { onFlipPress } = this.props
    return (
      <View style={{ flex: 5 }}>
        <TouchableOpacity style={styles.signinBtn}>
          <Text style={styles.signinBtnText}>登录</Text>
        </TouchableOpacity>
        <View style={styles.footerBottomView}>
          <Text
            style={styles.smallText}
            onPress={() => {
              onFlipPress()
            }}
          >我要注册</Text>
          <Text style={[styles.smallText]}>    |    </Text>
          <Text style={styles.smallText}>忘记密码？</Text>
        </View>
        <View style={styles.anotherSigninView}>
          <View style={styles.aSigninTopView}>
            <View style={{ flex: 1, height: px(2), backgroundColor: '#bdbdbd' }} />
            <Text style={{ fontSize: 14, color: '#bdbdbd', marginHorizontal: 10 }}>第三方登录</Text>
            <View style={{ flex: 1, height: px(2), backgroundColor: '#bdbdbd' }} />
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              style={{ height: 40, width: 40, borderRadius: 25, backgroundColor: '#22bf0a', alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon size={25} color={'#bdbdbd'} name={'wechat'} type={'ant_design'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  render () {
    // onFlipPress
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
    backgroundColor: '#51a9e7',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signinBtnText: {
    fontSize: 16,
    color: 'white'
  },
  footerBottomView: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20
  },
  smallText: {
    color: '#bdbdbd',
    fontSize: 14
  },
  anotherSigninView: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  aSigninTopView: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default SigninCard
