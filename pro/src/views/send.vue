<template>
    <div class="send" @click="toPage">
        <slot></slot>
    </div>
</template>
<script>
export default {
    methods:{
        toPage(){
            this.$emit("toPage")
        }
    }
}
</script>
<style scoped>
    .send{
        position: fixed;
        z-index: 100;
        left: 0px;right: 0px;
        /* bottom: 48px; */
        bottom: 0px;
        height: 48px;
        color: white;
        background-color:rgb(51,153,234);
        text-align: center;
        line-height: 48px;
    }
</style>