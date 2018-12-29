import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Alert
} from 'react-native'
// import { Icon } from './src/components'
// {/* <Icon type='icon_font' name='p_video' size={30} color='blue' /> */}
import Circle from './src/components/loading/circle_loading'
import { shareUtil } from './src/utils'
import { SplashScreen } from './src/components'

export default class App extends Component {
  // sizes={sizes}
  //           // sizes={[1.5, 1, 1]}
  //           circleStyle={circleStyle}
  //         />
  //         <ObjectAnimated
  //           value={this.animatedValue}
  //           sizes={sizes}
  //           // sizes={[1, 1.5, 1]}
  //           circleStyle={circleStyle}
  //         />
  //         <ObjectAnimated
  //           value={this.animatedValue}
  //           sizes={sizes}
  //           // sizes={[1, 1, 1.5]}
  //           circleStyle={circleStyle}
  componentDidMount () {
    SplashScreen.hide()
    shareUtil.shareboard('12312321', null, 'https://www.baidu.com', '标题', [0, 1, 2, 3, 4], (code, message) => {
      Alert.alert(code + message)
    })
    // shareUtil.share("text",null,'https://www.baidu.com','title', 0 , (code,message) =>{
    // Alert.alert(code + message)
  // });
  }
  render () {
    return (
      <View style={styles.container}>
        <Circle
          active
          sizes={[[1.5, 1, 1], [1, 1.5, 1], [1, 1, 1.5]]}
          circleStyles={[{ backgroundColor: 'blue' }, { backgroundColor: 'red' }, { backgroundColor: 'green' }]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
