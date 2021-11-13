<template>
   <div class="app">
	
		<div class="xj"><span>?</span> 如 何 销 假 ?</div>
		<div class="line">
			<div class="line1"><div class="pass"><span>✔</span> 审 批 已 通 过</div><div class="self">个人信息 &gt;</div></div>
			<div class="line2">正在休假中</div>		
			<div class="inner" ref="inn"></div>
			<div class="line3">当前时间: <span class="currentTime">{{getTime(currentTime)}}</span></div>
		</div>
		
		<section class="type">
			<div class="type">
					<p><font>请假类型:&nbsp;&nbsp;&nbsp;</font><span>{{type}}</span></p>
					<p><font>需要离校:&nbsp;&nbsp;&nbsp;</font><span>{{isLeave?'离校':'不离校'}}</span></p>
			</div>
			<div class="rules">
				<p><font>销假规则:&nbsp;&nbsp;&nbsp;</font><span>离校请假需要销毁，非离校请假无需销毁</span></p>
					<p><font style="color: rgb(88,139,168);">查看></font></p>
			</div>
			<div class="time">
			<p>实际休假时间:&nbsp;&nbsp;&nbsp;{{formatTime(startTime)}} ~{{formatTime(endTime)}} ({{sumTime}})</p>
			</div>
		</section>
		<section class="apply">
			<div class="sumTime" style="color: rgb(73,151,234);font-weight:500">{{sumTime}}</div>
			<h4>我的&nbsp;&nbsp;请假申请</h4>
			<p class="start">开始时间:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{formatTime(startTime)}}</span></p>
			<p class="end">结束时间:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{formatTime(endTime)}}</span></p>
			<p class="process">审批流程:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>共一步&nbsp;&nbsp;&nbsp;<font style="color: rgb(88,139,168);">查看></font></span></p>
			<p class="contact">紧急联系人:&nbsp;&nbsp;&nbsp;&nbsp;<span>{{phone}}</span></p>
			<p class="reason">请假原因:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{reason}}</span></p>
			<p class="addr">发起位置:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: rgb(88,139,168);">{{address}}</span></p>
			<p class="person">抄送人:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>无</span></p>
		</section>
		<section class="record">
			<h4>审批流程记录</h4>
			<p class="send"><span class="icon"></span>&nbsp;&nbsp;&nbsp;{{name}} - 发起申请 <span class="time">{{formatTime(startTime)}}</span> </p>
			<p class="line"></p>
			<p class="one"><span class="icon"></span>&nbsp;&nbsp;&nbsp;一级: [辅导员]{{teacher}} -  审批<font style="color: rgba(2,190,99,1);">通过</font> <span class="time">{{formatTime(startTime)}} </span></p>
			
			<div class="idea">
				审批意见：无
			</div>
		</section>
		<send>
		<div class="footer">
			<div class="trans">转发</div>
			<div class="continue">申请续假</div>
			<div class="canc" @click="destoryHoliday">去销假</div>
		</div>
        </send>
		</div>
		
