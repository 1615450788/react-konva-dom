# react-konva-dom

一个为`react-konva`实现文档流的工具组件，将您从繁重的canvas元素坐标计算中解脱出来！

[demo](https://1615450788.github.io/react-konva-dom/demo/dist/index.html)

## 依赖
- konva
- react-konva
- react
- lodash

## 安装方式
```
npm install react-konva-dom
```

## 引入方式
```javascript
import { Layer, Stage, Rect } from 'react-konva';
import React, { Component } from 'react'
import Div from 'react-konva-dom'

class GoBang extends Component {
  constructor(...args) {
    super(...args);
    this.state = { x: 100, y: 100, ratio: 1 }
  }
  render() {
    return (
      <div className="container">
        <Stage
          width={800}
          height={800}
        >
          <Layer>
            <Div
              {...{
                x: this.state.x,
                y: this.state.y,
                width: 200,
                ratio: this.state.ratio,
                fill: '#aaa',
                stroke: 'black',
                strokeWidth: 2
              }}>
              <Rect
                {...{
                  width: 100,
                  height: 70,
                  fill: '#000',
                  strokeWidth: 0
                }} />
            </Div>
          </Layer>
        </Stage>
      </div>
    )
  }
}
```

## 说明

1. ratio参数为Div组件特有属性，仅在最终渲染的时候对x,y,height,width等值进行缩放比计算
2. ratioKeys参数为需要进行缩放比计算的属性名数组，默认为：['x','y','height','width'],与ratio参数配合使用
3. Div组件本身为konva的rect组件的扩展增强，对子元素进行了dom文档流式的布局计算，从左往右，从上往下布局
4. Div组件高度为空时，会自动根据子元素的高度进行进行计算，允许进行嵌套
5. Div组件接受事件绑定，所有子元素均会出发冒泡，进行绝对定位的子元素也不例外
6. 当嵌套有高度为空的子Div组件时候，由于react的渲染顺序是从上到下，第一次渲染时子Div组件的高度是无法获取到的，只有等待子Div组件渲染完成在将高度传递给父元素，这样的后果就是，当嵌套Div层级越深，渲染次数就会越多
7. 当子元素宽度宽度为空时，会继承父Div组件的宽度
8. 当子元素设置x,y坐标后会当作绝对定位元素进行渲染，不在文档流中布局计算，但仍会进行ratio计算
