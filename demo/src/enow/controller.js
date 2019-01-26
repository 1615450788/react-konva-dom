import { set, fromJS } from "immutable";
import BaseModel from "./baseModel";

class Controller {
  constructor() {
    this.registerList = {};
    this.models = {};
  }
  getModel(key) {
    return this.models[key];
  }

  addModel(key, model) {
    return (this.models[key] = model);
  }

  getComponent(tmType) {
    return this.registerList[tmType].component;
  }

  instanceModel(tmType, initData) {
    const { model } = this.registerList[tmType];
    return new BaseModel({...model,initData});
  }

  registerModel(key, tmType, initData) {
    const oldModel = this.getModel(key);
    return oldModel || this.addModel(key, this.instanceModel(tmType, initData));
  }

  registerComponent({ model, component, tmType }) {
    this.registerList[tmType] = { model, component };
  }
}

export default new Controller();
