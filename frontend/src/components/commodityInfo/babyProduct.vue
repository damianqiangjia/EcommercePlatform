<template>
  <el-row class="warp">

    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>商品信息</el-breadcrumb-item>
        <el-breadcrumb-item>母婴用品</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form >
            <el-form-item>
              <el-select v-model="select_cate" placeholder="选择品牌" class="handle-select">
                <el-option key="1" label="Hipp/喜宝" value="Hipp/喜宝"></el-option>
                <el-option key="2" label="Penaten/贝娜婷" value="Penaten/贝娜婷"></el-option>
                <el-option key="3" label="Sebamed/施巴" value="Sebamed/施巴"></el-option>
                <el-option key="4" label="Weleda/维蕾德" value="Weleda/维蕾德"></el-option>
                <el-option key="5" label="babylove" value="babylove"></el-option>
                <el-option key="6" label="Babixn" value="Babix"></el-option>
                <el-option key="7" label="S-quitofree" value="S-quitofree"></el-option>
                <el-option key="8" label="Sanosan/哈罗闪" value="Sanosan/哈罗闪"></el-option>
                <el-option key="9" label="babydream" value="babydream"></el-option>
              </el-select>
              <el-input v-model="select_word" placeholder="输入关键词" class="handle-input">
              </el-input>
              <el-button type="primary" @click="search">查询</el-button>
              <el-button type="primary" class="handle-del" @click="delAll">批量删除</el-button>
            </el-form-item>
            
          </el-form>
        </el-col>

      <!--列表-->
      <el-table :data="data" border style="width: 100%" ref="multipleTable" 
      @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="productID" label="商品ID" width="120" sortable></el-table-column>
        <el-table-column prop="productname" label="商品名称" width="230" >
        </el-table-column>
        <el-table-column prop="brand" label="品牌" width="120">
        </el-table-column>
        <el-table-column prop="addr" label="产地" width="120">
        </el-table-column>
        <el-table-column prop="business" label="电商" width="150">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="100">
        </el-table-column>
        <el-table-column prop="trade" label="销量" width="100" sortable>
        </el-table-column>
        <el-table-column prop="comment" label="评论数" width="100" sortable>
        </el-table-column>
        <el-table-column label="属性" width="150">
          <template scope="scope">
            <!-- <el-button size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            <el-button size="small" @click="handleAttributes()">查看属性</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-col class="pagination">
        <el-pagination
            @current-change ="handleCurrentChange"
            layout="prev, pager, next"
              :total="1000">
            </el-pagination>
      </el-col>

    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'

  export default {
    // created(){
    //   this.getData();
    // },
    mounted(){
        this.getData();
    },
    data() {
      return {
        url: './static/babyProduct.json',
        tableData: [],
        cur_page: 1,
        multipleSelection: [],
        select_cate: '',
        select_word: '',
        is_search: false
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
                    // return d;
                })
            }
      },
    methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                console.log("===getData====")
                axios.get('/getBabyProduct', {page:self.cur_page}).then((res) => { 
                  console.log(res) 
                  let res1 = res.data.json 
                  console.log("babyProduct")
                  this.tableData = res1.list
                })
                //  axios.get('http://localhost:8080/static/babyProduct.json', {page:self.cur_page}).then((res) => { 
                //   console.log("babyProduct")
                //   this.tableData = res.data.list
                // })
            },
            search(){
                this.is_search = true;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleAttributes() {
                window.location.href = "../../src/components/attributes/babyProductAttributes.vue"
            },
            // handleEdit(index, row) {
            //     this.$message('编辑第'+(index+1)+'行');
            // },
            // handleDelete(index, row) {
            //     this.$message.error('删除第'+(index+1)+'行');
            // },
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
</style>
