/**
 * 字体图标文件
 * 2018-12-10 11:59
 * @author koohead
 * @description 自定义字体文件
 */

import React, { Component } from 'react'
import {
  View
} from 'react-native'

/**
 * 引入图标文件库
 */
import { createIconSet } from 'react-native-vector-icons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5Free from 'react-native-vector-icons/FontAwesome5'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Zocial from 'react-native-vector-icons/Zocial'

/**
 * 自定义字体图标文件
 */
const glyphMap = require('./glyphmaps/icon_fonts.json')
const IconSet = createIconSet(glyphMap, 'Iconfont', 'Iconfont.ttf')

/**
 * @class 字体图标文件
 * @description 整合统一react-native-vector-icons字体图标文件
 * 自定义图表库的使用方式
 * 1、添加自定义图表库放入至node_modules/react-native-vector-icons/Fonts下
 * 2、执行命令 react-native link react-native-vector-icons
 * 3、在glyphmaps/icon_fonts.json，写入字体文件对照
 * 4、官方文档：https://github.com/oblador/react-native-vector-icons
 * 5、图标文件对照表：https://oblador.github.io/react-native-vector-icons/
 */
class Icon extends Component {
  _renderContent () {
    const { type, ...props } = this.props
    switch (type) {
      case 'ant_design':
        return <AntDesign {...props} />
      case 'entypo':
        return <Entypo {...props} />
      case 'evil_icon':
        return <EvilIcons {...props} />
      case 'feather':
        return <Feather {...props} />
      case 'font_awesome':
        return <FontAwesome {...props} />
      case 'font_awesome_5':
        return <FontAwesome5Free {...props} />
      case 'font_awesome_5_pro':
        return <FontAwesome5Pro {...props} />
      case 'foundation':
        return <Foundation {...props} />
      case 'material_community_icon':
        return <MaterialCommunityIcons {...props} />
      case 'material_icon':
        return <MaterialIcons {...props} />
      case 'octicons':
        return <Octicons {...props} />
      case 'simple_line_icon':
        return <SimpleLineIcons {...props} />
      case 'zocial':
        return <Zocial {...props} />
      case 'icon_font':
        return <IconSet {...props} />
      default:
        console.warn('图表库没有此图标！')
        return <View />
    }
  }

  render () {
    return (
      <View>
        { this._renderContent() }
      </View>
    )
  }
}

export default Icon
