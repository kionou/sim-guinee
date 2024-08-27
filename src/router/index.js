import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import Login from '../views/auth/Login.vue'

import Dashboard from '../views/dashboad/default.vue'
import Accueil from '../views/dashboad/index.vue'

import Localite from '../views/parametrage/localites/default.vue'

import Collectes from '../views/parametrage/collectes/default.vue'

import Marches from '../views/parametrage/marches/default.vue'

import Magasins from '../views/parametrage/magasins/default.vue'

import Debarcaderes from '../views/parametrage/debarcaderes/default.vue'






const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Connexion',
      component: Login
    },
    {
      
        path: '/sim',
        name: 'Accueil',
        component: Dashboard,
         meta: { requiresAuth: true },
        children:[
          {
            path: '',
            name: 'dashboard-accueil',
            meta: { requiresAuth: true },
             component: Accueil
          },
          {
            path: 'localites',
            name: 'localites',
            meta: { requiresAuth: true },
             component: Localite
          },
          {
            path: 'collectes',
            name: 'collectes',
            meta: { requiresAuth: true },
             component: Collectes
          },
          {
            path: 'marches',
            name: 'marches',
            meta: { requiresAuth: true },
             component: Marches
          },
          {
            path: 'magasins',
            name: 'magasins',
            meta: { requiresAuth: true },
             component: Magasins
          },
          {
            path: 'debarcaderes',
            name: 'debarcaderes',
            meta: { requiresAuth: true },
             component: Debarcaderes
          },
        ]
    }
  
    
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  if (requiresAuth && !isAuthenticated) {
    // Si la route nécesite une authentification et l'utilisateur n'est pas connecté,
    // redirigez-le vers la page de connexion
    next("/");
  } else if (to.name === "Connexion" && isAuthenticated) {
    // Si l'utilisateur est connecté et essaie d'accéder aux pages d'inscription ou de connexion,
    // redirigez-le vers la page mon_espace
   
      next("/sim");
    
  } else {
    next();
  }
});

export default router
