import React from 'react'
import { View, Image, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native'
import Pulse from './pulse'
const { width } = Dimensions.get('window')
const SIZE = width * 0.35
const PULSE_MAX_SIZE = width * 0.8

export default class LocationPulseLoader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      circles: []
    }
    this.counter = 1
    this.setInterval = null
    this.anim = new Animated.Value(1)
  }

  componentDidMount () {
    this.setCircleInterval()
  }

  componentWillUnmount () {
    this.setInterval = clearInterval(this.setInterval)
  }

  setCircleInterval () {
    this.setInterval = setInterval(this.addCircle.bind(this), this.props.interval)
    this.addCircle()
  }

  addCircle () {
    this.setState({ circles: [...this.state.circles, this.counter] })
    this.counter++
  }

  onPressIn () {
    Animated.timing(this.anim, {
      toValue: this.props.pressInValue,
      duration: this.props.pressDuration,
      easing: this.props.pressInEasing,
      useNativeDriver: true
    }).start(() => clearInterval(this.setInterval))
  }

  onPressOut () {
    Animated.timing(this.anim, {
      toValue: 1,
      duration: this.props.pressDuration,
      easing: this.props.pressOutEasing,
      useNativeDriver: true
    }).start(this.setCircleInterval.bind(this))
  }

  render () {
    const { size, avatar, avatarBackgroundColor } = this.props

    return (
      <View style={{
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {this.state.circles.map((circle) => (
          <Pulse
            key={circle}
            {...this.props}
          />
        ))}

        <TouchableOpacity
          activeOpacity={1}
          onPressIn={() => this.onPressIn()}
          onPressOut={() => this.onPressOut()}
          style={{
            transform: [{
              scale: this.anim
            }]
          }}
        >
          <Image
            source={avatar || ''}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: avatarBackgroundColor
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

LocationPulseLoader.defaultProps = {
  interval: 2000,
  size: SIZE,
  pulseMaxSize: PULSE_MAX_SIZE,
  avatar: '',
  avatarBackgroundColor: 'white',
  pressInValue: 0.8,
  pressDuration: 150,
  pressInEasing: Easing.in,
  pressOutEasing: Easing.in,
  borderColor: '#D8335B',
  backgroundColor: '#ED225B55',
  getStyle: undefined
}
