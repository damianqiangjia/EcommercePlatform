<template>
<div>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b><font size="6">首页</font></b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  <el-row type="flex" class="row-bg" justify="space-around">
    <el-col :span="6">
      <!-- <div class="grid-content-one bg-purple"> -->
        <el-card :body-style="{ padding: '0px' }">
            <div style="float:left;height:100%;width:40%;">
            <img src="../assets/images/order.png" style="width: 130px;padding: 20px;">
            </div>
            <div style="float: right;padding-top:40px;height:100%;width:60%;color:#238ece;font-size:35px;">
              <div><span style = "">订单数</span></div>
              <div><span style = "padding:20px;">{{ lastdaydata.order_count }}</span><span>/ 件</span></div>
            </div>
        </el-card>
      <!-- </div> -->
    </el-col>
    <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }">
            <div style="float:left;height:100%;width:40%;">
            <img src="../assets/images/sales.png" style="width: 130px;padding: 20px;">
            </div>
            <div style="float: right;padding-top:40px;height:100%;width:60%;color:#ff5263;font-size:35px;">
              <div><span style = "">销量</span></div>
              <div><span style = "padding:20px;">{{ lastdaydata.product_count }}</span><span>/ 件</span></div>
            </div>
        </el-card>
    </el-col>
    <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }">
            <div style="float:left;height:100%;width:40%;">
            <img src="../assets/images/price.png" style="width: 130px;padding: 20px;">
            </div>
            <div style="float: right;padding-top:40px;height:100%;width:60%;color:#f5ec3c;font-size:35px;">
              <div><span style = "">总金额</span></div>
              <div><span style = "padding:20px;">{{ lastdaydata.allprice }}</span><span>/ 元</span></div>
            </div>
        </el-card>
    </el-col>
  </el-row>

  </el-row>
  <el-row type="flex" class="row-bg" justify="space-around">
    <el-col :span="7">
      <el-container>
        <el-header>
          <h1 align="center" style="font-size:200%">实时订单</h1>
        </el-header>
        <el-main>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="time"
              label="时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="order_number"
              label="订单号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="order_name"
              label="订单名称">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-col>
    <el-col :span="15">
      <el-carousel :interval="5000" height = "700px">
        <el-carousel-item v-for="item in dataimg" :key="item">
          <router-link :to="item.lianjie">
            <img :src="item.url"  style="width: 100%;min-height: 700px;"> 
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    data() {
      return {
        input: '',
        dataimg:[{url:require('../assets/images/1.png'),lianjie:"/sales/salesTrend"},
                 {url:require('../assets/images/2.png'),lianjie:"/sales/forecast"},
                 {url:require('../assets/images/3.png'),lianjie:"/pay/pay"}],
        filters: {
          name: ''
        },
        loading: false,
        users: [],
        lastdaydata:[],
        tableData: []
      }
    },
    mounted: function() {
      this.showDashboard(),
      this.showLastDayData()
  },
   methods: {
    showDashboard(){
      this.$http.get('http://127.0.0.1:8000/api/show_dashboard')
        .then((response) => {
            var res = JSON.parse(response.bodyText)
            console.log(res)
            if (res.error_num == 0) {
              for(var i=0;i<10;i++){
                this.tableData[i]=res['list'][i].fields;
              }  
            } else {
              this.$message.error('显示订单失败')
              console.log(res['msg'])
            }
        })
    },
    showLastDayData(){
      this.$http.get('http://127.0.0.1:8000/api/show_orderdata')
        .then((response) => {
            var res = JSON.parse(response.bodyText)
            console.log(res)
            if (res.error_num == 0) {
                this.lastdaydata=res['list'][49].fields;
            } else {
              this.$message.error('显示订单失败')
              console.log(res['msg'])
            }
        })
    }
   }
  }
</script>

<style>
  /* .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  } */
    .grid-content-one {
    border-radius: 4px;
    min-height: 200px;
    }
    .grid-content-two {
    border-radius: 4px;
    min-height: 800px;
    }
    .bg-purple {
    background: #d3dce6;
    }
    .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
    }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    position: relative;
    top: 20px;
    left: 10px;
    width: 100px;
    display: block;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
