!(function (e) {
  var o = (function () {
    e(window).width();
    return {
      init: function () {},
      load: function () {
        var e;
        new ApexCharts(document.querySelector("#chartStrock"), {
          series: [
            {
              data: [
                [13273596e5, 31.95],
                [13275324e5, 32],
                [1327878e6, 33],
                [13280508e5, 32.5],
                [13282236e5, 31.85],
                [13285692e5, 32.28],
                [1328742e6, 32.65],
                [13290876e5, 32.35],
                [13292604e5, 32.46],
                [13294332e5, 32.75],
                [13298652e5, 32.33],
                [1330038e6, 33.41],
                [13303836e5, 33.27],
                [13305564e5, 33.1],
                [1330902e6, 33.22],
                [13310748e5, 32.41],
                [13312476e5, 33.64],
                [13315932e5, 34.22],
                [1331766e6, 34.17],
                [13321116e5, 34.51],
                [13322844e5, 33.56],
                [13324572e5, 33.81],
                [13327992e5, 34.63],
                [1332972e6, 34.48],
                [13333176e5, 34.7],
                [13334904e5, 33.46],
                [13339224e5, 33.22],
                [13340952e5, 33.01],
                [1334268e6, 33.18],
                [13346136e5, 33.84],
                [13347864e5, 32.91],
                [1335132e6, 32.62],
                [13353048e5, 33.13],
                [13354776e5, 33.58],
                [13358232e5, 33.77],
                [1335996e6, 33.32],
                [13360824e5, 32.61],
                [1336428e6, 32.67],
                [13366008e5, 31.92],
                [13369464e5, 32.23],
                [13371192e5, 32.36],
              ],
            },
          ],
          chart: {
            id: "area-datetime",
            type: "area",
            height: 335,
            width: "100%",
            zoom: { autoScaleYaxis: !0 },
            toolbar: { show: !1 },
          },
          stroke: { width: 1 },
          colors: ["#8950fc", "#1bc5bd", "#f64e60"],
          dataLabels: { enabled: !1 },
          markers: { size: 0, style: "hollow" },
          xaxis: {
            show: !1,
            type: "datetime",
            labels: { format: "MMM" },
            axisBorder: { show: !1 },
          },
          yaxis: { show: !1 },
          grid: { show: !1 },
          responsive: [
            { breakpoint: 1024, options: { chart: { width: "100%" } } },
          ],
        }).render(),
          new ApexCharts(document.querySelector("#chartTimeline"), {
            chart: {
              type: "bar",
              height: 257,
              stacked: !0,
              toolbar: { show: !1 },
              sparkline: {},
              offsetX: -10,
            },
            series: [
              { name: "New Clients", data: [48, 210, 158, 215, 45, 90, 74] },
              {
                name: "Retained Clients",
                data: [-145, -74, -125, -159, -48, -78, -100],
              },
            ],
            plotOptions: {
              bar: {
                columnWidth: "25%",
                endingShape: "rounded",
                colors: {
                  backgroundBarColors: [
                    "#f0f0f0",
                    "#f0f0f0",
                    "#f0f0f0",
                    "#f0f0f0",
                  ],
                  backgroundBarOpacity: 1,
                  backgroundBarRadius: 5,
                },
              },
              distributed: !0,
            },
            colors: ["#f64e60", "#6993ff"],
            grid: { show: !1 },
            legend: { show: !1 },
            fill: { opacity: 1 },
            dataLabels: {
              enabled: !1,
              colors: ["#000"],
              dropShadow: { enabled: !0, top: 1, left: 1, blur: 1, opacity: 1 },
            },
            xaxis: {
              categories: ["Jun", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              crosshairs: { show: !1 },
              axisBorder: { show: !1 },
            },
            yaxis: { show: !1 },
            tooltip: { x: { show: !0 } },
          }).render(),
          (e = {
            chart: { type: "radialBar", height: 350, offsetY: 0, offsetX: 0 },
            plotOptions: {
              radialBar: {
                size: void 0,
                inverseOrder: !1,
                hollow: { margin: 0, size: "35%", background: "transparent" },
                track: {
                  show: !0,
                  background: "#e1e5ff",
                  strokeWidth: "10%",
                  opacity: 1,
                  margin: 15,
                },
              },
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: { offsetY: 0, offsetX: 0 },
                  legend: { position: "bottom", offsetX: 0, offsetY: 0 },
                },
              },
            ],
            fill: { opacity: 1 },
            colors: ["#f64e60", "#1bc5bd", "#ffa800"],
            series: [48, 78, 45],
            labels: ["New", "Recover", "In Treatment"],
            legend: { fontSize: "16px", show: !1 },
          }),
          new ApexCharts(document.querySelector("#chartCircle"), e).render();
      },
      resize: function () {},
    };
  })();
  jQuery(document).ready(function () {}),
    jQuery(window).on("load", function () {
      setTimeout(function () {
        o.load();
      }, 500);
    }),
    jQuery(window).on("resize", function () {}),
    e(".inner-user-div").slimScroll({ height: "543px" });
})(jQuery);
