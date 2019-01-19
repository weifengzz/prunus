/**
 * 卡片详情
 * 2018-12-19 16:31
 * @author koohead
 * @description 主页面
 */

import React, { Component } from 'react'
import {
  View,
  Platform,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native'
import {
  Icon,
  CoverImage
} from '../../../components'

import commonStyles from '../../../styles'

const IS_IOS = Platform.OS === 'ios'

const RECOMMEND_CARDS = [
  {
    text: '公共汽车上老太太怕坐过站逢站必问．汽车到一站她就一个劲地用雨伞捅司机：＂这是展览中心吗？＂＂不是，这是排骨！＂'
  },
  {
    text: '某男向某女求爱，用二胡拉了一曲＜二泉映月＞．事后女的说：＂二胡拉的不咋地，人长的倒是和瞎子阿炳挺像"'
  },
  {
    text: '丈夫出其不意回到家，看到床边的烟灰缸仍有冒着烟的雪茄，满腹狐疑地瞪着那根雪茄，对着缩在床头抖缩的妻子咆哮：＂这从哪里来得？一阵沉寂之后，从衣橱中传出发抖的男人的声音：＂古巴．＂'
  },
  {
    text: '一老伙计丢车，当他把新买的一辆车放在楼下时他上了三把锁并夹了一张纸:让你丫偷！第二天车没丢，并且多了两把锁和一张，上写着：让你丫骑'
  },
  {
    text: '某日刘虹宏涛遇到外宾，就上前搭话曰：＂ｉam hongtao liu .”外宾曰：＂我还他妈的是方块七呢．＂'
  },
  {
    text: '护士看到病人在病房喝酒，就上前走过去叮嘱说：＂小心肝！＂病人微笑道：＂小宝贝．＂'
  }
]

/**
 * @class
 * @classdesc 卡片详情
 */
class CardDetailScreen extends Component {
  /**
   * 渲染卡片组件
   */
  _renderContentCard () {
    const { data } = this.props.navigation.state.params
    return (
      <View style={[styles.contentCard, IS_IOS ? styles.shadowStyle : { borderWidth: 1, borderColor: '#bdbdbd' }]}>
        <View style={styles.headerView}>
          <CoverImage source={{ uri: 'http://cdn.duitang.com/uploads/item/201407/24/20140724190906_MCkXs.thumb.700_0.jpeg' }} style={styles.headerImage} />
          <View style={styles.headerTextView}>
            <Text style={styles.headerText}>我叫白小飞</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.cardText}>{data.text}</Text>
        </View>
        <View style={styles.footerView}>
          <View style={[styles.footerItemView, { flex: 2 }]}>
            <View style={styles.itemLeftView}>
              <Icon size={18} color={commonStyles.textLightColor.color} name={'smileo'} type={'ant_design'} />
              <Text style={styles.commonSmallText}>100</Text>
              <View style={{ width: 20 }} />
              <Icon size={20} color={commonStyles.textLightColor.color} name={'eyeo'} type={'ant_design'} />
              <Text style={styles.commonSmallText}>3.5k</Text>
            </View>
            <Icon size={18} color={'red'} name={'heart'} type={'ant_design'} />
            <Text style={styles.commonSmallText}>2.2k</Text>
            <View style={{ width: 20 }} />
            <Icon size={18} color={commonStyles.textLightColor.color} name={'message1'} type={'ant_design'} />
            <Text style={styles.commonSmallText}>80</Text>
          </View>
        </View>
        {this._renderCommentsView()}
      </View>
    )
  }

  /**
   * 渲染卡片界面
   */
  _renderRecommendCard () {
    return (
      <View style={styles.recommendCardView}>
        <Text>为您推荐</Text>
        <ScrollView
          horizontal
        >
          {
            RECOMMEND_CARDS.map((item, index) => {
              return (
                <View key={index} style={styles.recommendCard} />
              )
            })
          }
        </ScrollView>
      </View>
    )
  }

  /**
   * 渲染评论界面
   */
  _renderCommentsView () {
    return (
      <View style={styles.commentView}>
        <View style={styles.commentTitleView}>
          <Icon size={15} color={'red'} name={'fire'} type={'font_awesome_5'} />
          <Text style={styles.hotText}>热门评论</Text>
        </View>
        <View style={{ height: 400 }} />
      </View>
    )
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          { this._renderContentCard() }
          {/* { this._renderRecommendCard() } */}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.lightBgColor.color
  },
  contentCard: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.6,
    shadowRadius: 10
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    color: commonStyles.textDarkColor.color,
    lineHeight: 25
  },
  recommendCardView: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10
  },
  headerView: {
    flexDirection: 'row',
    padding: 10
  },
  headerImage: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  headerTextView: {
    marginLeft: 10,
    height: 40,
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 16,
    color: commonStyles.textDarkColor.color
  },
  recommendCard: {
    height: 90,
    width: 60,
    backgroundColor: 'black',
    margin: 10,
    borderRadius: 10
  },
  footerView: {
    height: 70,
    width: '100%',
    flexDirection: 'row'
  },
  footerItemView: {
    paddingHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  itemLeftView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5
  },
  commonSmallText: {
    fontSize: 12,
    color: commonStyles.textLightColor.color,
    marginLeft: 10,
    alignSelf: 'center'
  },
  titleText: {
    fontSize: 23,
    color: 'white',
    fontWeight: 'bold'
  },
  commentView: {
    paddingHorizontal: 18,
    marginBottom: 20
  },
  commentTitleView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  hotText: {
    fontSize: 14,
    color: commonStyles.textDarkColor.color,
    marginLeft: 8
  }
})

CardDetailScreen.navigationOptions = props => {
  const { navigation } = props
  return {
    title: '',
    headerLeft: (
      <TouchableOpacity onPress={() => {
        navigation.goBack(null)
      }}>
        <View style={{ width: 100, height: 45, justifyContent: 'center', paddingLeft: 10 }}>
          <Icon containerStyle={{ width: 20, marginLeft: 15 }} size={20} color={'white'} name='left' type='ant_design' />
        </View>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity style={{ width: 40 }} onPress={() => { }}>
        <Icon size={20} color={'white'} name='sharealt' type='ant_design' />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: commonStyles.primaryColor.color,
      borderBottomWidth: 0.5,
      borderBottomColor: commonStyles.textLightColor.color,
      height: Platform.OS === 'ios' ? 45 : StatusBar.currentHeight + 45,
      borderTopWidth: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      borderTopColor: '#bdbdbd',
      elevation: 0,
      shadowOpacity: 0
    },
    headerTitleStyle: {
      color: 'white',
      textAlign: 'center',
      flex: 1
    }
  }
}

export default CardDetailScreen
