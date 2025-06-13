import { createRouter, createWebHistory } from 'vue-router';
import AuthLayout from '../layouts/AuthLayout.vue';
import MainLayout from '../layouts/MainLayout.vue';

// View imports
import Login from '../views/Login.vue'; // Using existing import name
import Register from '../views/Register.vue'; // Using existing import name
import HomeView from '../views/HomeView.vue';
import Profile from '../views/Profile.vue'; // Using existing import name
import UploadView from '../views/UploadView.vue';
import PlaceholderView from '../views/PlaceholderView.vue';
// SearchView is not explicitly used in the new routes configuration from the prompt for /search

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', name: 'Login', component: Login }, // Mapped to Login
      { path: 'register', name: 'Register', component: Register }, // Mapped to Register
      // Redirect /auth to /auth/login if accessed directly
      { path: '', redirect: '/auth/login' }
    ]
  },
  {
    path: '/',
    component: MainLayout,
    // If a user is logged in and lands on '/', redirect to a default main app page like '/home'
    // If not logged in, the beforeEach guard will redirect to /auth/login
    redirect: '/home',
    children: [
      { path: 'home', name: 'Home', component: HomeView },
      { path: 'profile', name: 'Profile', component: Profile }, // Mapped to Profile
      { path: 'upload', name: 'Upload', component: UploadView },
      {
        path: 'photos',
        name: 'MyPhotos',
        component: HomeView // MyPhotos also uses HomeView as per prompt
      },
      { path: 'favorites', name: 'Favorites', component: PlaceholderView },
      { path: 'shared', name: 'Shared', component: PlaceholderView },
      { path: 'trash', name: 'Trash', component: PlaceholderView },
      { path: 'settings', name: 'Settings', component: PlaceholderView },
      {
        path: 'search',
        name: 'Search',
        component: PlaceholderView, // As per prompt's new route list for /search
        props: route => ({ query: route.query.q })
      },
    ]
  },
  // Optional: A catch-all 404 Not Found route
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('../views/NotFoundView.vue') // Create this view if desired
  // }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const publicPaths = ['/auth/login', '/auth/register'];
  const isAuthRouteBranch = to.path.startsWith('/auth/'); // Checks if route is under /auth path
  const isPublicPage = publicPaths.includes(to.path);

  const loggedIn = localStorage.getItem('user');

  if (loggedIn && isPublicPage) {
    // If logged in and trying to access login/register, redirect to home
    return next('/home');
  }

  // If trying to access a route that is not public and not under /auth branch while not logged in
  if (!loggedIn && !isPublicPage && !isAuthRouteBranch) {
    return next('/auth/login');
  }

  // If accessing /auth or /auth/ (without specific child like login/register) and not logged in, redirect to /auth/login
  // If logged in, they'd be redirected to /home by the above rule anyway if they hit /auth/login or /auth/register
  // This handles the case where they go to /auth and are not logged in.
  if ((to.path === '/auth' || to.path === '/auth/') && !loggedIn) {
      return next('/auth/login');
  }

  // If accessing root / and not logged in, the !loggedIn && !isPublicPage && !isAuthRouteBranch guard
  // (since to.path is '/' which is not isAuthRouteBranch and not isPublicPage)
  // will redirect to /auth/login.
  // If logged in and accessing root /, the route definition itself redirects to /home.

  next();
});

export default router;
