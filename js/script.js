nv.addGraph(function() {
    var chart = nv.models.multiBarChart().stacked(true).showControls(false).showLegend(false)

    chartInitFunctions.chartInit(chart)

    d3.select('#chart svg')
      .datum(chartInitFunctions.data())
      .transition().duration(500)
      .call(chart)
      .style({'height': 640})

    d3.select('#chart svg .nv-x.nv-axis > g')
      .selectAll('g')
      .selectAll('text').each(utilities.insertLinebreaks);

    d3.select('.nv-axislabel').attr('y', '64')

    nv.utils.windowResize(chart.update)

    return chart
});

var chartInitFunctions = {
  chartInit: function(chart) {
    var chartKeys = this.data().map(function(x) {return x.key})
    this.styleChart(chart)
    this.convertYValues(chart)
    chart.tooltipContent(function(key, y, e, graph) {
      return utilities.generateTooltip(key, y, chartInitFunctions.data(), chartKeys)
    })
  },
  convertYValues: function(chart) {
    chart.y(function (d) {
      return utilities.percentilify(d.y, d.total)
    })
    chart.yAxis.tickFormat(function(d) {
      return d + "%"
    })
    chart.yAxis.tickValues([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
  },
  data: function(type) {
    return crData()
    // return gData()
  },
  styleChart: function(chart) {
    chart.barColor(utilities.fetchColors())
    chart.height(600)
    chart.xAxis.axisLabel("Report type 2B: CR Chart")
  }
}

var utilities = {
  insertLinebreaks: function (d) {
    var el = d3.select(this)
    var sections = d.split('\n')
    if (sections.length == 2) {
      el.text(sections[0])
      el.append('tspan').attr('x', 0).attr('dy', '15').text(sections[1])
    }
  },
  createTooltipNode: function(key, obj) {
    return '<h3>' + key + ': ' + obj.y + '</h3> \
            <h5 style="text-align: center">' + this.percentilify(obj.y, obj.total) + '% of group population</h5>'
  },
  fetchColors: function() {
    return ["#4e76ab", "#4e76ab", "#8ca762", "#8ca762", "#e5c736", "#e5c736", "#b5854d", "#b5854d"]
  },
  generateTooltip: function(key, y, data, keys) {
    var indexInGroups = this.lookupCode(y)
    var applicableObject = this.retrieveDataObject(key, indexInGroups, data, keys)
    return this.createTooltipNode(key, applicableObject)
  },
  lookupCode: function(group_code) {
    var code = 0
    switch (group_code) {
      case /A Group/.test(group_code):
        code = 1
        break
      case /B Group/.test(group_code):
        code = 3
        break
      case /C Group/.test(group_code):
        code = 5
        break
      case /D Group/.test(group_code):
        code = 7
        break
    }
    if (/Differentiator Y/.test(group_code)) {
      code++
    }
    return code
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
          "x": "A Group\nDifferentiator X",
          "y": 45,
          "total": 100
        },
        {
          "x": "A Group\nDifferentiator Y",
          "y": 15,
          "total": 20
        },
        {
          "x": "B Group\nDifferentiator X",
          "y": 100,
          "total": 200
        },
        {
          "x": "B Group\nDifferentiator Y",
          "y": 19,
          "total": 20
        },
        {
          "x": "C Group\nDifferentiator X",
          "y": 23,
          "total": 50
        },
        {
          "x": "C Group\nDifferentiator Y",
          "y": 25,
          "total": 150
        },
        {
          "x": "D Group\nDifferentiator X",
          "y": 93,
          "total": 100
        },
        {
          "x": "D Group\nDifferentiator Y",
          "y": 18,
          "total": 200
        }
      ]
    },
    {
      "key": "No CR Data",
      "values": [
        {
          "x": "A Group\nDifferentiator X",
          "y": 5,
          "total": 100
        },
        {
          "x": "A Group\nDifferentiator Y",
          "y": 1,
          "total": 20
        },
        {
          "x": "B Group\nDifferentiator X",
          "y": 10,
          "total": 200
        },
        {
          "x": "B Group\nDifferentiator Y",
          "y": 0,
          "total": 20
        },
        {
          "x": "C Group\nDifferentiator X",
          "y": 2,
          "total": 50
        },
        {
          "x": "C Group\nDifferentiator Y",
          "y": 27,
          "total": 150
        },
        {
          "x": "D Group\nDifferentiator X",
          "y": 5,
          "total": 100
        },
        {
          "x": "D Group\nDifferentiator Y",
          "y": 182,
          "total": 200
        }
      ]
    },
    {
      "key": "Non-Advanced CRs",
      "values": [
        {
          "x": "A Group\nDifferentiator X",
          "y": 50,
          "total": 100
        },
        {
          "x": "A Group\nDifferentiator Y",
          "y": 4,
          "total": 20
        },
        {
          "x": "B Group\nDifferentiator X",
          "y": 90,
          "total": 200
        },
        {
          "x": "B Group\nDifferentiator Y",
          "y": 1,
          "total": 20
        },
        {
          "x": "C Group\nDifferentiator X",
          "y": 25,
          "total": 50
        },
        {
          "x": "C Group\nDifferentiator Y",
          "y": 98,
          "total": 150
        },
        {
          "x": "D Group\nDifferentiator X",
          "y": 2,
          "total": 100
        },
        {
          "x": "D Group\nDifferentiator Y",
          "y": 0,
          "total": 200
        }
      ]
    }
  ]
}
