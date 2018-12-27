/**
 * https://github.com/magicismight/StaticContainer#readme
 */
import { Component, Children } from 'react'

class StaticContainer extends Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.shouldUpdate
  }

  render () {
    const child = this.props.children
    return (child === null || child === false) ? null : Children.only(child)
  }
}

export default StaticContainer
