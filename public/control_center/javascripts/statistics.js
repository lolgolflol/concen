$(function () {
  function plotWithOptions() {
    window.plot = $.plot($("#recent-visits"), [{label: "Visits", data: []}], {
      xaxis: {
        mode: "time",
        timeformat: "%h %P",
        ticks: 24,
        color: "#141F52",
        tickColor: "#DADCE7"
      },
      yaxis: {
        tickDecimals: 0,
        color: "#141F52",
        tickColor: "#DADCE7"
      },
      grid: {
        hoverable: true,
        clickable: true,
        borderWidth: 1,
        borderColor: "#141F52",
        color: "#fe3145",
        markings: [ { xaxis: { from: 0, to: 2 }, yaxis: { from: 10, to: 10 }, color: "#bb0000" } ]
      },
      legend: {show: false, position: "ne"},
      series: {
        lines: {show: true, fill: true, steps: false, lineWidth: 2, fillColor: {colors: [{opacity: 0.1}, {opacity: 0.1}]}},
        stack: true,
        shadowSize: 0
      },
      colors: ["#19c84f"]
    });
  };

  plotWithOptions();

  function showTooltip(x, y, contents) {
    $("<div id='tooltip'>" + contents + "</div>").css( {
        position: "absolute",
        display: "none",
        top: y + 5,
        left: x + 5,
        padding: "4px 8px",
        "background-color": "#19c84f",
        opacity: 0.80,
        color: "white",
        "font-size": "12px",
        "font-weight": "bold"
    }).appendTo("body").fadeIn(200);
  };

  var previousPoint = null;
  $("#recent-visits").bind("plothover", function (event, pos, item) {
      $("#x").text(pos.x.toFixed(2));
      $("#y").text(pos.y.toFixed(2));

      if (item) {
        if (previousPoint != item.dataIndex) {
          previousPoint = item.dataIndex;

          $("#tooltip").remove();
          var x = item.datapoint[0].toFixed(2),
              y = item.datapoint[1].toFixed(2);

          showTooltip(item.pageX, item.pageY, "Visits: " + parseInt(y));
        }
      }
      else {
        $("#tooltip").remove();
        previousPoint = null;
      }
  });

  $("#recent-visits").resize(function() {});


  function update() {
    $.getJSON("/statistics/visits", {"hour": 24}, function(json, textStatus) {
      window.plot.setData([json]);
      window.plot.setupGrid();
      window.plot.draw();
    });
    $.getJSON("/statistics/visits", {"hour": 1}, function(json, textStatus) {
      $("div.panel.visits-past-one-hour").find("p.big-number").html(json[0][1]);
    });
    setTimeout(update, 5000);
  };

  update();

});