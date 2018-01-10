<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>关联分析</el-breadcrumb-item>
        <el-breadcrumb-item>电商关联分析</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="chart-classfily">
      <el-tabs type="border-card" >
        <el-tab-pane label="商品-电商关联分析" class="chart-card">
          <div id="chartProduct" style="width:1200%; height:550px;"></div>      
          <el-button id = "chartProductExport" type="text" size="medium" style="float: center">添加到简报</el-button>
        </el-tab-pane>
        <el-tab-pane label="电商-商品关联分析" class="chart-card">
          <div id="chartBusiness" style="width:1200%; height:550px;"></div>        
          <el-button  id = "chartBusinessExport" type="text" size="medium" style="float: center">添加到简报</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-col>

    <h3 class="excursus">附件：(电商对应ID)</h3>
    <el-table :data="tableData" border style="width: 50%" class="brand-table">
      <el-table-column prop="businessID" label='电商ID' width="250"></el-table-column>
      <el-table-column prop="business" label="电商" width="500"></el-table-column>
    </el-table>

  </el-row>
</template>

<script>
  import echarts from 'echarts'
  import axios from 'axios'
  import {bus} from '../../bus.js'
  import html2Canvas from '../../html2canvas.js'

  export default{

    data() {
      return {
        tableData: [],
        currentDate: new Date(),
        chartProduct: null,
        chartBusiness: null,
      }
    },

    mounted() {
      this.getData()
      this.drawProduct()
      this.drawBusiness()
    },

    methods: {
      getData(){
        axios.get('/getBusinessID').then((res) => { 
          console.log(res) 
          let res1 = res.data.businessID
          console.log(res1.list)
          this.tableData = res1.list
        })
      },
      drawProduct(){
        let _this= this;
        //基于准备好的dom，初始化echarts实例
        this.chartProduct = echarts.init(document.getElementById('chartProduct'));
        this.chartProduct.setOption({
          title : {
            text: '商品-电商关联分析',
            subtext: '美华数据'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:[]
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
              data : []
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'B01',
              type:'bar',
              data:[],
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
              }
            },
            {
              name:'B02',
              type:'bar',
              data:[],
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
             }
            },
            {
              name:'B03',
              type:'bar',
              data:[],
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
            {
              name:'B04',
              type:'bar',
              data:[],
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
            {
              name:'B05',
              type:'bar',
              data:[],
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
            {
              name:'B06',
              type:'bar',
              data:[],
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
          ]
        });
        axios.get('/getProduct').then((res) => {
          console.log(res)
          let res1 = res.data.product
          this.chartProduct.setOption({
            legend: {
              data: res1.type
            },
            xAxis: [{
              type : 'category',
              data: res1.category
            }],
            series : [
            {
              name:'B01',
              type:'bar',
              data: res1.data1,
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
              }
            },
            {
              name:'B02',
              type:'bar',
              data: res1.data2,
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
             }
            },
            {
              name:'B03',
              type:'bar',
              data: res1.data3,
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
            {
              name:'B04',
              type:'bar',
              data: res1.data4,
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
            {
              name:'B05',
              type:'bar',
              data: res1.data5,
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
            {
              name:'B06',
              type:'bar',
              data: res1.data6,
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
            ]
          });
        })
        .catch(() => {
          console.log("error")
        })

        //添加至报表
        var exportIf = document.getElementById('chartProductExport')
        exportIf.onclick = function(){
          var imgURL = _this.chartProduct.getDataURL()
          console.log(imgURL)
          // localStorage.clear()
          localStorage.setItem("chartProduct",imgURL)
          localStorage.setItem("chartProductName","商品-电商关联分析报表")

          alert("已经添加至简报，后续操作请至简报管理页面编辑")
        }
      },
      

      drawBusiness(){
        let _this= this;
        //基于准备好的dom，初始化echarts实例
        this.chartBusiness = echarts.init(document.getElementById('chartBusiness'));
        this.chartBusiness.setOption({
          title : {
            text: '电商-商品关联分析',
            subtext: '美华数据'
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
              data:[]
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
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                  {type : 'average', name: '平均值'}
                ]
              }
            },
            {
              name:'奶粉',
              type:'bar',
              data:[],
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
            {
              name:'日常用品',
              type:'bar',
              data:[],
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
            {
              name:'护肤品',
              type:'bar',
              data:[],
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
            {
              name:'食品',
              type:'bar',
              data:[],
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
            {
              name:'保健品',
              type:'bar',
              data:[],
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
          ]
        });
        axios.get('/getBusiness').then((res) => {
          console.log(res)
          let res1 = res.data.business
          this.chartBusiness.setOption({
            legend: {
              data: res1.type
            },
            xAxis: [{
              type : 'category',
              data: res1.category
            }],
            series : [
            {
              name:'母婴用品',
              type:'bar',
              data: res1.data1,
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
              }
            },
            {
              name:'奶粉',
              type:'bar',
              data: res1.data2,
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
             }
            },
            {
              name:'日常用品',
              type:'bar',
              data: res1.data3,
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
            {
              name:'护肤品',
              type:'bar',
              data: res1.data4,
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
            {
              name:'食品',
              type:'bar',
              data: res1.data5,
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
            {
              name:'保健品',
              type:'bar',
              data: res1.data6,
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
            ]
          });
        })
        .catch(() => {
          console.log("error")
        })

        //添加至报表
        var exportIf = document.getElementById('chartBusinessExport')
        exportIf.onclick = function(){
          var imgURL = _this.chartBusiness.getDataURL()
          console.log(imgURL)
          // localStorage.clear()
          localStorage.setItem("chartBusiness",imgURL)
          localStorage.setItem("chartBusinessName","电商-商品关联分析报表")
          alert("已经添加至简报，后续操作请至简报管理页面编辑")
        }

      },


    }
  }
</script>

<style>
  .chart-chart-classfily {
    width: 100%;
    margin: 20px auto;
    padding: 50px;
    border-width: 10px;

  }
  .excursus {
    /* padding: 10px;
    margin: 20px auto;
    padding: 50px;
    border-width: 10px */
  }
</style>
