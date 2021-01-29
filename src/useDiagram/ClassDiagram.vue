//style="border: solid 1px black; width:100%; height:100%;display: flex;justify-content: center;margin: 0 auto;"
// 组件接收的参数应该有类图的大小，类图数据
<template>
  <div>
    <div ref="overview" id="myOverviewDiv"></div>
    <div ref="diagram" id="myDiagramDiv"></div>
  </div>
</template>

//组件行爲
<script>
import { ClassDiagram } from "../diagram/ClassDiagram.js";
let $ = window.go.GraphObject.make;
export default {
  name: "ClassDiagram",
  props: {},
  data() {
    return {
      diagram: null
    };
  },
  computed: {
    getStyleString: function() {
      return this.styleString;
    }
  },
  mounted() {
    //创立新的类图对象
    let myDiagram = new ClassDiagram();

    //如果要修改类图对象中的默认设置
    //可以先获得类图对象中的节点模板和联系模板，再调用函数进行设置

    let diaClassNodeTemp = myDiagram.getClassNodeTemplate();
    let diaLinkTemp = myDiagram.getClassLinkTemplate();

    // diaClassNodeTemp.setClassBackgroundColor("#8A2BE2");
    // console.log(
    //   "打印改变后的颜色" +
    //     myDiagram.getClassNodeTemplate().getClassBackgroundColor()
    // );

    //这里暂时传入的只是文件名，数据放在Data文件夹中
    let nodeDataUrl = "diagramClass";
    let linkDataUrl = "diagramLink";
    //做出自己想要的修改后，最后调用类图对象的drawDiagram渲染图片
    //传入的参数是Dom对象、数据urL
    myDiagram.drawDiagram(this.$refs.diagram, nodeDataUrl, linkDataUrl);

    //如果要设置缩略图
    myDiagram.setOverview(this.$refs.overview);
  }
};
</script>

//組件樣式
<style>
#myOverviewDiv {
  position: absolute;
  width: 300px;
  height: 125px;
  top: 30px;
  left: 60px;
  background-color: #f2f2f2;
  z-index: 300; /* make sure its in front */
  border: solid 1px black;
}
#myDiagramDiv {
  background-color: #f2f2f2;
  border: solid 2px black;
  width: 80%;
  height: 700px;
  justify-content: center;
  margin: 0 auto;
}
</style>