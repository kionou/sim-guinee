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
import Types_marches from '../views/parametrage/point_collecte/types.vue'
import point_collecte from '../views/parametrage/point_collecte/point_collecte.vue'
import Magasins from '../views/parametrage/magasins/default.vue'
import TypeProduits from '../views/parametrage/type-produits/default.vue'

import Suivi_All_marches from '../views/parametrage/point_collecte/all_marches.vue'

import Fiches_Collectes_Par_Marches_Collecte from '../views/Fiche_enquete/parmarchescollecte.vue'
import Fiches_Collectes_Par_Marches_Grossiste from '../views/Fiche_enquete/parmarchesgrossiste.vue'
import Fiches_Collectes_Par_Marches_Herdomadaire from '../views/Fiche_enquete/parmarchesherdomadaire.vue'
import Fiches_Collectes_Par_Marches_Journaliere from '../views/Fiche_enquete/parmarchejournaliere.vue'
import Fiches_Collectes_Par_Marches_Betail from '../views/Fiche_enquete/parmarchebetail.vue'
import Fiches_Collectes_Par_Marches_Debarcadere from '../views/Fiche_enquete/parmarchedebarcadere.vue'
import Fiches_Collectes_Par_Marches_Port from '../views/Fiche_enquete/parmarcheport.vue'
import Fiches_Collectes_Par_Marches_Frontaliere from '../views/Fiche_enquete/parmarchefrontaliere.vue'

import Enquete_Prix_Par_Marches_Collecte from '../views/Prix_marche/collecte.vue'
import Enquete_Prix_Par_Marches_Grossiste from '../views/Prix_marche/grossiste.vue'
import Enquete_Prix_Par_Marches_Hebdomadaire from '../views/Prix_marche/hebdomadaire.vue'
import Enquete_Prix_Par_Marches_Journaliere from '../views/Prix_marche/journaliere.vue'
import Enquete_Prix_Par_Marches_Betail from '../views/Prix_marche/betail.vue'
import Enquete_Prix_Par_Marches_Debarcadere from '../views/Prix_marche/debarcaderes.vue'
import Enquete_Prix_Par_Marches_Port from '../views/Prix_marche/port.vue'
import Enquete_Prix_Par_Marches_Frontaliere from '../views/Prix_marche/frontaliere.vue'

// import Fiches_Collectes from '../views/Fiche_enquete/default.vue'
// import SuiviPointCollecte from '../views/parametrage/point_collecte/default.vue'


// autres parametrage

import Chiffre from '../views/autrre_parametrage/chiffres/default.vue'
import Besoins from '../views/autrre_parametrage/besoins/default.vue'
import Disponibilite from '../views/autrre_parametrage/disponibilites/default.vue'

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
          // debut parametrage
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
          // debut suivis point collect
          {
            path: 'suivis-points-collecte/:id',
            name: 'suivis-points-collecte',
            props:true,
            meta: { requiresAuth: true },
             component: Suivi_All_marches
          },
          // {
          //   path: 'fiches-collectes',
          //   name: 'fiches-collectes',
          //   meta: { requiresAuth: true },
          //    component: Fiches_Collectes
          // },
            // debut fiche enquete
          {
            path: 'fiches-enquetes/marche-collecte/:nom/:id',
            name: 'fiches-enquetes-type-marche-collecte',
            props:true,
            meta: { requiresAuth: true },
             component: Fiches_Collectes_Par_Marches_Collecte
          },
          {
            path: 'fiches-enquetes/marche-grossiste/:nom/:id',
            name: 'fiches-enquetes-type-marche-grossiste',
            props:true,
            meta: { requiresAuth: true },
             component: Fiches_Collectes_Par_Marches_Grossiste
          },
          {
            path: 'fiches-enquetes/marche-hebdomadaire/:nom/:id',
            name: 'fiches-enquetes-type-marche-hebdomadaire',
            props:true,
            meta: { requiresAuth: true },
             component: Fiches_Collectes_Par_Marches_Herdomadaire
          },
          {
            path: 'fiches-enquetes/marche-journaliere/:nom/:id',
            name: 'fiches-enquetes-type-marche-journaliere',
            props:true,
            meta: { requiresAuth: true },
             component: Fiches_Collectes_Par_Marches_Journaliere
          },
          {
            path: 'fiches-enquetes/marche-betail/:nom/:id',
            name: 'fiches-enquetes-type-marche-betail',
            props:true,
            meta: { requiresAuth: true },
             component: Fiches_Collectes_Par_Marches_Betail
          },
          {
            path: 'fiches-enquetes/marche-debarcadere/:nom/:id',
            name: 'fiches-enquetes-type-marche-debarcadere',
            props:true,
            meta: { requiresAuth: true },
             component: Fiches_Collectes_Par_Marches_Debarcadere
          },
          {
            path: 'fiches-enquetes/marche-port/:nom/:id',
            name: 'fiches-enquetes-type-marche-port',
            props:true,
            meta: { requiresAuth: true },
             component: Fiches_Collectes_Par_Marches_Port
          },
          {
            path: 'fiches-enquetes/marche-transfrontalier/:nom/:id',
            name: 'fiches-enquetes-type-marche-transfrontalier',
            props:true,
            meta: { requiresAuth: true },
             component: Fiches_Collectes_Par_Marches_Frontaliere
          },
          // debut prix enquete
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
            path: 'enquete-prix-par-marche/H/:nom/:id',
            name: 'enquete-prix-par-marche-hebdomadaire',
            props:true,
            meta: { requiresAuth: true },
             component: Enquete_Prix_Par_Marches_Hebdomadaire
          },
          {
            path: 'enquete-prix-par-marche/J/:nom/:id',
            name: 'enquete-prix-par-marche-journaliere',
            props:true,
            meta: { requiresAuth: true },
             component: Enquete_Prix_Par_Marches_Journaliere
          },
          {
            path: 'enquete-prix-par-marche/B/:nom/:id',
            name: 'enquete-prix-par-marche-betail',
            props:true,
            meta: { requiresAuth: true },
             component: Enquete_Prix_Par_Marches_Betail
          },
          {
            path: 'enquete-prix-par-marche/D/:nom/:id',
            name: 'enquete-prix-par-marche-debarcadere',
            props:true,
            meta: { requiresAuth: true },
             component: Enquete_Prix_Par_Marches_Debarcadere
          },
          {
            path: 'enquete-prix-par-marche/P/:nom/:id',
            name: 'enquete-prix-par-marche-port',
            props:true,
            meta: { requiresAuth: true },
             component: Enquete_Prix_Par_Marches_Port
          },
          {
            path: 'enquete-prix-par-marche/T/:nom/:id',
            name: 'enquete-prix-par-marche-transfrontalier',
            props:true,
            meta: { requiresAuth: true },
             component: Enquete_Prix_Par_Marches_Frontaliere
          },

          // autres parametrages

          {
            path: 'chiffres-cles',
            name: 'chiffres-cles',
            props:true,
            meta: { requiresAuth: true },
             component: Chiffre
          },
          {
            path: 'besoins',
            name: 'besoins',
            props:true,
            meta: { requiresAuth: true },
             component: Besoins
          },
          {
            path: 'disponibilites-besoins',
            name: 'disponibilites-besoins',
            props:true,
            meta: { requiresAuth: true },
             component: Disponibilite
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
