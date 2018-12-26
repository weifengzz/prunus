// 字体文件
import Icon from './icons'
// 启动页
import SplashScreen from 'react-native-splash-screen'
// 点击按钮组件，防止重复点击
import NormalTouchableOpacity from './normal_touchable_opacity'
// 首页loading界面
import PulseLoader from './pulse_loader'
// 轮播组件
import RNSwiper from './react_native_swiper'
// 网页失败界面
import WebViewError from './web_view_error'
// 旋转卡片
import CardFlip from './card_flip'
// 自定义文字输入组件，解决键盘弹出问题
import TextInputScrollView from './text_input_scrollview'

export {
  Icon,
  SplashScreen,
  NormalTouchableOpacity as TouchableOpacity,
  PulseLoader,
  RNSwiper,
  WebViewError,
  CardFlip,
  TextInputScrollView
}
