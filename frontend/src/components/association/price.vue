<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>关联分析</el-breadcrumb-item>
        <el-breadcrumb-item>价格关联分析</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="chart-classfily">
      <el-tabs type="border-card" >
        <el-tab-pane label="爱他美">
          <div id="aptamil" style="width:1200%; height:550px;"></div>          
          <el-button id="aptamilExport" type="text" size="medium" style="float: center">添加到简报</el-button>
        </el-tab-pane>
        <el-tab-pane label="喜宝">
          <div id="hipp" style="width:1200%; height:550px;"></div>
          <el-button id="hippExport" type="text" size="medium" style="float: center">添加到简报</el-button>
        </el-tab-pane>
        <el-tab-pane label="博朗">
          <div id="braun" style="width:1200%; height:550px;"></div>
          <el-button id="braunExport" type="text" size="medium" style="float: center">添加到简报</el-button>
        </el-tab-pane>
        <el-tab-pane label="芭乐雅">
          <div id="balea" style="width:1200%; height:550px;"></div>
          <el-button id="baleaExport" type="text" size="medium" style="float: center">添加到简报</el-button>
        </el-tab-pane>
        <el-tab-pane label="facelle">
          <div id="facelle" style="width:1200%; height:550px;"></div>
          <el-button id="facelleExport" type="text" size="medium" style="float: center">添加到简报</el-button>
        </el-tab-pane>
        <el-tab-pane label="拉杜蓝乔">
          <div id="LaTourangelle" style="width:1200%; height:550px;"></div>
          <el-button id="LaTourangelleExport" type="text" size="medium" style="float: center">添加到简报</el-button>
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
        aptamil: null,
        hipp: null,
        braun: null,
        balea: null,
        facelle: null,
        LaTourangelle: null,
      }
    },
    mounted() {
      this.drawaptamil()
      this.drawhipp()
      this.drawbraun()
      this.drawbalea()
      this.drawfacelle()
      this.drawLaTourangelle()
    },
    methods: {
      drawaptamil(){
        let _this = this;
        this.aptamil = echarts.init(document.getElementById('aptamil'));
        this.aptamil.setOption({
          title:{
            text:'价格关联分析',
            subtext: '爱他美'
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
        axios.get('/getaptamil').then((res) => {
          console.log(res)
          let res1 = res.data.aptamil
          console.log(res1)
          this.aptamil.setOption({
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
                name:'评论数',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data1
              },
              {
                name:'销量数',
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

        //添加至简报
        var exportIf = document.getElementById('aptamilExport')
        exportIf.onclick = function(){
          var imgURL = _this.aptamil.getDataURL()
          console.log(imgURL)
          localStorage.setItem("aptamil",imgURL)
          localStorage.setItem("aptamilName","价格关联分析-爱他美报表")

          alert("已经添加至简报，后续操作请至简报管理页面编辑")
        }
      },
      drawhipp(){
        let _this = this;
        this.hipp = echarts.init(document.getElementById('hipp'));
        this.hipp.setOption({
          title:{
            text:'价格关联分析',
            subtext: '喜宝'
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
        axios.get('/gethipp').then((res) => {
          console.log(res)
          let res1 = res.data.hipp
          console.log(res1)
          this.hipp.setOption({
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
                name:'评论数',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data1
              },
              {
                name:'销量数',
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

        //添加至简报
        var exportIf = document.getElementById('hippExport')
        exportIf.onclick = function(){
          var imgURL = _this.hipp.getDataURL()
          console.log(imgURL)
          localStorage.setItem("hipp",imgURL)
          localStorage.setItem("hippName","价格关联分析-喜宝报表")

          alert("已经添加至简报，后续操作请至简报管理页面编辑")
        }
      },
      drawbraun(){
        let _this = this;
        this.braun = echarts.init(document.getElementById('braun'));
        this.braun.setOption({
          title:{
            text:'价格关联分析',
            subtext: '博朗'
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
        axios.get('/getbraun').then((res) => {
          console.log(res)
          let res1 = res.data.braun
          console.log(res1)
          this.braun.setOption({
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
                name:'评论数',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data1
              },
              {
                name:'销量数',
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

        //添加至简报
        var exportIf = document.getElementById('braunExport')
        exportIf.onclick = function(){
          var imgURL = _this.braun.getDataURL()
          console.log(imgURL)
          localStorage.setItem("braun",imgURL)
          localStorage.setItem("braunName","价格关联分析-博朗报表")

          alert("已经添加至简报，后续操作请至简报管理页面编辑")
        }
      },
      drawbalea(){
        let _this = this;
        this.balea = echarts.init(document.getElementById('balea'));
        this.balea.setOption({
          title:{
            text:'价格关联分析',
            subtext: '芭乐雅'
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
        axios.get('/getbalea').then((res) => {
          console.log(res)
          let res1 = res.data.balea
          console.log(res1)
          this.balea.setOption({
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
                name:'评论数',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data1
              },
              {
                name:'销量数',
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

        //添加至简报
        var exportIf = document.getElementById('baleaExport')
        exportIf.onclick = function(){
          var imgURL = _this.balea.getDataURL()
          console.log(imgURL)
          localStorage.setItem("balea",imgURL)
          localStorage.setItem("baleaName","价格关联分析-芭乐雅报表")

          alert("已经添加至简报，后续操作请至简报管理页面编辑")
        }
      },
      drawfacelle(){
        let _this = this;
        this.facelle = echarts.init(document.getElementById('facelle'));
        this.facelle.setOption({
          title:{
            text:'价格关联分析',
            subtext: 'facelle'
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
        axios.get('/getfacelle').then((res) => {
          console.log(res)
          let res1 = res.data.facelle
          console.log(res1)
          this.facelle.setOption({
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
                name:'评论数',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data1
              },
              {
                name:'销量数',
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

        //添加至简报
        var exportIf = document.getElementById('facelleExport')
        exportIf.onclick = function(){
          var imgURL = _this.facelle.getDataURL()
          console.log(imgURL)
          localStorage.setItem("facelle",imgURL)
          localStorage.setItem("facelleName","价格关联分析-facelle报表")

          alert("已经添加至简报，后续操作请至简报管理页面编辑")
        }
      },
      drawLaTourangelle(){
        let _this = this;
        this.LaTourangelle = echarts.init(document.getElementById('LaTourangelle'));
        this.LaTourangelle.setOption({
          title:{
            text:'价格关联分析',
            subtext: '拉杜蓝乔'
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
        axios.get('/getLaTourangelle').then((res) => {
          console.log(res)
          let res1 = res.data.LaTourangelle
          console.log(res1)
          this.LaTourangelle.setOption({
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
                name:'评论数',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: res1.data1
              },
              {
                name:'销量数',
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

        //添加至简报
        var exportIf = document.getElementById('LaTourangelleExport')
        exportIf.onclick = function(){
          var imgURL = _this.LaTourangelle.getDataURL()
          console.log(imgURL)
          localStorage.setItem("LaTourangelle",imgURL)
          localStorage.setItem("LaTourangelleName","价格关联分析-拉杜蓝乔报表")

          alert("已经添加至简报，后续操作请至简报管理页面编辑")
        }
      },
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