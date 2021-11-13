<template>
 <div class="content" style="margin-top:48px">
         <van-tabs  line-width="80px">
       <van-tab title="请假信息">
          <div style="position:relative;top:-25px">
            <div class="mess">
                <mess/>
            </div>
          </div>
       </van-tab>
       <van-tab title="核验二维码">
         <div style="background-color:white;position:relative;top:-30px;">

         </div>
       </van-tab>
      </van-tabs>

 </div>
</template>
<script>
import send from "./send.vue"
import mess from "./mess.vue"
export default {
  created(){
      this.$store.commit('setTitle','请假详情')
      this.$store.commit('setUrl','/')
  },
    components:{
        send,
        mess,
    }
}
</script>
<style>
.van-nav-bar__arrow{
  color: black !important;
}
.van-tabs__line{
background-color: rgb(51,153,234) !important;
}
.van-tab--active {
color: rgb(51,153,234) !important;
}
.mess{
    position: relative;
    left: 0px;
    right: 0px;
    top: 25px;
    height: 630px;
    overflow: scroll;
background-color: rgb(244,245,246);;;
}
</style>