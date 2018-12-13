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

/**
 * @class
 * @classdesc 自定义抽屉栏
 */
class DrawerContent extends Component {
  renderHeaderView () {
    return (
      <View style={styles.headerView}>
        <Image style={styles.headerImage} source={require('../../assets/images/header.jpg')} />
        <Text style={styles.headerNameText}>阿飞</Text>
      </View>
    )
  }

  _renderItem () {
    return (
      <TouchableOpacity
        useFeedBack
      >
        <View style={styles.itemView} >
          <Icon size={20} type='icon_font' name='p_home' color='white' />
          <Text style={styles.itemText}>个人中心</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderContentText () {
    return (
      <View style={styles.contentView}>
        { this._renderItem() }
        { this._renderItem() }
        { this._renderItem() }
        { this._renderItem() }
        { this._renderItem() }
        { this._renderItem() }
        { this._renderItem() }
        { this._renderItem() }
        { this._renderItem() }
        { this._renderItem() }
        { this._renderItem() }
      </View>
    )
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Image blurRadius={10} style={styles.backgroundImg} source={require('../../assets/images/header.jpg')} />
        <ScrollView>
          <SafeAreaView style={styles.container}>
            { this.renderHeaderView() }
            { this._renderContentText() }
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white'
  }
})

const mapStateToProps = (state) => {
  return {
    nav: state.nav
  }
}

export default connect(mapStateToProps, { })(DrawerContent)
