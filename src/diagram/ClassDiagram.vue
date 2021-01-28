<template>
  <div :style="getStyleString"></div>
</template>

//组件行爲
<script>
import { ClassDiagram } from "../baseElem/ClassDiagram.js";
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
  mounted(){
    //创立新的类图
    var myDiagram=new ClassDiagram();
    var cd=myDiagram.getClassDiagram(this,this.nodeDataUrl,this.linkDataUrl);
    //设置缩率图
    myOverview =
        $(go.Overview, "myOverviewDiv",  // the HTML DIV element for the Overview
          { observed: cd, contentAlignment: go.Spot.Center });   // tell it which Diagram to show and pan
    }
};
</script>

//組件樣式
<style>
</style>