'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactKonva = require('react-konva');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _css = require('./css');

var Css = _interopRequireWildcard(_css);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Div = function (_Component) {
  _inherits(Div, _Component);

  function Div(props) {
    _classCallCheck(this, Div);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      height: []
    };
    return _this;
  }

  Div.prototype.initLocalState = function initLocalState() {
    this.sumHeight = 0; //累计行高，不含当前行
    this.height = 0; //当前行高
    this.width = 0; //当前行宽
    this.x = this.props.x; //容器X坐标
    this.y = this.props.y; //容器Y坐标
    this.w = this.props.width; //容器宽度
    this.h = this.props.height; //容器高度
    return;
  };

  Div.prototype.eventOption = function eventOption() {
    var props = this.props;
    var option = {};
    _events2.default.forEach(function (v) {
      if (props[v] && typeof props[v] === 'function') {
        option[v] = props[v];
      }
    });
    return option;
  };

  Div.prototype.styleOption = function styleOption() {
    var option = {};
    var style = this.props.style;

    Object.keys(style).forEach(function (v) {
      if (Css[v]) {
        Object.assign(option, Css[v](style[v]));
      }
    });
    return option;
  };

  Div.prototype.formatCoord = function formatCoord(children) {
    var _this2 = this;

    var result = [];
    var indexDiv = 0;
    var _props = this.props,
        x = _props.x,
        y = _props.y,
        width = _props.width,
        ratio = _props.ratio;

    var changeHeight = function changeHeight(h) {
      return _this2.changeHeight(h);
    };
    if (_lodash2.default.isObjectLike(children)) {
      if (!_lodash2.default.isArray(children)) {
        children = [children];
      }
      _lodash2.default.each(children, function (v, i) {

        //处理样式继承，计算出继承后样式
        var props = Object.assign({ x: x, y: y, width: width, height: 0 }, v.props);

        //如果为子Div组件则不计算ratio，让其自行计算
        if (v.type.tagName === 'Div') {
          var obj = { ratio: ratio };
          if (props.height === 0) {
            console.log(_this2.state.height[indexDiv]);
            obj.height = _this2.state.height[indexDiv];
          }
          Object.assign(props, obj);
          indexDiv++;
        }

        //判断是否绝对定位，否则不进行布局计算
        if (!_this2.isAbsolute(v.props)) {
          Object.assign(props, _this2.calcLayout(props), { changeHeight: changeHeight });
        }

        if (v.type.name !== 'Div') {
          Object.assign(props, _this2.calcRatio(props));
        }

        result.push(_extends({}, v, { props: props }));
      });
    }
    return result;
  };

  Div.prototype.isAbsolute = function isAbsolute(obj) {
    return _lodash2.default.has(obj, 'x') || _lodash2.default.has(obj, 'y');
  };

  Div.prototype.calcLayout = function calcLayout(layout) {
    var area = {};
    //判断是当前行是否能容纳该元素，如果不能则换行处理
    if (this.w >= this.width + layout.width) {
      area = {
        x: this.x + this.width,
        y: this.y + this.sumHeight
      };
      if (this.height < layout.height) {
        this.height = layout.height;
      }
      this.width += layout.width;
    } else {
      this.sumHeight += this.height;
      area = {
        x: this.x,
        y: this.y + this.sumHeight
      };
      this.width = layout.width;
      this.height = layout.height;
    }
    return area;
  };

  Div.prototype.calcRatio = function calcRatio() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var result = {};
    var _props2 = this.props,
        _props2$ratio = _props2.ratio,
        ratio = _props2$ratio === undefined ? 1 : _props2$ratio,
        _props2$ratioKeys = _props2.ratioKeys,
        ratioKeys = _props2$ratioKeys === undefined ? ['x', 'y', 'width', 'height'] : _props2$ratioKeys;

    _lodash2.default.each(ratioKeys, function (v) {
      if (obj[v]) {
        result[v] = obj[v] * ratio;
      }
    });
    return result;
  };

  Div.prototype.changeHeight = function changeHeight(height) {
    this.setState(function (state) {
      return {
        height: state.height.concat([height])
      };
    });
  };

  Div.prototype.componentDidMount = function componentDidMount() {
    if (this.props.changeHeight) {
      this.props.changeHeight(this.h);
    }
  };

  Div.prototype.render = function render() {
    this.initLocalState();
    var events = this.eventOption();
    var children = this.formatCoord(this.props.children); //.slice().reverse()
    var styles = Object.assign(this.styleOption(), _lodash2.default.omit(this.props, Object.keys(Css).concat(_events2.default).concat(['children', 'style'])));
    //容器高度不存在时根据内容撑开
    if (!this.h) {
      styles.height = this.h = this.sumHeight + this.height;
    }
    Object.assign(styles, this.calcRatio(styles));
    return _react2.default.createElement(
      _reactKonva.Group,
      events,
      _react2.default.createElement(_reactKonva.Rect, styles),
      children
    );
  };

  return Div;
}(_react.Component);

Div.tagName = 'Div';

exports.default = Div;
module.exports = exports['default'];