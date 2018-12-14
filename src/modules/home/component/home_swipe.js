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
  Text,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native'
import {
  Icon
} from '../../../components'
import SwipeCards from './swipe_cards'
const { width, height } = Dimensions.get('window')
const CARD_WIDTH = width * 0.9
const CARD_HEIGHT = height * 0.6
const CONTENT_HEIGHT = height * 0.65

class Card extends React.Component {
  render () {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          Alert.alert('点击了小卡片')
        }}
        style={[styles.card, { backgroundColor: this.props.backgroundColor }]}>
        <Text>{this.props.text}</Text>
      </TouchableOpacity>
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
  _renderBottomView () {
    return (
      <View style={styles.bottomBottomView}>
        <View style={styles.itemSmallView}>
          <TouchableOpacity style={styles.itemSmallBtnView}>
            <Icon size={15} color={'green'} name='home' type='simple_line_icon' />
          </TouchableOpacity>
        </View>
        <View style={styles.itemLargeView}>
          <View style={styles.itemLargeBtnView}>
            <Icon size={20} color={'red'} name='home' type='simple_line_icon' />
          </View>
        </View>
        <View style={styles.itemSmallView}>
          <View style={styles.itemSmallBtnView}>
            <Icon size={15} color={'orange'} name='home' type='simple_line_icon' />
          </View>
        </View>
        <View style={styles.itemLargeView}>
          <View style={styles.itemLargeBtnView}>
            <Icon size={20} color={'purple'} name='home' type='simple_line_icon' />
          </View>
        </View>
        <View style={styles.itemSmallView}>
          <View style={styles.itemSmallBtnView}>
            <Icon size={15} color={'blue'} name='home' type='simple_line_icon' />
          </View>
        </View>
      </View>
    )
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.cardContentView}
          onStartShouldSetResponder={() => {
            return true
          }}>
          <SwipeCards
            cards={this.state.cards}
            renderCard={(cardData) => <Card {...cardData} />}
            renderNoMoreCards={() => <Text>没有更多卡片</Text>}
            loop
            handleYup={(card) => this.handleYup(card)}
            handleNope={(card) => this.handleNope(card)}
            handleMaybe={(card) => this.handleMaybe(card)}
            hasMaybeAction
            bottomView={() => {
              return this._renderBottomView()
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardContentView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10
  },
  bottomView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0
  },
  bottomTopView: {
    height: CONTENT_HEIGHT
  },
  bottomBottomView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  itemSmallView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemLargeView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemSmallBtnView: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 6,
    borderColor: '#f2f2f2'
  },
  itemLargeBtnView: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 6,
    borderColor: '#f2f2f2'
  }
})

export default HomeSwipe
