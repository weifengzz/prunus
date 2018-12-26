/**
 * 自定义文字输入组件，解决键盘弹出问题
 */

import React, { Component } from 'react'

import {
  ScrollView,
  View
} from 'react-native'

import TextInputState from 'TextInputState'
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'

class TextInputScrollView extends Component {
  render () {
    const { children, bounces, contentContainerStyle, viewStyle, keyboardDismissMode } = this.props
    return (
      <ScrollView
        bounces={bounces}
        showsVerticalScrollIndicator
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={contentContainerStyle}
        keyboardDismissMode={keyboardDismissMode}
        keyboardShouldPersistTaps='handled'>
        <View style={viewStyle} onStartShouldSetResponderCapture={(e) => {
          const focusField = TextInputState.currentlyFocusedField()
          if (focusField != null && e.nativeEvent.target !== focusField) {
            dismissKeyboard()
          }
        }}>
          {children}
        </View>
      </ScrollView>
    )
  }
}

TextInputScrollView.defaultProps = {
  bounces: false,
  contentContainerStyle: {
    flex: 1
  },
  viewStyle: {
    flex: 1
  },
  keyboardDismissMode: 'none'
}

export default TextInputScrollView
