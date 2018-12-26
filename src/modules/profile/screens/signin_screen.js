/**
 * 登录界面
 * 2018-12-11 10:18
 * @author koohead
 * @description 注册界面
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  Platform,
  Dimensions
} from 'react-native'
import {
  CardFlip,
  TouchableOpacity,
  Icon,
  TextInputScrollView
} from '../../../components'
import {
  SigninCard,
  RegisterCard
} from '../component/signin'
// import setStackOptions from '../../../config/stackNavigatorOptions'
// import commonStyles from '../../../styles'
// import { px } from '../../../utils'

const { width: G_WIDTH, height: G_HEIGHT } = Dimensions.get('window')

/**
 * @class
 * @classdesc 登录界面
 * @description 登录界面
 */
class SigninScreen extends Component {
  /**
   * 登录卡片
   */
  _renderSigninCard () {
    return (
      <SigninCard
        width={G_WIDTH - 40}
        height={G_WIDTH}
        onFlipPress={() => {
          this.cardFlip.flip()
        }}
      />
    )
  }

  // 注册卡片
  _renderRegisterCard () {
    return (
      <RegisterCard
        width={G_WIDTH - 40}
        height={G_WIDTH}
        onFlipPress={() => {
          this.cardFlip.flip()
        }}
      />
    )
  }

  /**
   * 返回按钮
   */
  _renderBackView () {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack(null)
          }}
          style={styles.backView}>
          <Icon size={20} color={'white'} name={'arrow-left'} type={'simple_line_icon'} />
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Image blurRadius={10} source={require('../../../assets/images/signin_bg4.jpg')} style={styles.bgImage} />
        <View style={styles.bgView} />
        <TextInputScrollView>
          <SafeAreaView style={{ height: G_HEIGHT }}>
            { this._renderBackView() }
            <View style={styles.cardView}>
              <CardFlip
                ref={(cf) => { this.cardFlip = cf }}
                style={{ height: G_WIDTH, width: G_WIDTH - 40 }}
              >
                { this._renderSigninCard() }
                { this._renderRegisterCard() }
              </CardFlip>
            </View>
            <View style={styles.bottomView} />
          </SafeAreaView>
        </TextInputScrollView>
        <StatusBar barStyle={'dark-content'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
    opacity: 0.7
  },
  bgView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.2,
    backgroundColor: 'black'
  },
  backView: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: Platform.OS === 'android' ? 10 + StatusBar.currentHeight : 10
  },
  bottomView: {
    flex: 1
  }
})

SigninScreen.navigationOptions = props => {
  // const { navigation } = props
  return {
    header: null
  }
  // return setStackOptions({
  //   navigation: navigation,
  //   title: '登录',
  //   autoHeaderLeft: true,
  //   autoHeaderRight: true,
  //   backgroundColor: 'white',
  //   titleColor: commonStyles.textDarkColor.color,
  //   headerLeftColor: commonStyles.textDarkColor.color,
  //   borderBottomWidth: px(2),
  //   leftIconName: 'close',
  //   leftIconType: 'evil_icon',
  //   leftIconSize: 26
  // })
}

export default SigninScreen
