import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View
} from 'react-native'

class NoMoreCards extends Component {
  render () {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}

export default {
  NoMoreCards: NoMoreCards
}

const styles = StyleSheet.create({
  noMoreCardsText: {
    fontSize: 22
  }
})
