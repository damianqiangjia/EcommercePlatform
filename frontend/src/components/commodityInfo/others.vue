<template>
  <el-row class="warp">

    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>商品信息</el-breadcrumb-item>
        <el-breadcrumb-item>母婴用品</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" v-if = "!showAttributes">
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
      <el-table :data="data" border style="width: 100%" ref="singleTable"
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
                <el-col :span="6"><div><dd title="time">保质期:&nbsp;&nbsp;{{value.time}}</dd></div></el-col>            
                <el-col :span="6"><div><dd title="type">型号:&nbsp;&nbsp;{{value.type}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="area">产地:&nbsp;&nbsp;{{value.area}}</dd></div></el-col>
                <el-col :span="6"><div><dd title="price">参考价格:&nbsp;&nbsp;{{value.price}}</dd></div></el-col>
              </dl>
            </el-row>
           </div>
         </div>
      </el-card>
    </el-col>
    
  </el-row>
</template>

<script>
import axios from 'axios'

  export default {
    mounted(){
        this.getData();
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
            getData(){
                console.log("===getData====")
                axios.get('/getothers', {page:self.cur_page}).then((res) => { 
                  console.log(res) 
                  let res1 = res.data.others 
                  this.tableData = res1.list
                })
            },
            handleRowClick(val){
              console.log(val.productID)
              this.showAttributes = true
              axios.get('/getothersAttributes').then((res) => { 
                console.log(res) 
                let res1 = res.data.othersA
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
            }
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
      height: 230px;
    }
</style>
