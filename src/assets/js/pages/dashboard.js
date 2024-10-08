$(function () {
  "use strict";
  var e = {
    series: [{ name: "Revenue", data: [90, 71, 65, 91, 40, 112, 99, 51, 128] }],
    chart: {
      height: 173,
      type: "area",
      zoom: { enabled: !1 },
      toolbar: { show: !1 },
    },
    dataLabels: { enabled: !1 },
    stroke: { curve: "smooth" },
    colors: ["#f64e60"],
    grid: { show: !1, padding: { top: 0, bottom: -20, right: 6, left: -10 } },
    legend: { show: !1 },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
      labels: { show: !1 },
      axisBorder: { show: !1 },
      axisTicks: { show: !1 },
    },
    yaxis: { labels: { show: !1 } },
  };
  new ApexCharts(document.querySelector("#revenue4"), e).render();
  e = {
    series: [
      {
        name: "PRODUCT A",
        data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43],
      },
      {
        name: "PRODUCT B",
        data: [-44, -55, -41, -67, -22, -43, -44, -55, -41, -67, -22, -43],
      },
    ],
    chart: {
      foreColor: "#bac0c7",
      type: "bar",
      height: 343,
      stacked: !0,
      toolbar: { show: !1 },
      zoom: { enabled: !0 },
    },
    responsive: [
      {
        breakpoint: 480,
        options: { legend: { position: "bottom", offsetX: -10, offsetY: 0 } },
      },
    ],
    grid: { show: !0, borderColor: "#f7f7f7" },
    colors: ["#6993ff", "#f64e60"],
    plotOptions: {
      bar: { horizontal: !1, columnWidth: "10%", endingShape: "rounded" },
    },
    dataLabels: { enabled: !1 },
    xaxis: {
      type: "datetime",
      categories: [
        "01/01/2011 GMT",
        "01/02/2011 GMT",
        "01/03/2011 GMT",
        "01/04/2011 GMT",
        "01/05/2011 GMT",
        "01/06/2011 GMT",
        "01/07/2011 GMT",
        "01/08/2011 GMT",
        "01/09/2011 GMT",
        "01/10/2011 GMT",
        "01/11/2011 GMT",
        "01/12/2011 GMT",
      ],
    },
    legend: { show: !1 },
    fill: { opacity: 1 },
  };
  new ApexCharts(document.querySelector("#charts_widget_1_chart"), e).render();
});
