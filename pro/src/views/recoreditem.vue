<template>
    <div class="recored-item">
            <div class="title">
                <h4>我的&nbsp;&nbsp;{{item.type}}申请</h4>
                <span class="time">{{formatTime(item.startTime)}}</span>
            </div>
            <p class="time">请假时间:&nbsp;&nbsp;{{formatTime(item.startTime)}}至{{formatTime(item.endTime)}} ({{item.sumTime}})</p>
            <p class="time">请假时间:&nbsp;&nbsp;{{formatTime(item.startTime)}}至{{formatTime(item.endTime)}} ({{item.sumTime}})</p>
            <p class="over">正在休假中</p>
    </div>
</template>
<script>
import minx from "../minx/minx"
export default {
    props:['item'],
    mixins:[minx]
}
</script>
<style scoped>
    .recored-item{
        position: relative;
        left: 0px;
        right: 0px;;
        height: 100%;
        
    }
    .title{
        position: relative;
        margin-top: 5px;
        font-size: 12px;
        height: 25px;
        padding-left: 20px;

    }
    .title>h4{display: inline-block;
        margin-top: 5px;
        font-weight: 200px;
        color: rgb(102,105,114);
    ;}
    .title>.time{display: inline-block;
    color: gray;
    float: right;
    line-height: 20px;
    }
    p{
    margin:0px;
    width: 100%;
    height: 25px;
    line-height: 25px;
    padding-left: 20px;
    font-size:10px;
    color: gray;
    }
</style>