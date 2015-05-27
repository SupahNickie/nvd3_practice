nv.addGraph(function() {
    var chart = nv.models.multiBarChart().stacked(true).showControls(true);

    var chartData = data()

    chart.barColor(fetchColors())

    d3.select('#chart svg')
        .datum(chartData)
        .transition().duration(500)
        .call(chart)
        ;

    nv.utils.windowResize(chart.update);

    return chart;
});

function fetchColors() {
  return ["green", "green", "yellow"]
}

function data() {
  var json = [
    {
      "key": "Current Things",
      "values": [
        {
          "x": "Group 1",
          "y": 33
        },
        {
          "x": "Group 2",
          "y": 15
        },
        {
          "x": "Group 3",
          "y": 12
        }
      ]
    },
    {
      "key": "# of Maybe Things",
      "values": [
        {
          "x": "Group 1",
          "y": 0
        },
        {
          "x": "Group 2",
          "y": 4
        },
        {
          "x": "Group 3",
          "y": 6
        }
      ]
    }
  ]
  return json;
}

