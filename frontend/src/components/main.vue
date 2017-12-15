<template>
  <el-row class="container">
  <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/"><img src="../assets/logo.png" style="padding-left:8px;"></a>
      </div>
      <div class="topbar-logos" v-show="!collapsed">
        <a href="/"><img src="../assets/logotxt.png"></a>
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

    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router :collapse="collapsed">

      <el-menu-item index="0">
        <i class="iconfont icon-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont icon-trend"></i>
          <span>销量分析</span>
        </template>

        <el-menu-item-group>
          <template slot="title"><i class="iconfont icon-trend"></i><span>销量分析</span></template>
          <el-menu-item index="1-1"><i class="iconfont icon-trend"></i><span>趋势分析</span></el-menu-item>
          <el-menu-item index="1-2"><i class="iconfont icon-trend"></i><span>短期预测</span></el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="2">
        <i class="iconfont icon-pay"></i>
        <span slot="title">消费分析</span>
      </el-menu-item>

      <el-submenu index="3">
        <template slot="title">
          <i class="iconfont icon-info"></i>
          <span>商品信息</span>
        </template>

        <el-submenu index="3-1">
          <template slot="title"><i class="iconfont icon-tree"></i><span>母婴用品</span></template>
          <el-menu-item index="3-1-1">母婴用品1</el-menu-item>
          <el-menu-item index="3-1-2">母婴用品2</el-menu-item>
        </el-submenu>

        <el-submenu index="3-2">
          <template slot="title"><i class="iconfont icon-tree"></i><span>奶粉</span></template>
          <el-menu-item index="3-2-1">奶粉1</el-menu-item>
          <el-menu-item index="3-2-2">奶粉2</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-col>
</el-row>
<template>

<script>
  export default {
    name: 'main',
    data () {
      return {
        sysUserName: '无尾熊',
        // sysUserAvatar: '',
        collapsed: false,
      }
    },
    mounted() {
      var user = sessionStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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
      }
    }
  }
</script>

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

      .el-submenu   .el-menu-item   .el-submenu-item {
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

      .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu-item .el-submenu-item:hover, .el-submenu__title:hover, el-submenu-item__title:hover {
        background-color: #7ed2df;
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