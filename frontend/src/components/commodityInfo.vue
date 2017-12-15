<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <section class="chart-container">
        <el-row>
          <el-col :span="12">
            <div id="chartLine" style="width:100%; height:400px;"></div>
          </el-col>
          <el-col :span="12">
            <div id="chartColumn" style="width:100%; height:400px;"></div>
          </el-col>
          <el-col :span="12">
            <div id="chartBar" style="width:100%; height:400px;"></div>
          </el-col>
          <el-col :span="12">
            <div id="chartPie" style="width:100%; height:400px;"></div>
          </el-col>
          <el-col :span="24">
            <a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>
          </el-col>
        </el-row>
      </section>

    </el-col>
  </el-row>
</template>
<style>
  .chart-container {
    width: 100%;
  }
  .chart-container .el-col {
    padding: 30px 20px;
  }
</style>

<script>
  import echarts from 'echarts'

  export default {
    data() {
      return {
        currentDate: new Date(),
        chartColumn: null,
        chartBar: null,
        chartLine: null,
        chartPie: null
      };
    },
    mounted: function () {
      var _this = this;
      //基于准备好的dom，初始化echarts实例
      this.chartLine = echarts.init(document.getElementById('chartLine'));
      this.chartColumn = echarts.init(document.getElementById('chartColumn'));
      this.chartBar = echarts.init(document.getElementById('chartBar'));
      this.chartPie = echarts.init(document.getElementById('chartPie'));

      this.chartLine.setOption({
        title: {
          text: '趋势分析'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['预测销量', '实际销量']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '预测销量',
            type: 'line',
            stack: '总量',
            data: [120, 156, 134, 134, 189, 230, 210]
          },
          {
            name: '实际销量',
            type: 'line',
            stack: '总量',
            data: [118, 142, 136, 134, 195, 223, 213]
          }
        ]
      });

      this.chartColumn.setOption({
        title: { text: '总销量' },
        tooltip: {},
        xAxis: {
          data: ["母婴用品", "牛奶", "日常用品", "护肤品", "食品", "保健品", "其他"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [1900, 2300, 1600, 1200, 1500, 800, 900]
        }]
      });

      this.chartBar.setOption({
        title: {
          text: '销量对比',
          subtext: '月份'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['8月', '9月']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['母婴用品', '牛奶', '日常用品', '护肤品', '食品', '保健品' ,"其他", "总销量"]
        },
        series: [
          {
            name: '8月',
            type: 'bar',
            data: [38203, 125673, 103489, 29034, 24543, 10497, 31744, 630230]
          },
          {
            name: '9月',
            type: 'bar',
            data: [39325, 139862, 103438, 31000, 25342, 12159, 34141, 681807]
          }
        ]
      });

      

      this.chartPie.setOption({
        title: {
          text: '销量占比',
          // subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['母婴用品', '牛奶', '日常用品', '护肤品', '食品', '保健品' ,"其他"]
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 20, name: '母婴用品' },
              { value: 35, name: '牛奶' },
              { value: 26, name: '日常用品' },
              { value: 28, name: '护肤品' },
              { value: 30, name: '食品' },
              { value: 18, name: '保健品' },
              { value: 15, name: '其他' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    }
  }
</script>
