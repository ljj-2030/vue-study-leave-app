import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
 {
   name:'home',
   path:'/',
   component:()=>import("../views/home"),
  
 },
 {
   name:"edit",
   path:'/edit',
   component:()=>import("../views/edit"),
  
 },
 {
  name:"content",
  path:'/content',
  component:()=>import("../views/Content"),
  
},
  

]


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
