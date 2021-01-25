class GroupTemp {

  getGroupTemplate() {
    let $ = go.GraphObject.make;
    var groupTemplate =
      $(go.Group, "Auto", {
          layout: $(go.LayeredDigraphLayout, {
            direction: 0,
            columnSpacing: 10
          })
        },
        $(go.Shape, "RoundedRectangle", // surrounds everything
          {
            parameter1: 10,
            fill: "rgba(128,128,128,0.33)"
          }),
        $(go.Panel, "Vertical", // position header above the subgraph
          {
            defaultAlignment: go.Spot.Left
          },
          $(go.Panel, "Horizontal", // the header
            {
              defaultAlignment: go.Spot.Top
            },
            $("SubGraphExpanderButton"), // this Panel acts as a Button
            $(go.TextBlock, // group title near top, next to button
              {
                font: "Bold 12pt Sans-Serif"
              },
              new go.Binding("text", "GroupName"))
          ),
          $(go.Placeholder, // represents area for all member parts
            {
              padding: new go.Margin(0, 10),
              background: "white"
            })
        )
      );
    return groupTemplate;

  }
}
export {
  GroupTemp
}
