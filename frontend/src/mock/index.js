import axios from 'axios'
// import router from 'router'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers } from './data/user'

// import {LoginUsers, Users} from './data/user'

// let _Users = Users
var babyProduct = require("../../static/commodityInfo/babyProduct.json")
var milkInfo = require("../../static/commodityInfo/milk.json")
var dailySupplies = require("../../static/commodityInfo/dailySupplies.json")
var food = require("../../static/commodityInfo/food.json")
var skincare = require("../../static/commodityInfo/skincare.json")
var healthcare = require("../../static/commodityInfo/healthcare.json")
var others = require("../../static/commodityInfo/others.json")

var babyPA = require("../../static/attributes/babyProductAttributes.json")
var milkA = require("../../static/attributes/milkAttributes.json")
var dailyA = require("../../static/attributes/dailyAttributes.json")
var foodA = require("../../static/attributes/foodAttributes.json")
var skinA = require("../../static/attributes/skinAttributes.json")
var healthA = require("../../static/attributes/healthAttributes.json")
var othersA = require("../../static/attributes/othersAttributes.json")

var businessID = require("../../static/association/business/businessID.json")

var sales = require("../../static/association/sales/sales.json")
var babyProductSales = require("../../static/association/sales/babyProduct.json")
var milkSales = require("../../static/association/sales/milk.json")
var dailySales = require("../../static/association/sales/daily.json")
var skinSales = require("../../static/association/sales/skin.json")
var foodSales = require("../../static/association/sales/food.json")
var healthSales = require("../../static/association/sales/health.json")

var aptamil = require("../../static/association/price/aptamil.json")
var hipp = require("../../static/association/price/hipp.json")
var braun = require("../../static/association/price/braun.json")
var balea = require("../../static/association/price/balea.json")
var facelle = require("../../static/association/price/facelle.json")
var LaTourangelle = require("../../static/association/price/LaTourangelle.json")


var country = require("../../static/area/country.json")
var brands = require("../../static/area/brands.json")
var product = require("../../static/association/business/product.json")
var business = require("../../static/association/business/business.json")


var orders = require("../../static/orders.json");
var sixtypeproduct = require("../../static/sixTypesProducts.json");
var salesanalysis = require("../../static/saleAnalysis.json");


