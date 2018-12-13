/**
 * home头部左边按钮
 * 2018-12-13 09:28
 * @author koohead
 * @description home头部左边按钮
 */

import React from 'react'
import {
  StyleSheet
} from 'react-native'
import commonStyles from '../../../styles'
import {
  TouchableOpacity,
  Icon
} from '../../../components'

/**
 * 头部左边按钮
 * @param {*} navigation
 */
const HeaderLeft = (props) => {
  const { navigation } = props
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.state.params && navigation.state.params.openMenu()
      }}
      style={styles.container}>
      <Icon type='ant_design' name='menuunfold' size={22} color='white' />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: commonStyles.headerHeight.height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15
  }
})

export default HeaderLeft
