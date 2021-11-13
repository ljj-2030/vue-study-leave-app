<template>
    <div id="nav" style="margin-top:50px;">
          <van-tabs  line-width="80px">
       <van-tab title="请假记录">
          <why/>
          <div style="position:relative;top:-25px">
            <div class="rec">
            <record/>
            </div>
          </div>
       </van-tab>
       <van-tab title="审批记录">
         <div style="background-color:white;position:relative;top:-30px;">

         </div>
       </van-tab>
      </van-tabs>
      <send @toPage="toPage('/edit')">我要请假</send>
    </div>
</template>
<script>
import record from './record.vue'
import send from "./send.vue"
import Why from "../components/Why.vue"
export default {
components:{
  record,
  Why,
  send,
},
created(){
    this.$store.commit('setTitle','请假')
    this.$store.commit('setUrl','')
},
methods:{
  toPage(path){
    this.$router.push({path:path})
  }
}
}
</script>
<style>
#app{
  background-color:rgba(246,247,249,1);
}

.rec{
  position:relative;

  top: 0px;;
  right: 0px;
  height: 600px;
  background-color: white;
  overflow: scroll;
}
.van-nav-bar__arrow{
  color: black !important;
}
.van-tabs__line{
background-color:blue !important;
}
.van-tab--active {
color: blue !important;
}
</style>