export default {

    init() {
        let mock = new MockAdapter(axios)

        // mock success request
        mock.onGet('/success').reply(200, {
            msg: 'success'
        })

        // mock error request
        mock.onGet('/error').reply(500, {
            msg: 'failure'
        })

        // 登录
        mock.onPost('/login').reply(arg => {
          let { username, password } = JSON.parse(arg.data)
          return new Promise((resolve, reject) => {
            let user = null
            setTimeout(() => {
              let hasUser = LoginUsers.some(u => {
                if (u.username === username && u.password === password) {
                  user = JSON.parse(JSON.stringify(u))
                  delete user.password
                  return true
                }
              })
              if (hasUser) {
                resolve([200, { code: 200, msg: '请求成功', user }])
              } 
              else {
                resolve([200, { code: 500, msg: '账号或密码错误' }])
              }
            }, 1000)
          })
        })

        //获取电商ID
        mock.onGet('/getBusinessID').reply(arg=>{
          return new Promise((resolve, reject) => {
            setTimeout( ()=>{
              resolve([200, {code:200, msg: '请求成功', businessID}])
            })
          })
        })

        //电商关联分析分析-product
        mock.onGet('/getProduct').reply(arg=>{
          return new Promise((resolve, reject) => {
            setTimeout( ()=>{
              resolve([200, {code:200, msg: '请求成功', product}])
            })
          })
        })

        //电商关联分析分析-business
        mock.onGet('/getBusiness').reply(arg=>{
          return new Promise((resolve, reject) => {
            setTimeout( ()=>{
              resolve([200, {code:200, msg: '请求成功', business}])
            })
          })
        })

        //价格关联分析分析-爱他美
        mock.onGet('/getaptamil').reply(arg=>{
          return new Promise((resolve, reject) => {
            setTimeout( ()=>{
              resolve([200, {code:200, msg: '请求成功', aptamil}])
            })
          })
        })

        //价格关联分析分析-喜宝
        mock.onGet('/gethipp').reply(arg=>{
          return new Promise((resolve, reject) => {
            setTimeout( ()=>{
              resolve([200, {code:200, msg: '请求成功', hipp}])
            })
          })
        })

        //价格关联分析分析-博朗
        mock.onGet('/getbraun').reply(arg=>{
          return new Promise((resolve, reject) => {
            setTimeout( ()=>{
              resolve([200, {code:200, msg: '请求成功', braun }])
            })
          })
        })

        //价格关联分析分析-芭乐雅
        mock.onGet('/getbalea').reply(arg=>{
          return new Promise((resolve, reject) => {
            setTimeout( ()=>{
              resolve([200, {code:200, msg: '请求成功', balea }])
            })
          })
        })

        //价格关联分析分析-facelle
        mock.onGet('/getfacelle').reply(arg=>{
          return new Promise((resolve, reject) => {
            setTimeout( ()=>{
              resolve([200, {code:200, msg: '请求成功', facelle }])
            })
          })
        })

        //价格关联分析分析-拉杜蓝乔
        mock.onGet('/getLaTourangelle').reply(arg=>{
          return new Promise((resolve, reject) => {
            setTimeout( ()=>{
              resolve([200, {code:200, msg: '请求成功', LaTourangelle }])
            })
          })
        })

        //获取用户信息
        mock.onPost('/user/profile').reply(function(arg) {
            let { name, email } = JSON.parse(arg.data)
            return new Promise((resolve, reject) => {
                let user = LoginUsers[0]
                user.name = name
                user.email = email
                resolve([200, { code: 200, msg: '请求成功', user }])
            })
        })

        //获取母婴用品数据
        mock.onGet('/getbabyProduct').reply(arg => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, { code: 200, msg: '请求成功', babyProduct }])
            })
          })
        })

        //获取奶粉数据
        mock.onGet('/getmilkInfo').reply(arg => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, { code: 200, msg: '请求成功', milkInfo }])
            })
          })
        })

        //获取日常用品数据
        mock.onGet('/getdailySupplies').reply(arg => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, { code: 200, msg: '请求成功', dailySupplies }])
            })
          })
        })

        //获取食品数据
        mock.onGet('/getfood').reply(arg => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, { code: 200, msg: '请求成功', food }])
            })
          })
        })

        //获取护肤品数据
        mock.onGet('/getskincare').reply(arg => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, { code: 200, msg: '请求成功', skincare }])
            })
          })
        })

        //获取保健品数据
        mock.onGet('/gethealthcare').reply(arg => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, { code: 200, msg: '请求成功', healthcare }])
            })
          })
        })

        //获取其他数据
        mock.onGet('/getothers').reply(arg => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, { code: 200, msg: '请求成功', others }])
            })
          })
        })
        
        //获取母婴用品属性
        mock.onGet('/getBabyProductAttributes').reply(arg => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, { code: 200, msg: '请求成功', babyPA }])
                })
            })
        })

        //获取奶粉属性
        mock.onGet('/getmilkAttributes').reply(arg => {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, { code: 200, msg: '请求成功', milkA }])
              })
          })
        })

        //获取日常用品属性
        mock.onGet('/getdailyAttributes').reply(arg => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, { code: 200, msg: '请求成功', dailyA }])
            })
          })
        })

        //获取护肤品属性
        mock.onGet('/getskinAttributes').reply(arg => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, { code: 200, msg: '请求成功', skinA }])
            })
          })
        })

        //获取食品属性
        mock.onGet('/getfoodAttributes').reply(arg => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, { code: 200, msg: '请求成功', foodA }])
            })
          })
        })

        //获取保健品属性
        mock.onGet('/gethealthAttributes').reply(arg => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, { code: 200, msg: '请求成功', healthA }])
            })
          })
        })

        //获取其他属性
        mock.onGet('/getothersAttributes').reply(arg => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, { code: 200, msg: '请求成功', othersA }])
            })
          })
        })

        //获取电商ID
        mock.onGet('/getBusiness').reply(arg => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, { code: 200, msg: '请求成功', business }])
                })
            })
        })

        //销量关联分析
        mock.onGet('/getSales').reply(arg => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, { code: 200, msg: '请求成功', sales }])
                })
            })
        })

        //销量关联分析-母婴用品销量
        mock.onGet('/getbabyProductSales').reply(arg => {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, { code: 200, msg: '请求成功', babyProductSales }])
              })
          })
      })

        //销量关联分析-奶粉销量
        mock.onGet('/getMilkSales').reply(arg => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, { code: 200, msg: '请求成功', milkSales }])
                })
            })
        })

        //销量关联分析-日常用品销量
        mock.onGet('/getdailySales').reply(arg => {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, { code: 200, msg: '请求成功', dailySales }])
              })
          })
        })

        //销量关联分析-护肤品销量
        mock.onGet('/getskinSales').reply(arg => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, { code: 200, msg: '请求成功', skinSales }])
            })
          })
      })

        //销量关联分析-食品销量
        mock.onGet('/getfoodSales').reply(arg => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, { code: 200, msg: '请求成功', foodSales }])
            })
          })
        })

        //销量关联分析-保健品销量
        mock.onGet('/gethealthSales').reply(arg => {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, { code: 200, msg: '请求成功', healthSales }])
              })
          })
      })

        //获取订单数据（zyz）
        mock.onGet('/getOrders').reply(arg => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, { code: 200, msg: '请求成功', orders }])
                }, 300)
            })
        })

        //获取六大种类商品的数据（商品数量）
        mock.onGet('/getsixtypeproduct').reply(arg => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, { code: 200, msg: '请求成功', sixtypeproduct }])
                }, 300)
            })
        })

        //获取消费分析数据
        mock.onGet('/getsalesanalysis').reply(arg => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, { code: 200, msg: '请求成功', salesanalysis }])
                }, 300)
            })
        })

        //区域分析-购买地
        mock.onGet('/getCountry').reply(arg=>{
          return new Promise((resolve, reject) => {
            setTimeout( ()=>{
              resolve([200, {code:200, msg: '请求成功', country}])
            })
          })
        })

        //区域分析-品牌
        mock.onGet('/getBrands').reply(arg=>{
          return new Promise((resolve, reject) => {
            setTimeout( ()=>{
              resolve([200, {code:200, msg: '请求成功', brands}])
            })
          })
        })


    }

}