<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>关联分析</el-breadcrumb-item>
        <el-breadcrumb-item>销量关联分析</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="chart-container">
      <div id="chartSales" style="width:85%; height:600px;"></div>
      <el-button type="text" size="medium" style="float: center">添加到简报</el-button>
    </el-col>

    <el-col :span="24" class="chart-classfily">
      <el-tabs type="border-card" >
        <el-tab-pane label="母婴用品">
          <div id="chartbabyProduct" style="width:1100px; height:550px;"></div>          
          <el-button type="text" size="medium" style="float: center">添加到简报</el-button>
        </el-tab-pane>
        <el-tab-pane label="奶粉">
          <div id="chartMilk" style="width:1100px; height:550px;"></div>
          <el-button type="text" size="medium" style="float: center">添加到简报</el-button>
        </el-tab-pane>
        <el-tab-pane label="日常用品">
          <div id="chartDaily" style="width:1100px; height:550px;"></div>
          <el-button type="text" size="medium" style="float: center">添加到简报</el-button>
        </el-tab-pane>
        <el-tab-pane label="护肤品">
          <div id="chartSkin" style="width:1100px; height:550px;"></div>
          <el-button type="text" size="medium" style="float: center">添加到简报</el-button>
        </el-tab-pane>
        <el-tab-pane label="食品">
          <div id="chartFood" style="width:1100px; height:550px;"></div>
          <el-button type="text" size="medium" style="float: center">添加到简报</el-button>
        </el-tab-pane>
        <el-tab-pane label="保健品">
          <div id="chartHealth" style="width:1100px; height:550px;"></div>
          <el-button type="text" size="medium" style="float: center">添加到简报</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-col>

  </el-row>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'

  export default{
    data(){
      return {
        chartSales: null,
        chartbabyProduct: null,
        chartMilk: null,
        chartDaily: null,
        chartSkin: null,
        chartFood: null,
        chartHealth: null,
      }
    },

    methods: {
      drawSales(){
        let _this = this;
        this.chartSales = echarts.init(document.getElementById('chartSales'));
        this.chartSales.setOption({
          title:{
            text:'销量关联分析',
            subtext: '美华数据'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:[]
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data : []
          }],
          yAxis: [{
            type: 'value'
          }],
          series: []
        })
        axios.get('/getSales').then((res) => {
          console.log(res)
          let res1 = res.data.sales
          console.log(res1)
          console.log(res1.category)
          console.log(res1.type)
          console.log(res1.data1)
          console.log(res1.data2)
          this.chartSales.setOption({
            legend: {
              data: res1.type
            },
            xAxis: [{
              type : 'category',
              boundaryGap : false,
              data: res1.category
            }],
            series: [
              {
                name:'订单数量',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data1
              },
              {
                name:'总销售额',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data2
              },
            ]
          })
        })
        .catch(() => {
          console.log("error")
        })
      },
      drawbabyProduct() {
        let _this = this;
        this.chartbabyProduct = echarts.init(document.getElementById('chartbabyProduct'));
        this.chartbabyProduct.setOption({
          title:{
            text:'母婴用品销量',
            subtext: '美华数据'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:[]
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data : []
          }],
          yAxis: [{
            type: 'value'
          }],
          series: []
        })
        axios.get('/getbabyProductSales').then((res) => {
          console.log(res)
          let res1 = res.data.babyProductSales
          console.log(res1)
          this.chartbabyProduct.setOption({
            legend: {
              data: res1.type
            },
            xAxis: [{
              type : 'category',
              boundaryGap : false,
              data: res1.category
            }],
            series: [
              {
                name:'订单数量',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data1
              },
              {
                name:'总销售额',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data2
              },
            ]
          });
        })
        .catch(() => {
          console.log("error")
        })
      },
      drawMilk() {
        let _this = this;
        this.chartMilk = echarts.init(document.getElementById('chartMilk'));
        this.chartMilk.setOption({
          title:{
            text:'奶粉销量',
            subtext: '美华数据'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:[]
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data : []
          }],
          yAxis: [{
            type: 'value'
          }],
          series: []
        })
        axios.get('/getMilkSales').then((res) => {
          console.log(res)
          let res1 = res.data.milkSales
          console.log(res1)
          this.chartMilk.setOption({
            legend: {
              data: res1.type
            },
            xAxis: [{
              type : 'category',
              boundaryGap : false,
              data: res1.category
            }],
            series: [
              {
                name:'订单数量',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data1
              },
              {
                name:'总销售额',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data2
              },
            ]
          });
        })
        .catch(() => {
          console.log("error")
        })
      },
      drawDaily() {
        let _this = this;
        this.chartDaily = echarts.init(document.getElementById('chartDaily'));
        this.chartDaily.setOption({
          title:{
            text:'日常用品销量',
            subtext: '美华数据'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:[]
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data : []
          }],
          yAxis: [{
            type: 'value'
          }],
          series: []
        })
        axios.get('/getdailySales').then((res) => {
          console.log(res)
          let res1 = res.data.dailySales
          console.log(res1)
          this.chartDaily.setOption({
            legend: {
              data: res1.type
            },
            xAxis: [{
              type : 'category',
              boundaryGap : false,
              data: res1.category
            }],
            series: [
              {
                name:'订单数量',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data1
              },
              {
                name:'总销售额',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data2
              },
            ]
          });
        })
        .catch(() => {
          console.log("error")
        })
      },
      drawSkin() {
        let _this = this;
        this.chartSkin = echarts.init(document.getElementById('chartSkin'));
        this.chartSkin.setOption({
          title:{
            text:'日常用品销量',
            subtext: '美华数据'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:[]
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data : []
          }],
          yAxis: [{
            type: 'value'
          }],
          series: []
        })
        axios.get('/getskinSales').then((res) => {
          console.log(res)
          let res1 = res.data.skinSales
          console.log(res1)
          this.chartSkin.setOption({
            legend: {
              data: res1.type
            },
            xAxis: [{
              type : 'category',
              boundaryGap : false,
              data: res1.category
            }],
            series: [
              {
                name:'订单数量',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data1
              },
              {
                name:'总销售额',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data2
              },
            ]
          });
        })
        .catch(() => {
          console.log("error")
        })
      },
      drawFood() {
        let _this = this;
        this.chartFood = echarts.init(document.getElementById('chartFood'));
        this.chartFood.setOption({
          title:{
            text:'日常用品销量',
            subtext: '美华数据'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:[]
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data : []
          }],
          yAxis: [{
            type: 'value'
          }],
          series: []
        })
        axios.get('/getfoodSales').then((res) => {
          console.log(res)
          let res1 = res.data.foodSales
          console.log(res1)
          this.chartFood.setOption({
            legend: {
              data: res1.type
            },
            xAxis: [{
              type : 'category',
              boundaryGap : false,
              data: res1.category
            }],
            series: [
              {
                name:'订单数量',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data1
              },
              {
                name:'总销售额',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data2
              },
            ]
          });
        })
        .catch(() => {
          console.log("error")
        })
      },
      drawHealth() {
        let _this = this;
        this.chartHealth = echarts.init(document.getElementById('chartHealth'));
        this.chartHealth.setOption({
          title:{
            text:'日常用品销量',
            subtext: '美华数据'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:[]
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data : []
          }],
          yAxis: [{
            type: 'value'
          }],
          series: []
        })
        axios.get('/gethealthSales').then((res) => {
          console.log(res)
          let res1 = res.data.healthSales
          console.log(res1)
          this.chartHealth.setOption({
            legend: {
              data: res1.type
            },
            xAxis: [{
              type : 'category',
              boundaryGap : false,
              data: res1.category
            }],
            series: [
              {
                name:'订单数量',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data1
              },
              {
                name:'总销售额',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data2
              },
            ]
          });
        })
        .catch(() => {
          console.log("error")
        })
      }
    },
    mounted() {
      this.drawSales()
      this.drawbabyProduct()
      this.drawMilk()
      this.drawDaily()
      this.drawSkin()
      this.drawFood()
      this.drawHealth() 
    }
  }
</script>

<style>
  .chart-container , .chart-classfily {
    width: 100%;
  }
  /* .chart-card {
    padding: 10px 10px
  } */
</style>
