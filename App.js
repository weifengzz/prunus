import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Animated,
  Easing
} from 'react-native'
// import { Icon } from './src/components'
// {/* <Icon type='icon_font' name='p_video' size={30} color='blue' /> */}

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fade: new Animated.Value(10)
    }
  }

  componentDidMount () {
    Animated.timing(
      this.state.fade,
      {
        toValue: 300,
        easing: Easing.inOut(Easing.back()),
        duration: 2000
      }
    ).start()
  }

  render () {
    return (
      <View style={styles.container}>
        <Animated.View style={{
          position: 'absolute',
          height: 30,
          width: 30,
          left: this.state.fade,
          backgroundColor: 'blue'
        }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
