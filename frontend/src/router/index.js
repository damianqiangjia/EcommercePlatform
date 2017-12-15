import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import CommodityInfo from '@/components/commodityInfo'

import UserChangePwd from '@/components/user/changepwd'
import UserProfile from '@/components/user/profile'

import SalesTrend from '@/components/sales/salesTrend'
import Forecast from '@/components/sales/forecast'

import Pay from '@/components/pay/pay'

import Penaten from '@/components/commodityInfo/babyProduct/penaten'
import Squitofree from '@/components/commodityInfo/babyProduct/squitofree'
import Braun from '@/components/commodityInfo/babyProduct/braun'

import Aptamil from '@/components/commodityInfo/milk/Aptamil'

import BabybioFood from '@/components/commodityInfo/food/babybioFood'

import Facelle from '@/components/commodityInfo/dailySupplies/facelle'

import Herbacin from '@/components/commodityInfo/skincare/herbacin'

import Salus from '@/components/commodityInfo/healthcare/salus'

import Area from '@/components/area/area'

import Price from '@/components/association/price'
import Trade from '@/components/association/trade'
import Business from '@/components/association/business'

import Others from '@/components/commodityInfo/others'

import Export from '@/components/export/export'
import subView from '@/components/subView'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
    // mode: 'history',
    routes: [{
            routerID: '0',
            path: '/login',
            name: '登录',
            component: Login
        },
        {
            routerID: '1',
            path: '/',
            name: 'home',
            component: Home,
            redirect: '/dashboard',
            leaf: true, // 只有一个节点
            menuShow: true,
            iconCls: 'iconfont icon-home', // 图标样式class
            children: [{
                routerID: '1-1',
                path: '/dashboard',
                component: Dashboard,
                name: '主页',
                menuShow: true,
                leaf: true, // 只有一个节点
                children: [{
                    routerID: '1-1-1',
                    path: '/dashboard',
                    component: Dashboard,
                    name: '首页',
                    menuShow: true,
                }]
            }]
        },
        {
            routerID: '2',
            path: '/',
            component: Home,
            name: '销量分析',
            menuShow: true,
            iconCls: 'iconfont icon-trend', // 图标样式class
            children: [{
                    routerID: '2-1',
                    path: '/sales',
                    component: subView,
                    name: '趋势',
                    menuShow: true,
                    iconCls: 'iconfont icon-tree', // 图标样式class
                    leaf: true, // 只有一个节点
                    children: [{
                        routerID: '2-1-1',
                        path: '/sales/salesTrend',
                        component: SalesTrend,
                        name: '趋势分析',
                        menuShow: true,
                    }, ]
                },
                {
                    routerID: '2-2',
                    path: '/sales',
                    component: subView,
                    name: '预测',
                    menuShow: true,
                    iconCls: 'iconfont icon-tree', // 图标样式class
                    leaf: true, // 只有一个节点
                    children: [{
                        routerID: '2-2-1',
                        path: '/sales/forecast',
                        component: Forecast,
                        name: '短期预测',
                        menuShow: true,
                    }, ]
                },
            ]
        },
        {
            routerID: '3',
            path: '/',
            component: Home,
            name: '消费',
            menuShow: true,
            leaf: true, // 只有一个节点
            iconCls: 'iconfont icon-pay', // 图标样式class
            children: [{
                routerID: '3-1',
                path: '/pay',
                component: Pay,
                name: '消费分析',
                menuShow: true,
                leaf: true,
                children: [{
                    routerID: '3-1-1',
                    path: '/pay/pay',
                    component: Pay,
                    name: '消费分析1',
                    menuShow: true,
                }]
            }, ]
        },
        {
            routerID: '4',
            path: '/',
            component: Home,
            name: '商品信息',
            menuShow: true,
            iconCls: 'iconfont icon-info', // 图标样式class
            children: [{
                    routerID: '4-1',
                    path: '/CommodityInfo',
                    component: subView,
                    name: '母婴用品',
                    menuShow: true,
                    iconCls: 'iconfont icon-tree', // 图标样式class
                    children: [{
                            routerID: '4-1-1',
                            path: '/commodityInfo/babyProduct/penaten',
                            component: Penaten,
                            name: '贝娜婷',
                            menuShow: true,
                        },
                        {
                            routerID: '4-1-2',
                            path: '/commodityInfo/babyProduct/squitofree',
                            component: Squitofree,
                            name: 'S-quitofree',
                            menuShow: true,
                        },
                        {
                            routerID: '4-1-3',
                            path: '/commodityInfo/babyProduct/braun',
                            component: Braun,
                            name: '博朗',
                            menuShow: true,
                        },
                    ]
                },
                {
                    routerID: '4-2',
                    path: '/CommodityInfo',
                    component: subView,
                    name: '奶粉',
                    menuShow: true,
                    iconCls: 'iconfont icon-tree', // 图标样式class
                    children: [{
                        routerID: '4-2-1',
                        path: '/CommodityInfo/milk/aptamil',
                        component: Aptamil,
                        name: '爱他美',
                        menuShow: true,
                    }, ]
                },
                {
                    routerID: '4-3',
                    path: '/commodityInfo',
                    component: subView,
                    name: '日常用品',
                    menuShow: true,
                    iconCls: 'iconfont icon-tree', // 图标样式class
                    children: [{
                        routerID: '4-3-1',
                        path: '/CommodityInfo/dailySupplies/facelle',
                        component: Facelle,
                        name: 'Facelle',
                        menuShow: true,
                    }, ]
                },
                {
                    routerID: '4-4',
                    path: '/commodityInfo',
                    component: subView,
                    name: '护肤品',
                    menuShow: true,
                    iconCls: 'iconfont icon-tree', // 图标样式class
                    children: [{
                        routerID: '4-4-1',
                        path: '/CommodityInfo/skincare/herbacin',
                        component: Herbacin,
                        name: '贺本清',
                        menuShow: true,
                    }, ]
                },
                {
                    routerID: '4-5',
                    path: '/commodityInfo',
                    component: subView,
                    name: '食品',
                    menuShow: true,
                    iconCls: 'iconfont icon-tree', // 图标样式class
                    children: [{
                        routerID: '4-5-1',
                        path: '/commodityInfo/food/babybioFood',
                        component: BabybioFood,
                        name: '伴宝乐',
                        menuShow: true,
                    }, ]
                },
                {
                    routerID: '4-6',
                    path: '/commodityInfo',
                    component: subView,
                    name: '保健品',
                    menuShow: true,
                    iconCls: 'iconfont icon-tree', // 图标样式class
                    children: [{
                        routerID: '4-6-1',
                        path: '/CommodityInfo/healthcare/salus',
                        component: Salus,
                        name: '莎露斯',
                        menuShow: true,
                    }, ]
                },
                {
                    routerID: '4-7',
                    path: '/commodityInfo',
                    component: subView,
                    name: '其他商品',
                    menuShow: true,
                    iconCls: 'iconfont icon-tree', // 图标样式class
                    leaf: true, // 只有一个节点
                    children: [{
                        routerID: '4-7-1',
                        path: '/commodityInfo/others',
                        component: Others,
                        name: '其他',
                        menuShow: true
                    }, ]
                },
            ]
        },
        {
            routerID: '5',
            path: '/',
            component: Home,
            name: '区域',
            menuShow: true,
            leaf: true, // 只有一个节点
            iconCls: 'iconfont icon-area', // 图标样式class
            children: [{
                routerID: '5-1',
                path: '/area',
                component: Area,
                name: '区域分析',
                menuShow: true,
                leaf: true,
                children: [{
                    routerID: '5-1-1',
                    path: '/area/area',
                    component: Area,
                    name: '分析',
                    menuShow: true,
                }, ]
            }, ]
        },
        {
            routerID: '6',
            path: '/',
            component: Home,
            name: '关联分析',
            menuShow: true,
            iconCls: 'iconfont icon-ass', // 图标样式class
            children: [{
                    routerID: '6-1',
                    path: '/association',
                    component: subView,
                    name: '价格',
                    menuShow: true,
                    iconCls: 'iconfont icon-tree', // 图标样式class
                    leaf: true, // 只有一个节点
                    children: [{
                        routerID: '6-1-1',
                        path: '/association/price',
                        component: Price,
                        name: '价格关联分析',
                        menuShow: true
                    }, ]
                },
                {
                    routerID: '6-2',
                    path: '/association',
                    component: subView,
                    name: '销量',
                    menuShow: true,
                    iconCls: 'iconfont icon-tree', // 图标样式class
                    leaf: true, // 只有一个节点
                    children: [{
                        routerID: '6-2-1',
                        path: '/association/trade',
                        component: Trade,
                        name: '销量关联分析',
                        menuShow: true
                    }, ]
                },
                {
                    routerID: '6-3',
                    path: '/association',
                    component: subView,
                    name: '电商',
                    menuShow: true,
                    leaf: true, // 只有一个节点
                    iconCls: 'iconfont icon-tree', // 图标样式class
                    children: [{
                        routerID: '6-3-1',
                        path: '/association/business',
                        component: Business,
                        name: '电商关联分析',
                        menuShow: true
                    }, ]
                },
            ]
        },
        {
            routerID: '7',
            path: '/',
            component: Home,
            name: '简报',
            menuShow: true,
            leaf: true, //只有一个节点
            iconCls: 'iconfont icon-export', // 图标样式class
            children: [{
                routerID: '7-1',
                path: '/export/export',
                component: Export,
                name: '简报管理',
                menuShow: true
            }, ]
        },
        {
            routerID: '8',
            path: '/',
            component: Home,
            name: '设置',
            menuShow: true,
            iconCls: 'iconfont icon-setting',
            children: [{
                    routerID: '8-1',
                    path: '/user',
                    component: subView,
                    name: '信息',
                    menuShow: true,
                    iconCls: 'iconfont icon-tree', // 图标样式class
                    leaf: true, // 只有一个节点
                    children: [{
                        routerID: '8-1-1',
                        path: '/user/profile',
                        component: UserProfile,
                        name: '个人信息',
                        menuShow: true
                    }, ]
                },
                {
                    routerID: '8-2',
                    path: '/user',
                    component: Home,
                    name: '密码',
                    menuShow: true,
                    iconCls: 'iconfont icon-tree', // 图标样式class
                    leaf: true, // 只有一个节点
                    children: [{
                        routerID: '8-2-1',
                        path: '/user/changepwd',
                        component: UserChangePwd,
                        name: '修改密码',
                        menuShow: true
                    }, ]
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    // console.log('to:' + to.path)
    if (to.path.startsWith('/login')) {
        window.sessionStorage.removeItem('access-user')
        next()
    } else {
        let user = JSON.parse(window.sessionStorage.getItem('access-user'))
        if (!user) {
            next({ path: '/login' })
        } else {
            next()
        }
    }
})

export default router