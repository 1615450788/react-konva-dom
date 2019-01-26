export default {
  data: {
    x: 0,
    y: 0,
    text: ""
  },
  methods: {
    changeX() {
      const x = this.get("x");
      this.set({ x: x + 10 });
    },
    changeY() {
      const y = this.get("y");
      this.set({ y: y + 10 });
    },
    changeText() {
      this.set({ text: Math.random() });
    }
  }
};
