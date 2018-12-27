/**
 * https://github.com/djuniorscjr/basic-loading-rn/
 */
import React from 'react'
import {
  StyleSheet,
  View,
  Animated
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  group: {
    flexDirection: 'row'
  },
  circle: {
    height: 12,
    width: 12,
    marginHorizontal: 5,
    backgroundColor: '#ffcb65',
    borderRadius: 6
  }
})

const ObjectAnimated = ({ value, sizes, circleStyle }) => (
  <Animated.View
    style={[
      styles.circle, { ...circleStyle }, {
        transform: [{
          scale: value.interpolate({
            inputRange: [0, 1, 2],
            outputRange: sizes
          })
        }]
      }]}
  />
)

class Circle extends React.Component {
  constructor (props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
  }

  componentWillMount () {
    this.animate()
  }

  setTimingAnimated (originalValue, newValue, duration) {
    return Animated.timing(originalValue, {
      toValue: newValue,
      duration,
      useNativeDriver: true
    })
  }

  animate () {
    Animated.sequence([
      this.setTimingAnimated(this.animatedValue, 1, 350),
      this.setTimingAnimated(this.animatedValue, 2, 350),
      this.setTimingAnimated(this.animatedValue, 0, 350)
    ]).start(() => this.animate())
  }

  render () {
    const { active, circleStyles, sizes } = this.props
    return active ? (
      <View style={styles.container}>
        <View style={styles.group}>
          <ObjectAnimated
            value={this.animatedValue}
            sizes={sizes[0]}
            circleStyle={circleStyles[0]}
          />
          <ObjectAnimated
            value={this.animatedValue}
            sizes={sizes[1]}
            circleStyle={circleStyles[1]}
          />
          <ObjectAnimated
            value={this.animatedValue}
            sizes={sizes[2]}
            circleStyle={circleStyles[2]}
          />
        </View>
      </View>
    ) : <React.Fragment />
  }
}

Circle.defaultProps = {
  active: true,
  circleStyles: [{}, {}, {}],
  sizes: [[1, 1.5, 1], [1, 1.5, 1], [1, 1, 1.5]]
}

export default Circle
