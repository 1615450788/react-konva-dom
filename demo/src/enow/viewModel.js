import React, { PureComponent } from "react";
import controller from "./controller";

export default class ModelComponent extends PureComponent {
  constructor(props) {
    super(props);
    const { id, tmType, initData } = props;
    // 将组件的model注册到Controller,如果该id的model存在则复用，不存在则根据modeloption实例化新的model
    this.model = controller.registerModel(id, tmType,initData);
    this.component = controller.getComponent(tmType);
  }

  componentWillMount() {
    this.model.watch(this.watchFn);
  }

  componentWillUnmount() {
    this.model.unwatch(this.watchFn);
  }

  watchFn = () => {
    this.forceUpdate();
  };

  render() {
    const { data, methods } = this.model;
    const Comp = this.component;
    return <Comp {...{ data, methods }} />;
  }
}
