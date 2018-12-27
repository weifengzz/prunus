/**
 * 网页加载失败界面
 * 2018-12-24 13:56
 * @author koohead
 * @description 网页加载失败界面
 */

import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import {
  TouchableOpacity
} from './normal_touchable_opacity'
import commonStyles from '../styles'

/**
 * @class
 * @classdesc 网页加载失败界面
 */
class WebViewError extends Component {
  render () {
    const { onPress, useRefresh } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.text}>哎呀，网页走丢了</Text>
        {
          useRefresh
            ? <TouchableOpacity
              onPress={() => {
                onPress()
              }}
              style={styles.refreshView}
            >
              <Text style={styles.refreshText}>重试</Text>
            </TouchableOpacity>
            : null
        }
      </View >
    )
  }
}

WebViewError.defaultProps = {
  onPress: () => {},
  useRefresh: false
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    color: commonStyles.textLightColor.color
  },
  refreshView: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#3491d8',
    height: 30,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  refreshText: {
    fontSize: 16,
    color: '#3491d8'
  }
}

export default WebViewError
