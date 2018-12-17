import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text
} from 'react-native'
// import { Icon } from './src/components'
// {/* <Icon type='icon_font' name='p_video' size={30} color='blue' /> */}

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text>辅导书反对</Text>
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
