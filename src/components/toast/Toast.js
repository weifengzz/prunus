/**
 * https://github.com/magicismight/react-native-root-toast
 */
import React, {
  Component
} from 'react'
import RootSiblings from './RootSiblingManager'
import ToastContainer, { positions, durations } from './ToastContainer'

/**
 * @class
 * @classdesc https://github.com/magicismight/react-native-root-toast
 */
class Toast extends Component {
  constructor (props) {
    super(props)
    this._toast = null
  }

  componentWillMount () {
    this._toast = new RootSiblings(<ToastContainer
      {...this.props}
      duration={0}
    />)
  }

  componentWillReceiveProps (nextProps) {
    this._toast.update(<ToastContainer
      {...nextProps}
      duration={0}
    />)
  }

  componentWillUnmount () {
    this._toast.destroy()
  }

  render () {
    return null
  }
}

Toast.positions = positions
Toast.durations = durations
Toast.show = (message, options = { position: positions.BOTTOM, duration: durations.SHORT }) => {
  return new RootSiblings(<ToastContainer
    {...options}
    visible
  >
    {message}
  </ToastContainer>)
}
Toast.hide = toast => {
  if (toast instanceof RootSiblings) {
    toast.destroy()
  } else {
    console.warn(`Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`)
  }
}

export {
  RootSiblings as Manager
}
export default Toast
