<template>
    <div class="record">
          <ul class="list">
                <li v-for="(item,index) in recored" :key="index" @click="toMess(item,index)">
                    <rec-item :item="item"/>
                </li>
          </ul>
    </div>
</template>
<script>
import recItem from "./recoreditem.vue"
import {mapGetters} from 'vuex'
export default {
    name:'record',
    components:{
        recItem
    },
    computed:{
        ...mapGetters(['recordList']),
        recored(){
            let list=this.recordList||[];
            list.reverse();
            return list;
        }
    },
    created(){
    },
    data(){return{
        itemList:[]
    }},
    methods:{
       toMess(item,index){
             this.$store.commit('setType',item.type);
              this.$store.commit('setStartTime',item.startTime);
              this.$store.commit('setEndTime',item.endTime);
              this.$store.commit('setIsLeave',item.isLeave);
              this.$store.commit('setPhone',item.phone);
              this.$store.commit('setReason',item.reason);
              this.$store.commit('setAddress',item.address);
              this.$store.commit('setSumTime',item.sumTime);
              this.$store.commit('setName',item.name);
              this.$store.commit('setTeacher',item.teacher);
              this.$router.push('/content?id='+index)
       }
    }
}
</script>
<style scoped>
.list{
    width: 100%;
    border: 1px solid white;   
}
.record{
    position: absolute;
    left:10px ;
    width: 90%;
}
.record .list>li{
    height: 120px;
    position: relative;
    border-bottom:2px solid rgb(244,245,246);
    left: 0px;
    right: 0px;
    /* border-bottom: 2px solid rgb(235,245,246); */
    /* border-top: 2px solid rgb(235,245,246); */
}


</style>