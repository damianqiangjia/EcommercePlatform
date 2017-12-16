<template>
  <div>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>销量分析</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>

  <el-row :gutter="20">
  <el-col :span="12">
    <div class="grid-content bg-purple">
      <div class="chart-container">
      <div>
        <el-button id="orderQuantityExport" size="medium" type="success">导出简报</el-button>
        <el-button size="medium" type="primary"  v-on:click="export2ExcelOne">导出excel</el-button>
      </div>
      <div id = "one" style="width: 100%; height: 400px;"> </div>
      </div>
    </div>
  </el-col>
  <el-col :span="12">
    <div class="grid-content bg-purple">
      <div class="chart-container">
      <div>
        <el-button id="orderPriceExport" size="medium" type="success">导出简报</el-button>
        <el-button size="medium" type="primary"  v-on:click="export2ExcelOne">导出excel</el-button>
      </div>
      <div id = "two" style="width: 100%; height: 400px;"> </div>
      </div>
    </div>
  </el-col>
  </el-row>

  <el-row :gutter="20">
  <el-col :span="24">
    <div class="grid-content bg-purple">
      <div class="chart-container">
      <div>
        <el-button id="allKindsExport" size="medium" type="success">导出简报</el-button>
        <el-button size="medium" type="primary"  v-on:click="export2ExcelTwo">导出excel</el-button>
      </div>
      <div id = "three" style="width: 100%; height: 800px;"> </div>
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
        date: [],
        orderNumber: [],
        orderPrice: [],
        naifen:[],
        muying:[],
        hufu:[],
        shipin:[],
        richang:[],
        baojian:[],
      }
    },
    mounted () {
      this.draw();
    },        
    methods: {
    showOrderData(){
      this.$http.get('http://127.0.0.1:8000/api/show_orderdata')
        .then((response) => {
            var res = JSON.parse(response.bodyText)
            console.log(res)
            if (res.error_num == 0) {
              for(var i = 0; i < 29; i++){
                this.date[i]=res['list'][21+i].fields["date"];
                this.orderNumber[i]=res['list'][21+i].fields["product_count"];
              }
            } else {
              this.$message.error('显示订单失败')
              console.log(res['msg'])
            }
            console.log(this.date)
        })
    },
      draw(){
        let _this = this
        this.one = echarts.init(document.getElementById('one'));
        // 绘制图表
        this.one.setOption({
          title : {
            text: '订单数变化趋势',
            subtext: '最近30天'
            },
          tooltip : {
            trigger: 'axis'
            },
          legend: {
            data:['订单数量']
            },
          calculable : true,
          xAxis : [{
              type : 'category',
              data : []
              }],
              yAxis : [
                {
                  type : 'value'
                  }],
              series : [{
                  name:'订单数量',
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
            ]
        })
        //添加至简报
        var orderQuantityExportIf = document.getElementById('orderQuantityExport')
        orderQuantityExportIf.onclick = function(){
          var imgURL = _this.one.getDataURL()
          console.log(imgURL)
          localStorage.setItem("orderQuantityExport",imgURL)
          localStorage.setItem("orderQuantityExportName","趋势分析-订单数量变化趋势报表")
          alert("已经添加至简报，后续操作请至简报管理页面编辑")
        }
        
        this.two = echarts.init(document.getElementById('two'));
        // 绘制图表
        this.two.setOption({
          title : {
            text: '订单金额数变化趋势',
            subtext: '最近30天'
            },
          tooltip : {
            trigger: 'axis'
            },
          legend: {
            data:['订单金额']
            },
          calculable : true,
          xAxis : [{
              type : 'category',
              data :[],
              }],
              yAxis : [
                {
                  type : 'value'
                  }],
              series : [{
                  name:'订单金额',
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
            ]
        })
        //添加至简报
        var orderPriceExportIf = document.getElementById('orderPriceExport')
        orderPriceExportIf.onclick = function(){
          var imgURL = _this.two.getDataURL()
          console.log(imgURL)
          localStorage.setItem("orderPriceExport",imgURL)
          localStorage.setItem("orderPriceExportName","趋势分析-订单金额变化趋势报表")
          alert("已经添加至简报，后续操作请至简报管理页面编辑")
        }

        this.three = echarts.init(document.getElementById('three'));
        // 绘制图表
        this.three.setOption({
          tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
          },
          legend: {
          data: ['奶粉类', '母婴用品类', '护肤品类', '食品类', '日常用品类', '保健品类'],
          right: '40%'
          },
          calculable: true,
          xAxis: [{
          axisLabel: {
          rotate: 70,
          interval: 0
          },
          type: 'category',
          data: []
          }],
          grid: { // 控制图的大小，调整下面这些值就可以，
          x: 40,
          x2: 80,
          y2: 125, // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
          },
          yAxis: [{
          type: 'value'
          }],
          series: [
          {
          name: '奶粉类',
          type: 'bar',
          barWidth: 10,
          stack: '总量',
          itemStyle: {
          normal: {
          label: {
          show: false,
          position: 'insideRight'
          },
          color: "#01c2b1"
          }
          },
          data: []
          }, 
          {
          name: '母婴用品类',
          type: 'bar',
          barWidth: 10,
          stack: '总量',
          itemStyle: {
          normal: {
          label: {
          show: false,
          position: 'insideRight'
          },
          color: "#f6be1f"
          }
          },
          data: []
          },
          {
          name: '护肤品类',
          type: 'bar',
          barWidth: 10,
          stack: '总量',
          itemStyle: {
          normal: {
          label: {
          show: false,
          position: 'insideRight'
          },
          color: "#ee6531"
          }
          },
          data: []
          }, 
          {
          name: '食品类',
          type: 'bar',
          barWidth: 10,
          stack: '总量',
          itemStyle: {
          normal: {
          label: {
          show: false,
          position: 'insideRight'
          },
          color: "#1E56A0"
          }
          },
          data: []
          }, 
          {
          name: '日常用品类',
          type: 'bar',
          barWidth: 10,
          stack: '总量',
          itemStyle: {
          normal: {
          label: {
          show: false,
          position: 'insideRight'
          },
          color: "#c65885"
          }
          },
          data: []
          },
          {
          name: '保健品类',
          type: 'bar',
          barWidth: 10,
          stack: '总量',
          itemStyle: {
          normal: {
          label: {
          show: false,
          position: 'insideRight'
          },
          color: "#A1EAFB"
          }
          },
          data: []
          }
          ]
        });
        //添加至简报
        var allKindsExportIf = document.getElementById('allKindsExport')
        allKindsExportIf.onclick = function(){
          var imgURL = _this.three.getDataURL()
          console.log(imgURL)
          localStorage.setItem("allKindsExport",imgURL)
          localStorage.setItem("allKindsExportName","趋势分析-六类商品变化趋势报表")
          alert("已经添加至简报，后续操作请至简报管理页面编辑")
        }



        this.$http.get('http://127.0.0.1:8000/api/show_orderdata').then((response) => {
            var res = JSON.parse(response.bodyText)
            if (res.error_num == 0) {
              for(var i = 0; i < 29; i++){
                this.date[i]=res['list'][21+i].fields["date"];
                this.orderNumber[i]=res['list'][21+i].fields["product_count"];
                this.orderPrice[i]=res['list'][21+i].fields["allprice"];
              }
            } else {
              this.$message.error('显示订单失败')
              console.log(res['msg'])
            }
          _this.one.setOption({
          xAxis: {
            data: this.date,
          },
          series: [{
            // 根据名字对应到相应的系列
            name: '订单数量',
            data: this.orderNumber,
          }]
          })
          _this.two.setOption({
          xAxis: {
            data: this.date,
          },
          series: [{
            // 根据名字对应到相应的系列
            name: '订单数量',
            data: this.orderPrice,
          }]
          })
        })
        this.$http.get('http://127.0.0.1:8000/api/show_typedata').then((response) => {
            var res = JSON.parse(response.bodyText)
            if (res.error_num == 0) {
              for(var i = 0; i < 29; i++){
                this.naifen[i]=res['list'][21+i].fields["naifen_count"];
                this.muying[i]=res['list'][21+i].fields["muying_count"];
                this.hufu[i]=res['list'][21+i].fields["hufu_count"];
                this.shipin[i]=res['list'][21+i].fields["shipin_count"];
                this.richang[i]=res['list'][21+i].fields["richang_count"];
                this.baojian[i]=res['list'][21+i].fields["baojian_count"];
              }
            } else {
              this.$message.error('显示订单失败')
              console.log(res['msg'])
            }
          _this.three.setOption({
          xAxis: {
            data: this.date
          },
          series: [
            {
            // 根据名字对应到相应的系列
            name: '奶粉类',
            data: this.naifen
            },
            {
            // 根据名字对应到相应的系列
            name: '母婴用品类',
            data: this.muying
            },
            {
            // 根据名字对应到相应的系列
            name: '护肤品类',
            data: this.hufu
            },
            {
            // 根据名字对应到相应的系列
            name: '食品类',
            data: this.shipin
            },
            {
            // 根据名字对应到相应的系列
            name: '日常用品类',
            data: this.richang
            },
            {
            // 根据名字对应到相应的系列
            name: '保健品类',
            data: this.baojian
            }
          ]
          })
        })
          window.onresize = function(){
          one.resize();
          two.resize();
          three.resize();
          }   
    },
    export2ExcelOne() {
　　require.ensure([], () => {
　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
　　　　const tHeader = ['日期', '订单数量','商品数量','订单总价格'];
　　　　const filterVal = ['date', 'order_count', 'product_count', 'allprice_count'];
        this.$http.get('http://127.0.0.1:8000/api/show_orderdata')
        .then((response) => {
            var res = JSON.parse(response.bodyText)
            var list=[];
            for(var i=0;i<30;i++){
             list[i]= res['list'][20+i].fields;   
            }  
            const data = this.formatJson(filterVal, list);
　　　　     export_json_to_excel(tHeader, data, '总订单数据统计');
           })
           })
},
    export2ExcelTwo() {
　　require.ensure([], () => {
　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
　　　　const tHeader = ['日期', '奶粉类','母婴类','护肤类','食品类','日常用品类','保健类类'];
　　　　const filterVal = ['date', 'naifen_count', 'muying_count', 'hufu_count', 
                          'shipin_count', 'richang_count', 'baojian_count'];
        this.$http.get('http://127.0.0.1:8000/api/show_typedata')
        .then((response) => {
            var res = JSON.parse(response.bodyText)
            var list=[];
            for(var i=0;i<30;i++){
             list[i]= res['list'][20+i].fields;   
            }
            console.log(list)  
            const data = this.formatJson(filterVal, list);
　　　　     export_json_to_excel(tHeader, data, '各类别数据统计');
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