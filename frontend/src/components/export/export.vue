<template>
  <div class="exportDIV">
    <el-row class="warp" >
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
          <el-breadcrumb-item>报表导出</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <el-col :span="24" class="warp-textarea" id="export">
        <section class="text-container">
          <el-col :span="12" id = "1">
            <!--报表图片-->
          </el-col>
        </section>
        <section class="remark">
          <form class="text" id="Text">
            <!-- 备注信息 -->
          </form>
        </section>
      </el-col>

      <el-col :span="24" class="export-button">
        <form class="getpdf" id = "Button">
         <!--按钮-->
        </form>
      </el-col>

      <el-col :span = "24" class="nocharts" id="nochart">
        <h2 id = "head2">暂无添加的简报</h2>
      </el-col>

    </el-row>  
  </div>
</template>

<script>
 import html2Canvas from '../../html2canvas.js'
 import JsPDF from '../../jsPdf.debug.js'
 import echarts from 'echarts'
 import axios from 'axios'

  export default{
    data(){
      return{

      } 
    },
    mounted(){
      this.imgURL()
    },
    methods: {
      imgURL(){
        var _this = this
        if(localStorage.length>0){
          // 清除“暂无添加的简报”
          document.getElementById("nochart").removeChild(document.getElementById("head2"))
          // “添加至简报”列表
          var ul = document.createElement("ul") 
          ul.setAttribute("id","ulID")
          ul.setAttribute("class","ulClass")
          // “清空列表”的按钮
          var clearList = document.createElement("button")
          clearList.setAttribute("id","clearlist")
          clearList.setAttribute("style","float:right")
          clearList.innerHTML = "清空"
          clearList.addEventListener("click",function(){
            localStorage.clear()
            alert("当前界面已清空，请重新刷新页面")
            window.location.reload()
          })

          var text = document.createElement("textarea")
          text.setAttribute("cols","180")
          text.setAttribute("rows","8")
          text.setAttribute("class","textarea")
          text.setAttribute("placeholder","请输入您需要的备注信息")
          var returnButton = document.createElement("button")
          var clearButton = document.createElement("button")
          var exportButton = document.createElement("button")
          returnButton.innerHTML = "返回"         
          exportButton.innerHTML = "导出报表"
          returnButton.setAttribute("style","float:right")     
          exportButton.setAttribute("style","float:right")

          //返回按钮
          returnButton.addEventListener("click",function(){
            //清空当前页面
            document.getElementById("1").removeChild(document.getElementById("imageID"))
            document.getElementById("Text").removeChild(text)
            document.getElementById("Button").removeChild(returnButton)
            document.getElementById("Button").removeChild(exportButton)
            //
            var temp = document.createElement("h2")
            temp.setAttribute("id","head2")
            document.getElementById("nochart").appendChild(temp)
            //递归调用当前函数
            _this.imgURL()

          })

          //导出按钮
          exportButton.addEventListener("click",function(){
            html2canvas(document.getElementById('export'), {
              onrendered:function(canvas) {

                var contentWidth = canvas.width;
                var contentHeight = canvas.height;

                //一页pdf显示html页面生成的canvas高度;
                var pageHeight = contentWidth / 592.28 * 841.89;
                //未生成pdf的html页面高度
                var leftHeight = contentHeight;
                //pdf页面偏移
                var position = 0;
                //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                var imgWidth = 595.28;
                var imgHeight = 592.28/contentWidth * contentHeight;

                var pageData = canvas.toDataURL('image/jpeg', 1.0);
                console.log(pageData)

                var pdf = new jsPDF('', 'pt', 'a4');

                //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                //当内容未超过pdf一页显示的范围，无需分页
                if (leftHeight < pageHeight) {
                  pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
                } 
                else {
                  while(leftHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    //避免添加空白页
                    if(leftHeight > 0) {
                      pdf.addPage();
                    }
                  }
                }
                pdf.save('报表.pdf');
              }
            })

          })

          //商品-电商关联分析报表
          if(localStorage.getItem("chartProductName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("chartProductName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              //添加图标
              var chartProductURL = localStorage.getItem("chartProduct")
              var chartProductImage = document.createElement("img")
              chartProductImage.src = localStorage.getItem("chartProduct")
              chartProductImage.setAttribute("class","image")
              chartProductImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(chartProductImage)
              //添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("chartProductName"))
            ul.appendChild(li)
          }

          //电商-商品关联分析报表
          if(localStorage.getItem("chartBusinessName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("chartBusinessName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var chartBusinessURL = localStorage.getItem("chartBusiness")
              var chartBusinessImage = document.createElement("img")
              chartBusinessImage.src = localStorage.getItem("chartBusiness")
              chartBusinessImage.setAttribute("class","image")
              chartBusinessImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(chartBusinessImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("chartBusinessName"))
            ul.appendChild(li)
          }

          //价格关联分析-爱他美
          if(localStorage.getItem("aptamilName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("aptamilName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var aptamilURL = localStorage.getItem("aptamil")
              var aptamilImage = document.createElement("img")
              aptamilImage.src = localStorage.getItem("aptamil")
              aptamilImage.setAttribute("class","image")
              aptamilImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(aptamilImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("aptamilName"))
            ul.appendChild(li)
          }

          //价格关联分析-喜宝
          if(localStorage.getItem("hippName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("hippName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var hippURL = localStorage.getItem("hipp")
              var hippImage = document.createElement("img")
              hippImage.src = localStorage.getItem("hipp")
              hippImage.setAttribute("class","image")
              hippImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(hippImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("hippName"))
            ul.appendChild(li)
          }

          //价格关联分析-博朗
          if(localStorage.getItem("braunName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("braunName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var braunURL = localStorage.getItem("braun")
              var braunImage = document.createElement("img")
              braunImage.src = localStorage.getItem("braun")
              braunImage.setAttribute("class","image")
              braunImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(braunImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("braunName"))
            ul.appendChild(li)
          }

          //价格关联分析-芭乐雅
          if(localStorage.getItem("baleaName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("baleaName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var baleaURL = localStorage.getItem("balea")
              var baleaImage = document.createElement("img")
              baleaImage.src = localStorage.getItem("balea")
              baleaImage.setAttribute("class","image")
              baleaImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(baleaImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("baleaName"))
            ul.appendChild(li)
          }

          //价格关联分析-facelle
          if(localStorage.getItem("facelleName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("facelleName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var facelleURL = localStorage.getItem("facelle")
              var facelleImage = document.createElement("img")
              facelleImage.src = localStorage.getItem("facelle")
              facelleImage.setAttribute("class","image")
              facelleImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(facelleImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("facelleName"))
            ul.appendChild(li)
          }

          //价格关联分析-拉杜蓝乔
          if(localStorage.getItem("LaTourangelleName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("LaTourangelleName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var LaTourangelleURL = localStorage.getItem("LaTourangelle")
              var LaTourangelleImage = document.createElement("img")
              LaTourangelleImage.src = localStorage.getItem("LaTourangelle")
              LaTourangelleImage.setAttribute("class","image")
              LaTourangelleImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(LaTourangelleImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("LaTourangelleName"))
            ul.appendChild(li)
          }

          //销量关联分析
          if(localStorage.getItem("chartSalesName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("chartSalesName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var chartSalesURL = localStorage.getItem("chartSales")
              var chartSalesImage = document.createElement("img")
              chartSalesImage.src = localStorage.getItem("chartSales")
              chartSalesImage.setAttribute("class","image")
              chartSalesImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(chartSalesImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("chartSalesName"))
            ul.appendChild(li)
          }

          //销量关联分析-母婴用品
          if(localStorage.getItem("chartbabyProductName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("chartbabyProductName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var chartbabyProductURL = localStorage.getItem("chartbabyProduct")
              var chartbabyProductImage = document.createElement("img")
              chartbabyProductImage.src = localStorage.getItem("chartbabyProduct")
              chartbabyProductImage.setAttribute("class","image")
              chartbabyProductImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(chartbabyProductImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("chartbabyProductName"))
            ul.appendChild(li)
          }

          //销量关联分析-奶粉用品
          if(localStorage.getItem("chartMilkName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("chartMilkName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var chartMilkURL = localStorage.getItem("chartMilk")
              var chartMilkImage = document.createElement("img")
              chartMilkImage.src = localStorage.getItem("chartMilk")
              chartMilkImage.setAttribute("class","image")
              chartMilkImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(chartMilkImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("chartMilkName"))
            ul.appendChild(li)
          }

          //销量关联分析-日常用品
          if(localStorage.getItem("chartDailyName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("chartDailyName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var chartDailyURL = localStorage.getItem("chartDaily")
              var chartDailyImage = document.createElement("img")
              chartDailyImage.src = localStorage.getItem("chartDaily")
              chartDailyImage.setAttribute("class","image")
              chartDailyImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(chartDailyImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("chartDailyName"))
            ul.appendChild(li)
          }

          //销量关联分析-护肤品
          if(localStorage.getItem("chartSkinName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("chartSkinName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var chartSkinURL = localStorage.getItem("chartSkin")
              var chartSkinImage = document.createElement("img")
              chartSkinImage.src = localStorage.getItem("chartSkin")
              chartSkinImage.setAttribute("class","image")
              chartSkinImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(chartSkinImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("chartSkinName"))
            ul.appendChild(li)
          }

          //销量关联分析-食品
          if(localStorage.getItem("chartFoodName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("chartFoodName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var chartFoodURL = localStorage.getItem("chartFood")
              var chartFoodImage = document.createElement("img")
              chartFoodImage.src = localStorage.getItem("chartFood")
              chartFoodImage.setAttribute("class","image")
              chartFoodImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(chartFoodImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("chartFoodName"))
            ul.appendChild(li)
          }

          //销量关联分析-保健品
          if(localStorage.getItem("chartHealthName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("chartHealthName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var chartHealthURL = localStorage.getItem("chartHealth")
              var chartHealthImage = document.createElement("img")
              chartHealthImage.src = localStorage.getItem("chartHealth")
              chartHealthImage.setAttribute("class","image")
              chartHealthImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(chartHealthImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("chartHealthName"))
            ul.appendChild(li)
          }

          //销售地分析-总销量
          if(localStorage.getItem("chartWorldName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("chartWorldName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var chartWorldURL = localStorage.getItem("chartWorld")
              var chartWorldImage = document.createElement("img")
              chartWorldImage.src = localStorage.getItem("chartWorld")
              chartWorldImage.setAttribute("class","image")
              chartWorldImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(chartWorldImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("chartWorldName"))
            ul.appendChild(li)
          }

          //销售地分析-销量
          if(localStorage.getItem("chartCountryName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("chartCountryName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var chartCountryURL = localStorage.getItem("chartCountry")
              var chartCountryImage = document.createElement("img")
              chartCountryImage.src = localStorage.getItem("chartCountry")
              chartCountryImage.setAttribute("class","image")
              chartCountryImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(chartCountryImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("chartCountryName"))
            ul.appendChild(li)
          }

          //销售地分析-品牌
          if(localStorage.getItem("chartBrandsName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("chartBrandsName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var chartBrandsURL = localStorage.getItem("chartBrands")
              var chartBrandsImage = document.createElement("img")
              chartBrandsImage.src = localStorage.getItem("chartBrands")
              chartBrandsImage.setAttribute("class","image")
              chartBrandsImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(chartBrandsImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("chartBrandsName"))
            ul.appendChild(li)
          }

          //购买地分析
          if(localStorage.getItem("chartChinaName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("chartChinaName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var chartChinaURL = localStorage.getItem("chartChina")
              var chartChinaImage = document.createElement("img")
              chartChinaImage.src = localStorage.getItem("chartChina")
              chartChinaImage.setAttribute("class","image")
              chartChinaImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(chartChinaImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("chartChinaName"))
            ul.appendChild(li)
          }

          //博朗 在淘宝平台销量变化及预测
          if(localStorage.getItem("braunInfoName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("braunInfoName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var braunInfoURL = localStorage.getItem("braunInfo")
              var braunInfoImage = document.createElement("img")
              braunInfoImage.src = localStorage.getItem("braunInfo")
              braunInfoImage.setAttribute("class","image")
              braunInfoImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(braunInfoImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("braunInfoName"))
            ul.appendChild(li)
          }

          //贝娜婷 在淘宝平台销量变化及预测
          if(localStorage.getItem("penatenInfoName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("penatenInfoName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var penatenInfoURL = localStorage.getItem("penatenInfo")
              var penatenInfoImage = document.createElement("img")
              penatenInfoImage.src = localStorage.getItem("penatenInfo")
              penatenInfoImage.setAttribute("class","image")
              penatenInfoImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(penatenInfoImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("penatenInfoName"))
            ul.appendChild(li)
          }

          //squitofree 在淘宝平台销量变化及预测
          if(localStorage.getItem("squitofreeInfoName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("squitofreeInfoName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var squitofreeInfoURL = localStorage.getItem("squitofreeInfo")
              var squitofreeInfoImage = document.createElement("img")
              squitofreeInfoImage.src = localStorage.getItem("squitofreeInfo")
              squitofreeInfoImage.setAttribute("class","image")
              squitofreeInfoImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(squitofreeInfoImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("squitofreeInfoName"))
            ul.appendChild(li)
          }

          //facelle 在淘宝平台销量变化及预测
          if(localStorage.getItem("facelleInfoName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("facelleInfoName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var facelleInfoURL = localStorage.getItem("facelleInfo")
              var facelleInfoImage = document.createElement("img")
              facelleInfoImage.src = localStorage.getItem("facelleInfo")
              facelleInfoImage.setAttribute("class","image")
              facelleInfoImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(facelleInfoImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("facelleInfoName"))
            ul.appendChild(li)
          }

          //伴宝乐食品 在淘宝平台销量变化及预测
          if(localStorage.getItem("babybioInfoName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("babybioInfoName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var babybioInfoURL = localStorage.getItem("babybioInfo")
              var babybioInfoImage = document.createElement("img")
              babybioInfoImage.src = localStorage.getItem("babybioInfo")
              babybioInfoImage.setAttribute("class","image")
              babybioInfoImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(babybioInfoImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("babybioInfoName"))
            ul.appendChild(li)
          }

          //莎露斯 在淘宝平台销量变化及预测
          if(localStorage.getItem("salusInfoName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("salusInfoName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var salusInfoURL = localStorage.getItem("salusInfo")
              var salusInfoImage = document.createElement("img")
              salusInfoImage.src = localStorage.getItem("salusInfo")
              salusInfoImage.setAttribute("class","image")
              salusInfoImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(salusInfoImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("salusInfoName"))
            ul.appendChild(li)
          }

          //爱他美奶粉 在淘宝平台销量变化及预测
          if(localStorage.getItem("aptamilInfoName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("aptamilInfoName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var aptamilInfoURL = localStorage.getItem("aptamilInfo")
              var aptamilInfoImage = document.createElement("img")
              aptamilInfoImage.src = localStorage.getItem("aptamilInfo")
              aptamilInfoImage.setAttribute("class","image")
              aptamilInfoImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(aptamilInfoImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("aptamilInfoName"))
            ul.appendChild(li)
          }

          //贺本清 在淘宝平台销量变化及预测
          if(localStorage.getItem("herbacinInfoName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("herbacinInfoName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var herbacinInfoURL = localStorage.getItem("herbacinInfo")
              var herbacinInfoImage = document.createElement("img")
              herbacinInfoImage.src = localStorage.getItem("herbacinInfo")
              herbacinInfoImage.setAttribute("class","image")
              herbacinInfoImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(herbacinInfoImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("herbacinInfoName"))
            ul.appendChild(li)
          }

          //消费分析-购买地区分析报表
          if(localStorage.getItem("amountExportName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("amountExportName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var amountExportURL = localStorage.getItem("amountExport")
              var amountExportImage = document.createElement("img")
              amountExportImage.src = localStorage.getItem("amountExport")
              amountExportImage.setAttribute("class","image")
              amountExportImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(amountExportImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("amountExportName"))
            ul.appendChild(li)
          }

          //消费分析-产地国家销量图报表
          if(localStorage.getItem("originExportName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("originExportName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var originExportURL = localStorage.getItem("originExport")
              var originExportImage = document.createElement("img")
              originExportImage.src = localStorage.getItem("originExport")
              originExportImage.setAttribute("class","image")
              originExportImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(originExportImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("originExportName"))
            ul.appendChild(li)
          }

          //消费分析-消费种类构成报表
          if(localStorage.getItem("kindExportName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("kindExportName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var kindExportURL = localStorage.getItem("kindExport")
              var kindExportImage = document.createElement("img")
              kindExportImage.src = localStorage.getItem("kindExport")
              kindExportImage.setAttribute("class","image")
              kindExportImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(kindExportImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("kindExportName"))
            ul.appendChild(li)
          }

          //趋势分析-订单数量变化趋势
          if(localStorage.getItem("orderQuantityExportName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("orderQuantityExportName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var orderQuantityExportURL = localStorage.getItem("orderQuantityExport")
              var orderQuantityExportImage = document.createElement("img")
              orderQuantityExportImage.src = localStorage.getItem("orderQuantityExport")
              orderQuantityExportImage.setAttribute("class","image")
              orderQuantityExportImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(orderQuantityExportImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("orderQuantityExportName"))
            ul.appendChild(li)
          }

          //趋势分析-订单金额变化趋势
          if(localStorage.getItem("orderPriceExportName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("orderPriceExportName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var orderPriceExportURL = localStorage.getItem("orderPriceExport")
              var orderPriceExportImage = document.createElement("img")
              orderPriceExportImage.src = localStorage.getItem("orderPriceExport")
              orderPriceExportImage.setAttribute("class","image")
              orderPriceExportImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(orderPriceExportImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("orderPriceExportExportName"))
            ul.appendChild(li)
          }

          //趋势分析-六类商品变化趋势报表
          if(localStorage.getItem("allKindsExportName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("allKindsExportName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var allKindsExportURL = localStorage.getItem("allKindsExport")
              var allKindsExportImage = document.createElement("img")
              allKindsExportImage.src = localStorage.getItem("allKindsExport")
              allKindsExportImage.setAttribute("class","image")
              allKindsExportImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(allKindsExportImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("allKindsExportName"))
            ul.appendChild(li)
          }

          //短期预测-订单数量预测报表
          if(localStorage.getItem("forecastExportName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("forecastExportName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var forecastExportURL = localStorage.getItem("forecastExport")
              var forecastExportImage = document.createElement("img")
              forecastExportImage.src = localStorage.getItem("forecastExport")
              forecastExportImage.setAttribute("class","image")
              forecastExportImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(forecastExportImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("forecastExportName"))
            ul.appendChild(li)
          }

          //短期预测-奶粉订单数量预测报表
          if(localStorage.getItem("milkForecastName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("milkForecastName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var milkForecastURL = localStorage.getItem("milkForecast")
              var milkForecastImage = document.createElement("img")
              milkForecastImage.src = localStorage.getItem("milkForecast")
              milkForecastImage.setAttribute("class","image")
              milkForecastImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(milkForecastImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("milkForecastName"))
            ul.appendChild(li)
          }

          //短期预测-母婴用品订单数量预测报表
          if(localStorage.getItem("babyProductForecastName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("babyProductForecastName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var babyProductForecastURL = localStorage.getItem("babyProductForecast")
              var babyProductForecastImage = document.createElement("img")
              babyProductForecastImage.src = localStorage.getItem("babyProductForecast")
              babyProductForecastImage.setAttribute("class","image")
              babyProductForecastImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(babyProductForecastImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("babyProductForecastName"))
            ul.appendChild(li)
          }

          //短期预测-护肤品订单数量预测报表
          if(localStorage.getItem("skinForecastName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("skinForecastName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var skinForecastURL = localStorage.getItem("skinForecast")
              var skinForecastImage = document.createElement("img")
              skinForecastImage.src = localStorage.getItem("skinForecast")
              skinForecastImage.setAttribute("class","image")
              skinForecastImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(skinForecastImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("skinForecastName"))
            ul.appendChild(li)
          }

          //短期预测-食品订单数量预测报表
          if(localStorage.getItem("foodForecastName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("foodForecastName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var foodForecastURL = localStorage.getItem("foodForecast")
              var foodForecastImage = document.createElement("img")
              foodForecastImage.src = localStorage.getItem("foodForecast")
              foodForecastImage.setAttribute("class","image")
              foodForecastImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(foodForecastImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("foodForecastName"))
            ul.appendChild(li)
          }

          //短期预测-日常用品订单数量预测报表
          if(localStorage.getItem("dailyForecastName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("dailyForecastName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var dailyForecastURL = localStorage.getItem("dailyForecast")
              var dailyForecastImage = document.createElement("img")
              dailyForecastImage.src = localStorage.getItem("dailyForecast")
              dailyForecastImage.setAttribute("class","image")
              dailyForecastImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(dailyForecastImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("dailyForecastName"))
            ul.appendChild(li)
          }

          //短期预测-保健品订单数量预测报表
          if(localStorage.getItem("healthForecastName")){
            var li = document.createElement("li")
            li.setAttribute("class","liClass")
            li.innerHTML = localStorage.getItem("healthForecastName")
            li.addEventListener("click",function(){
              // 清除页面
              document.getElementById("1").removeChild(ul)
              document.getElementById("Button").removeChild(document.getElementById("clearlist"))
              // 添加图标
              var healthForecastURL = localStorage.getItem("healthForecast")
              var healthForecastImage = document.createElement("img")
              healthForecastImage.src = localStorage.getItem("healthForecast")
              healthForecastImage.setAttribute("class","image")
              healthForecastImage.setAttribute("id","imageID")
              document.getElementById("1").appendChild(healthForecastImage)
              // 添加输入框
              document.getElementById("Text").appendChild(text)
              //添加返回、清空、导出报表三个按钮
              document.getElementById("Button").appendChild(exportButton)
              document.getElementById("Button").appendChild(returnButton)
            })
            console.log(localStorage.getItem("healthForecastName"))
            ul.appendChild(li)
          }




          //  添加点击了添加至报表的报表标题列表
          document.getElementById("1").appendChild(ul)
          document.getElementById("Button").appendChild(clearList)

        }

      },

    }
  

  } 
</script>

<style>
  .warp , .exportDIV , .warp-breadcrum {
    background : #fff;
  }
  .warp-textarea , .text-container , .warp-echarts {
    background : #fff;
  }
  .remark , .text {
    background : #fff;
  }
  .export-button , .exportButton , .getpdf {
    background : #fff;
  }
  .liClass {
    line-height: 50px;
    font-size: 20px
  }
  .image {
    width: 160%;
    display: block;
    padding: 20px;
    margin-left: 18%;
  }
  .textarea {
    padding: 20px;
    margin-left: 5%
  }
</style>