</template>
<script>
import{mapGetters} from 'vuex'
import minx from "../minx/minx"
import send from "./send.vue"
export default {
    components:{
            send,
    },
    data(){return{
            currentTime:new Date(),
    }},
 mixins:[minx],
    computed:{
            ...mapGetters([
                 'type',
                'startTime',
                'endTime',
                'isLeave',
                'reason',
                'sumTime',
                'address',
                'phone',
				'name',
				'teacher',
				'recordList',
				'id'
            ])
    },
    mounted(){
            let line=this.$refs.inn
            this.dynamicLoad(line)
            let that=this;
            this.timer=setInterval(()=>{
                that.currentTime=new Date();
            },100)
    },
    methods:{
		//销假
		destoryHoliday(){
				let id=this.$route.query.id
				this.recordList.splice(id,1);
				this.$store.commit('removeList',this.recordList)
				this.$toast("已经销毁了!")
				this.$router.push('/')
		},
            formats(time){
		if(time>=10){return time}
		if(time<10){return '0'+time;}
	},
        getTime(date){
                let strTime=date.getFullYear()+"-"+this.formats(date.getMonth()+1)+"-"+this.formats(date.getDay())+" "+this.formats(date.getHours())+":"+this.formats(date.getMinutes())+":"+this.formats(date.getSeconds())
                return strTime;
        },


        dynamicLoad(val){
		let tmp='white';//初始化
	let pre='white';	
	let next='rgb(2,199,90)';
	let pars='linear-gradient(135deg,';
	for(let i=0;i<=100;i+=5){
		pars+=tmp+" "+(i)+"%,"+next+" "+(i)+"%,"
		tmp=next;
		if(tmp===next){
			next=pre;
			pre=tmp
		}
	}
	pars=(pars.substr(0,pars.length-1))
	pars+=')'
	

	val.style.backgroundImage=pars;
	}
    }
}
</script>
<style scoped>
.footer{
display: flex;
}
.footer>div{
    flex: 1;
    color: gray;;
    background-color: white;
}
div.canc{
    background-color:rgb(51,153,234);
    color: white;
}
.app{
				position: fixed;
				background-color: rgba(246,247,249,1);
				left: 0;
				right: 0px;
				top: 100px;
				bottom: 0px;				
			}

			*{margin: 0px;padding: 0px;}
			div.line{
				width: 100%;height: 100px;background-color: rgba(2,190,99,1);
				position: relative;
				overflow: hidden;
			}
			.line>.line1{display: flex;}
			.line1>div{font-size: 12px;color: white;}
			.line1>div.pass{flex: 3;text-align: right;padding-right: 0px;padding-left: 50px;margin-top: 10px;}
			.line1>div.pass>span{display: inline-block;width: 20px;height: 20px;border-radius: 50%;background-color:white ;color: rgba(2,190,99,1);text-align: center;line-height: 20px;font-weight: bold;font-size: 15px;}
			.line1>div.self{flex: 2;margin-top: 10px;margin-left: 30px;line-height: 25px;}
			.line2{width: 100%;height: 40px;text-align: center;line-height: 40px;font-size: 25px;color: white;}
			.line3{width:50%;height: 18px;padding: 0px 3px;background-color: rgba(0,0,0,0.4);border-radius: 10px;text-align: center;color: white;position: relative;bottom: -9px;left: 25%;font-size: 13px;}
			.inner{
				 position: absolute;
				width: 130%;
				height: 15px;
				/*background-image: ;*/
				/* bottom: 100px; */
                /* z-index: 100; */
				/* left: -100px; */
				/* background-size: 100px 100px;			 */
					animation: move 2s linear infinite;	 
			}
			.bar{display: flex;text-align: center;justify-content: space-between;position: relative;left: 0px;right: 0px;height: 50px;line-height: 50px;z-index: 10;background-color: white;}
			.bar>div{flex: 1;}
			.detail{font-weight: bold;letter-spacing: 1px;font-family: "宋体";}
			.fk{text-align: right;padding-right: 20px;font-size: 18px;color: red;}
			.back{text-align: left;padding-left: 20px;}
			span.icon1{display: inline-block;width: 20px;height: 50px;float:left;margin-left: 20px;}
			span.icon1>img{width: 100%;margin-top: 10px;}
			section{
				margin-bottom: 15px;;
			}
			.xj{width: 100%;height: 20px;background-color: orange;font-size: 12px;color: white;text-align: center;}
			.xj>span{display: inline-block;width: 15px;height: 15px;border-radius: 50%;background-color: white;color: orange;text-align: center;line-height: 15px;font-weight: bold;}
			section.type{width: 100%;height: 100px;position: relative;background-color: white;}
			section.type>div{}
			section.type>div.type{width: 100%;height: 20%;font-size: 12px;color: gray;padding-top: 10px;}
			section.type>div.type>p:nth-of-type(1){width: 49%;height: 100%;float: left;margin-left: 20px;margin-right: -15px;line-height: 10px;}
			section.type>div.type>p:nth-of-type(2){width: 49%;float: left;height: 100%;line-height: 10px;}
			section.type>div.rules{width: 100%;height: 20%;font-size: 12px;color: gray;padding-top: 10px;;}
			section.type>div.rules>p:nth-of-type(1){width: 80%;height: 100%;float: left;margin-left: 20px;line-height: 10px;margin-right: -10px;}
			section.type>div.rules>p:nth-of-type(1)>span{color: orange;}
			section.type>div.rules>p:nth-of-type(2){width: 10%;float: left;height: 100%;line-height: 10px;color: #0000FF;}
			
			div.time{width: 100%;height: 20%;font-size: 12px;color: gray;padding-top: 10px;padding-left: 20px;line-height: 10px;}
			
			section.apply{width: 100%;height: 200px;background-color: white;position: relative;}
			section.apply>h4{font-size: 14px;font-weight: normal;height: 30px;line-height: 30px;padding-left: 20px;}
			section.apply>p{font-size: 12px;color: gray;padding-left: 20px;margin-top: 5px;}
			section.apply>p.reason{height: 30px;}
			section.apply>p.start>span,section.apply>p.end>span{font-weight: bold;}
			section.apply>p.addr>span{color: #0000FF;}
			section.apply>div.sumTime{position: absolute;background-color: rgb(235,245,255);border-radius: 5px;right: 10px;width: 100px;height: 30px;text-align: center;line-height: 30px;border: 1px solid rgb(215,231,242);color: #0000FF;top: 50px;font-weight: 500;}
			section.record{width: 100%;height: 180px;background-color:white;position: relative;}
			section.record>h4{font-size: 14px;font-weight: normal;height: 30px;line-height: 30px;padding-left: 20px;letter-spacing: 5px;}
			section.record>p{font-size: 12px;line-height: 20px;height: 20px;padding-left: 20px;color: gray;}
			section.record>p.line{height: 30px;width: 70%;margin: 5px 0px;margin-left: 30px;border-left: 1px solid gray;}
			section.record>p.one>span.icon{border-color:rgba(2,190,99,1) ;}
			section.record>p>span.icon{display: inline-block;width: 20px;height: 20px;border-radius: 50%;border: 1px solid #0000FF;float: left;}
			section.record>div.idea{width: 80%;height: 30px;background-color: rgba(246,247,249,1);border-radius: 5px;border: 1px solid gray;line-height: 30px;margin-left: 50px;font-size: 15px;color: gray;margin-top: 10px;}
			section.record>p>span.time{display: inline-block;float: right;margin-right: 20px;}
			
			.info{width: 100%;height: 50px;display: flex;text-align: center;border-top: 2px solid rgba(230,240,240,1);background-color: white;}
			.info>div{flex: 1;padding-bottom: 20px;color: gray;}
			.info>div>span{display: inline-block;width: 70%;height: 150%;text-align: center;line-height: 50px;}
			.footer>div{flex: 1;border: 1px solid rgb(246,247,249);}
			.active>span{border-bottom:3px solid #0000FF; color: #0000FF;}
			@keyframes move{
				/*from{background-position: 0px;}
				to{background-position: 100px;}*/
				from{
					left: -50px;
				}
				to{left: 0px;}
			}
</style>