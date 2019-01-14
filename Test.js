import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { SplashScreen } from './src/components'
import Video from 'react-native-video'

export default class App extends Component {
  componentDidMount () {
    SplashScreen.hide()
  }
  render () {
    return (
      <View style={styles.container}>
        <Video source={{ uri: 'https://video.pearvideo.com/mp4/adshort/20180902/cont-1426096-12793040_adpkg-ad_hd.mp4' }} // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref
          }} // Store reference
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={this.videoError} // Callback when video cannot be loaded
          style={{
            height: '100%',
            width: '100%'
          }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
