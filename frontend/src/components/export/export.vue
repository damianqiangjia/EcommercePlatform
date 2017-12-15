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
          text.setAttribute("cols","200")
          text.setAttribute("rows","8")
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
    width: 130%;
    display: block;
  }
</style>



