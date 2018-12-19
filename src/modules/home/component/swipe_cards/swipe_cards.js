/* Gratefully copied from https://github.com/brentvatne/react-native-animated-demo-tinder */
import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions,
  Alert
} from 'react-native'

/**
 * 衰减系数动画注释
 */
// import { clamp } from '../../../../utils'
/**
 * 衰减系数动画注释
 */
// import { getVX, getDeceleration } from './util'
import { getSpeedVX, getSpeedVY } from './util'

import Defaults from './defaults.js'

const { width: G_WIDTH, height: G_HEIGHT } = Dimensions.get('window')

// const viewport = Dimensions.get('window')
const SWIPE_THRESHOLD = G_WIDTH / 2.5

// Components could be unloaded and loaded and we will loose the users currentIndex, we can persist it here.
let currentIndex = {}
let guid = 0

// 开始时间戳
this.startTimestamp = 0
// 结束时间戳
this.endTimestamp = 0

class SwipeCards extends Component {
  constructor (props) {
    super(props)

    // Use a persistent variable to track currentIndex instead of a local one.
    this.guid = this.props.guid || guid++
    if (!currentIndex[this.guid]) currentIndex[this.guid] = 0

    this.state = {
      pan: new Animated.ValueXY(0),
      enter: new Animated.Value(0.5),
      cards: [].concat(this.props.cards),
      card: this.props.cards[currentIndex[this.guid]]
    }

    this.lastX = 0
    this.lastY = 0

    this.cardAnimation = null

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (e, gestureState) => {
        if (Math.abs(gestureState.dx) > 3 || Math.abs(gestureState.dy) > 3) {
          this.props.onDragStart()
          return true
        }
        return false
      },

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value })
        this.state.pan.setValue({ x: 0, y: 0 })
        // 滑动开始，记录时间戳
        this.startTimestamp = e.nativeEvent.timestamp
      },

      onPanResponderTerminationRequest: (evt, gestureState) => this.props.allowGestureTermination,

      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.props.dragY ? this.state.pan.y : 0 }
      ]),

      onPanResponderRelease: (e, { vx, vy, dx, dy }) => {
        this.props.onDragRelease()
        this.state.pan.flattenOffset()
        // 滑动结束时间戳
        this.endTimestamp = e.nativeEvent.timestamp

        /**
         * 衰减系数动画注释
         */
        // let velocity
        // meaning the gesture did not cover any distance
        if (Math.abs(dx) <= 5 && Math.abs(dy) <= 5) {
          this.props.onClickHandler(this.state.card)
        }

        /**
         * 衰减系数动画注释
         */
        // if (vx > 0) {
        //   velocity = clamp(vx, 3, 5)
        // } else if (vx < 0) {
        //   velocity = clamp(vx * -1, 3, 5) * -1
        // } else {
        //   velocity = dx < 0 ? -3 : 3
        // }

        const hasSwipedHorizontally = (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) || (this.endTimestamp - this.startTimestamp < 300 && Math.abs(dx) > 20)
        const hasSwipedVertically = (Math.abs(this.state.pan.y._value) > SWIPE_THRESHOLD) || (this.endTimestamp - this.startTimestamp < 300 && Math.abs(dy) > 20)
        if (hasSwipedHorizontally || (hasSwipedVertically && this.props.hasMaybeAction)) {
          let cancelled = false

          const hasMovedRight = hasSwipedHorizontally && this.state.pan.x._value > 0 && Math.abs(this.state.pan.x._value) > Math.abs(this.state.pan.y._value)
          const hasMovedLeft = hasSwipedHorizontally && this.state.pan.x._value < 0 && Math.abs(this.state.pan.x._value) > Math.abs(this.state.pan.y._value)
          const hasMovedUp = hasSwipedVertically && this.state.pan.y._value < 0 && Math.abs(this.state.pan.x._value) < Math.abs(this.state.pan.y._value)

          if (hasMovedRight) {
            cancelled = this.props.handleYup(this.state.card)
          } else if (hasMovedLeft) {
            cancelled = this.props.handleNope(this.state.card)
          } else if (hasMovedUp && this.props.hasMaybeAction) {
            cancelled = this.props.handleMaybe(this.state.card)
          } else {
            cancelled = true
          }

          // Yup or nope was cancelled, return the card to normal.
          if (cancelled) {
            this._resetPan()
            return
          };

          this.props.cardRemoved(currentIndex[this.guid])

          if (this.props.smoothTransition) {
            this._advanceState()
          } else {
            if (hasMovedRight) {
              this.cardAnimation = Animated.timing(this.state.pan, {
                toValue: { x: G_WIDTH + G_WIDTH / 3, y: 0 },
                duration: getSpeedVX(Math.abs(vx))
              })
            } else if (hasMovedLeft) {
              this.cardAnimation = Animated.timing(this.state.pan, {
                toValue: { x: -G_WIDTH - G_WIDTH / 3, y: 0 },
                duration: getSpeedVX(Math.abs(vx))
              })
            } else {
              this.cardAnimation = Animated.timing(this.state.pan, {
                toValue: { x: 0, y: -G_HEIGHT + G_HEIGHT / 5 },
                duration: getSpeedVY(Math.abs(vy))
              })
            }
            /**
             * 衰减系数动画
             */
            // let vex = hasMovedUp && this.props.hasMaybeAction ? velocity * getVX(1.82) : velocity * getVX(1.35)
            // let de = hasMovedUp && this.props.hasMaybeAction ? getDeceleration(0.987) : getDeceleration(0.9855)
            // this.cardAnimation = Animated.decay(this.state.pan, {
            //   velocity: { x: vex, y: vy },
            //   deceleration: de
            // })
            this.cardAnimation.start(status => {
              if (status.finished) this._advanceState()
              else this._resetState()

              this.cardAnimation = null
            }
            )
          }
        } else {
          this._resetPan()
        }
      }
    })
  }

  _forceLeftSwipe () {
    this.cardAnimation = Animated.timing(this.state.pan, {
      toValue: { x: -G_WIDTH - G_WIDTH / 3, y: 0 }
    }).start(status => {
      if (status.finished) this._advanceState()
      else this._resetState()

      this.cardAnimation = null
    }
    )
    this.props.cardRemoved(currentIndex[this.guid])
  }

  _forceUpSwipe () {
    this.cardAnimation = Animated.timing(this.state.pan, {
      toValue: { x: 0, y: -G_HEIGHT + G_HEIGHT / 5 }
    }).start(status => {
      if (status.finished) this._advanceState()
      else this._resetState()

      this.cardAnimation = null
    }
    )
    this.props.cardRemoved(currentIndex[this.guid])
  }

  _forceRightSwipe () {
    this.cardAnimation = Animated.timing(this.state.pan, {
      toValue: { x: G_WIDTH + G_WIDTH / 3, y: 0 }
    }).start(status => {
      if (status.finished) this._advanceState()
      else this._resetState()

      this.cardAnimation = null
    }
    )
    this.props.cardRemoved(currentIndex[this.guid])
  }

  _goToNextCard () {
    currentIndex[this.guid]++

    // Checks to see if last card.
    // If props.loop=true, will start again from the first card.
    if (currentIndex[this.guid] > this.state.cards.length - 1 && this.props.loop) {
      this.props.onLoop()
      currentIndex[this.guid] = 0
    }

    this.setState({
      card: this.state.cards[currentIndex[this.guid]]
    })
  }

  _goToPrevCard () {
    this.state.pan.setValue({ x: 0, y: 0 })
    this.state.enter.setValue(0)
    this._animateEntrance()

    currentIndex[this.guid]--

    if (currentIndex[this.guid] < 0) {
      currentIndex[this.guid] = 0
    }

    this.setState({
      card: this.state.cards[currentIndex[this.guid]]
    })
  }

  componentDidMount () {
    this._animateEntrance()
  }

  _animateEntrance () {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.cards !== this.props.cards) {
      if (this.cardAnimation) {
        this.cardAnimation.stop()
        this.cardAnimation = null
      }

      currentIndex[this.guid] = 0
      this.setState({
        cards: [].concat(nextProps.cards),
        card: nextProps.cards[0]
      })
    }
  }

  _resetPan () {
    Animated.spring(this.state.pan, {
      toValue: { x: 0, y: 0 },
      friction: 4
    }).start()
  }

  _resetState () {
    this.state.pan.setValue({ x: 0, y: 0 })
    this.state.enter.setValue(0)
    this._animateEntrance()
  }

  _advanceState () {
    this.state.pan.setValue({ x: 0, y: 0 })
    this.state.enter.setValue(0)
    this._animateEntrance()
    this._goToNextCard()
  }

  /**
   * Returns current card object
   */
  getCurrentCard () {
    return this.state.cards[currentIndex[this.guid]]
  }

  renderNoMoreCards () {
    if (this.props.renderNoMoreCards) {
      return this.props.renderNoMoreCards()
    }

    return <Defaults.NoMoreCards />
  }

  /**
   * Renders the cards as a stack with props.stackDepth cards deep.
   */
  renderStack () {
    if (!this.state.card) {
      return this.renderNoMoreCards()
    }

    // Get the next stack of cards to render.
    let cards = this.state.cards.slice(currentIndex[this.guid], currentIndex[this.guid] + this.props.stackDepth).reverse()

    return cards.map((card, i) => {
      let offsetX = this.props.stackOffsetX * cards.length - i * this.props.stackOffsetX
      let lastOffsetX = offsetX + this.props.stackOffsetX

      let offsetY = this.props.stackOffsetY * cards.length - i * this.props.stackOffsetY
      let lastOffsetY = offsetY + this.props.stackOffsetY

      let opacity = 0.25 + (0.75 / cards.length) * (i + 1)
      let lastOpacity = 0.25 + (0.75 / cards.length) * i

      let scale = 0.9 + (0.1 / cards.length) * (i + 1)
      let lastScale = 0.9 + (0.1 / cards.length) * i

      let style = {
        position: 'absolute',
        top: this.state.enter.interpolate({ inputRange: [0, 1], outputRange: [lastOffsetY, offsetY] }),
        left: G_WIDTH * 0.06 / 2 || this.state.enter.interpolate({ inputRange: [0, 1], outputRange: [lastOffsetX, offsetX] }),
        opacity: this.props.smoothTransition ? 1 : this.state.enter.interpolate({ inputRange: [0, 1], outputRange: [lastOpacity, opacity] }),
        transform: [{ scale: this.state.enter.interpolate({ inputRange: [0, 1], outputRange: [lastScale, scale] }) }],
        elevation: i * 10
      }

      // Is this the top card?  If so animate it and hook up the pan handlers.
      if (i + 1 === cards.length) {
        let { pan } = this.state
        let [translateX, translateY] = [pan.x, pan.y]

        let rotate = pan.x.interpolate({ inputRange: [-200, 0, 200], outputRange: ['-20deg', '0deg', '20deg'] })
        // let opacity = this.props.smoothTransition ? 1 : pan.x.interpolate({ inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5] })

        let animatedCardStyles = {
          ...style,
          transform: [
            { translateX: translateX },
            { translateY: translateY },
            { rotate: rotate },
            { scale: this.state.enter.interpolate({ inputRange: [0, 1], outputRange: [lastScale, scale] }) }
          ]
        }

        return <Animated.View key={card[this.props.cardKey]} style={[styles.card, animatedCardStyles]} {... this._panResponder.panHandlers}>
          {this.props.renderCard(this.state.card)}
        </Animated.View>
      }

      return <Animated.View key={card[this.props.cardKey]} style={style}>{this.props.renderCard(card)}</Animated.View>
    })
  }

  renderCard () {
    if (!this.state.card) {
      return this.renderNoMoreCards()
    }

    let { pan, enter } = this.state
    let [translateX, translateY] = [pan.x, pan.y]

    let rotate = pan.x.interpolate({ inputRange: [-200, 0, 200], outputRange: ['-30deg', '0deg', '30deg'] })
    let opacity = pan.x.interpolate({ inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5] })

    let scale = enter

    let animatedCardStyles = { transform: [{ translateX }, { translateY }, { rotate }, { scale }], opacity }

    return <Animated.View key={'top'} style={[styles.card, animatedCardStyles]} {... this._panResponder.panHandlers}>
      {this.props.renderCard(this.state.card)}
    </Animated.View>
  }

  renderNope () {
    let { pan } = this.state

    let nopeOpacity = pan.x.interpolate({ inputRange: [-SWIPE_THRESHOLD, -(SWIPE_THRESHOLD / 2)], outputRange: [1, 0], extrapolate: 'clamp' })
    let nopeScale = pan.x.interpolate({ inputRange: [-SWIPE_THRESHOLD, 0], outputRange: [1, 0], extrapolate: 'clamp' })
    let animatedNopeStyles = { transform: [{ scale: nopeScale }], opacity: nopeOpacity }

    if (this.props.renderNope) {
      return this.props.renderNope(pan)
    }

    if (this.props.showNope) {
      const inner = this.props.noView
        ? this.props.noView
        : <Text style={[styles.nopeText, this.props.nopeTextStyle]}>{this.props.nopeText}</Text>

      return <Animated.View style={[styles.nope, this.props.nopeStyle, animatedNopeStyles]}>
        {inner}
      </Animated.View>
    }

    return null
  }

  renderMaybe () {
    if (!this.props.hasMaybeAction) return null

    let { pan } = this.state

    let maybeOpacity = pan.y.interpolate({ inputRange: [-SWIPE_THRESHOLD, -(SWIPE_THRESHOLD / 2)], outputRange: [1, 0], extrapolate: 'clamp' })
    let maybeScale = pan.x.interpolate({ inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD], outputRange: [0, 1, 0], extrapolate: 'clamp' })
    let animatedMaybeStyles = { transform: [{ scale: maybeScale }], opacity: maybeOpacity }

    if (this.props.renderMaybe) {
      return this.props.renderMaybe(pan)
    }

    if (this.props.showMaybe) {
      const inner = this.props.maybeView
        ? this.props.maybeView
        : <Text style={[styles.maybeText, this.props.maybeTextStyle]}>{this.props.maybeText}</Text>

      return <Animated.View style={[styles.maybe, this.props.maybeStyle, animatedMaybeStyles]}>
        {inner}
      </Animated.View>
    }

    return null
  }

  renderYup () {
    let { pan } = this.state

    let yupOpacity = pan.x.interpolate({ inputRange: [(SWIPE_THRESHOLD / 2), SWIPE_THRESHOLD], outputRange: [0, 1], extrapolate: 'clamp' })
    let yupScale = pan.x.interpolate({ inputRange: [0, SWIPE_THRESHOLD], outputRange: [0.5, 1], extrapolate: 'clamp' })
    let animatedYupStyles = { transform: [{ scale: yupScale }], opacity: yupOpacity }

    if (this.props.renderYup) {
      return this.props.renderYup(pan)
    }

    if (this.props.showYup) {
      const inner = this.props.yupView
        ? this.props.yupView
        : <Text style={[styles.yupText, this.props.yupTextStyle]}>{this.props.yupText}</Text>

      return <Animated.View style={[styles.yup, this.props.yupStyle, animatedYupStyles]}>
        {inner}
      </Animated.View>
    }

    return null
  }

  _renderBottomView () {
    const { bottomView, cardHeight } = this.props
    return (
      <View style={styles.bottomView}>
        <View style={[styles.contentView, { height: cardHeight }]} />
        { bottomView() }
      </View>
    )
  }

  render () {
    const { cardHeight, stackDepth, stackOffsetY } = this.props
    return (
      <View style={styles.container}>
        { this._renderBottomView() }
        <View style={[styles.contentView, { height: cardHeight - stackOffsetY * stackDepth + stackOffsetY }]}>
          {this.props.stack ? this.renderStack() : this.renderCard()}
        </View>
        {/* {this.renderNope()} */}
        {/* {this.renderMaybe()}
        {this.renderYup()} */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 0
  },
  yupText: {
    fontSize: 16,
    color: 'green'
  },
  maybe: {
    borderColor: 'blue',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20
  },
  maybeText: {
    fontSize: 16,
    color: 'blue'
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 0
  },
  nopeText: {
    fontSize: 16,
    color: 'red'
  },
  bottomView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0
  }
})

SwipeCards.defaultProps = {
  cards: [],
  cardKey: 'key',
  hasMaybeAction: false,
  loop: false,
  onLoop: () => null,
  allowGestureTermination: true,
  stack: false,
  stackDepth: 3,
  stackOffsetX: 0,
  stackOffsetY: 15,
  showYup: true,
  showMaybe: true,
  showNope: true,
  handleYup: (card) => null,
  handleMaybe: (card) => null,
  handleNope: (card) => null,
  nopeText: 'Nope!',
  maybeText: 'Maybe!',
  yupText: 'Yup!',
  onClickHandler: () => { Alert.alert('onClickHandler') },
  onDragStart: () => {},
  onDragRelease: () => {},
  cardRemoved: (ix) => null,
  renderCard: (card) => null,
  style: styles.container,
  dragY: true,
  smoothTransition: false,
  bottomView: () => null,
  cardHeight: 0
}

export default SwipeCards
