/**
 * 自定义抽屉栏
 * 2018-12-12 16:38
 * @author koohead
 * @description 返回键状态管理
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  StatusBar,
  Image,
  View,
  ScrollView,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import {
  Icon,
  TouchableOpacity
} from '../../components'

import { withNavigation } from 'react-navigation'

const IS_IOS = Platform.OS === 'ios'

/**
 * @class
 * @classdesc 自定义抽屉栏
 */
class DrawerContent extends Component {
  /**
   * 添加头部布局
   */
  renderHeaderView () {
    const { navigation } = this.props
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('signin')
          // 300毫秒后关闭菜单栏
          setTimeout(() => {
            navigation.closeDrawer()
          }, 300)
        }}
        style={styles.headerView}>
        <Image style={styles.headerImage} source={require('../../assets/icons/author.png')} />
        <Text style={styles.headerNameText}>登录</Text>
      </TouchableOpacity>
    )
  }

  _renderItem (params) {
    const { title, iconType, iconName, iconSize, onPress } = params
    return (
      <TouchableOpacity
        useFeedBack
        onPress={() => {
          onPress()
        }}
      >
        <View style={styles.itemView} >
          <Icon size={iconSize} type={iconType} name={iconName} color='#bdbdbd' />
          <Text style={styles.itemText}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  /**
   * 渲染内容
   */
  _renderContent () {
    const { navigation } = this.props
    return (
      <View style={styles.contentView}>
        {
          // 个人中心
          this._renderItem({
            title: '个人中心',
            iconType: 'icon_font',
            iconName: 'p_people',
            iconSize: 25,
            onPress: () => {
              navigation.navigate('profile')
            }
          })
        }
        {
          // 我的收藏
          this._renderItem({
            title: '我的收藏',
            iconType: 'ant_design',
            iconName: 'staro',
            iconSize: 25,
            onPress: () => {
              navigation.navigate('profile')
            }
          })
        }
        {
          // 设置
          this._renderItem({
            title: '系统设置',
            iconType: 'ant_design',
            iconName: 'setting',
            iconSize: 25,
            onPress: () => {
              navigation.navigate('profile')
            }
          })
        }
      </View>
    )
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Image blurRadius={IS_IOS ? 15 : 10} style={styles.backgroundImg} source={require('../../assets/icons/author.png')} />
        <View style={styles.backgroundView} />
        <ScrollView>
          <SafeAreaView style={styles.container}>
            { this.renderHeaderView() }
            { this._renderContent() }
          </SafeAreaView>
        </ScrollView>
      </View>
    )
  }
}

DrawerContent.defaultProps = {
  navigation: () => {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
  backgroundImg: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    opacity: 0.7
  },
  backgroundView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    opacity: 0.2,
    backgroundColor: 'black'
  },
  headerView: {
    height: Dimensions.get('window').width / 5 + 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerImage: {
    height: Dimensions.get('window').width / 5,
    width: Dimensions.get('window').width / 5,
    borderRadius: Dimensions.get('window').width / 10
  },
  headerNameText: {
    marginTop: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  contentView: {
    flex: 1
  },
  itemView: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    marginLeft: 10,
    fontSize: 20,
    color: '#bdbdbd',
    fontWeight: 'bold'
  }
})

const mapStateToProps = (state) => {
  return {
    nav: state.nav
  }
}

export default connect(mapStateToProps, { })(withNavigation(DrawerContent))
