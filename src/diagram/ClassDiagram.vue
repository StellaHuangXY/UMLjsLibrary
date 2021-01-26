//style="border: solid 1px black; width:100%; height:100%;display: flex;justify-content: center;margin: 0 auto;"
// 组件接收的参数应该有类图的大小，类图数据
<template>
  <div :style="getStyleString"></div>
</template>

//组件行爲
<script>
import { ClassNode } from "../baseElem/ClassNode.js";
import { LinkTemp } from "../baseElem/LinkTemp.js";
//import { GroupTemp } from "../baseElem/GroupTemp.js";
import { DataManager } from "../baseElem/DataManager.js";
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

    //创建对象便于调用函数
    let ClassTemplate = new ClassNode();
    let ClassLinkTemplate = new LinkTemp();
    let diaDataManager = new DataManager();

    //测试class修改颜色、线条颜色/粗细的功能
    //ClassTemplate.setClassBackgroundColor("#BA55D3");
    ClassTemplate.setInterfaceBorderWidth("7");
    ClassTemplate.setClassBorderWidth("7");

    //获得类的Map
    myDiagram.nodeTemplateMap = ClassTemplate.getClassTemplateMap();
    myDiagram.linkTemplate = ClassLinkTemplate.getLinkTemp();

    //读取数据
    var diagramClassData = require(`./../../data/${that.nodeDataUrl}.json`); //读取节点数据
    var nodedata = diagramClassData.classArray;

    var diagramLinkData = require(`./../../data/${that.linkDataUrl}.json`); //读取关系数据
    var linkdata = diagramLinkData.LinkArray;

    //处理数据，
    //正确渲染节点数据的必须操作
    //数据中【值-类的类型】对应的数组，即classTypeValueArray[0]，classTypeValueArray[1]，classTypeValueArray[3]的值
    //分别对应普通类，抽象类，接口类
    var classTypeValueArray = [0, 1, 2];
    diaDataManager.addCategoryToData(
      "classType",
      classTypeValueArray,
      nodedata
    );

    myDiagram.model = $(go.GraphLinksModel, {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: nodedata,
      linkDataArray: linkdata
    });
  }
};
</script>

//組件樣式
<style>
</style>