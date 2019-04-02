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
import { TextCard, ImageCard, VideoCard, ShortVideoCard, AdCard, GameCard } from './cards'

const CARDS = [
  {
    text: `一个胖女人问：“老板，称一次体重要花多少钱？”
    老板上下打量了下她，说道：“可能2元，也可能600元。”
    胖女人问道：“为什么？”
    老板说：“称一次2元，如果把秤压坏了是600元。”`,
    backgroundColor: '#409ef4',
    type: 1,
    img: '',
    key: '1'
  },
  {
    text: '捕捉一只有灵气的老奶奶👀',
    backgroundColor: 'white',
    type: 2,
    img: 'https://imgsa.baidu.com/forum/pic/item/ee79ad4bd11373f0d5461663a90f4bfbfaed048e.jpg',
    key: '2'
  },
  {
    text: ``,
    backgroundColor: 'white',
    type: 3,
    img: '',
    videoUrl: 'https://video.pearvideo.com/mp4/adshort/20190114/cont-1505670-13478217_adpkg-ad_hd.mp4',
    videoImg: 'http://tupian.qqjay.com/u/2017/1221/1_143855_6.jpg',
    key: '3'
  },
  {
    text: '这是表情包在开会吗？😊🐂',
    backgroundColor: 'white',
    type: 2,
    img: 'http://wx4.sinaimg.cn/large/006nnnEXly1fuudfmdahhg306007shdt.gif',
    key: '4'
  },
  {
    text: '',
    backgroundColor: 'white',
    type: 4,
    videoUrl: 'http://flv3.bn.netease.com/videolib1/1808/05/lQNaE924V/HD/lQNaE924V-mobile.mp4',
    videoImg: 'http://tupian.qqjay.com/u/2017/1221/1_143855_6.jpg',
    key: '5'
  },
  {
    text: `欧莱雅LOREAL 男士8重护肤套装`,
    backgroundColor: 'white',
    img: '',
    type: 5,
    key: '6',
    adImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547704789561&di=11555fb9d4eb99f98a1f70d022fb5a78&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F69%2F33%2F36%2F8e6474bfec16567dd9d2f971fa6d5ada.jpg',
    downLoadUrl: '',
    webUrl: 'https://item.m.jd.com/product/7463833.html?jd_pop=d345ffef-53aa-4366-8693-11b662274c50'
  },
  {
    title: '贪玩蓝月',
    text: `系兄弟就来砍我！`,
    backgroundColor: 'white',
    img: '',
    type: 6,
    key: '886',
    gameImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547701402703&di=1a0d17a895f6f488a7a3412029b9f4d9&imgtype=0&src=http%3A%2F%2Fapoil.paipaijoy.com%2Fgame%2Fpics%2F20170902220827580.gif',
    downLoadUrl: 'https://imtt.dd.qq.com/16891/09C18D190BB99AEE5B60848EF1C68443.apk?fsname=com.tencent.tmgp.lycqly_1.0.7.81_70.apk&csr=1bbd',
    webUrl: 'https://app.tanwan.com/htmlcode/11731.html?cplaceid=70054636.2280071307.58078986729'
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
  _renderCards (cardData, isTopCard) {
    const { cardHeight } = this.props
    const { type } = cardData
    switch (type) {
      case 1:
        return <TextCard
          cardData={cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          stackOffsetY={15}
        />
      case 2:
        return <ImageCard
          cardData={cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          stackOffsetY={15}
        />
      case 3:
        return <VideoCard
          cardData={cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          paused={!isTopCard}
          stackOffsetY={15}
        />
      case 4:
        return <ShortVideoCard
          cardData={cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          paused={!isTopCard}
          stackOffsetY={15}
        />
      case 5:
        return <AdCard
          cardData={cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          stackOffsetY={15}
        />
      case 6:
        return <GameCard
          cardData={cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          stackOffsetY={15}
        />
      default:
        return <TextCard
          cardData={cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          stackOffsetY={15}
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
            renderCard={(cardData, isTopCard) => { return this._renderCards(cardData, isTopCard) }}
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
            callbackShowingData={(card) => {
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
