import { fromJS } from "immutable";

export default class BaseModel {
  constructor({ data = {}, internalData = {}, initData = {}, methods = {} }) {
    this.internalData = fromJS({ ...this.internalData, ...internalData });
    this.data = fromJS({ ...this.data, ...data, ...initData });
    const newMethods = { ...this.methods, ...methods };
    for (let i in methods) {
      newMethods[i] = newMethods[i].bind(this);
    }
    this.methods = newMethods;
  }
  // 无需触发更新的状态
  internalData = {
    // 通用组件属性
    moveGroup: [],
    id: "",
    tmType: "",
    x: 0,
    y: 0,
    // 组件行为配置
    canDrag: true,
    canScale: true,
    // 组件功能配置
    canStroke: false,
    canFill: false,
    canDelete: true,
    canClone: true,
    canToTop: true,
    canTopicExpande: false,
    canTopicCollapse: false
  };
  data = {
    width: 0,
    height: 0,
    scale: 1
  };
  methods = {};
  // model变更的订阅队列
  watchArr = [];
  get(key) {
    if (key) {
      return this.data.get(key);
    }
    return {
      internalData: this.internalData,
      data: this.data
    };
  }

  set(obj = {}, isInternal) {
    if (isInternal) {
      this.internalData = this.internalData.mergeDeep(obj);
    } else {
      this.data = this.data.mergeDeep(obj);
    }
    this.trigger(obj, isInternal);
  }

  getWatchList() {
    return this.watchArr;
  }

  trigger(param, isInternal) {
    const watchArr = this.getWatchList(isInternal);
    watchArr.map(fn => {
      if (typeof fn === "function") {
        fn(param);
      }
    });
  }

  watch(fn, isInternal) {
    const watchArr = this.getWatchList(isInternal);
    if (typeof fn === "function") {
      watchArr.push(fn);
    }
  }

  unwatch(fn, isInternal) {
    if (typeof fn === "function") {
      const watchArr = this.getWatchList(isInternal);
      const index = watchArr.indexOf(fn);
      if (index >= 0) {
        watchArr.splice(index, 1);
      }
    }
  }
}
