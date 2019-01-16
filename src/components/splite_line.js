/**
 * 分割线
 * name: KooHead
 * date: 2018-02-13 22:54
 */

import React, { PureComponent } from 'react'
import {
  View
} from 'react-native'
import { px } from '../utils'

class SpliteLine extends PureComponent {
  render () {
    let { lineHeight, color, style } = this.props
    return (
      <View style={[{ height: lineHeight, backgroundColor: color, opacity: 0.7 }, style]} />
    )
  }
}

SpliteLine.defaultProps = {
  lineHeight: px(1),
  color: '#bdbdbd'
}

export default SpliteLine
