import Vue from 'vue'
import VueRouter from 'vue-router'


// import Login from './components/Login.vue'
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Login.vue')
// import Home from './components/Home.vue'
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Home.vue')
// import Welcome from './components/Welcome.vue'
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Welcome.vue')

// import Users from './components/user/Users.vue'
const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/user/User.vue')
// import Rights from './components/power/Rights.vue'
const Rights = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/power/Rights.vue')
// import Roles from './components/power/Roles.vue'
const Roles = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/power/Roles.vue')

// import Cate from './components/goods/Cate.vue'
const Categories = () => import(/* webpackChunkName: "Cate_Params" */ '../components/goods/Categories.vue')
// import Params from './components/goods/Params.vue'
const Params = () => import(/* webpackChunkName: "Cate_Params" */ '../components/goods/Params.vue')

// import GoodsList from './components/goods/List.vue'
const List = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/goods/List.vue')
// import Add from './components/goods/Add.vue'
const Addgoods = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/goods/Addgoods.vue')

// import Order from './components/order/Order.vue'
const Order = () => import(/* webpackChunkName: "Order_Report" */ '../components/order/Order.vue')
// import Report from './components/report/Report.vue'
const Reports = () => import(/* webpackChunkName: "Order_Report" */ '../components/reports/Reports.vue')





Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: Welcome,
    },
    {
      path: '/users',
      component: Users,
    },
    {
      path: '/roles',
      component: Roles,
    },
    {
      path: '/rights',
      component: Rights,
    },
    {
      path: '/categories',
      component: Categories,
    },
    {
      path: '/params',
      component: Params,
    },
    {
      path: '/goods',
      component: List,
    },
    {
      path: '/goods/add',
      component: Addgoods,
    },
    {
      path: '/orders',
      component: Order,
    },
    {
      path: '/reports',
      component: Reports,
    }]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) {
    return next('/login')
  }
  next()
})

export default router
