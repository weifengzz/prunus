/**
 * 首页切换组件
 * 2018-12-13 10:58
 * @author koohead
 * @description 首页切换组件
 */
import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import SwipeCards from './swipe_cards'

class Card extends React.Component {
  render () {
    return (
      <View style={[styles.card, { backgroundColor: this.props.backgroundColor }]}>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
}

class HomeSwipe extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: [
        { text: 'Tomato', backgroundColor: 'red' },
        { text: 'Aubergine', backgroundColor: 'purple' },
        { text: 'Courgette', backgroundColor: 'green' },
        { text: 'Blueberry', backgroundColor: 'blue' },
        { text: 'Umm...', backgroundColor: 'cyan' },
        { text: 'orange', backgroundColor: 'orange' }
      ]
    }
  }
  handleYup (card) {
    console.log(`Yup for ${card.text}`)
  }
  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }
  handleMaybe (card) {
    console.log(`Maybe for ${card.text}`)
  }
  render () {
    return (
      <View style={styles.container}>
        <SwipeCards
          cards={this.state.cards}
          renderCard={(cardData) => <Card {...cardData} />}
          renderNoMoreCards={() => <Text>没有更多卡片</Text>}
          loop
          handleYup={this.handleYup}
          handleNope={this.handleNope}
          handleMaybe={this.handleMaybe}
          hasMaybeAction
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300
  }
})

export default HomeSwipe
