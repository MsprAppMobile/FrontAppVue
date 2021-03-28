import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Create from '../views/CreateCode.vue'
import SaveQrCode from '../views/SaveQrCode.vue'
import ListCodes from '../views/ListCodes.vue'
import ListUsers from '../views/ListUsers.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path:'/create',
    name :'Create',
    component : Create
  },
  {
    path:'/save',
    name:'Save',
    component : SaveQrCode
  },
  {
    path:'/codes',
    name:'Codes',
    component : ListCodes
  },
  {
    path:'/users',
    name:'Users',
    component : ListUsers
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
