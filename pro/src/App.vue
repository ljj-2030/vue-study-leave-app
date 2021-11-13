<template>
<div id="app">
          <van-nav-bar class="addr">
            <template #left>
                <span class="iconfont my-icon-shangyiji" style="font-size:20px;font-weight:bold;" @click="toPage(url)">

                </span>
            </template>
           <template #title>
       			<i class="iconfont my-icon-mn_dunpai_fill" style="color:black;"></i>
             <span>{{title || '请假'}}</span>
            </template>
        <van-icon slot="right"><font style="color:rgb(193,110,102);">反馈</font></van-icon>
      <van-divider/>
      </van-nav-bar>      

      <router-view/>
      </div>
</template>
<script>
import{mapGetters} from 'vuex'
export default {
  computed:{
      ...mapGetters(['title','url'])
  },
    methods:{
      toPage(path){
          this.$router.replace('/')
        // this.$router.go(-1)
      }
    }
}
</script>
<style scoped>
.addr{
  position: fixed;
  z-index: 100;
  left:0px;right: 0px;
  top: 0px;
  background-color: white;
}
#app{
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background-color: rgb(244,245,246);
}
</style>