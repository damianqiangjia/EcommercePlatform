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
          <el-row class="warp-echarts">
            <el-col :span="24">
              <!-- <img src="../../assets/images/forest.png">
              <img src="../../assets/images/sunrise.png">
              <h2>Stone Giant</h2>
              <p>
                Coming to life as a chunk of stone, Tiny's origins are a mystery on which he continually speculates. He is a Stone Giant now, but what did he used to be? A splinter broken from a Golem's heel? A shard swept from a gargoyle-sculptor's workshop? A fragment of the Oracular Visage of Garthos? A deep curiosity drives him, and he travels the world tirelessly seeking his origins, his parentage, his people. As he roams, he gathers weight and size; the forces that weather lesser rocks, instead cause Tiny to grow and ever grow.
              </p>
              <p>
                以一团石头的形式出现的生命体，小小不断思索他的起源，但这始终是个谜。现在的他是个石巨人，但过去是什么呢？从土傀儡的脚后跟掉落的碎片？从制造石像鬼的工房被打扫出来的碎屑？神圣预言石的表层之砂？受到强烈的好奇心驱使，他不知疲倦的环游世界，寻找着他的起源，他的出身，和他的种族。在旅途中，他变得越来越庞大，不过路上的风雨吹打掉了他身上的石头，所以他不停的吸收新的岩石，永远在长大。
              </p>                                           -->
            </el-col>
          </el-row>
        </section>

        <section class="remark">
          <form class="pdf-dom" id="pdfdom">
            <textarea cols="200" rows="10" placeholder="请输入您需要的备注信息"></textarea>
          </form>
        </section>

        <!-- <section class="remark">
          <form class="pdf-dom" id="pdfdom">
            <textarea cols="200" rows="10" placeholder="请输入您需要的备注信息"></textarea>
          </form>
        </section> -->

      </el-col>

      <el-col :span="24" class="export-button">
        <form class="getpdf">
          <button id="renderPdf" style="float: right" class="exportButton">DONWLOAD PDF</button>
          <button id="save" style="float: right" class="saveButton">SAVE</button>
        </form>
      </el-col>

    </el-row>  
  </div>
</template>

<script>
 import html2Canvas from '../../html2canvas.js'
 import JsPDF from '../../jsPdf.debug.js'

  export default{
    mounted: function () {

    var downPdf = document.getElementById("renderPdf");

      downPdf.onclick = function() {
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

                  var pdf = new jsPDF('', 'pt', 'a4');

                  //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                  //当内容未超过pdf一页显示的范围，无需分页
                  if (leftHeight < pageHeight) {
                      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
                  } else {
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
      }
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
  .remark , .pdf-dom {
    background : #fff;
  }
  .export-button , .exportButton , .getpdf {
    background : #fff;
  }
</style>



