import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import Login from '../views/auth/Login.vue'

import Users from '../views/parametrage/users/default.vue'
import Droits from '../views/parametrage/users/droits.vue'
import Profil from '../views/parametrage/users/profil.vue'


import Dashboard from '../views/dashboad/default.vue'
import Accueil from '../views/dashboad/index.vue'


import Localite from '../views/parametrage/localites/default.vue'
import Collectes from '../views/parametrage/collectes/default.vue'
import Magasins from '../views/parametrage/magasins/default.vue'
import TypeProduits from '../views/parametrage/type-produits/default.vue'



import SuiviPointCollecte from '../views/suivi_point_collecte/suivi_point_collect.vue'
import Types_marches from '../views/parametrage/point_collecte/types.vue'
import point_collecte from '../views/parametrage/point_collecte/point_collecte.vue'




import Fiches_Collectes from '../views/Fiche_collecte/default.vue'
import Fiches_Collectes_Par_Marches_Collecte from '../views/Fiche_collecte/parmarchescollecte.vue'
import Fiches_Collectes_Par_Marches_Con from '../views/Fiche_collecte/parmarchesconso.vue'
import Fiches_Collectes_Par_Marches_Grossiste from '../views/Fiche_collecte/parmarchesgrossiste.vue'
import Enquete_Prix_Par_Marches_Collecte from '../views/Prix_marche/collecte.vue'
import Enquete_Prix_Par_Marches_Grossiste from '../views/Prix_marche/grossiste.vue'
import Enquete_Prix_Par_Marches_Consommation from '../views/Prix_marche/consommation.vue'


import Test from '../views/test.vue'









const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Connexion',
      component: Login
    },

    {
      path: '/test',
      name: 'test',
      component: Test
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
            path: 'utilisateurs',
            name: 'utilisateurs',
            meta: { requiresAuth: true },
             component: Users
          },
          {
            path: 'droits',
            name: 'roles-permissiosns',
            meta: { requiresAuth: true },
             component: Droits
          },
          {
            path: 'profil',
            name: 'profil',
            meta: { requiresAuth: true },
             component: Profil
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
            path: 'types-marches',
            name: 'types-marches',
            meta: { requiresAuth: true },
             component: Types_marches
          },
          {
            path: 'points-collecte',
            name: 'points-collecte',
            meta: { requiresAuth: true },
             component: point_collecte
          },
          {
            path: 'suivis-points-collecte',
            name: 'suivis-points-collecte',
            meta: { requiresAuth: true },
             component: SuiviPointCollecte
          },
          {
            path: 'magasins',
            name: 'magasins',
            meta: { requiresAuth: true },
             component: Magasins
          },
       
          {
            path: 'produits',
            name: 'produits',
            meta: { requiresAuth: true },
             component: TypeProduits
          },
          {
            path: 'fiches-collectes',
            name: 'fiches-collectes',
            meta: { requiresAuth: true },
             component: Fiches_Collectes
          },
          {
            path: 'fiches-enquetes/marche-collecte/:nom/:id',
            name: 'fiches-enquetes-type-marche-collecte',
            props:true,
            meta: { requiresAuth: true },
             component: Fiches_Collectes_Par_Marches_Collecte
          },
          {
            path: 'fiches-enquetes/marche-consommation/:nom/:id',
            name: 'fiches-enquetes-type-marche-consommation',
            props:true,
            meta: { requiresAuth: true },
             component: Fiches_Collectes_Par_Marches_Con
          },
          {
            path: 'fiches-enquetes/marche-grossiste/:nom/:id',
            name: 'fiches-enquetes-type-marche-grossiste',
            props:true,
            meta: { requiresAuth: true },
             component: Fiches_Collectes_Par_Marches_Grossiste
          },
          {
            path: 'enquete-prix-par-marche/C/:nom/:id',
            name: 'enquete-prix-par-marche-collecte',
            props:true,
            meta: { requiresAuth: true },
             component: Enquete_Prix_Par_Marches_Collecte
          },
          {
            path: 'enquete-prix-par-marche/G/:nom/:id',
            name: 'enquete-prix-par-marche-grossiste',
            props:true,
            meta: { requiresAuth: true },
             component: Enquete_Prix_Par_Marches_Grossiste
          },
          {
            path: 'enquete-prix-par-marche/CS/:nom/:id',
            name: 'enquete-prix-par-marche-consommation',
            props:true,
            meta: { requiresAuth: true },
             component: Enquete_Prix_Par_Marches_Consommation
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
