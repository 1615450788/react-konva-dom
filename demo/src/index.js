import React, { Component } from "react";
import { render } from "react-dom";
// import { Layer, Stage, Rect } from 'react-konva';
// import Div from '../../src'
import Controller from "./enow/controller";
import ViewModel from "./enow/viewModel";
import Model from "./component/model";
import Comp from "./component/component";

Controller.registerComponent({
  model: Model,
  component: Comp,
  tmType: "rect"
});

const elements = [
  { id: 1, tmType: "rect", x: 100 },
  { id: 2, tmType: "rect", x: 200 }
];

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {elements.map(v => (
          <ViewModel
            key={v.id}
            id={v.id}
            tmType={v.tmType}
            initData={v}
          />
        ))}
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
