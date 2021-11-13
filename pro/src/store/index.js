import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)
const store=new Vuex.Store({
        state:{
                title:'',
                url:'',
                id:1,//id用来销假的
                name:'',//请假人名
                teacher:'',//辅导员名
                type:'',//请假类型
                startTime:null,//开始时间
                endTime:null,//结束时间
                isLeave:'',//是否离校
                reason:'',//请假理由
                sumTime:'',//总时长,
                address:'',//发起位置。
                phone:'',//紧急联系人
                recoredList:[],//存储记录，放到存储里
        },
        mutations:{
               setTitle(state,title){
                        state.title=title
               },
               setUrl(state,url){
                        state.url=url
               },       
                setName(state,name){
                        state.name=name;
                        window.localStorage.setItem("name",JSON.stringify(state.name))
                },
                setId(state,id){
                        state.id=id;
                        window.localStorage.setItem("id",JSON.stringify(state.id))

                },
                setTeacher(state,name){
                        state.teacher=name;
                        window.localStorage.setItem("teacher",JSON.stringify(state.teacher))
                },
                setType(state,type){
                        state.type=type
                        window.localStorage.setItem("type",JSON.stringify(state.type))
                },
                setStartTime(state,time){
                        state.startTime=time
                        window.localStorage.setItem("startTime",JSON.stringify(state.startTime))
                },
                setEndTime(state,time){
                        state.endTime=time
                        window.localStorage.setItem("endTime",JSON.stringify(state.endTime))
                },
                setIsLeave(state,lev){
                        state.isLeave=lev
                        window.localStorage.setItem("isLeave",JSON.stringify(state.isLeave))
                },
                setReason(state,reson){
                        state.reason=reson;
                        window.localStorage.setItem("reason",JSON.stringify(state.reason))
                },
                setSumTime(state,time){
                        state.sumTime=time;
                        window.localStorage.setItem("sumTime",JSON.stringify(state.sumTime))
                },
                setAddress(state,addr){
                        state.address=addr;
                        window.localStorage.setItem("address",JSON.stringify(state.address))
                },
                setPhone(state,phone){
                        state.phone=phone;
                        window.localStorage.setItem("phone",JSON.stringify(state.phone))
                },
                setRecordList(state,record){
                        //在放入存储前，先将存储里的数据取出，然后将后来的数据添加到原来的后面，然后在存到存储里,
                        //每次做完操作，都清空一次数组，避免重复项
                        state.recoredList.push(record)
                        let tmp=JSON.parse(window.localStorage.getItem("list"))
                        if(tmp){
                                tmp.push(...state.recoredList);
                                state.recoredList=[]
                                 //将合并的记录重新放入存储。。
                        window.localStorage.setItem("list",JSON.stringify(tmp))
                        }else{
                                //如果存储里没有数据，则将改列表放到存储里
                        window.localStorage.setItem("list",JSON.stringify(state.recoredList))
                        state.recoredList=[]
                        }      
                },
                removeList(state,recordList){
                        state.recoredList=recordList;
                        window.localStorage.setItem("list",JSON.stringify(state.recoredList))
                },
                
        },
        
        getters:{
                title:state=>{
                        return state.title
                },
                url:state=>{
                        return state.url;
                },
                id:state=>{
                        let id=state.id;
                        if(!id){id=JSON.parse(window.localStorage.getItem("id"))}
                        return id;
                },
                type:state=>{
                        let type=state.type;
                        if(!type){type=JSON.parse(window.localStorage.getItem('type'))}
                        return type
                },
                name:state=>{
                        let name=state.name;
                        if(!name){name=JSON.parse(window.localStorage.getItem('name'))}
                        return name
                },
                teacher:state=>{
                        let teacher=state.teacher;
                        if(!teacher){teacher=JSON.parse(window.localStorage.getItem('teacher'))}
                        return teacher
                },
                startTime:state=>{ 
                        let startTime=state.startTime;
                        if(!startTime){startTime=JSON.parse(window.localStorage.getItem('startTime'))}
                        return startTime},
                endTime:state=>{
                        let endTime=state.endTime;
                        if(!endTime){endTime=JSON.parse(window.localStorage.getItem('endTime'))}
                        return endTime
                },
                isLeave:state=>{
                        let isLeave=state.isLeave;
                        if(!isLeave){isLeave=JSON.parse(window.localStorage.getItem('isLeave'))}
                        return isLeave
                },
                reason:state=>{
                        let reason=state.reason;
                        if(!reason){reason=JSON.parse(window.localStorage.getItem('reason'))}
                        return reason
                },
                sumTime:state=>{
                        let sumTime=state.sumTime;
                        if(!sumTime){sumTime=JSON.parse(window.localStorage.getItem('sumTime'))}
                        return sumTime
                },
                phone :state=>{
                        let phone=state.phone;
                        if(!phone){
                                phone=JSON.parse(window.localStorage.getItem("phone"))
                        }
                        return phone;
                },
                address:state=>{
                        let address=state.address;
                        if(!address){address=JSON.parse(window.localStorage.getItem('address'))}
                        return address
                },
                recordList:state=>{
                        let list=state.recoredList
                        if(!list.length){
                                list=JSON.parse(window.localStorage.getItem("list"))
                        }
                        return list
                }
        }
})

export default store;