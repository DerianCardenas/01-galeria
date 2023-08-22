import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Index from '../views/Index.vue'
import Profile from '../views/Profile.vue'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import UploadView from '../views/UploadView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/',
    name: 'fotos',
    redirect:"/inicio",
    component: Index,
    children:[
      {
        path: '/inicio',
        name: 'home',
        component: HomeView,
      },
      {
        path: '/buscar',
        name: 'buscar',
        component: SearchView
      },
      {
        path: '/subir',
        name: 'subir',
        component: UploadView
      },
      {
        path: '/perfil',
        name: 'perfil',
        component: Profile
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach(async (to, from, next) => {
  var nextPage = to.name;
  var isAuth = false;
  const data = JSON.parse(localStorage.getItem("user"));
  if(data != null ){
    isAuth = true;
  }
  if(nextPage === 'login' && isAuth) {
    next('/inicio');
  }else if(nextPage == 'register' && !isAuth) {
    next();
  }else if(nextPage !== 'login' && !isAuth) {
    next('/login');
  }
  else next();

});
export default router
