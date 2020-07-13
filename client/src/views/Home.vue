<template>
  <section>
    <div @mousedown="click()" class="stage">
      <img class="img" src="../assets/Home.jpg">
    <div :style="{top: top + '%', left: left + '%' }" @mouseover="mouseover()" class="clickDiv">
    Click me
  </div>
    <div class="counter">{{counter}}</div>
  </div>

  </section>

</template>

<script>


export default {
  name: 'Home',

  data: () => ({
    top: '50',
    left: '45',
    counter: 0,
  }),
  methods: {
    mouseover() {
      const newTop = (Math.floor(Math.random() * 85) + 5);
      const newLeft = (Math.floor(Math.random() * 85) + 5);
      this.top = newTop;
      this.left = newLeft;
    },
    click() {
      this.counter += 1;
    },
  },

};


</script>

<style scoped>
.clickDiv {
  position: absolute;
  width: 150px;
  height: 60px;
  background-color: red;
  font-size: 30px;
  text-align: center;
  padding: 5px;
}

.stage {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}
.counter {
  width: 50px;
  height: 50px;
  background-color:yellow;
  font-size: 30px;
  text-align: center;
  color: blue;
  padding: 0px;
  position: absolute;
  top: 0%;
}
.img {
  width: 100%;
  height: 100%;
}
</style>
