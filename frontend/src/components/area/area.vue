<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>区域分析</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <section class="chart-container">
        <el-row>

          
          <el-col :span="24" class="chart-classfily">
            <h2>销售地分析</h2>
            <el-tabs type="border-card" >
              <el-tab-pane label="总销量" class="chart-card">
                <div id="chartWorld" style="width:1100px; height:500px;"></div>       
                <el-button id="chartWorldExport" type="text" size="medium" style="float: center">添加到简报</el-button>
              </el-tab-pane>
              <el-tab-pane label="销量" class="chart-card">
                <div id="chartCountry" style="width:1100px; height:500px;"></div>        
                <el-button id="chartCountryExport" type="text" size="medium" style="float: center">添加到简报</el-button>
              </el-tab-pane>
              <el-tab-pane label="品牌">
                <div id="chartBrands" style="width:1100px; height:500px;"></div>
                <el-button id="chartBrandsExport" type="text" size="medium" style="float: center">添加到简报</el-button>
              </el-tab-pane>
            </el-tabs>
          </el-col>

          
          <el-col :span="24" class="chart-classfily">
            <h2>购买地分析</h2>
            <el-tabs type="border-card" >
              <el-tab-pane label="总购买" class="chart-card">
                <div id="chartChina" style="width:1100px; height:400px;"></div>      
                <el-button id="chartChinaExport" type="text" size="medium" style="float: center">添加到简报</el-button>
              </el-tab-pane>
              <!-- <el-tab-pane label="销量" class="chart-card">
                <div id="chartCountry" style="width:1100px; height:500px;"></div>        
                <el-button type="text" size="medium" style="float: center">添加到简报</el-button>
              </el-tab-pane>
              <el-tab-pane label="品牌">
                <div id="chartBrands" style="width:1100px; height:500px;"></div>
                <el-button type="text" size="medium" style="float: center">添加到简报</el-button>
              </el-tab-pane> -->
            </el-tabs>
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
  import china from 'echarts/map/js/china'
  import world from 'echarts/map/js/world'
  import axios from 'axios'

  export default {
    data() {
      return {
        currentDate: new Date(),
        chartChina: null,
        chartWorld: null,
        chartCountry: null,
        chartBrands: null,
      };
    },
    mounted() {
      this.drawWorld()
      this.drawCountry()
      this.drawBrands()
      this.drawChina()
    },
    methods: {
      drawWorld(){
        let _this = this;
        this.chartWorld = echarts.init(document.getElementById('chartWorld'));
        this.chartWorld.setOption({
          title : {
            text: '销售区域',
            subtext: '美华数据',
          },
          tooltip : {
            trigger: 'item'
          },
          legend: {
            data:['总销售量','品牌数量']
          },
          visualMap: {
            min: 0,
            max: 6500,
            left: 'left',
            top: 'bottom',
            text:['高','低'],           // 文本，默认为数值文本
            calculable : true
          },
          toolbox: {
            show : true,
            orient : 'vertical',
            x: 'right',
            y: 'center',
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          series : [
            {
              name: '总销售量',
              type: 'map',
              mapType: 'world',
              roam: false,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              data:[
                {name : 'Germany', value : 7042},
                {name : 'France', value : 4380},
                {name : 'Spain', value : 8712},
                {name : 'United States of America', value : 48},
                {name : 'Finland', value : 64},
                {name : 'Portugal', value : 206},
              ]
            },
            {
              name: '品牌数量',
              type: 'map',
              mapType: 'world',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              data:[
                {name : 'Germany', value : 51},
                {name : 'France', value : 20},
                {name : 'Spain', value : 21},
                {name : 'United States of America', value : 3},
                {name : 'Finland', value : 1},
                {name : 'Portugal', value : 1},
              ]
            },


          ]
        });

        //添加至简报
        var exportIf = document.getElementById('chartWorldExport')
        exportIf.onclick = function(){
          var imgURL = _this.chartWorld.getDataURL()
          console.log(imgURL)
          localStorage.setItem("chartWorld",imgURL)
          localStorage.setItem("chartWorldName","销售地分析-总销量报表")

          alert("已经添加至简报，后续操作请至简报管理页面编辑")
        }
      },
      
      drawCountry(){
        let _this = this;
        this.chartCountry = echarts.init(document.getElementById('chartCountry'));
        this.chartCountry.setOption({
          title : {
            text: '销售区域分析',
            subtext: '销量'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data : []
          },
          toolbox: {
            show : true,
            orient: 'vertical',
            x:'right',
            y:'center',
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis : [
            {
              type : 'category',
              data: []
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'母婴用品',
              type:'bar',
              data:[],
            },
            {
              name:'奶粉',
              type:'bar',
              data:[],
            },
            {
              name:'日常用品',
              type:'bar',
              data:[],
            },
            {
              name:'护肤品',
              type:'bar',
              data:[],
            },
            {
              name:'食品',
              type:'bar',
              data:[],
            },
            {
              name:'保健品',
              type:'bar',
              data: [],
            },
            {
              name:'总计',
              type:'bar',
              data:[],
            },
          ]
        });
        axios.get('/getCountry').then((res) => {
          console.log(res)
          let res1 = res.data.country
          this.chartCountry.setOption({
            legend: {
              data: res1.type
            },
            xAxis: [{
              type : 'category',
              data: res1.category
            }],
            series: [
              {
                name:'母婴用品',
                type:'bar',
                data: res1.data1
              },
              {
                name:'奶粉',
                type:'bar',
                data: res1.data2
              },
              {
                name:'日常用品',
                type:'bar',
                data: res1.data3
              },
              {
                name:'护肤品',
                type:'bar',
                data: res1.data4
              },
              {
                name:'食品',
                type:'bar',
                data: res1.data5
              },
              {
                name:'保健品',
                type:'bar',
                data: res1.data6
              },
              {
                name:'总计',
                type:'bar',
                data: res1.data7
              },
            ]
          })
        })
        .catch(() => {
          console.log("error")
        })

        //添加至简报
        var exportIf = document.getElementById('chartCountryExport')
        exportIf.onclick = function(){
          var imgURL = _this.chartCountry.getDataURL()
          console.log(imgURL)
          localStorage.setItem("chartCountry",imgURL)
          localStorage.setItem("chartCountryName","销售地分析-销量报表")

          alert("已经添加至简报，后续操作请至简报管理页面编辑")
        }
      },

      drawBrands(){
        let _this = this;
        this.chartBrands = echarts.init(document.getElementById('chartBrands'));
        this.chartBrands.setOption({
          title : {
          text: '销售区域分析',
          subtext: '品牌'
          },
          tooltip : {
          trigger: 'axis'
          },
          legend: {
            data : []
          },
          toolbox: {
            show : true,
            orient: 'vertical',
            x:'right',
            y:'center',
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis : [
            {
              type : 'category',
              data: []
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'母婴用品',
              type:'bar',
              data:[],
            },
            {
              name:'奶粉',
              type:'bar',
              data:[],
            },
            {
              name:'日常用品',
              type:'bar',
              data:[],
            },
            {
              name:'护肤品',
              type:'bar',
              data:[],
            },
            {
              name:'食品',
              type:'bar',
              data:[],
            },
            {
              name:'保健品',
              type:'bar',
              data:[],
            },
            {
              name:'总计',
              type:'bar',
              data:[],
            },
          ]
        })
        axios.get('/getBrands').then((res) => {
          console.log(res)
          let res1 = res.data.brands
          this.chartBrands.setOption({
            legend: {
              data: res1.type
            },
            xAxis: [{
              type : 'category',
              data: res1.category
            }],
            series: [
              {
                name:'母婴用品',
                type:'bar',
                data: res1.data1
              },
              {
                name:'奶粉',
                type:'bar',
                data: res1.data2
              },
              {
                name:'日常用品',
                type:'bar',
                data: res1.data3
              },
              {
                name:'护肤品',
                type:'bar',
                data: res1.data4
              },
              {
                name:'食品',
                type:'bar',
                data: res1.data5
              },
              {
                name:'保健品',
                type:'bar',
                data: res1.data6
              },
              {
                name:'总计',
                type:'bar',
                data: res1.data7
              },
            ]
          })
        })
        .catch(() => {
          console.log("error")
        })

        //添加至简报
        var exportIf = document.getElementById('chartBrandsExport')
        exportIf.onclick = function(){
          var imgURL = _this.chartBrands.getDataURL()
          console.log(imgURL)
          localStorage.setItem("chartBrands",imgURL)
          localStorage.setItem("chartBrandsName","销售地分析-品牌报表")

          alert("已经添加至简报，后续操作请至简报管理页面编辑")
        }
      },

      drawChina(){
        let _this = this;
        this.chartChina = echarts.init(document.getElementById('chartChina'));
        this.chartChina.setOption({
          title : {
            text: '购买地分析',
            subtext: '美华数据',
            left: 'center'
          },
          tooltip : {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data:['总金额']
          },
          visualMap: {
            min: 0,
            max: 1200000,
            left: 'left',
            top: 'bottom',
            text:['高','低'],           // 文本，默认为数值文本
            calculable : true
          },
          toolbox: {
            show: true,
            orient : 'vertical',
            left: 'right',
            top: 'center',
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}  //保存图像
            }
          },
          roamController: {
            show: true,
            x: 'right',
            mapTypeControl: {
              'china': true
            }
          },
          series : [
            {
              name: '总金额',
              type: 'map',
              mapType: 'china',
              roam: false,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              data:[ ]
            },
          ]
        });
        axios.get('/getsalesanalysis').then((res) => {
          let res1 = res.data.salesanalysis
          this.chartChina.setOption({
            series : [
              {
                name: '总金额',
                data: res1.chinaArea
              }
            ]
          })
        })
        .catch(() => {
          console.log("error")
        })

        //添加至简报
        var exportIf = document.getElementById('chartChinaExport')
        exportIf.onclick = function(){
          var imgURL = _this.chartChina.getDataURL()
          console.log(imgURL)
          localStorage.setItem("chartChina",imgURL)
          localStorage.setItem("chartChinaName","购买地分析-总销量报表")

          alert("已经添加至简报，后续操作请至简报管理页面编辑")
        }

      },
      
    },
  }
</script>
