import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
// import Index from '../views/Index.vue'; // Index.vue has been deleted
import Profile from '../views/Profile.vue'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import UploadView from '../views/UploadView.vue'
import PlaceholderView from '../views/PlaceholderView.vue'; // Import PlaceholderView

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
  // Main application routes, now top-level after removing Index.vue
  {
    path: '/',
    name: 'Home', // Renamed from 'fotos', Sidebar uses 'Home' for path '/'
    component: HomeView
  },
  // '/inicio' is removed as '/' now directly loads HomeView.
  // '/buscar' is removed, assuming '/search' (from Topbar) is the primary search.
  // '/subir' is removed, assuming '/upload' (from Topbar/Sidebar) is the primary upload.
  // '/perfil' is removed, assuming '/profile' (from Topbar) is the primary profile.

  // Routes for Topbar & Sidebar functionality (some might be duplicates if old paths were similar)
  { path: '/profile', name: 'Profile', component: Profile }, // Kept top-level
  { path: '/settings', name: 'Settings', component: PlaceholderView },
  { path: '/search', name: 'Search', component: SearchView, props: route => ({ query: route.query.q }) }, // Pointing to actual SearchView
  { path: '/upload', name: 'Upload', component: UploadView },

  // New Sidebar Routes (or ensuring they are correctly defined)
  { path: '/photos', name: 'MyPhotos', component: HomeView }, // Pointing My Photos to HomeView as well
  { path: '/favorites', name: 'Favorites', component: PlaceholderView },
  { path: '/shared', name: 'Shared', component: PlaceholderView },
  { path: '/trash', name: 'Trash', component: PlaceholderView },
  // Ensure SearchView is imported if it's used for /search
  // Ensure UploadView is imported if it's used for /upload (already is)
  // Ensure Profile is imported if it's used for /profile (already is)
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
  // Updated redirect logic for the new default path '/'
  if(nextPage === 'login' && isAuth) {
    next('/'); // Redirect to new home path
  } else if (nextPage === 'register' && isAuth) { // Added case for authenticated user trying to access register
    next('/'); // Redirect to new home path
  } else if (nextPage !== 'login' && nextPage !== 'register' && !isAuth) { // If not login/register and not authenticated
    next('/login');
  }
  else {
    next(); // Proceed as normal
  }
});
export default router
