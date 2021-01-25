//style="border: solid 1px black; width:100%; height:100%;display: flex;justify-content: center;margin: 0 auto;"
// 组件接收的参数应该有类图的大小，类图数据
<template>
  <div :style="getStyleString"></div>
</template>

//组件行爲
<script>
import { ClassNode } from "../baseElem/ClassNode.js";
import { LinkTemp } from "../baseElem/LinkTemp.js";
import { GroupTemp } from "../baseElem/GroupTemp.js";
let $ = window.go.GraphObject.make;
export default {
  name: "ClassDiagram",
  props: {
    styleString: String, //接受父组件字符串设置图片样式
    nodeDataUrl: String, //接受文件名作为参数读入数据
    linkDataUrl: String
  },
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
    let that = this;
    var myDiagram = $(go.Diagram, this.$el, {
      "undoManager.isEnabled": true,
      //layout: go.ForceDirectedLayout
      layout: $(go.TreeLayout, {
        // this only lays out in trees nodes connected by "generalization" links
        angle: 90,
        path: go.TreeLayout.PathSource, // links go from child to parent
        setsPortSpot: false, // keep Spot.AllSides for link connection spot
        setsChildPortSpot: false, // keep Spot.AllSides
        // nodes not connected by "generalization" links are laid out horizontally
        arrangement: go.TreeLayout.ArrangementHorizontal
      })
    });
    let ClassTemplate = new ClassNode();
    let ClassLinkTemplate = new LinkTemp();
    let GroupTemplate = new GroupTemp();

    //ClassTemplate.setAnnotationBackgroundColor("#DA70D6");

    myDiagram.nodeTemplate = ClassTemplate.getClassTemplate();
    myDiagram.linkTemplate = ClassLinkTemplate.getLinkTemp();
    myDiagram.groupTemplate = GroupTemplate.getGroupTemplate();

    var diagramClassData = require(`./../../data/${that.nodeDataUrl}.json`); //读取节点数据
    var nodedata = diagramClassData.classArray;

    var diagramLinkData = require(`./../../data/${that.linkDataUrl}.json`); //读取关系数据
    var linkdata = diagramLinkData.LinkArray;

    myDiagram.model = $(go.GraphLinksModel, {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: nodedata,
      linkDataArray: linkdata
    });
    var data = myDiagram.model;
    console.log("找到的data是" + data);
  }
};
</script>

//組件樣式
<style>
</style>