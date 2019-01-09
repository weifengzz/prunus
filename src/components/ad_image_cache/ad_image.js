/**
 * 自定义开屏广告图片缓存展示组件
 * 2019-01-09 14:59
 * @author koohead
 * @description 自定义开屏广告图片缓存展示组件
 */
import React, { Component } from 'react'
import {
  Image,
  Platform
} from 'react-native'

const IS_IOS = Platform.OS === 'ios'

/**
 * @class
 * @classdesc 自定义开屏广告图片缓存展示组件
 * <Image source={{ uri : Platform.OS === 'android' ? 'file://' + res.path() : '' + res.path() }}/>
 */
class AdImage extends Component {
  render () {
    const { filePath, imageUri, ...props } = this.props
    return (
      <Image
        {...props}
        source={{
          uri: filePath ? (IS_IOS ? filePath : 'file://' + filePath) : imageUri
        }}
      />
    )
  }
}

AdImage.defaultProps = {
  filePath: '',
  imageUri: ''
}

export default AdImage
