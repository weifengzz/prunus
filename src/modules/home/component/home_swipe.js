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
  Alert
} from 'react-native'
import {
} from '../../../components'
import SwipeCards from './swipe_cards'
import HomeFooter from './home_footer'
import { TextCard, ImageCard, VideoCard } from './cards'

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
    text: ``,
    backgroundColor: 'white',
    type: 3,
    img: '',
    videoUrl: 'https://video.pearvideo.com/mp4/adshort/20190114/cont-1505670-13478217_adpkg-ad_hd.mp4',
    videoImg: 'https://image.pearvideo.com/cont/20190114/cont-1505670-11796291.jpg',
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
    this.homeFooter && this.homeFooter.likes()
  }
  handleNope (card) {
    this.homeFooter && this.homeFooter.unLike()
  }
  handleMaybe (card) {
  }
  /**
   * 加载底部组件
   */
  renderFooter () {
    return (
      <HomeFooter
        ref={(homeFooter) => { this.homeFooter = homeFooter }}
        onUnLikePress={() => {
          this.swipecards._forceLeftSwipe()
        }}
        onLikePress={() => {
          this.swipecards._forceRightSwipe()
        }}
        onCollectionPress={() => {
          Alert.alert('收藏成功！')
        }}
        onPrevPress={() => {
          Alert.alert(
            '反悔',
            '反悔要看一段广告哦',
            [
              { text: '取消' },
              { text: '反悔',
                onPress: () => {
                  this.swipecards._goToPrevCard()
                } }
            ],
            { cancelable: false }
          )
        }}
        onRecommendPress={() => {
          Alert.alert(
            '推荐',
            '为我推荐此类内容',
            [
              { text: '取消' },
              { text: '推荐',
                onPress: () => {
                  this.swipecards._forceUpSwipe()
                } }
            ],
            { cancelable: false }
          )
        }}
      />
    )
  }

  /**
   * 加载
   */
  _renderCards (cardData) {
    const { cardHeight } = this.props
    const { type } = cardData
    switch (type) {
      case 1:
        return <TextCard
          {...cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          stackOffsetY={15}
          ref={(card) => { this.card = card }}
        />
      case 2:
        return <ImageCard
          {...cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          stackOffsetY={15}
          ref={(card) => { this.card = card }}
        />
      case 3:
        return <VideoCard
          {...cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          stackOffsetY={15}
          ref={(card) => { this.card = card }}
        />
      default:
        return <TextCard
          {...cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          stackOffsetY={15}
          ref={(card) => { this.card = card }}
        />
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.cardContentView}>
          <SwipeCards
            ref={(swipecards) => { this.swipecards = swipecards }}
            cards={CARDS}
            cardHeight={this.props.cardHeight}
            renderCard={(cardData) => { return this._renderCards(cardData) }}
            renderNoMoreCards={() => <Text>没有更多卡片</Text>}
            loop
            stack
            stackDepth={3}
            stackOffsetY={15}
            handleYup={(card) => this.handleYup(card)}
            handleNope={(card) => this.handleNope(card)}
            handleMaybe={(card) => this.handleMaybe(card)}
            hasMaybeAction
            bottomView={() => {
              return this.renderFooter()
            }}
            onDragStart={() => {
            }}
          />
        </View>
      </View>
    )
  }
}

HomeSwipe.defaultProps = {
  cardHeight: 0,
  navigation: () => {}
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
