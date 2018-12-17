/**
 * home底部按钮界面
 * 2018-12-14 13:43
 * @author koohead
 * @description home底部按钮界面
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native'
import {
  Icon,
  TouchableOpacity
} from '../../../components'
import { px } from '../../../utils'

const { width } = Dimensions.get('window')
const LARGE_IMG_WIDTH = (width - 40) * 0.2315 - px(10)
const SMALL_IMG_WIDTH = (width - 40) * 0.179 - px(10)

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
            <Icon size={SMALL_IMG_WIDTH / 2.2} color={'orange'} name='reload1' type='ant_design' />
          </TouchableOpacity>
        </View>
        <View style={styles.itemLargeView}>
          <View style={styles.itemLargeBtnView}>
            <Icon size={LARGE_IMG_WIDTH / 2.2} color={'#bdbdbd'} name='close' type='ant_design' />
          </View>
        </View>
        <View style={styles.itemSmallView}>
          <View style={styles.itemSmallBtnView}>
            <Icon size={SMALL_IMG_WIDTH / 2.2} color={'purple'} name='smileo' type='ant_design' />
          </View>
        </View>
        <View style={styles.itemLargeView}>
          <View style={styles.itemLargeBtnView}>
            <Icon size={LARGE_IMG_WIDTH / 2.4} color={'red'} name='heart' type='ant_design' />
          </View>
        </View>
        <View style={styles.itemSmallView}>
          <View style={styles.itemSmallBtnView}>
            <Icon size={SMALL_IMG_WIDTH / 2.2} color={'#2b7fd7'} name='staro' type='ant_design' />
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
    paddingHorizontal: px(20)
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
    height: SMALL_IMG_WIDTH,
    width: SMALL_IMG_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SMALL_IMG_WIDTH / 2,
    borderWidth: 6,
    borderColor: '#f2f2f2'
  },
  itemLargeBtnView: {
    height: LARGE_IMG_WIDTH,
    width: LARGE_IMG_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: LARGE_IMG_WIDTH / 2,
    borderWidth: 6,
    borderColor: '#f2f2f2'
  }
})

export default HomeFooter
