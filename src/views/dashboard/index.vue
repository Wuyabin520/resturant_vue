<template>
  <div id="app">
    <div
      id="main"
      style="width: 1500x; height: 400px; margin: 30px; "
    ></div>
    <div id="right" style="width: 1500x; height: 400px; margin: 30px; "></div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "app",
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var xAxisData = [];
      var data1 = [];
      var data2 = [];
      for (var i = 0; i < 100; i++) {
        xAxisData.push("订单" + i);
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
      }

      let option = {
        title: {
          text: "订单数量监测",
        },
        legend: {
          data: ["bar", "bar2"],
        },
        toolbox: {
          // y: 'bottom',
          feature: {
            magicType: {
              type: ["stack", "tiled"],
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2,
            },
          },
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false,
          },
        },
        yAxis: {},
        series: [
          {
            name: "bar",
            type: "bar",
            data: data1,
            animationDelay: function (idx) {
              return idx * 10;
            },
          },
          {
            name: "bar2",
            type: "bar",
            data: data2,
            animationDelay: function (idx) {
              return idx * 10 + 100;
            },
          },
        ],
        animationEasing: "elasticOut",
        animationDelayUpdate: function (idx) {
          return idx * 5;
        },
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    darwChartTwo() {
      let myChart = this.$echarts.init(document.getElementById("right"));
      let option = {
        title: {
          text: "评论数据",
          subtext: "纯属虚构",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56",
            },
          },
        },
        legend: {
          data: ["评论数据", "好评"],
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: (function () {
              var now = new Date();
              var res = [];
              var len = 10;
              while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
                now = new Date(now - 2000);
              }
              return res;
            })(),
          },
          {
            type: "category",
            boundaryGap: true,
            data: (function () {
              var res = [];
              var len = 10;
              while (len--) {
                res.push(10 - len - 1);
              }
              return res;
            })(),
          },
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            name: "好评",
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2],
          },
          {
            type: "value",
            scale: true,
            name: "评论数",
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2],
          },
        ],
        series: [
          {
            name: "评论数据",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: (function () {
              var res = [];
              var len = 10;
              while (len--) {
                res.push(Math.round(Math.random() * 1000));
              }
              return res;
            })(),
          },
          {
            name: "好评",
            type: "line",
            data: (function () {
              var res = [];
              var len = 0;
              while (len < 10) {
                res.push((Math.random() * 10 + 5).toFixed(1) - 0);
                len++;
              }
              return res;
            })(),
          },
        ],
      };

      app.count = 11;
      setInterval(function () {
        var axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");

        var data0 = option.series[0].data;
        var data1 = option.series[1].data;
        data0.shift();
        data0.push(Math.round(Math.random() * 1000));
        data1.shift();
        data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);
        option.xAxis[1].data.shift();
        option.xAxis[1].data.push(app.count++);

        myChart.setOption(option);
      }, 2100);
    },
  },
  mounted() {
    this.drawChart();
    this.darwChartTwo();
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
