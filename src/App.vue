//style="border: solid 1px black; width:100%; height:100%;display: flex;justify-content: center;margin: 0 auto;"
// 组件接收的参数应该有类图的大小，类图数据
<template>
  <div id="app">
    <!-- <div id="myOverviewDiv"></div> -->
    <ClassDiagram></ClassDiagram>
  </div>
</template>

<script  type="module">
const ClassDiagram = () => import("./useDiagram/ClassDiagram");
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