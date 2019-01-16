/**
 * 图片加载中或加载失败替换图片
 * 2019-01-15 15:20
 * @author koohead
 * @description 图片加载中或加载失败替换图片
 */

import React, { Component } from 'react'
import {
  Image,
  View
} from 'react-native'

class CoverImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      success: false,
      fail: false
    }
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.success !== this.state.success) {
      return true
    }
    return false
  }
  render () {
    const { style, placeholderImageSource, usePlaceholderImage, ...props } = this.props
    return (
      <View>
        <Image
          style={style}
          {...props}
          onLoad={() => {
            this.setState({
              loading: false,
              success: true,
              fail: false
            })
          }}
          onLoadEnd={() => {
            if (this.state.success === false) {
              this.setState({
                loading: false,
                fail: true,
                success: false
              })
            }
          }}
        />
        {
          this.state.loading && style.height && style.width &&
          <View style={[styles.activityIndicatorView, { height: style.height, width: style.width }]}>
            <Image source={require('../assets/icons/author.png')} style={{ height: style.height, width: style.width, resizeMode: 'stretch' }} />
          </View>
        }
        {
          this.state.fail && style.height && style.width && usePlaceholderImage &&
          <View style={[styles.activityIndicatorView, { height: style.height, width: style.width }]}>
            <Image source={placeholderImageSource || require('../assets/icons/author.png')} style={style} />
          </View>
        }
      </View>
    )
  }
}

CoverImage.defaultProps = {
  placeholderImageSource: null,
  usePlaceholderImage: true
}

const styles = {
  activityIndicatorView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  }
}

export default CoverImage
