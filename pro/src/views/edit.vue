<template>
    <div class="edit" style="margin-top:60px;">
      <why/>
       <!--姓名-->
      <van-cell style="margin-top:-20px">
        <div class="phone"> <span style="color:red;font-size:15px;font-weight:bold">*</span>请假人:
        <van-field style="width:70%;margin-left:20px;margin-top:-10px"
          v-model="name"
          placeholder="请输入请假人的名字"
        />
        </div>
      </van-cell>

        <!--辅导员-->
      <van-cell>
        <div class="phone"> <span style="color:red;font-size:15px;font-weight:bold">*</span>辅导员:
        <van-field style="width:70%;margin-left:20px;margin-top:-10px"
          v-model="teacher"
          placeholder="辅导员"
        />
        </div>
      </van-cell>
      <van-cell is-link @click="showPopup"  title="请假类型" style="margin-top:-23px;">
        <template #title> <span style="color:red;font-size:15px;font-weight:bold">*</span>请假类型</template>
        <template>{{type}}</template>
      </van-cell> 
      <!-- 开始时间 -->
      <van-cell class="time">
        <template #title> <span style="color:red;font-size:15px;font-weight:bold">*</span>开始时间</template>
        <template>
            <div class="date">
                <div class="choose-date" @click="chooseDate">{{start.startDate}} <span class="iconfont my-icon-shijianriqi"></span></div>
                <div class="choose-time" @click="chooseTime">{{start.startTime}} <span class="iconfont my-icon-shijian"></span></div>
            </div>
        </template>
      </van-cell>
      <!-- 结束时间 -->
      <van-cell class="time">
        <template #title> <span style="color:red;font-size:15px;font-weight:bold">*</span>结束时间</template>
        <template>
            <div class="date">
                <div class="choose-date" @click="chooseEndDate">{{end.startDate}} <span class="iconfont my-icon-shijianriqi"></span></div>
                <div class="choose-time" @click="chooseEndTime">{{end.startTime}} <span class="iconfont my-icon-shijian"></span></div>
            </div>
        </template>
      </van-cell>
      <!-- 是否离校 -->
       <van-cell style="height:50px;" title="需要离校">
         <van-switch v-model="isLeave" />
       </van-cell>
      <!--紧急联系人-->
      <van-cell>
        <div class="phone"> <span style="color:red;font-size:15px;font-weight:bold">*</span>紧急联系人
        <van-field style="width:70%;margin-left:20px;margin-top:-10px"
          v-model="phone"
          placeholder="请输入紧急联系人"
        />
        </div>
      </van-cell>
      <!--请假原因-->
       <van-cell style="height:120px;">
        <van-field
        v-model="reason" 
        rows="3"
        autosize
        type="textarea"
        maxlength="100"
        placeholder="请输入请假原因,至少10个字"
        show-word-limit
        >
        <template #label>
           <span style="color:red;font-size:15px;font-weight:bold">*</span>请假原因
        </template>
        </van-field>
      </van-cell>
      <van-cell>
        <template #title>
              <div>
                <h4>添加附件</h4>
        <van-uploader v-model="fileList" multiple  />
              </div>
        </template>
      </van-cell>
      <!-- 不跳转了 -->
      <van-cell title="抄送人" is-link/>
      <!-- 定位 -->
      <van-cell style="height:50px;">
        <template #title>
          <div style="font-size:10px;">定位</div>
          <p style="font-size:6px;color:gray;margin-top:-5px;">{{address?address:'无'}}</p>
        </template>
       <span style="font-size:10px;" @click="changeAddr">重新定位</span>
      </van-cell>
      <!-- 同意 -->
      <van-cell style="height:55px;">
         <van-checkbox v-model="agree" >
           <span style="font-size:2px;color:gray">本人承诺写的信息真实有效,并对本次提交请假申请的信息
           真实性负责</span>
         </van-checkbox>
      </van-cell>
      <!-- 提交申请 -->
      <send @toPage="submit">提交请假</send>
      <!--选择类型-->
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
                    <van-picker
                title="请假类型"
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
                :style="{height:'100%'}"
                 />
      </van-popup>
      <!-- 结束 -->
      <!-- 选择日期 -->
      <van-popup v-model="end.dateShow" position="bottom" :style="{ height: '40%' }">
                  <van-datetime-picker
                    v-model="end.currentDate"
                    type="date"
                    title="选择年月日"
                    :min-date="end.minDate"
                    :max-date="end.maxDate"
                    @confirm="dateEndConfirm"
                    @cancel="dateEndCancel"
                  />
      </van-popup>
      <!-- 弹窗 -->
