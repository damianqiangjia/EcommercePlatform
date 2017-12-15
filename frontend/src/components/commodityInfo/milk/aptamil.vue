<template>
<div>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>商品信息</el-breadcrumb-item>
        <el-breadcrumb-item>奶粉</el-breadcrumb-item>
        <el-breadcrumb-item>爱他美</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>

  <el-row  class="warp">
    <el-col :span="24" class="warp-main" v-if = "!showAttributes" >
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form >
            <el-form-item>
              <el-input v-model="select_word" placeholder="输入关键词" class="handle-input">
              </el-input>
              <el-button type="primary" @click="search">查询</el-button>
              <!-- <el-button type="primary" class="handle-del" @click="delAll">批量删除</el-button> -->
            </el-form-item>
            
          </el-form>
        </el-col>

      <!--列表-->
      <el-table :data="data" height="350" border style="width: 100%" ref="singleTable"
      @row-click="handleRowClick">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="productID" label="商品ID" width="90"></el-table-column>
        <el-table-column prop="productname" label="商品名称" width="280" >
        </el-table-column>
        <el-table-column prop="brand" label="品牌" width="120">
        </el-table-column>
        <el-table-column prop="class" label="类别" width="120">
        </el-table-column>
        <el-table-column prop="addr" label="销售地" width="100">
        </el-table-column>
        <el-table-column prop="addrID" label="销售地ID" width="100">
        </el-table-column>
        <el-table-column prop="business" label="电商" width="200">
        </el-table-column>
        <el-table-column prop="businessID" label="电商ID" width="90">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="90" sortable>
        </el-table-column>
      </el-table>
    </el-col>

    <el-col :span="24" class="warp-boxcard" v-if="showAttributes">
      <el-card class="boxcard">
        <div slot="header" class="title" v-for="value in attributes" >
          <span> 商品名称: {{value.productname}} </span>
          <el-button style="float: right; padding: 12px 0" type="text" @click="handleReturn()">返回</el-button>
        </div>
        <div id="attributes">
          <div v-for="value in attributes" class="text item">
            <el-row>
              <dl class="attribute-list">
                <el-col :span="6"><div><dd title="productID">商品ID:&nbsp;&nbsp;{{value.productID}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="class">类别:&nbsp;&nbsp;{{value.class}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="brand">品牌:&nbsp;&nbsp;{{value.brand}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="business">厂商:&nbsp;&nbsp;{{value.business}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="businessArea">厂商地址:&nbsp;&nbsp;{{value.businessArea}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="businessTel">厂商电话:&nbsp;&nbsp;{{value.businessTel}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="ingredients">配料表:&nbsp;&nbsp;{{value.ingredients}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="storage">储藏方式:&nbsp;&nbsp;{{value.storage}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="time">保质期:&nbsp;&nbsp;{{value.time}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="additives">食品添加剂:&nbsp;&nbsp;{{value.additives}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="package">包装:&nbsp;&nbsp;{{value.package}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="material">系列:&nbsp;&nbsp;{{value.material}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="standard">规格:&nbsp;&nbsp;{{value.standard}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="saleArea">规格:&nbsp;&nbsp;{{value.saleArea}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="ages">适用年龄:&nbsp;&nbsp;{{value.ages}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="packageType">包装类型:&nbsp;&nbsp;{{value.package}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="area">产地:&nbsp;&nbsp;{{value.area}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="price">参考价格:&nbsp;&nbsp;{{value.price}}</dd></div></el-col>
              </dl>
            </el-row>
           </div>
         </div>
      </el-card>
    </el-col>
  </el-row>
<el-row class="warp">
        <el-col>
          <div class="chart-container">
          <div id = "one" style="width: 100%; height: 500px;"> </div>
          </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'

  export default {

    mounted(){
        this.getData();
        this.draw();
    },
    e1:"attributes",
    data() {
      return {
        tableData: [],
        select_cate: '',
        select_word: '',
        del_list: [],
        is_search: false,
        showAttributes: false,
        attributes: []
      }
    },
    
     computed: {
       data(){
                const self = this;
                return self.tableData.filter(function(d){
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if(d.productname === self.del_list[i].productname){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){
                        if(d.brand.indexOf(self.select_cate) > -1 && 
                            (d.productname.indexOf(self.select_word) > -1 ||
                            d.addr.indexOf(self.select_word) > -1 ||
                            d.brand.indexOf(self.select_word) )
                        ){
                            return d;
                        }
                    }
                })
            }
      },
    methods: {
      draw(){
            var one = echarts.init(document.getElementById('one'));
              // 绘制图表
              one.setOption
              ({
                 title : {
        text: '爱他美 在淘宝平台销量变化及预测',
        left:'center'
    },
    grid:{
                    x:50,
                    y:50,
                    x2:30,
                    y2:30,
                    borderWidth:1
                },
    tooltip : {
        trigger: 'axis'
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['20170511','20170512','20170513','20170514','20170515','20170516','20170517','20170518',
               '20170519','20170520','20170521','20170522','20170523','20170524','20170525','20170526',
               '20170527','20170528','20170529','20170530','20170531','20170601','20170602','20170603',
               '20170604','20170605','20170606','20170607','20170608','20170609','20170610','20170611',
               '20170612','20170613','20170614','20170615','20170616','20170617','20170618','20170619',
               '20170620','20170621','20170622', '20170623', '20170624']
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
            lte: 42,
            color: 'green'
        }, {
            gt: 42,
            lte: 46,
            color: 'red'
        }]
    },
    series : [
        {
            name:'销量变化',
            type:'line',
            data:[1249,1210,1216,1216,1213,1221,2058,411,392,1138,1718,1718,1890,1890,1630,
            964,1571,1558,1580,1603,1609,1509,1490,1743,1189,1785,434,434,1488,349,312,780,
            1570,1329,1649,284,533,1705,1522,1508,1724,1759,1923,2076,2239],
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
        }
    ]
  })
            },
            getData(){
                console.log("===getData====")
                axios.get('/getmilkInfo', {page:self.cur_page}).then((res) => { 
                  console.log(res) 
                  let res1 = res.data.milkInfo
                  var arr=res1.list.filter(function(ele){
                    return ele.brand.includes("aptamil/爱他美")
                  })
                  console.log(arr)
                this.tableData = arr
                  
                })
            },
            handleRowClick(val){
              console.log(val.productID)
              this.showAttributes = true
              axios.get('/getmilkAttributes').then((res) => { 
                console.log(res) 
                let res1 = res.data.milkA
                var arr=res1.list.filter(function(ele){
                return ele.productID.includes(val.productID)
              })
              console.log(arr)
              this.attributes = arr
              })
            },
            handleReturn(){
              this.showAttributes = false
            },
            search(){
                this.is_search = true;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
        }
  }
</script>

<style scoped>
    .handle-select{
        width: 120px;
    }
    .handle-input{
        width: 300px;
        display: inline-block;
    }
    /*标题字体大小*/
    .title {
      font-family: 'Helvetica Neue';
      font-size: 26px;
      font-weight:bold;
    }
    /*属性面板字体大小*/
    .text {
      font-family: 'Helvetica Neue';
      font-size: 16px;
      line-height: 40px;
    }
    /*属性面板的下外边距*/
    .item {
      margin-bottom: 10px;
    }
    /*属性面板的宽*/
    .boxcard {
      width: 1235px;
      height: 330px;
    }
</style>
