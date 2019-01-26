import React, { PureComponent } from "react";

export default class Demo extends PureComponent {
  constructor() {
    super();
  }

  render() {
    const { data, methods } = this.props;
    const style = {
      height: 100,
      width: 100,
      position: "relative",
      left: data.get("x"),
      top: data.get("y"),
      backgroundColor: "red"
    };

    return (
      <div>
        内部操作：
        <button onClick={() => methods.changeX()}>x增加10</button>
        <button onClick={() => methods.changeY()}>y增加10</button>
        <button onClick={() => methods.changeText()}>更改文本</button>
        <div style={style}>{data.get("text")}</div>
      </div>
    );
  }
}
