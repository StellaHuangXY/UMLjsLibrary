import { ClassNode } from "./classDiagramElem/ClassNode.js";
import { LinkTemp } from "./classDiagramElem/LinkTemp.js";
import { DataManager } from "../baseElem/DataManager.js";

class ClassDiagram {
    constructor(self,nodeDataUrl,linkDataUrl){
        let $ = window.go.GraphObject.make;
        //console.log(nodeDataUrl);
        var myDiagram = $(go.Diagram,self.$el,{
            "undoManager.isEnabled": true,

            //力导向布局
            layout: $(go.ForceDirectedLayout,{
                defaultSpringLength:50,
                defaultSpringStiffness:0.05,
            })

            //树型布局
            // layout: $(go.TreeLayout, {
            //   // this only lays out in trees nodes connected by "generalization" links
            //   angle: 90,
            //   path: go.TreeLayout.PathSource, // links go from child to parent
            //   setsPortSpot: false, // keep Spot.AllSides for link connection spot
            //   setsChildPortSpot: false, // keep Spot.AllSides
            //   // nodes not connected by "generalization" links are laid out horizontally
            //   arrangement: go.TreeLayout.ArrangementHorizontal
            // })
          });
      
          //创建对象便于调用函数
          let ClassTemplate = new ClassNode();
          let ClassLinkTemplate = new LinkTemp();
          let diaDataManager = new DataManager();
          //ClassLinkTemplate.setStrokeWidth("8");

          //获得类的Map
          myDiagram.nodeTemplateMap = ClassTemplate.getClassTemplateMap();
          myDiagram.linkTemplate = ClassLinkTemplate.getLinkTemp();
          //myDiagram.groupTemplate = GroupTemplate.getGroupTemplate();
      
          //读取数据
          var diagramClassData = require(`./../../data/${nodeDataUrl}.json`); //读取节点数据
          var nodedata = diagramClassData.classArray;
      
          var diagramLinkData = require(`./../../data/${linkDataUrl}.json`); //读取关系数据
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
          this.diagram=myDiagram;
        }
         /**
          * 
          * setConnectorWidth函数
          * 用于设置类元素之间连线的粗细
          */

         /**
          * 
          * @param {Number} w
          */
        setConnectorWidth(w){
            let ClassLinkTemplate = new LinkTemp();
            ClassLinkTemplate.setStrokeWidth(w.toString());
            this.diagram.linkTemplate = ClassLinkTemplate.getLinkTemp();
        }
    }
    export {
        ClassDiagram
      }