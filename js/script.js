nv.addGraph(function() {
    var chart = nv.models.multiBarChart().stacked(true).showControls(false).showLegend(false)

    // var chartData = gData()
    var chartData = crData()

    var rawData = gData() // chartData mutates because of NVD3 iteration
    var rawData = crData()

    var chartKeys = chartData.map(function(x) {return x.key})

    chart.barColor(utilities.fetchColors())

    chart.y(function (d) {
      // Converts y-axis raw values to percent
      return utilities.percentilify(d.y, d.total)
    })

    chart.yAxis.tickFormat(function(d) {
      return d + "%"
    })

    chart.yAxis.tickValues([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

    chart.tooltipContent(function(key, y, e, graph) {
      return utilities.generateTooltip(key, y, rawData, chartKeys)
    })

    d3.select('#chart svg')
      .datum(chartData)
      .transition().duration(500)
      .call(chart)

    nv.utils.windowResize(chart.update)

    return chart
});

var utilities = {
  createTooltipNode: function(key, obj) {
    return '<h3>' + key + ': ' + obj.y + '</h3> \
            <h5 style="text-align: center">' + this.percentilify(obj.y, obj.total) + '% of group population</h5>'
  },
  fetchColors: function() {
    return ["#4e76ab", "#4e76ab", "#8ca762", "#8ca762", "#e5c736", "#e5c736", "#b5854d", "#b5854d"]
  },
  generateTooltip: function(key, y, data, keys) {
    var indexInGroups = parseInt((y.match(/\d/)[0]) - 1)
    var applicableObject = this.retrieveDataObject(key, indexInGroups, data, keys)
    return this.createTooltipNode(key, applicableObject)
  },
  percentilify: function(num, denom) {
    return Math.round((num / denom) * 100)
  },
  retrieveDataObject: function(key, index, data, dataKeys) {
    switch (dataKeys.join(' ')) {
      case "Current Things # of Maybe Things":
        return chartDataObjects.gChartDataObject(data, index, key)
        break
      case "Advanced CRs No CR Data Non-Advanced CRs":
        return chartDataObjects.crChartDataObject(data, index, key)
        break
    }
  }
}

var chartDataObjects = {
  crChartDataObject: function(data, index, key) {
    switch (key) {
      case "Advanced CRs":
        return data[0].values[index]
        break
      case "No CR Data":
        return data[1].values[index]
        break
      case "Non-Advanced CRs":
        return data[2].values[index]
        break
    }
  },
  gChartDataObject: function(data, index, key) {
    switch(key) {
      case "Current Things":
        return data[0].values[index]
        break
      case "# of Maybe Things":
        return data[1].values[index]
        break
    }
  }
}

function gData() {
  return [
    {
      "key": "Current Things",
      "values": [
        {
          "x": "Group 1",
          "y": 45,
          "total": 100
        },
        {
          "x": "Group 2",
          "y": 15,
          "total": 20
        },
        {
          "x": "Group 3",
          "y": 100,
          "total": 200
        },
        {
          "x": "Group 4",
          "y": 19,
          "total": 20
        },
        {
          "x": "Group 5",
          "y": 23,
          "total": 50
        },
        {
          "x": "Group 6",
          "y": 25,
          "total": 150
        },
        {
          "x": "Group 7",
          "y": 93,
          "total": 100
        },
        {
          "x": "Group 8",
          "y": 18,
          "total": 200
        }
      ]
    },
    {
      "key": "# of Maybe Things",
      "values": [
        {
          "x": "Group 1",
          "y": 50,
          "total": 100
        },
        {
          "x": "Group 2",
          "y": 4,
          "total": 20
        },
        {
          "x": "Group 3",
          "y": 90,
          "total": 200
        },
        {
          "x": "Group 4",
          "y": 0,
          "total": 20
        },
        {
          "x": "Group 5",
          "y": 25,
          "total": 50
        },
        {
          "x": "Group 6",
          "y": 118,
          "total": 150
        },
        {
          "x": "Group 7",
          "y": 2,
          "total": 100
        },
        {
          "x": "Group 8",
          "y": 172,
          "total": 200
        }
      ]
    }
  ]
}

function crData() {
  return [
    {
      "key": "Advanced CRs",
      "values": [
        {
          "x": "Group 1",
          "y": 45,
          "total": 100
        },
        {
          "x": "Group 2",
          "y": 15,
          "total": 20
        },
        {
          "x": "Group 3",
          "y": 100,
          "total": 200
        },
        {
          "x": "Group 4",
          "y": 19,
          "total": 20
        },
        {
          "x": "Group 5",
          "y": 23,
          "total": 50
        },
        {
          "x": "Group 6",
          "y": 25,
          "total": 150
        },
        {
          "x": "Group 7",
          "y": 93,
          "total": 100
        },
        {
          "x": "Group 8",
          "y": 18,
          "total": 200
        }
      ]
    },
    {
      "key": "No CR Data",
      "values": [
        {
          "x": "Group 1",
          "y": 5,
          "total": 100
        },
        {
          "x": "Group 2",
          "y": 1,
          "total": 20
        },
        {
          "x": "Group 3",
          "y": 10,
          "total": 200
        },
        {
          "x": "Group 4",
          "y": 0,
          "total": 20
        },
        {
          "x": "Group 5",
          "y": 2,
          "total": 50
        },
        {
          "x": "Group 6",
          "y": 27,
          "total": 150
        },
        {
          "x": "Group 7",
          "y": 5,
          "total": 100
        },
        {
          "x": "Group 8",
          "y": 182,
          "total": 200
        }
      ]
    },
    {
      "key": "Non-Advanced CRs",
      "values": [
        {
          "x": "Group 1",
          "y": 50,
          "total": 100
        },
        {
          "x": "Group 2",
          "y": 4,
          "total": 20
        },
        {
          "x": "Group 3",
          "y": 90,
          "total": 200
        },
        {
          "x": "Group 4",
          "y": 1,
          "total": 20
        },
        {
          "x": "Group 5",
          "y": 25,
          "total": 50
        },
        {
          "x": "Group 6",
          "y": 98,
          "total": 150
        },
        {
          "x": "Group 7",
          "y": 2,
          "total": 100
        },
        {
          "x": "Group 8",
          "y": 0,
          "total": 200
        }
      ]
    }
  ]
}

