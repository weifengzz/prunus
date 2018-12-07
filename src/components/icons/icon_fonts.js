/**
 * 自定义字体文件
 * @author koohead
 * @description 自定义字体文件
 */
import { createIconSet } from 'react-native-vector-icons'
const glyphMap = require('./glyphmaps/icon_fonts.json')
const iconSet = createIconSet(glyphMap, 'Iconfont', 'Iconfont.ttf')
export default iconSet
