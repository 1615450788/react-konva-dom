var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Layer, Stage, Rect } from 'react-konva';
import React, { Component } from 'react';
import Div from './documentFlow';

var GoBang = function (_Component) {
  _inherits(GoBang, _Component);

  function GoBang() {
    _classCallCheck(this, GoBang);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

    _this.state = { x: 100, y: 100, ratio: 1 };
    return _this;
  }

  GoBang.prototype.componentDidMount = function componentDidMount() {
    this.stage = this.refs.stage;
  };

  GoBang.prototype._getState = function _getState() {
    return this.refs.stage;
  };

  GoBang.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        Stage,
        {
          ref: 'stage',
          width: 800,
          height: 800
        },
        React.createElement(
          Layer,
          null,
          React.createElement(
            Div,
            _extends({ style: { visibility: 'visible' }
            }, {
              x: this.state.x,
              y: this.state.y,
              width: 200,
              ratio: this.state.ratio,
              fill: '#aaa',
              stroke: 'black',
              strokeWidth: 2
            }),
            React.createElement(Rect, _extends({ style: { visibility: 'visible', width: '100%' }
            }, {
              width: 100,
              height: 70,
              fill: '#000',
              strokeWidth: 0
            })),
            React.createElement(Rect, _extends({ style: { visibility: 'visible', width: '100%' }
            }, {
              width: 100,
              height: 70,
              fill: '#333',
              strokeWidth: 0
            })),
            React.createElement(Rect, _extends({ style: { visibility: 'visible', width: '100%' }
            }, {
              x: 1,
              y: 1,
              width: 120,
              height: 50,
              fill: '#666',
              strokeWidth: 0
            })),
            React.createElement(Rect, _extends({ style: { visibility: 'visible', width: '100%' }
            }, {
              width: 60,
              height: 50,
              fill: '#666',
              strokeWidth: 0
            })),
            React.createElement(Rect, _extends({ style: { visibility: 'visible', width: '100%' }
            }, {
              width: 80,
              height: 50,
              fill: '#999',
              strokeWidth: 0
            })),
            React.createElement(
              Div,
              _extends({ style: { visibility: 'visible' }
              }, {
                width: 200,
                fill: '#aaa',
                stroke: 'black',
                strokeWidth: 2
              }),
              React.createElement(Rect, _extends({ style: { visibility: 'visible', width: '100%' }
              }, {
                width: 120,
                height: 50,
                fill: '#bbb',
                strokeWidth: 0
              }))
            ),
            React.createElement(
              Div,
              _extends({ style: { visibility: 'visible' }
              }, {
                width: 200,
                fill: '#aaa',
                stroke: 'black',
                strokeWidth: 2
              }),
              React.createElement(Rect, _extends({ style: { visibility: 'visible', width: '100%' }
              }, {
                width: 120,
                height: 50,
                fill: '#bbb',
                strokeWidth: 0
              })),
              React.createElement(Rect, _extends({ style: { visibility: 'visible', width: '100%' }
              }, {
                width: 120,
                height: 50,
                fill: '#ddd',
                strokeWidth: 0
              }))
            ),
            React.createElement(Rect, _extends({ style: { visibility: 'visible', width: '100%' }
            }, {
              width: 70,
              height: 50,
              fill: '#bbb',
              strokeWidth: 0
            }))
          )
        )
      ),
      React.createElement(
        'button',
        { onClick: function onClick() {
            return _this2.setState({ x: _this2.state.x + 20 });
          } },
        'X\u589E\u52A020'
      ),
      React.createElement(
        'button',
        { onClick: function onClick() {
            return _this2.setState({ y: _this2.state.y + 20 });
          } },
        'Y\u589E\u52A020'
      ),
      React.createElement(
        'button',
        { onClick: function onClick() {
            return _this2.setState({ ratio: _this2.state.ratio + 0.1 });
          } },
        'ratio\u589E\u52A00.1'
      )
    );
  };

  return GoBang;
}(Component);

export default GoBang;