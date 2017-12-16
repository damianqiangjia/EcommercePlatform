<template>
  <div>
    <el-row class="warp">
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
          <el-breadcrumb-item>短期预测</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <div class="chart-container">
            <div>
                <el-button id="forecastExport" size="medium" type="success">导出简报</el-button>
                <el-button size="medium" type="primary"  v-on:click="export2ExcelOrder">导出excel</el-button>
            </div>
            <div id = "order" style="width: 1800px; height: 800px;"> </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="奶粉" name="first">
              <div class="chart-container">
                <div>
                    <el-button id="milkForecast" ize="medium" type="success">导出简报</el-button>
                    <el-button size="medium" type="primary"  v-on:click="export2ExcelNaifen">导出excel</el-button>
                </div>
                <div id = "naifen" style="width: 1800px; height: 800px;"> </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="母婴用品" name="second">
              <div class="chart-container">
                <div>
                    <el-button id="babyProductForecast" size="medium" type="success">导出简报</el-button>
                    <el-button size="medium" type="primary"  v-on:click="export2ExcelMuying">导出excel</el-button>
                </div>
                <div id = "muyingyongpin" style="width: 1800px; height: 800px;"> </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="护肤品" name="third">
              <div class="chart-container">
                <div>
                    <el-button id="skinForecast" size="medium" type="success">导出简报</el-button>
                    <el-button size="medium" type="primary"  v-on:click="export2ExcelHufu">导出excel</el-button>
                </div>
                <div id = "hufupin" style="width: 1800px; height: 800px;"> </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="食品" name="fourth">
              <div class="chart-container">
                <div>
                    <el-button id="foodForecast" size="medium" type="success">导出简报</el-button>
                    <el-button size="medium" type="primary"  v-on:click="export2ExcelShipin">导出excel</el-button>
                </div>
                <div id = "shipin" style="width: 1800px; height: 800px;"> </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="日常用品" name="fifth">
              <div class="chart-container">
                <div>
                    <el-button id="dailyForecast" size="medium" type="success">导出简报</el-button>
                    <el-button size="medium" type="primary"  v-on:click="export2ExcelRichang">导出excel</el-button>
                </div>
                <div id = "richangyongpin" style="width: 1800px; height: 800px;"> </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="保健品" name="sixth">
              <div class="chart-container">
                <div>
                    <el-button id="healthForecast" size="medium" type="success">导出简报</el-button>
                    <el-button size="medium" type="primary"  v-on:click="export2ExcelBaojian">导出excel</el-button>
                </div>
                <div id = "baojianpin" style="width: 1800px; height: 800px;"> </div>
              </div>
            </el-tab-pane>
          </el-tabs>
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
        activeName: 'first',
        date:[],
        orderdata:[],
        naifen_Aptamil:[],
        naifen_Gallia:[],
        naifen_Babybio:[],
        muying_Hipp:[],
        hufu_Herbacin:[],
        hufu_Balea:[],
        shipin_Hipp:[],
        richang_Brita:[],
        richang_Facelle:[],
        baojian_Salus:[],
        baojian_Doppelherz:[],
      }
    },
    mounted () {
      this.draw();
    },        
    methods: {
      draw(){
            let _this = this
            this.order = echarts.init(document.getElementById('order')); //订单数预测
            // 绘制图表
            this.order.setOption({
                title : {
                    text: '订单数量预测',
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['订单数量']
                },
                grid: {
                    left: '10%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : []
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                    }
                ],
                visualMap: {
                    show: false,
                    dimension: 0,
                    pieces: [{
                        lte: 29,
                        color: 'green'
                } , 
                {
                    gt: 29,
                    lte: 31,
                    color: 'red'
                }]
                },
                series : [
                {
                    name:'订单数量',
                    type:'line',
                    data:[]
                },
                ],
            });
            //添加至简报
            var forecastExportIf = document.getElementById('forecastExport')
            forecastExportIf.onclick = function(){
                var imgURL = _this.order.getDataURL()
                console.log(imgURL)
                localStorage.setItem("forecastExport",imgURL)
                localStorage.setItem("forecastExportName","短期预测-订单数量预测报表")
                alert("已经添加至简报，后续操作请至简报管理页面编辑")
            }

            this.naifen = echarts.init(document.getElementById('naifen')); //奶粉类商品的预测
            // 绘制图表
            this.naifen.setOption({
                title: {
                    text: '奶粉类商品的预测'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['爱他美（Aptamil）','佳丽雅（Gallia）','伴宝乐（Babybio）']
                },
                grid: {
                    left: '10%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'爱他美（Aptamil）',
                        type:'line',
                        // stack: '总量',
                        data:[]
                    },
                    {
                        name:'佳丽雅（Gallia）',
                        type:'line',
                        data:[]
                    },
                    {
                        name:'伴宝乐（Babybio）',
                        type:'line',
                        data:[]
                    }
                ]
            });
            //添加至简报
            var milkForecastIf = document.getElementById('milkForecast')
            milkForecastIf.onclick = function(){
                var imgURL = _this.naifen.getDataURL()
                console.log(imgURL)
                localStorage.setItem("milkForecast",imgURL)
                localStorage.setItem("milkForecastName","短期预测-奶粉订单数量预测报表")
                alert("已经添加至简报，后续操作请至简报管理页面编辑")
            }

    this.muyingyongpin = echarts.init(document.getElementById('muyingyongpin')); //母婴用品类商品的预测
        // 绘制图表
    this.muyingyongpin.setOption({
          title: {
        text: '母婴用品类的预测'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['喜宝（Hipp）']
    },
    grid: {
        left: '10%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'喜宝（Hipp）',
            type:'line',
            data:[]
        }
    ]
        });
            //添加至简报
            var babyProductForecastIf = document.getElementById('babyProductForecast')
            babyProductForecastIf.onclick = function(){
                var imgURL = _this.muyingyongpin.getDataURL()
                console.log(imgURL)
                localStorage.setItem("babyProductForecast",imgURL)
                localStorage.setItem("babyProductForecastName","短期预测-母婴用品订单数量预测报表")
                alert("已经添加至简报，后续操作请至简报管理页面编辑")
            }
        
      this.hufupin = echarts.init(document.getElementById('hufupin')); //护肤品类商品的预测
        // 绘制图表
        this.hufupin.setOption({
          title: {
        text: '护肤品类商品的预测'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['贺本清（herbacin）','芭乐雅（Balea）']
    },
    grid: {
        left: '10%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'贺本清（herbacin）',
            type:'line',
            data:[]
        },
        {
            name:'芭乐雅（Balea）',
            type:'line',
            data:[]
        }
    ]
        });
        //添加至简报
            var skinForecastIf = document.getElementById('skinForecast')
            skinForecastIf.onclick = function(){
                var imgURL = _this.hufupin.getDataURL()
                console.log(imgURL)
                localStorage.setItem("skinForecast",imgURL)
                localStorage.setItem("skinForecastName","短期预测-护肤品订单数量预测报表")
                alert("已经添加至简报，后续操作请至简报管理页面编辑")
            }

       this.shipin = echarts.init(document.getElementById('shipin')); //食品类商品的预测
        // 绘制图表
        this.shipin.setOption({
          title: {
        text: '食品类商品的预测'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['喜宝（Hipp）']
    },
    grid: {
        left: '10%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'喜宝（Hipp）',
            type:'line',
            data:[]
        }
    ]
        });
        //添加至简报
            var foodForecastIf = document.getElementById('foodForecast')
            foodForecastIf.onclick = function(){
                var imgURL = _this.shipin.getDataURL()
                console.log(imgURL)
                localStorage.setItem("foodForecast",imgURL)
                localStorage.setItem("foodForecastName","短期预测-食品订单数量预测报表")
                alert("已经添加至简报，后续操作请至简报管理页面编辑")
            }

       this.richangyongpin = echarts.init(document.getElementById('richangyongpin')); //日常用品类商品的预测
        // 绘制图表
        this.richangyongpin.setOption({
          title: {
        text: '日常用品类商品的预测'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['碧然德（BRITA）','Facelle']
    },
    grid: {
        left: '10%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'碧然德（BRITA）',
            type:'line',
            data:[]
        },
        {
            name:'Facelle',
            type:'line',
            data:[]
        }
    ]
        });

        //添加至简报
            var dailyForecastIf = document.getElementById('dailyForecast')
            dailyForecastIf.onclick = function(){
                var imgURL = _this.richangyongpin.getDataURL()
                console.log(imgURL)
                localStorage.setItem("dailyForecast",imgURL)
                localStorage.setItem("dailyForecastName","短期预测-日常用品订单数量预测报表")
                alert("已经添加至简报，后续操作请至简报管理页面编辑")
            }

      this.baojianpin = echarts.init(document.getElementById('baojianpin')); //保健品类商品的预测
        // 绘制图表
        this.baojianpin.setOption({
          title: {
        text: '保健品类商品的预测'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['莎露斯（Salus）','双心（Doppelherz）']
    },
    grid: {
        left: '10%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'莎露斯（Salus）',
            type:'line',
            data:[]
        },
        {
            name:'双心（Doppelherz）',
            type:'line',
            data:[]
        }
    ]
        });

        //添加至简报
            var healthForecastIf = document.getElementById('healthForecast')
            healthForecastIf.onclick = function(){
                var imgURL = _this.baojianpin.getDataURL()
                console.log(imgURL)
                localStorage.setItem("healthForecast",imgURL)
                localStorage.setItem("healthForecastName","短期预测-保健品订单数量预测报表")
                alert("已经添加至简报，后续操作请至简报管理页面编辑")
            }

    this.$http.get('http://127.0.0.1:8000/api/show_predictdata')
        .then((response) => {
            var res = JSON.parse(response.bodyText)
            if (res.error_num == 0) {
              for(var i = 0; i < 32; i++){
                this.date[i]=res['orderdata'][21+i].fields["date"];
              }
              for(var i = 0; i < 29; i++){
                this.orderdata[i]=res['orderdata'][21+i].fields["order_count"];
                this.naifen_Aptamil[i]=res['productdata'][21+i].fields["naifen_Aptamil"];
                this.naifen_Gallia[i]=res['productdata'][21+i].fields["naifen_Gallia"];
                this.naifen_Babybio[i]=res['productdata'][21+i].fields["naifen_Babybio"];
                this.muying_Hipp[i]=res['productdata'][21+i].fields["muying_Hipp"];
                this.hufu_Herbacin[i]=res['productdata'][21+i].fields["hufu_Herbacin"];
                this.hufu_Balea[i]=res['productdata'][21+i].fields["hufu_Balea"];
                this.shipin_Hipp[i]=res['productdata'][21+i].fields["shipin_Hipp"];
                this.richang_Brita[i]=res['productdata'][21+i].fields["richang_Brita"];
                this.richang_Facelle[i]=res['productdata'][21+i].fields["richang_Facelle"];
                this.baojian_Salus[i]=res['productdata'][21+i].fields["baojian_Salus"];
                this.baojian_Doppelherz[i]=res['productdata'][21+i].fields["baojian_Doppelherz"];
              }
              for(var i = 0; i < 3; i++){
                this.orderdata[29+i]=res['predictdata'][i].fields["order_count"];
                this.naifen_Aptamil[29+i]=res['predictdata'][i].fields["naifen_Aptamil"];
                this.naifen_Gallia[29+i]=res['predictdata'][i].fields["naifen_Gallia"];
                this.naifen_Babybio[29+i]=res['predictdata'][i].fields["naifen_Babybio"];
                this.muying_Hipp[29+i]=res['predictdata'][i].fields["muying_Hipp"];
                this.hufu_Herbacin[29+i]=res['predictdata'][i].fields["hufu_Herbacin"];
                this.hufu_Balea[29+i]=res['predictdata'][i].fields["hufu_Balea"];
                this.shipin_Hipp[29+i]=res['predictdata'][i].fields["shipin_Hipp"];
                this.richang_Brita[29+i]=res['predictdata'][i].fields["richang_Brita"];
                this.richang_Facelle[29+i]=res['predictdata'][i].fields["richang_Facelle"];
                this.baojian_Salus[29+i]=res['predictdata'][i].fields["baojian_Salus"];
                this.baojian_Doppelherz[29+i]=res['predictdata'][i].fields["baojian_Doppelherz"];
              }
            } else {
              this.$message.error('显示预测数据失败')
              console.log(res['msg'])
            }
          order.setOption({
          xAxis: {
            data: this.date
          },
          series: [
            {
            // 根据名字对应到相应的系列
            name: '订单数量',
            data: this.orderdata,
            markArea: {
                data: [ [{
                    name: '预测值',
                    xAxis: "0323",
                },{
                    xAxis: "0325",
                }] ]
                
            }
          }
          ]
          })
        naifen.setOption({
          xAxis: {  
            data: this.date
          },
          series: [
            {
            // 根据名字对应到相应的系列
            name: '爱他美（Aptamil）',
            data: this.naifen_Aptamil,
            markArea: {
                data: [ [{
                    name: '预测值',
                    xAxis: "0323",
                },{
                    xAxis: "0325",
                }] ]
            },
            },
            {
            // 根据名字对应到相应的系列
            name: '佳丽雅（Gallia）',
            data: this.naifen_Gallia,
            },
            {
            // 根据名字对应到相应的系列
            name: '伴宝乐（Babybio）',
            data: this.naifen_Babybio,
            }
          ]
          })
        muyingyongpin.setOption({
          xAxis: {  
            data: this.date
          },
          series: [
            {
            // 根据名字对应到相应的系列
            name: '喜宝（Hipp）',
            data: this.muying_Hipp,
            markArea: {
                data: [ [{
                    name: '预测值',
                    xAxis: "0323",
                },{
                    xAxis: "0325",
                }] ]
            },
            },
          ]
          })
        hufupin.setOption({
          xAxis: {  
            data: this.date
          },
          series: [
            {
            // 根据名字对应到相应的系列
            name: '贺本清（herbacin）',
            data: this.hufu_Herbacin,
            markArea: {
                data: [ [{
                    name: '预测值',
                    xAxis: "0323",
                },{
                    xAxis: "0325",
                }] ]
            },
            },
            {
            // 根据名字对应到相应的系列
            name: '芭乐雅（Balea）',
            data: this.hufu_Balea,
            }
          ]
          })
        shipin.setOption({
          xAxis: {  
            data: this.date
          },
          series: [
            {
            // 根据名字对应到相应的系列
            name: '喜宝（Hipp）',
            data: this.shipin_Hipp,
            markArea: {
                data: [ [{
                    name: '预测值',
                    xAxis: "0323",
                },{
                    xAxis: "0325",
                }] ]
            },
            }
          ]
          })
        richangyongpin.setOption({
          xAxis: {  
            data: this.date
          },
          series: [
            {
            // 根据名字对应到相应的系列
            name: '碧然德（BRITA）',
            data: this.richang_Brita,
            markArea: {
                data: [ [{
                    name: '预测值',
                    xAxis: "0323",
                },{
                    xAxis: "0325",
                }] ]
            },
            },
            {
            // 根据名字对应到相应的系列
            name: 'Facelle',
            data: this.richang_Facelle
            }
          ]
          })
        baojianpin.setOption({
          xAxis: {  
            data: this.date
          },
          series: [
            {
            // 根据名字对应到相应的系列
            name: '莎露斯（Salus）',
            data: this.baojian_Salus,
            markArea: {
                data: [ [{
                    name: '预测值',
                    xAxis: "0323",
                },{
                    xAxis: "0325",
                }] ]
            },
            },
            {
            // 根据名字对应到相应的系列
            name: '双心（Doppelherz）',
            data: this.baojian_Doppelherz,
            }
          ]
          })
        })
    },
        export2ExcelOrder() {
　　require.ensure([], () => {
　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
　　　　const tHeader = ['日期', '订单数量'];
　　　　const filterVal = ['date', 'order_count'];
        this.$http.get('http://127.0.0.1:8000/api/show_predictdata')
        .then((response) => {
            var res = JSON.parse(response.bodyText)
            var list=[];
            for(var i=0;i<30;i++){
             var d = {}
             d['date']= res['orderdata'][20+i].fields['date'];
             d['order_count']= res['orderdata'][20+i].fields['order_count'];
             list[i] = d   
            }
            for(var i=0;i<3;i++){
             var d = {}
             d['date']= res['predictdata'][i].fields['date'];
             d['order_count']= res['predictdata'][i].fields['order_count'];
             list[30+i] = d   
            }
            console.log(list)  
            const data = this.formatJson(filterVal, list);
　　　　     export_json_to_excel(tHeader, data, '各类别数据统计');
           })
           })
},
export2ExcelNaifen() {
　　require.ensure([], () => {
　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
　　　　const tHeader = ['日期', 'Aptamil（爱他美）', 'Gallia（佳丽雅）', 'Babybio（伴宝乐）'];
　　　　const filterVal = ['date', 'naifen_Aptamil', 'naifen_Gallia', 'naifen_Babybio'];
        this.$http.get('http://127.0.0.1:8000/api/show_predictdata')
        .then((response) => {
            var res = JSON.parse(response.bodyText)
            var list=[];
            for(var i=0;i<30;i++){
             var d = {}
             d['date']= res['productdata'][20+i].fields['date'];
             d['naifen_Aptamil']= res['productdata'][20+i].fields['naifen_Aptamil'];
             d['naifen_Gallia']= res['productdata'][20+i].fields['naifen_Gallia'];
             d['naifen_Babybio']= res['productdata'][20+i].fields['naifen_Babybio'];
             list[i] = d   
            }
            for(var i=0;i<3;i++){
             var d = {}
             d['date']= res['predictdata'][i].fields['date'];
             d['naifen_Aptamil']= res['predictdata'][i].fields['naifen_Aptamil'];
             d['naifen_Gallia']= res['predictdata'][i].fields['naifen_Aptamil'];
             d['naifen_Babybio']= res['predictdata'][i].fields['naifen_Aptamil'];
             list[30+i] = d   
            }
            const data = this.formatJson(filterVal, list);
　　　　     export_json_to_excel(tHeader, data, '奶粉类数据统计');
           })
           })
},
export2ExcelMuying() {
　　require.ensure([], () => {
　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
　　　　const tHeader = ['日期', 'Hipp（喜宝）'];
　　　　const filterVal = ['date', 'muying_Hipp'];
        this.$http.get('http://127.0.0.1:8000/api/show_predictdata')
        .then((response) => {
            var res = JSON.parse(response.bodyText)
            var list=[];
            for(var i=0;i<30;i++){
             var d = {}
             d['date']= res['productdata'][20+i].fields['date'];
             d['muying_Hipp']= res['productdata'][20+i].fields['muying_Hipp'];
             list[i] = d   
            }
            for(var i=0;i<3;i++){
             var d = {}
             d['date']= res['predictdata'][i].fields['date'];
             d['muying_Hipp']= res['predictdata'][i].fields['muying_Hipp'];
             list[30+i] = d   
            }
            const data = this.formatJson(filterVal, list);
　　　　     export_json_to_excel(tHeader, data, '母婴类数据统计');
           })
           })
},
export2ExcelHufu() {
　　require.ensure([], () => {
　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
　　　　const tHeader = ['日期', 'Herbacin（贺本清）', 'Balea（芭乐雅）'];
　　　　const filterVal = ['date', 'hufu_Herbacin', 'hufu_Balea'];
        this.$http.get('http://127.0.0.1:8000/api/show_predictdata')
        .then((response) => {
            var res = JSON.parse(response.bodyText)
            var list=[];
            for(var i=0;i<30;i++){
             var d = {}
             d['date']= res['productdata'][20+i].fields['date'];
             d['hufu_Herbacin']= res['productdata'][20+i].fields['hufu_Herbacin'];
             d['hufu_Balea']= res['productdata'][20+i].fields['hufu_Balea'];
             list[i] = d   
            }
            for(var i=0;i<3;i++){
             var d = {}
             d['date']= res['predictdata'][i].fields['date'];
             d['hufu_Herbacin']= res['predictdata'][i].fields['hufu_Herbacin'];
             d['hufu_Balea']= res['predictdata'][i].fields['hufu_Balea'];
             list[30+i] = d   
            }
            const data = this.formatJson(filterVal, list);
　　　　     export_json_to_excel(tHeader, data, '护肤类数据统计');
           })
           })
},
export2ExcelShipin() {
　　require.ensure([], () => {
　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
　　　　const tHeader = ['日期', 'Hipp（喜宝）'];
　　　　const filterVal = ['date', 'shipin_Hipp'];
        this.$http.get('http://127.0.0.1:8000/api/show_predictdata')
        .then((response) => {
            var res = JSON.parse(response.bodyText)
            var list=[];
            for(var i=0;i<30;i++){
             var d = {}
             d['date']= res['productdata'][20+i].fields['date'];
             d['shipin_Hipp']= res['productdata'][20+i].fields['shipin_Hipp'];
             list[i] = d   
            }
            for(var i=0;i<3;i++){
             var d = {}
             d['date']= res['predictdata'][i].fields['date'];
             d['shipin_Hipp']= res['predictdata'][i].fields['shipin_Hipp'];
             list[30+i] = d   
            }
            const data = this.formatJson(filterVal, list);
　　　　     export_json_to_excel(tHeader, data, '食品类数据统计');
           })
           })
},
export2ExcelRichang() {
　　require.ensure([], () => {
　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
　　　　const tHeader = ['日期', 'Brita（碧然得）', 'Facelle'];
　　　　const filterVal = ['date', 'richang_Brita', 'richang_Facelle'];
        this.$http.get('http://127.0.0.1:8000/api/show_predictdata')
        .then((response) => {
            var res = JSON.parse(response.bodyText)
            var list=[];
            for(var i=0;i<30;i++){
             var d = {}
             d['date']= res['productdata'][20+i].fields['date'];
             d['richang_Brita']= res['productdata'][20+i].fields['richang_Brita'];
             d['richang_Facelle']= res['productdata'][20+i].fields['richang_Facelle'];
             list[i] = d   
            }
            for(var i=0;i<3;i++){
             var d = {}
             d['date']= res['predictdata'][i].fields['date'];
             d['richang_Brita']= res['predictdata'][i].fields['richang_Brita'];
             d['richang_Facelle']= res['predictdata'][i].fields['richang_Facelle'];
             list[30+i] = d   
            }
            const data = this.formatJson(filterVal, list);
　　　　     export_json_to_excel(tHeader, data, '日常用品类数据统计');
           })
           })
},
export2ExcelBaojian() {
　　require.ensure([], () => {
　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
　　　　const tHeader = ['日期', 'Salus（莎露丝）', 'Doppelherz（双心）'];
　　　　const filterVal = ['date', 'baojian_Salus', 'baojian_Doppelherz'];
        this.$http.get('http://127.0.0.1:8000/api/show_predictdata')
        .then((response) => {
            var res = JSON.parse(response.bodyText)
            var list=[];
            for(var i=0;i<30;i++){
             var d = {}
             d['date']= res['productdata'][20+i].fields['date'];
             d['baojian_Salus']= res['productdata'][20+i].fields['baojian_Salus'];
             d['baojian_Doppelherz']= res['productdata'][20+i].fields['baojian_Doppelherz'];
             list[i] = d   
            }
            for(var i=0;i<3;i++){
             var d = {}
             d['date']= res['predictdata'][i].fields['date'];
             d['baojian_Salus']= res['predictdata'][i].fields['baojian_Salus'];
             d['baojian_Doppelherz']= res['predictdata'][i].fields['baojian_Doppelherz'];
             list[30+i] = d   
            }
            const data = this.formatJson(filterVal, list);
　　　　     export_json_to_excel(tHeader, data, '保健品类数据统计');
           })
           })
},
        formatJson(filterVal, jsonData) {
        　　return jsonData.map(v => filterVal.map(j => v[j]))
        }

    }
  }
</script>

<style>
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