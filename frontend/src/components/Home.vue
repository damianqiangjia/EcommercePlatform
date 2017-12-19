<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/"><img src="../assets/images/logo.png" style="padding-left:8px;"></a>
      </div>
      <div class="topbar-logos" v-show="!collapsed">
        <a href="/"><img src="../assets/images/logotxt.png"></a>
      </div>
      <div class="topbar-title">
        <span style="font-size: 16px;color: #fff;">跨境电商平台决策辅助分析系统</span>
      </div>

      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont icon-user"></i>
            {{sysUserName}}  
            <i class="iconfont icon-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/user/profile">
                <span style="color: #555;font-size: 14px;">个人信息</span>
              </router-link>
            </el-dropdown-item>

            <el-dropdown-item>
              <router-link :to="'/user/changepwd'">
                <span style="color: #555;font-size: 14px;">修改密码</span>
              </router-link>
            </el-dropdown-item>

            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>

    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="{showSidebar:!collapsed}">
        <!--展开折叠开关-->
        <div class="menu-toggle" @click.prevent="collapse">
          <i class="iconfont icon-menufold" v-show="!collapsed"></i>
          <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
        </div>
        <!--导航菜单-->
        <el-menu default-active="0" router :collapse="collapsed">

          <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
            <!--多级目录-->
            <el-submenu v-if="!item.leaf" :index="item.routerID">
              <!--父目录--> 
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <!-- 子目录-->
              <el-menu-item-group v-for="(term,index) in item.children" v-if="term.menuShow" :key="term.routerID">
                <el-submenu  v-if="!term.leaf" :index="term.routerID">
                  <template slot="title">
                    <i :class="item.iconCls"></i>
                    <span slot="title">{{term.name}}</span>
                  </template>
                  <el-menu-item v-for="terms in term.children" :key="terms.path" :index="terms.path" 
                  v-if="terms.menuShow" :class="$route.path==terms.path?'is-active':''">
                    <i :class="terms.iconCls"></i>
                    <span slot="title">{{terms.name}}</span>
                  </el-menu-item>
                </el-submenu>

                <!--单级目录-->
                <el-menu-item v-else-if="term.leaf&&term.children&&term.children.length" 
                :index="term.children[0].path" :class="$route.path==term.children[0].path?'is-active':''">
                  <i :class="term.iconCls"></i>
                  <span slot="title">{{term.children[0].name}}</span>
                </el-menu-item>

              </el-menu-item-group>
              
            </el-submenu>
            <!--单级目录-->
            <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" 
            :index="item.children[0].path" :class="$route.path==item.children[0].path?'is-active':''">
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>

          </template>
        </el-menu>
      </aside>

      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>

  </el-row>
</template>

<script>
  import {bus} from '../bus.js'
  export default {
    name: 'home',
    created(){
      bus.$on('setUserName', (text) => {
        this.sysUserName = text;
      })
    },
    data () {
      return {
        sysUserName: '',
        sysUserAvatar: '',
        collapsed: false,
      }
    },
    methods: {
      handleOpen() {
        //console.log('handleopen');
      },
      handleClose() {
        //console.log('handleclose');
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      showMenu(i, status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      },
      logout(){
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('access-user');
          _this.$router.push('/login');
        }).catch(() => {

        });
      },
    },
    mounted() {
      var user = sessionStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
  .container {
    position: absolute;  //绝对定位
    top: 0px;
    bottom: 0px;
    width: 100%;

    // 顶部状态栏
    .topbar-wrap {
      height: 50px;
      line-height: 50px;
      background: #373d41;
      padding: 0px;

      // 顶部“个人信息”的button
      .topbar-btn {
        color: #fff;
      }
      
      // 顶部状态栏logo
      .topbar-logo {
        float: left;
        width: 59px;
        line-height: 26px;
      }
      .topbar-logos {
        float: left;
        width: 120px;
        line-height: 26px;
      }
      .topbar-logo img, .topbar-logos img {
        height: 40px;
        margin-top: 5px;
        margin-left: 2px;
      }

      //状态栏的标题
      .topbar-title {
        float: left;
        text-align: left;
        width: 250px;
        padding-left: 10px;
        border-left: 1px solid #000;
      }
      //状态栏的button的内容
      .topbar-account {
        float: right;
        padding-right: 12px;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        padding-left: 10px;
      }
     }
    .main {
      display: -webkit-box; //弹性布局
      display: -webkit-flex;  //弹性布局
      display: -ms-flexbox;  //弹性布局
      display: flex;  //弹性布局
      position: absolute;
      top: 50px;
      bottom: 0px; //规定元素的底部边缘,如果 "position" 属性的值为 "static"，那么设置 "bottom" 属性不会产生任何效果
      // 如果元素中的内容超出了给定的宽度和高度属性，overflow 属性可以确定是否显示滚动条等行为。hidden	内容会被修剪，并且其余内容是不可见的。
      overflow: hidden; 
    }
    //左侧菜单栏
    aside {
      min-width: 50px;
      background: #333744; // main.scss 与折叠区域的背景颜色一样
      &::-webkit-scrollbar {  //自定义滚动条
        display: none;
      }

      &.showSidebar {
        overflow-x: hidden;
        overflow-y: auto;
      }

      .el-menu {
        height: 100%; /*写给不支持calc()的浏览器*/
        height: -moz-calc(100% - 80px);
        height: -webkit-calc(100% - 80px);
        height: calc(100% - 80px);
        border-radius: 0px;
        background-color: #333744;
      }

      .el-submenu   .el-menu-item  {
        min-width: 60px;
      }
      .el-menu {
        width: 180px;
      }
      .el-menu--collapse {
        width: 60px;
      }

      .el-menu .el-menu-item, .el-submenu .el-submenu__title .el-submenu-item .el-submenu-item__title {
        height: 46px;
        line-height: 46px;
      }

    }
    // 菜单折叠栏
    .menu-toggle {
      background: #4A5064;
      text-align: center;
      color: white;
      height: 26px;
      line-height: 30px;
    }
    // 右侧内容区
    .content-container {
      background: #fff;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      padding-bottom: 1px;

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
     }
   }
 </style>
