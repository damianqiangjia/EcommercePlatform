<template>
<div>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>消费分析</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24">
      <div class="grid-content bg-purple">
        <div>
        <el-button id="amountExport" size="medium" type="success">导出简报</el-button>
        <el-button size="medium" type="primary"  v-on:click="export2ExcelOne">导出excel</el-button>
        </div>
        <div class="chart-container">
        <div id = "china" style="width: 100%; height: 800px;"> </div>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="14">
      <div class="grid-content bg-purple">
        <div class="chart-container">
        <div>
        <el-button id="originExport" size="medium" type="success">导出简报</el-button>
        <el-button size="medium" type="primary"  v-on:click="export2ExcelTwo">导出excel</el-button>
        </div>
        <div id = "worldone" style="width: 100%; height: 800px;"> </div>
        </div>
      </div>
    </el-col>
    <el-col :span="10">
      <div class="grid-content bg-purple">
        <div class="chart-container">
        <div>
        <el-button id="kindExport" size="medium" type="success">导出简报</el-button>
        <el-button size="medium" type="primary"  v-on:click="export2ExcelThree">导出excel</el-button>
        </div>
        <div id = "worldtwo" style="width: 100%; height: 800px;"> </div>
        </div>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
  import echarts from 'echarts'
  import axios from 'axios'


  export default{
    data(){
      return {
        msg: 'hello vue',
        tableData: null,
        china:[],
        worlddata:[],
        typedata:[],
      }
    },
    mounted () {
      this.draw();
    },        
    methods: {
      draw(){
            let _this = this
            _this.china = echarts.init(document.getElementById('china'));
            // 绘制图表
            _this.china.setOption({
                title : {
                text: '购买地区分析',
                subtext: '各地区近一个月总交易金额',
                x:'center'},
                tooltip : {
                    trigger: 'item'
                },
                legend: {
                orient: 'vertical',
                x:'left',
                data:['总金额']
                },
                grid: {
                left: '0%',
                right: '5%',
                bottom: '3%',
                },
                dataRange: {
                min: 0,
                max: 1200000,
                x: 'left',
                y: 'bottom',
                text:['高','低'],           // 文本，默认为数值文本
                calculable : true
                },
                toolbox: {
                    show: true,
                    orient : 'vertical',
                    x: 'right',
                    y: 'center',
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true},
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
                  itemStyle:{
                      normal:{label:{show:true}},
                      emphasis:{label:{show:true}}
                  },
                  data:[]
                }
                ]
            })
            //添加至简报
            var amountExportIf = document.getElementById('amountExport')
            amountExportIf.onclick = function(){
                var imgURL = _this.china.getDataURL()
                console.log(imgURL)
                localStorage.setItem("amountExport",imgURL)
                localStorage.setItem("amountExportName","消费分析-购买地区分析报表")
                alert("已经添加至简报，后续操作请至简报管理页面编辑")
            }
            //导出Excel
            this.$http.get('http://127.0.0.1:8000/api/show_areadata').then((response) => {
                var res = JSON.parse(response.bodyText)
                console.log(res['list'])
                var list=[];
                for(var i=0;i<34;i++){  
                    list[i]=res['list'][i].fields;  
                }  
                console.log(list)
                _this.china.setOption({
                    series : [
                    {
                        name: '总金额',
                        data: list
                    }
                    ]
                })
           })

            _this.worldone = echarts.init(document.getElementById('worldone'));
            _this.worldone.setOption({
                title: {
                    x: 'center',
                    text: '产地国家销量图',
                    subtext: '主要为欧洲六个国家',
                    link: 'http://echarts.baidu.com/doc/example.html'
                },
                tooltip: {
                    trigger: 'item'
                },
                toolbox: {
                    show: false,
                    feature: {
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                grid: {
                    borderWidth: 0,
                    y: 80,
                    y2: 60
                },
                xAxis: [
                {
                    type: 'category',
                    show: false,
                    data: ['德国', '法国', '荷兰', '葡萄牙', '西班牙', '芬兰']
                }
                ],
                yAxis: [
                {
                    type: 'value',
                    show: false
                }
                ],
                series: [
                {
                    name: '产地统计',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                // build a color map as your need.
                                var colorList = [
                                '#9BCA63','#60C0DD','#B5C334','#F3A43B',
                                '#D7504B','#27727B','#F4E001','#F0805A','#26C0C0'
                                ];
                             return colorList[params.dataIndex]
                            },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                        }
                    },
                    data: []
                }
                ]
            })
            //添加至简报
            var originExportIf = document.getElementById('originExport')
            originExportIf.onclick = function(){
                var imgURL = _this.worldone.getDataURL()
                console.log(imgURL)
                localStorage.setItem("originExport",imgURL)
                localStorage.setItem("originExportName","消费分析-产地国家销量图报表")
                alert("已经添加至简报，后续操作请至简报管理页面编辑")
            }

            this.worldtwo = echarts.init(document.getElementById('worldtwo'));
            // 绘制图表
            this.worldtwo.setOption({
                title : {
                    text: '商品种类构成',
                    subtext: '奶粉、母婴用品、护肤品、食品、日常用品、保健品',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:['奶粉','母婴用品','护肤品','食品','日常用品','保健品']
                },
                toolbox: {
                    show : false    ,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true, 
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'left',
                                    max: 12492
                                }
                            }
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                        name:'商品类别',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[]
                    }
                ]
            })
            //添加至简报
            var kindExportIf = document.getElementById('kindExport')
            kindExportIf.onclick = function(){
                var imgURL = _this.worldtwo.getDataURL()
                console.log(imgURL)
                localStorage.setItem("kindExport",imgURL)
                localStorage.setItem("kindExportName","消费分析-消费种类构成报表")
                alert("已经添加至简报，后续操作请至简报管理页面编辑")
            }

    this.$http.get('http://127.0.0.1:8000/api/show_worlddata').then((response) => {
            var res = JSON.parse(response.bodyText)
            if (res.error_num == 0) {
              for(var i = 0; i < 6; i++){
                this.worlddata[i]=res['worlddata'][i].fields["value"];
              }
            this.typedata[0]=res['typedata'][59].fields["naifen_count"];
            this.typedata[1]=res['typedata'][59].fields["muying_count"];
            this.typedata[2]=res['typedata'][59].fields["hufu_count"];
            this.typedata[3]=res['typedata'][59].fields["shipin_count"];
            this.typedata[4]=res['typedata'][59].fields["richang_count"];
            this.typedata[5]=res['typedata'][59].fields["baojian_count"];
            } else {
              this.$message.error('显示订单失败')
              console.log(res['msg'])
            }
          _this.worldone.setOption({
            series: [
            {
            name: '产地统计',
            data: this.worlddata,
          }]
          })
          _this.worldtwo.setOption({
          series: [{
            name: '商品类别',
            data: [{value:this.typedata[0], name:'奶粉'},
                {value:this.typedata[1], name:'母婴用品'},
                {value:this.typedata[2], name:'护肤品'},
                {value:this.typedata[3], name:'食品'},
                {value:this.typedata[4], name:'日常用品'},
                {value:this.typedata[5], name:'保健品'}],
          }]
          })
        })
          },

    export2ExcelOne() {
　　require.ensure([], () => {
　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
　　　　const tHeader = ['购买地', '订单数量（近三十天）'];
　　　　const filterVal = ['name', 'value'];
        this.$http.get('http://127.0.0.1:8000/api/show_areadata').then((response) => {
            var res = JSON.parse(response.bodyText)
            console.log(res['list'])
            var list=[];
            for(var i=0;i<34;i++){  
             list[i]=res['list'][i].fields;  
            }  
            const data = this.formatJson(filterVal, list);
　　　　     export_json_to_excel(tHeader, data, '购买地区分析');
            alert("成功导出报表")
           })
           })
},
    export2ExcelTwo() {
　　require.ensure([], () => {
　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
　　　　const tHeader = ['产出国', '商品数量（近三十天）'];
　　　　const filterVal = ['name', 'value'];
        this.$http.get('http://127.0.0.1:8000/api/show_worlddata').then((response) => {
            var res = JSON.parse(response.bodyText)
            var list=[];
            for(var i=0;i<6;i++){  
             list[i]=res['worlddata'][i].fields;  
            }  
            console.log(list)
            const data = this.formatJson(filterVal, list);
　　　　     export_json_to_excel(tHeader, data, '产地销量统计');
           })
           })
},
    export2ExcelThree() {
　　require.ensure([], () => {
　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
　　　　const tHeader = ['种类', '销量'];
　　　　const filterVal = ['type', 'count'];
        this.$http.get('http://127.0.0.1:8000/api/show_typedata').then((response) => {
            var res = JSON.parse(response.bodyText)
            var list=[{'type':'naifen_count','count':0},{'type':'muying_count','count':0},{'type':'hufu_count','count':0},
                        {'type':'shipin_count','count':0},{'type':'richang_count','count':0},{'type':'baojian_count','count':0}];
            for(var i=0;i<6;i++){
             list[i]['count'] = res['list'][59].fields[list[i]['type']];   
            }  
            console.log(list)
            const data = this.formatJson(filterVal, list);
　　　　     export_json_to_excel(tHeader, data, '产地销量统计');
           })
           })
},
        formatJson(filterVal, jsonData) {
        　　return jsonData.map(v => filterVal.map(j => v[j]))
        }
  }
  }
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 500px;
    width: 100%
  }
  .chart-container {
    width: 100%;
  }
  .chart-container .el-col {
    padding: 30px 20px;
  }
</style>