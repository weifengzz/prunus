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
    text: `一楼主发帖：好久没见男友了，真是想他啊，已经决定在他那住上七天了，请问大家，我要给他来个什么惊喜呢？
    一楼回复：给他来个大姨妈……
    二楼回复：外加溃疡和痔疮！”
    三楼：双手受伤。`,
    backgroundColor: '#409ef4',
    type: 1,
    img: '',
    key: '1'
  },
  {
    text: '',
    backgroundColor: 'white',
    type: 2,
    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547635267283&di=3b399ab2eccccc937d5962b8eea66462&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201411%2F01%2F20141101043443_F25UB.thumb.700_0.jpeg',
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
    text: '',
    backgroundColor: 'white',
    type: 2,
    img: 'https://www.gifjia5.com/wp-content/uploads/2018/07/15312235433978123.gif',
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
  _renderCards (cardData, isTopCard) {
    const { cardHeight } = this.props
    const { type } = cardData
    switch (type) {
      case 1:
        return <TextCard
          {...cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          stackOffsetY={15}
        />
      case 2:
        return <ImageCard
          {...cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          stackOffsetY={15}
        />
      case 3:
        return <VideoCard
          {...cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          paused={!isTopCard}
          stackOffsetY={15}
        />
      case 4:
        return <ShortVideoCard
          {...cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          paused={!isTopCard}
          stackOffsetY={15}
        />
      case 5:
        return <AdCard
          {...cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          stackOffsetY={15}
        />
      case 6:
        return <GameCard
          {...cardData}
          cardHeight={cardHeight}
          stackDepth={3}
          stackOffsetY={15}
        />
      default:
        return <TextCard
          {...cardData}
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
