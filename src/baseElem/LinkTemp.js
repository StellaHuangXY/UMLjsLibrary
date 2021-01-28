class LinkTemp {

  constructor(){
    this.fromNodekey="from";
    this.toNodeKey="to";
    //relaType	int	关联关系类型，1：关联；2：依赖；3:继承；4：实现；5：聚合；6:组合
    this.relationshipeKey="relationship";
    this.otherInfoKey="otherinfo";
    //default stroke width
    this.strokeWidth="1";
  }
  getStrokeWidth(){
    return this.strokeWidth;
  }
  setStrokeWidth(keyStr){
    this.strokeWidth=keyStr;
  }
  //根据关系类型返回箭头末尾的图形状
  convertToArrow(relationship) {
    switch (relationship) {
      case 1:
        return "OpenTriangle";
      case 2:
        return "OpenTriangle";
      case 3:
        return "Triangle";
      case 4:
        return "Triangle";
      case 5:
        return "StretchedDiamond";
      case 6:
        return "StretchedDiamond";
      default:
        return null;
    }
  }
  convertFromArrow(relationship) {
    switch (relationship) {
      case 5:
        return "BackwardOpenTriangle";
      case 6:
        return "BackwardOpenTriangle";
      default:
        return null;
    }
  }
  getLinkTemp() {
    let $ = go.GraphObject.make;
    var linkTemplate = $(go.Link, // the whole link panel
      {
        routing: go.Link.Orthogonal,
        routing: go.Link.AvoidsNodes,
        //corner: 3,
        //curve: go.Link.JumpGap,
      },
      $(go.Shape, // the link shape
        // the first element is assumed to be main element: as if isPanelMain were true
        {
          stroke:"#303B45",
          strokeWidth:this.getStrokeWidth(),
        },
        //new go.Binding("strokeWidth",this.getStrokeWidth),
        new go.Binding("strokeDashArray", "relationship", function (relationship) {
          if (relationship == 2 || relationship == 4) return [4, 4];
          else return null;
        })),
      $(go.Shape, // the "from" arrowhead
        {
          fill: "white",
          scale: 2,
          fromArrow: "StretchedDiamond",
        },
        new go.Binding("fromArrow", "relationship", this.convertFromArrow),
        new go.Binding("visible", "relationship", function (relationship) {
          return relationship == 5 || relationship == 6;
        })),
      $(go.Shape, // the "to" arrowhead
        {
          scale: 2,
          //fill: "white",
          toArrow: "OpenTriangle",
        }, new go.Binding("toArrow", "relationship", this.convertToArrow),
        new go.Binding("fill", "relationship", function (relationship) {
          if (relationship == 6) {

            return "black";
          } else return "white";
        })
      ),
      $(go.TextBlock,  // the label text
        {
          //stroke: "#1967B3",
          textAlign: "center",
          font: " bold 10pt helvetica, arial, sans-serif",
          stroke: "#555555",
          margin: 1,
          segmentOffset: new go.Point(NaN, NaN),
          //segmentOrientation: go.Link.OrientAlong
        },
        new go.Binding("text", "otherinfo"))
    );
    return linkTemplate;
  }
}
export {
  LinkTemp
}
