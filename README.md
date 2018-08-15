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