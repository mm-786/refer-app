// import { Plugins } from '@capacitor/core';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import ChangePasswordPage from '../views/ChangePasswordPage.vue'

import Help from '../views/HelpPage.vue'
import { App } from '@capacitor/app';


const routes = [
 
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePasswordPage
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  }
]

// App.addListener('appUrlOpen', function (data) {
//   // Example url: https://beerswift.app/tabs/tabs2
//   // slug = /tabs/tabs2
//   const slug = data.url.split('.app').pop();

//   // We only push to the route if there is a slug present
//   if (slug) {
//     router.push({
//       path: slug,
//     });
//   }
// });

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

App.addListener('appUrlOpen',  async function (data) {
  const code = await data.url.split('?')
  if(code[1]!=undefined){
    window.localStorage.clear();
      router.replace('/register?'+code[1])
  }
})

export default router
