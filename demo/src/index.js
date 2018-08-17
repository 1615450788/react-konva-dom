import { Layer, Stage, Rect } from 'react-konva';
import React, { Component } from 'react'
import {render} from 'react-dom'
import Div from '../../src'

class Demo extends Component {
  constructor(...args) {
    super(...args);
    this.state = { x: 100, y: 100, ratio: 1 }
  }
  componentDidMount() {
    this.stage = this.refs.stage
  }
  _getState() {
    return this.refs.stage;
  }
  render() {
    return (
      <div className="container">
        <Stage
          ref="stage"
          width={800}
          height={800}
        >
          <Layer>
            <Div style={{ visibility: 'visible' }}
              {...{
                x: this.state.x,
                y: this.state.y,
                width: 200,
                ratio: this.state.ratio,
                fill: '#aaa',
                stroke: 'black',
                strokeWidth: 2
              }}>
              {/* <Board
                width= {winWidth}
                height= {winHeight}
                gridSize = {gridSize}
              /> */}
              <Rect style={{ visibility: 'visible', width: '100%' }}
                {...{
                  width: 100,
                  height: 70,
                  fill: '#000',
                  strokeWidth: 0
                }} />
              <Rect style={{ visibility: 'visible', width: '100%' }}
                {...{
                  width: 100,
                  height: 70,
                  fill: '#333',
                  strokeWidth: 0
                }} />
              <Rect style={{ visibility: 'visible', width: '100%' }}
                {...{
                  x: 1,
                  y: 1,
                  width: 120,
                  height: 50,
                  fill: '#666',
                  strokeWidth: 0
                }} />
              <Rect style={{ visibility: 'visible', width: '100%' }}
                {...{
                  width: 60,
                  height: 50,
                  fill: '#666',
                  strokeWidth: 0
                }} />
              <Rect style={{ visibility: 'visible', width: '100%' }}
                {...{
                  width: 80,
                  height: 50,
                  fill: '#999',
                  strokeWidth: 0
                }} />
              <Div style={{ visibility: 'visible' }}
                {...{
                  width: 200,
                  fill: '#aaa',
                  stroke: 'black',
                  strokeWidth: 2
                }}>
                <Rect style={{ visibility: 'visible', width: '100%' }}
                  {...{
                    width: 120,
                    height: 50,
                    fill: '#bbb',
                    strokeWidth: 0
                  }} />
              </Div>
              <Div style={{ visibility: 'visible' }}
                {...{
                  width: 200,
                  fill: '#aaa',
                  stroke: 'black',
                  strokeWidth: 2
                }}>
                <Rect style={{ visibility: 'visible', width: '100%' }}
                  {...{
                    width: 120,
                    height: 50,
                    fill: '#bbb',
                    strokeWidth: 0
                  }} />
                <Rect style={{ visibility: 'visible', width: '100%' }}
                  {...{
                    width: 120,
                    height: 50,
                    fill: '#ddd',
                    strokeWidth: 0
                  }} />
              </Div>
              <Rect style={{ visibility: 'visible', width: '100%' }}
                {...{
                  width: 70,
                  height: 50,
                  fill: '#bbb',
                  strokeWidth: 0
                }} />
            </Div>
          </Layer>
        </Stage>
        <button onClick={() => this.setState({ x: this.state.x + 20 })}>X增加20</button>
        <button onClick={() => this.setState({ y: this.state.y + 20 })}>Y增加20</button>
        <button onClick={() => this.setState({ ratio: this.state.ratio + 0.1 })}>ratio增加0.1</button>
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
