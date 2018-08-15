import { Text, Rect, Group } from 'react-konva'
import React, { Component } from 'react';
import _ from 'lodash';
import * as Css from './css';
import Events from './events';

export default class Div extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height:[]
    };
  }

  initLocalState() {
    this.sumHeight = 0//累计行高，不含当前行
    this.height = 0//当前行高
    this.width = 0//当前行宽
    this.x = this.props.x//容器X坐标
    this.y = this.props.y//容器Y坐标
    this.w = this.props.width//容器宽度
    this.h = this.props.height//容器高度
    return
  }

  eventOption() {
    const props = this.props
    const option = {}
    Events.forEach(v => {
      if (props[v] && typeof props[v] === 'function') {
        option[v] = props[v]
      }
    })
    return option
  }

  styleOption() {
    const option = {}
    const { style } = this.props
    Object.keys(style).forEach(v => {
      if (Css[v]) {
        Object.assign(option, Css[v](style[v]))
      }
    })
    return option
  }

  formatCoord(children) {
    let result = []
    let indexDiv = 0
    const { x, y, width, ratio } = this.props
    const changeHeight = h=>this.changeHeight(h)
    if (_.isObjectLike(children)) {
      if (!_.isArray(children)) {
        children = [children]
      }
      _.each(children, (v, i) => {

        //处理样式继承，计算出继承后样式
        const props = Object.assign({ x, y, width, height: 0 }, v.props);

        //如果为子Div组件则不计算ratio，让其自行计算
        if (v.type.name === 'Div') {
            let obj = {ratio}
            if(props.height===0){
                console.log(this.state.height[indexDiv])
                obj.height=this.state.height[indexDiv]
            }
            Object.assign(props, obj)
            indexDiv++
        }

        //判断是否绝对定位，否则不进行布局计算
        if (!this.isAbsolute(v.props)) {
          Object.assign(props, this.calcLayout(props),{changeHeight})
        }

        if(v.type.name !== 'Div'){
            Object.assign(props, this.calcRatio(props))
        }

        result.push({ ...v, props })
      })
    }
    return result
  }

  isAbsolute(obj) {
    return _.has(obj, 'x') || _.has(obj, 'y')
  }

  calcLayout(layout) {
    let area = {};
    //判断是当前行是否能容纳该元素，如果不能则换行处理
    if (this.w >= this.width + layout.width) {
      area = {
        x: this.x + this.width,
        y: this.y + this.sumHeight
      }
      if (this.height < layout.height) {
        this.height = layout.height
      }
      this.width += layout.width
    } else {
      this.sumHeight += this.height;
      area = {
        x: this.x,
        y: this.y + this.sumHeight
      }
      this.width = layout.width;
      this.height = layout.height;
    }
    return area
  }

  calcRatio(obj = {}) {
    let result = {}
    const { ratio = 1, ratioKeys = ['x', 'y', 'width', 'height'] } = this.props
    _.each(ratioKeys, (v) => {
      if (obj[v]) {
        result[v] = obj[v] * ratio
      }
    })
    return result
  }

  changeHeight(height) {
    this.setState((state)=>{ 
      return {
        height:state.height.concat([height])
      }
    })
  }

  componentDidMount(){
    if(this.props.changeHeight){
      this.props.changeHeight(this.h)
    }
  }

  render() {
    this.initLocalState();
    let events = this.eventOption()
    let children = this.formatCoord(this.props.children)//.slice().reverse()
    let styles = Object.assign(
      this.styleOption(),
      _.omit(this.props, Object.keys(Css).concat(Events).concat(['children', 'style'])),
    )
    //容器高度不存在时根据内容撑开
    if (!this.h) {
      styles.height = this.h = this.sumHeight + this.height
    }
    Object.assign(styles, this.calcRatio(styles))
    console.log(children)
    return (
      <Group {...events}>
        <Rect {...styles} />
        {children}
      </Group>
    )
  }
}