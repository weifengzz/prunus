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
import {
} from '../../../components'
import SwipeCards from './swipe_cards'
import {
  HomeFooter,
  Card
} from '../component'

const CARDS = [
  {
    text: `一楼主发帖：好久没见男友了，真是想他啊，已经决定在他那住上七天了，请问大家，我要给他来个什么惊喜呢？
    一楼回复：给他来个大姨妈……
    二楼回复：外加溃疡和痔疮！”
    三楼：双手受伤。`,
    backgroundColor: 'red',
    type: 1,
    img: '',
    key: '1'
  },
  {
    text: '',
    backgroundColor: 'green',
    type: 2,
    img: 'http://pic24.nipic.com/20121010/3798632_184253198370_2.jpg',
    key: '2'
  },
  {
    text: `一楼主发帖：好久没见男友了，真是想他啊，已经决定在他那住上七天了，请问大家，我要给他来个什么惊喜呢？
    一楼回复：给他来个大姨妈……
    二楼回复：外加溃疡和痔疮！”
    三楼：双手受伤。`,
    backgroundColor: 'orange',
    type: 1,
    img: '',
    key: '3'
  },
  {
    text: '',
    backgroundColor: 'blue',
    type: 2,
    img: 'https://www.gifjia5.com/wp-content/uploads/2018/07/15312235433978123.gif',
    key: '4'
  },
  {
    text: '',
    backgroundColor: 'green',
    type: 2,
    img: 'http://pic24.nipic.com/20121010/3798632_184253198370_2.jpg',
    key: '5'
  },
  {
    text: `一楼主发帖：好久没见男友了，真是想他啊，已经决定在他那住上七天了，请问大家，我要给他来个什么惊喜呢？
    一楼回复：给他来个大姨妈……
    二楼回复：外加溃疡和痔疮！”
    三楼：双手受伤。`,
    backgroundColor: 'orange',
    type: 1,
    img: '',
    key: '6'
  },
  {
    text: '',
    backgroundColor: 'blue',
    type: 2,
    img: 'https://www.gifjia5.com/wp-content/uploads/2018/07/15312235433978123.gif',
    key: '7'
  },
  {
    text: '',
    backgroundColor: 'green',
    type: 2,
    img: 'http://pic24.nipic.com/20121010/3798632_184253198370_2.jpg',
    key: '8'
  },
  {
    text: `一楼主发帖：好久没见男友了，真是想他啊，已经决定在他那住上七天了，请问大家，我要给他来个什么惊喜呢？
    一楼回复：给他来个大姨妈……
    二楼回复：外加溃疡和痔疮！”
    三楼：双手受伤。`,
    backgroundColor: 'orange',
    type: 1,
    img: '',
    key: '9'
  },
  {
    text: '',
    backgroundColor: 'blue',
    type: 2,
    img: 'https://www.gifjia5.com/wp-content/uploads/2018/07/15312235433978123.gif',
    key: '41'
  },
  {
    text: '',
    backgroundColor: 'green',
    type: 2,
    img: 'http://pic24.nipic.com/20121010/3798632_184253198370_2.jpg',
    key: '22'
  },
  {
    text: `一楼主发帖：好久没见男友了，真是想他啊，已经决定在他那住上七天了，请问大家，我要给他来个什么惊喜呢？
    一楼回复：给他来个大姨妈……
    二楼回复：外加溃疡和痔疮！”
    三楼：双手受伤。`,
    backgroundColor: 'orange',
    type: 1,
    img: '',
    key: '33'
  },
  {
    text: '',
    backgroundColor: 'blue',
    type: 2,
    img: 'https://www.gifjia5.com/wp-content/uploads/2018/07/15312235433978123.gif',
    key: '44'
  },
  {
    text: '',
    backgroundColor: 'green',
    type: 2,
    img: 'http://pic24.nipic.com/20121010/3798632_184253198370_2.jpg',
    key: '25'
  },
  {
    text: `一楼主发帖：好久没见男友了，真是想他啊，已经决定在他那住上七天了，请问大家，我要给他来个什么惊喜呢？
    一楼回复：给他来个大姨妈……
    二楼回复：外加溃疡和痔疮！”
    三楼：双手受伤。`,
    backgroundColor: 'orange',
    type: 1,
    img: '',
    key: '36'
  },
  {
    text: '',
    backgroundColor: 'blue',
    type: 2,
    img: 'https://www.gifjia5.com/wp-content/uploads/2018/07/15312235433978123.gif',
    key: '47'
  },
  {
    text: '',
    backgroundColor: 'green',
    type: 2,
    img: 'http://pic24.nipic.com/20121010/3798632_184253198370_2.jpg',
    key: '29'
  },
  {
    text: `一楼主发帖：好久没见男友了，真是想他啊，已经决定在他那住上七天了，请问大家，我要给他来个什么惊喜呢？
    一楼回复：给他来个大姨妈……
    二楼回复：外加溃疡和痔疮！”
    三楼：双手受伤。`,
    backgroundColor: 'orange',
    type: 1,
    img: '',
    key: '3c'
  },
  {
    text: '',
    backgroundColor: 'blue',
    type: 2,
    img: 'https://www.gifjia5.com/wp-content/uploads/2018/07/15312235433978123.gif',
    key: '4d'
  }
]

class HomeSwipe extends Component {
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
      <HomeFooter />
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
            cards={CARDS}
            renderCard={(cardData) => <Card {...cardData} />}
            renderNoMoreCards={() => <Text>没有更多卡片</Text>}
            // loop
            stack
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
  }
})

export default HomeSwipe