<van-dialog v-model="diaShow"  show-cancel-button @cancel="diaCancel" @confirm="diaConfirm">

 <!--修改地址-->
      <van-cell>
        <div class="phone"> <span style="color:red;font-size:15px;font-weight:bold">*</span>地址
        <van-field style="width:70%;margin-left:20px;margin-top:-10px"
          v-model="address"
          placeholder="所在地"
        />
        </div>
      </van-cell>

</van-dialog>


      <!-- //选择时间 -->
              <van-popup v-model="end.timeShow" position="bottom" :style="{ height: '40%' }">
                
                <van-datetime-picker
              v-model="end.currentTime"
              type="time"
              title="选择时间"
              :columns-order="['month', 'day', 'year']"
              :formatter="formatter"
              @confirm="timeEndConfirm"
              @cancel="timeEndCancel"
            />
      </van-popup>
       <!-- 开始 -->
      <!-- 选择日期 -->
      <van-popup v-model="start.dateShow" position="bottom" :style="{ height: '40%' }">
                  <van-datetime-picker
                    v-model="start.currentDate"
                    type="date"
                    title="选择年月日"
                    :min-date="start.minDate"
                    :max-date="start.maxDate"
                    @confirm="dateConfirm"
                    @cancel="dateCancel"
                  />
      </van-popup>
      <!-- //选择时间 -->
              <van-popup v-model="start.timeShow" position="bottom" :style="{ height: '40%' }">
                
                <van-datetime-picker
              v-model="start.currentTime"
              type="time"
              title="选择时间"
              :columns-order="['month', 'day', 'year']"
              :formatter="formatter"
              @confirm="timeConfirm"
              @cancel="timeCancel"
            />
      </van-popup>



    </div>
