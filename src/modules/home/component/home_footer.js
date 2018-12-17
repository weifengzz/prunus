/**
 * home底部按钮界面
 * 2018-12-14 13:43
 * @author koohead
 * @description home底部按钮界面
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import {
  Icon,
  TouchableOpacity
} from '../../../components'
/**
 * @class
 * @classdesc home底部按钮界面
 */
class HomeFooter extends Component {
  render () {
    return (
      <View style={styles.bottomBottomView}>
        <View style={styles.itemSmallView}>
          <TouchableOpacity style={styles.itemSmallBtnView}>
            <Icon size={15} color={'green'} name='home' type='simple_line_icon' />
          </TouchableOpacity>
        </View>
        <View style={styles.itemLargeView}>
          <View style={styles.itemLargeBtnView}>
            <Icon size={20} color={'red'} name='home' type='simple_line_icon' />
          </View>
        </View>
        <View style={styles.itemSmallView}>
          <View style={styles.itemSmallBtnView}>
            <Icon size={15} color={'orange'} name='home' type='simple_line_icon' />
          </View>
        </View>
        <View style={styles.itemLargeView}>
          <View style={styles.itemLargeBtnView}>
            <Icon size={20} color={'purple'} name='home' type='simple_line_icon' />
          </View>
        </View>
        <View style={styles.itemSmallView}>
          <View style={styles.itemSmallBtnView}>
            <Icon size={15} color={'blue'} name='home' type='simple_line_icon' />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottomBottomView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  itemSmallView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemLargeView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemSmallBtnView: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 6,
    borderColor: '#f2f2f2'
  },
  itemLargeBtnView: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 6,
    borderColor: '#f2f2f2'
  }
})

export default HomeFooter
