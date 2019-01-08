/**
 * 新版本下载进度条
 * name: KooHead
 * date: 2018-04-27 12:18
 */

import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import commonStyles from '../../styles'

class Progressbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: 0
    }
  }
  setProgress (progress) {
    if (progress > this.state.progress) {
      this.setState({
        progress
      })
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={[styles.contentView, { width: `${this.state.progress}%`, borderTopRightRadius: this.state.progress === 100 ? 5 : 0, borderBottomRightRadius: this.state.progress === 100 ? 5 : 0 }]} />
        <View style={styles.textView}>
          <Text style={styles.text}>{`下载进度${this.state.progress}%`}</Text>
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    height: 35,
    backgroundColor: commonStyles.textLightColor.color,
    borderRadius: 5
  },
  contentView: {
    height: 35,
    backgroundColor: '#fd7635',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  text: {
    fontSize: 14,
    color: 'white'
  },
  textView: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  }
}

export default Progressbar