</template>
<script>
import Why from "../components/Why.vue"
import send from "./send.vue"
import{mapGetters} from "vuex"
export default {
    computed:{
        ...mapGetters([
          'id',
        ])
    },
    created(){
        this.$store.commit("setTitle","我要请假")
        this.$store.commit("setUrl",'/')
    },
    components:{
        Why,
        send,
    },
    name:'edit',
        data() {
    return {
      diaShow:false,
      name:'',
      teacher:'',
      show: false,
       address:'',//定位
      //日起开始
      start:{
      startDate:'选择日期',
      startTime:'请选择时间',
      dateShow:false,//显示日期，并选择
       minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
      //日期结束
      //时间开始
      timeShow:false,
      currentTime: ""},
      // 时间结束
          //结束日起开始
      end:{
      startDate:'选择日期',
      startTime:'请选择时间',
      dateShow:false,//显示日期，并选择
       minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
      //日期结束
      //时间开始
      timeShow:false,
      currentTime: ""},
      // 结束时间结束
      //是否离校
      isLeave:false,
      phone:'',
      reason:'',
      fileList: [],//上传文件
      agree:false,//是否同意
      type:'请选择',
       columns: ['事假','病假','其他','返校申请','国庆请假'],
    };
  },
  mounted(){
    let start=new Date("2021-10-05 07:10")
    let end=new Date("2021-11-06 08:12")
    let sum=end-start;
   
    
  },
  methods: {
    diaCancel(){
        this.diaShow=false;
    },
    diaConfirm(){
      this.diaShow=false;
    },
    //改变地点
    changeAddr(){
      this.diaShow=true;
    },
    formatDate(date) {
      let year=date.getFullYear();
      let month=date.getMonth()+1;
      let day=date.getDate();
      return year+"-"+(month>10?month:'0'+month)+"-"+(day>10?day:'0'+day);
    },
  formatter(type, val) {
      if (type === 'year') {
        return val + '年';
      }
      if (type === 'month') {
        return val + '月';
      }
      if (type === 'day') {
        return val + '日';
      }
      return val;
    },

    //--------------------------
    onConfirm(val,index) {
        this.type=val;
        this.show=false;
        },
        //确定
        onChange(picker,val,index){
        },
        //取消
        onCancel(){
          this.show=false;
        },
        //弹出
        showPopup() {
      this.show = true;
      },
      //选择日期===开始
      chooseDate(){
          this.start.dateShow=true;
      },
      dateConfirm(val){
          //获得时间
          this.start.startDate=this.formatDate(val)
          
          this.start.dateShow=false;
      },
      dateCancel(val,index){
          this.start.dateShow=false;
      },

    // 结束时间的方法
     dateEndConfirm(val){
          //获得时间
          this.end.startDate=this.formatDate(val)
          
          this.end.dateShow=false;
      },
      dateEndCancel(val,index){
          this.end.dateShow=false;
      },
    chooseEndDate(){
      this.end.dateShow=true;

    },
    chooseEndTime(){
        this.end.timeShow=true;
    },
//=====

      //选择时间
    chooseTime(){
        this.start.timeShow=true;
    },
    timeConfirm(v){
        this.start.startTime=v;
        this.start.timeShow=false;
    },
    timeCancel(v){
      this.start.timeShow=false;
    },
    timeEndConfirm(v){
        this.end.startTime=v;
        this.end.timeShow=false;
    },
    timeEndCancel(v){
      this.end.timeShow=false;
    },
    //上传文件
      // 返回布尔值
    beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片');
        return false;
      }
      return true;
    },
    // 返回 Promise
    asyncBeforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.type !== 'image/jpeg') {
          Toast('请上传 jpg 格式图片');
          reject();
        } else {
          let img = new File(['foo'], 'bar.jpg', {
            type: 'image/jpeg',
          });
          resolve(img);
        }
      });
    },
    //确定请假
    submit(){
      let agree=this.agree;
      let type=this.type;
      let startTime=(this.start.startDate+":"+this.start.startTime)||0
      let endTime=(this.end.startDate+":"+this.end.startTime)||0
      let isLeave=this.isLeave;
      let phone=this.phone ||0;
      let reason=this.reason || 0;
      let address=this.address ||0;
      //先将其转化为日期型，才能计算
      let sum=new Date(endTime)-new Date(startTime)
       let day=Math.floor(sum/1000/3600/24)
      let hours=Math.floor(sum%(3600*24*1000)/(3600*1000));
      let minute=Math.floor(sum%(3600*1000))/(1000*60)
      let name=this.name||0;
      let teacher=this.teacher||0;
      

        //总时长
      let sumTime='共'         //保存的数据
      if(day){sumTime+=day+"天"}
      if(hours){sumTime+=hours+"小时"}
      if(minute){sumTime+=minute+"分钟"}
      
      //开始一个个加判断不能为空
      if(name===''||name===""||name===0){this.$toast("请填写名字");return false;}
      if(teacher===''||teacher===""||teacher===0){this.$toast("请填写辅导员");return false;}
      if(type.indexOf("选择")>0){this.$toast("请选择请假类型");return false;}
      if(this.start.startDate.indexOf("日期")>0){this.$toast("请选择开始日期");return false;}
      if(this.start.startTime.indexOf("选择")>0){this.$toast("请选择开始时间");return false;}
      if(this.end.startDate.indexOf("日期")>0){this.$toast("请选择结束日期");return false;}
      if(this.end.startTime.indexOf("选择")>0){this.$toast("请选择结束时间");return false;}
      if(!phone){this.$toast("请选择紧急联系人");return false;}
      if(!reason){this.$toast("请填写请假理由");return false;}
      if(!address){this.$toast("请填写地址");return false;}
      //如果开始时间比结束时间大，则不符合，
      if(sum<=0){
        this.$toast("结束日期不能小于或等于开始日期")
        return false
      }

        /*type:'',//请假类型
                startTime:null,//开始时间
                endTime:null,//结束时间
                isLeave:'',//是否离校
                reason:'',//请假理由
                sumTime:'',//总时长,
                address:'',//发起位置。
                phone:'',//紧急联系人
                recoredList:[],//存储记录，放到存储里*/
               
          if(agree!=-1){
              //放到缓存中
              let recored={type,startTime,endTime,isLeave,name,teacher,phone,reason,address,sumTime}
              this.$store.commit('setType',type);
              this.$store.commit('setStartTime',startTime);
              this.$store.commit('setEndTime',endTime);
              this.$store.commit('setIsLeave',isLeave);
              this.$store.commit('setPhone',phone);
              this.$store.commit('setReason',reason);
              this.$store.commit('setAddress',address);
              this.$store.commit('setSumTime',sumTime);
              this.$store.commit('setRecordList',recored)
              this.$store.commit('setName',name)
              this.$store.commit('setTeacher',teacher)
              this.$toast("请假成功!")
              this.$router.push({path:'/content'})
          }else{
            this.$toast("请勾选同意!")
          }

    }
  },
}
</script>
<style >
.van-picker__confirm{
  color: blue !important;
}
.time .van-cell__value{
  overflow: visible !important;
}
.time .date{
  width: 120%;
  float: left;
  position: relative;
  right: 20%;
  display: flex;
}
.time .date>div{
  flex: 1;
  text-align: left;
}
.phone{
  display: flex;
  justify-items: center;
  
}
.edit{
  position: relative;
  top:-10px;
  left: 0px;
  right: 0px;
  bottom: 20px;
  height: 500px;
  height: calc(100% - 100px);
  overflow: scroll;
}
.van-dialog__confirm, .van-dialog__confirm:active{
  color: blue;
}
</style>