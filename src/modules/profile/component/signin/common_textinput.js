import React from 'react'
import {
  Animated,
  Easing,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet
} from 'react-native'
import {
  Icon
} from '../../../../components'

import BaseInput from './base_input'

const PADDING = 16

class CommonTextInput extends BaseInput {
  render () {
    const {
      iconType,
      iconColor,
      iconSize,
      iconName,
      label,
      inputStyle
    } = this.props
    const { focusedAnim, value } = this.state

    return (
      <View
        style={[styles.container]}
        onLayout={this._onLayout}
      >
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={{
              paddingHorizontal: PADDING,
              justifyContent: 'center',
              transform: [
                {
                  translateX: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-15 - iconSize, 0]
                  })
                }
              ]
            }}
          >
            <Icon type={iconType} name={iconName} color={iconColor} size={iconSize} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              justifyContent: 'center',
              height: '100%',
              transform: [
                {
                  translateX: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [PADDING, 80]
                  })
                }
              ],
              opacity: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
              })
            }}
          >
            <Text style={[styles.label]}>
              {label}
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          ref='input'
          {...this.props}
          style={[styles.textInput, inputStyle]}
          value={value}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          onChange={this._onChange}
          autoCorrect={false}
          underlineColorAndroid={'transparent'}
        />
      </View>
    )
  }
}

CommonTextInput.defaultProps = {
  easing: Easing.bezier(0.2, 1, 0.3, 1),
  iconSize: 25,
  useNativeDriver: false
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 28
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D2D2D2'
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    color: 'black',
    fontSize: 18,
    textAlignVertical: 'center'
  }
})

export default CommonTextInput
