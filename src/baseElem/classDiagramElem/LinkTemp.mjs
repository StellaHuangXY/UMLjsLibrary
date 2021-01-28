class LinkTemp {
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
        routing: go.Link.AvoidsNodes
      },
      $(go.Shape, // the link shape
        // the first element is assumed to be main element: as if isPanelMain were true
        {
          strokeWidth: 2
        },
        new go.Binding("strokeDashArray", "relationship", function (relationship) {
          if (relationship == 2 || relationship == 4) return [4, 4];
          else return null;
        })),
      $(go.Shape, // the "to" arrowhead
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
      )


    );
    return linkTemplate;
  }
}
export {
  LinkTemp
}
