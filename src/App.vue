<template>
  <div id="app">
    <!-- <img src="./assets/logo.png" />
    <div
      id="myDiagram"
      ref="my"
      style="border: solid 1px black; width:80%; height:600px;display: flex;justify-content: center;margin: 0 auto;"
    ></div> -->
    <ClassDiagram
      styleString="border: solid 1px black; width:80%; height:600px;justify-content: center;margin: 0 auto;"
      nodeDataUrl="diagramClass"
      linkDataUrl="diagramLink"
    ></ClassDiagram>
  </div>
</template>

<script  type="module">
const ClassDiagram = () => import("./diagram/ClassDiagram");
import { ClassNode } from "./baseElem/ClassNode.js";
import { LinkTemp } from "./baseElem/LinkTemp.js";

export default {
  name: "App",

  components: {
    ClassDiagram
    //局部注册，该组件只能在当前组件被使用
  },
  mounted() {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
