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
    chart.y(function(d) {
      return d.y_percent
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
    var sections = d.split(' - ')
    if (sections.length == 2) {
      el.text(sections[0])
      el.append('tspan').attr('x', 0).attr('dy', '15').text(sections[1])
    }
  },
  createTooltipNode: function(key, obj) {
    return '<h3>' + key + ': ' + obj.y_percent + '%</h3> \
            <h4 style="text-align: center">Represents ' + obj.y_absolute + ' students</h4>'
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
    if (/A Group/.test(group_code)) {
      code = 0
    } else if (/B Group/.test(group_code)) {
      code = 2
    } else if (/C Group/.test(group_code)) {
      code = 4
    } else if (/D Group/.test(group_code)) {
      code = 6
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
          "x": "A Group - Differentiator X",
          "y_percent": 45,
          "y_absolute": 90
        },
        {
          "x": "A Group - Differentiator Y",
          "y_percent": 15,
          "y_absolute": 45
        },
        {
          "x": "B Group - Differentiator X",
          "y_percent": 70,
          "y_absolute": 140
        },
        {
          "x": "B Group - Differentiator Y",
          "y_percent": 20,
          "y_absolute": 60
        },
        {
          "x": "C Group - Differentiator X",
          "y_percent": 25,
          "y_absolute": 50
        },
        {
          "x": "C Group - Differentiator Y",
          "y_percent": 25,
          "y_absolute": 75
        },
        {
          "x": "D Group - Differentiator X",
          "y_percent": 90,
          "y_absolute": 180
        },
        {
          "x": "D Group - Differentiator Y",
          "y_percent": 35,
          "y_absolute": 105
        }
      ]
    },
    {
      "key": "# of Maybe Things",
      "values": [
        {
          "x": "A Group - Differentiator X",
          "y_percent": 45,
          "y_absolute": 90
        },
        {
          "x": "A Group - Differentiator Y",
          "y_percent": 75,
          "y_absolute": 225
        },
        {
          "x": "B Group - Differentiator X",
          "y_percent": 20,
          "y_absolute": 40
        },
        {
          "x": "B Group - Differentiator Y",
          "y_percent": 70,
          "y_absolute": 210
        },
        {
          "x": "C Group - Differentiator X",
          "y_percent": 65,
          "y_absolute": 130
        },
        {
          "x": "C Group - Differentiator Y",
          "y_percent": 65,
          "y_absolute": 195
        },
        {
          "x": "D Group - Differentiator X",
          "y_percent": 0,
          "y_absolute": 0
        },
        {
          "x": "D Group - Differentiator Y",
          "y_percent": 55,
          "y_absolute": 165
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
          "x": "A Group - Differentiator X",
          "y_percent": 45,
          "y_absolute": 90
        },
        {
          "x": "A Group - Differentiator Y",
          "y_percent": 15,
          "y_absolute": 45
        },
        {
          "x": "B Group - Differentiator X",
          "y_percent": 0,
          "y_absolute": 0
        },
        {
          "x": "B Group - Differentiator Y",
          "y_percent": 20,
          "y_absolute": 60
        },
        {
          "x": "C Group - Differentiator X",
          "y_percent": 70,
          "y_absolute": 140
        },
        {
          "x": "C Group - Differentiator Y",
          "y_percent": 50,
          "y_absolute": 150
        },
        {
          "x": "D Group - Differentiator X",
          "y_percent": 85,
          "y_absolute": 170
        },
        {
          "x": "D Group - Differentiator Y",
          "y_percent": 35,
          "y_absolute": 105
        }
      ]
    },
    {
      "key": "No CR Data",
      "values": [
        {
          "x": "A Group - Differentiator X",
          "y_percent": 5,
          "y_absolute": 10
        },
        {
          "x": "A Group - Differentiator Y",
          "y_percent": 15,
          "y_absolute": 45
        },
        {
          "x": "B Group - Differentiator X",
          "y_percent": 10,
          "y_absolute": 20
        },
        {
          "x": "B Group - Differentiator Y",
          "y_percent": 20,
          "y_absolute": 60
        },
        {
          "x": "C Group - Differentiator X",
          "y_percent": 5,
          "y_absolute": 10
        },
        {
          "x": "C Group - Differentiator Y",
          "y_percent": 25,
          "y_absolute": 75
        },
        {
          "x": "D Group - Differentiator X",
          "y_percent": 5,
          "y_absolute": 10
        },
        {
          "x": "D Group - Differentiator Y",
          "y_percent": 25,
          "y_absolute": 75
        }
      ]
    },
    {
      "key": "Non-Advanced CRs",
      "values": [
        {
          "x": "A Group - Differentiator X",
          "y_percent": 50,
          "y_absolute": 100
        },
        {
          "x": "A Group - Differentiator Y",
          "y_percent": 70,
          "y_absolute": 210
        },
        {
          "x": "B Group - Differentiator X",
          "y_percent": 90,
          "y_absolute": 180
        },
        {
          "x": "B Group - Differentiator Y",
          "y_percent": 60,
          "y_absolute": 180
        },
        {
          "x": "C Group - Differentiator X",
          "y_percent": 25,
          "y_absolute": 50
        },
        {
          "x": "C Group - Differentiator Y",
          "y_percent": 25,
          "y_absolute": 75
        },
        {
          "x": "D Group - Differentiator X",
          "y_percent": 10,
          "y_absolute": 20
        },
        {
          "x": "D Group - Differentiator Y",
          "y_percent": 40,
          "y_absolute": 120
        }
      ]
    }
  ]
}
