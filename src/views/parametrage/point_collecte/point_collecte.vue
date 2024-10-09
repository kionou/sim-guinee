<template >
    <Loading v-if="loading" style="z-index: 99999"></Loading>

  <div>
      <div class="content-header">
    <div class="d-flex align-items-center justify-content-between">
      
        <h3 class="page-title">Les types de points de collecte </h3>
        <div class="d-inline-block align-items-center">
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/"><i class="mdi mdi-home-outline"></i></router-link></li>
              <li class="breadcrumb-item" aria-current="page">SIM</li>
              <li class="breadcrumb-item active" aria-current="page"> Les types de points de collecte</li>
            </ol>
          </nav>
        </div>
      
      
    </div>
  </div>

  <div class="col-12">
    <div class="box box-default">
      <div class="box-body">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs  " role="tablist" style=" overflow-x: scroll;  overflow-y: hidden; flex-wrap: nowrap !important;">
          <li
            class="nav-item"
            v-for="(marche, index) in MarchesOptions"
            :key="index" style="width: auto;
            text-wrap: nowrap;"
            :title="marche.description"
          >
            <a
              class="nav-link"
              :data-toggle="'tab'"
              :class="{ active: activeTab === `#tab-${marche.id_type_marche}` }"
              @click="handleTabClick(`#tab-${marche.id_type_marche}`)"
              :href="`#tab-${marche.id_type_marche}`"
              role="tab"
            >
              <span class="hidden-xs-down">
                {{ marche.nom_type_marche }}
                <span
                  class="badge ms-2 bg-warning fw-bolder font-size-16"
                  >   {{   marche.marches?.length }}
                  </span
                >
              </span>
            </a>
          </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content tabcontent-border">
          <div
            class="tab-pane"
            v-for="(marche, index) in MarchesOptions"
            :key="index"
            :id="`tab-${marche.id_type_marche}`"
            :class="{ active: activeTab === `#tab-${marche.id_type_marche}` }"
            role="tabpanel"
          >
            <div class="p-15">
              <!-- Composant lié au type de marché -->
               <ComposantDebarcadere @point-collecte-updated="handlePointCollecteUpdated" :description="marche.description"  :marches="marche.marches"  v-if="marche.id_type_marche === 6 " :id-type-marche="marche.id_type_marche" />
               <ComposantPort @point-collecte-updated="handlePointCollecteUpdated" :description="marche.description"  :marches="marche.marches"  v-if=" marche.id_type_marche === 7" :id-type-marche="marche.id_type_marche" />
                <ComposantMarche v-else :id-type-marche="marche.id_type_marche" :description="marche.description" @point-collecte-updated="handlePointCollecteUpdated"   :marches="marche.marches" />

                
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 

  </div>
</template>
<script>
  import Loading from "@/components/others/loading.vue";
import ComposantDebarcadere from "@/components/parametrages/type_collecte/debarcaderes.vue"
import ComposantPort from "@/components/parametrages/type_collecte/port.vue"
import ComposantMarche from "@/components/parametrages/type_collecte/collectes.vue"

import { useToast } from "vue-toastification";
import axios from '@/lib/axiosConfig'
export default {
  setup() {
 const toast = useToast();
 return { toast }
},
  components:{
    ComposantMarche ,  Loading , ComposantDebarcadere , ComposantPort
  },
  computed: {
  loggedInUser() {
    return this.$store.getters["auth/myAuthenticatedUser"];
  },
  totalPages() {
    return Math.ceil(this.MarchesOptions.length / this.itemsPerPage);
  },
  paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.MarchesOptions.slice(startIndex, endIndex);
  },

},
  data() {
      return {
        loading: true,
    activeTab: '#produit',
    marketCounts: {},
    MarchesOptions:[],
      }
  },

async mounted() {
  this.restoreActiveTab();
  await this.fetchTypesMarches()
  const savedTab = localStorage.getItem("PointCollecte");
    if (savedTab) {
      this.activeTab = savedTab;
    } else {
      this.activeTab = `#tab-${this.MarchesOptions[0].id_type_marche}`;
      localStorage.setItem("PointCollecte", this.activeTab);
    }
},
methods: {
  updateMarketCount({ idTypeMarche, count }) {
  this.marketCounts[idTypeMarche] = count;
},
 
 
  handleTabClick(tabId) {
      this.activeTab = tabId;
      localStorage.setItem("PointCollecte", tabId);
    },
  restoreActiveTab() {
    const savedTab = localStorage.getItem('PointCollecte');
    if (savedTab) {
      this.activeTab = savedTab;
    }
  },

  async fetchTypesMarches() {
    try {
      const response = await axios.get( '/parametrages/type-marches',
        {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          
        }
      );

      if (response.status === 200) {
           
            this.MarchesOptions =  response.data 
            this.loading =  false
      }
    } catch (error) {
  this.handleErrors(error);
    }
  },
  handlePointCollecteUpdated() {

this.fetchTypesMarches();
},
  triggerToast(errorMessage) {
    this.toast.error(errorMessage, {
      position: "top-right",
      timeout: 8000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: "mdi mdi-alert-circle-outline", // Modifier l'icône pour une icône d'erreur
      rtl: false,
      className: 'toast-error'
    });
  },


  async handleErrors(error) {
    console.log('Error:', error);
    if (error.response?.status === 500) {
      // Logique pour une erreur serveur
      //   this.$router.push("/maintenance"); // Redirection vers une page de maintenance si nécessaire
    }
    if (error.response?.data.detail.includes('204')) {
      this.loading = false;
      this.data = [];
      // Logique pour une erreur serveur
      //   this.$router.push("/maintenance"); // Redirection vers une page de maintenance si nécessaire
    }
    else if
     (error.response?.status === 401 || error.response?.data.detail.includes(401)) {
      await this.$store.dispatch("auth/clearMyAuthenticatedUser");
      this.$router.push("/"); // Redirection vers la page de connexion
    } else if (error.response?.status === 404 || error.response?.data.detail.includes(404)) {
      this.loading = false;
      this.data = [];
    } else {
      this.triggerToast(error.response?.data.detail);
      this.loading = false;
      return false;
    }
  },

},
beforeRouteLeave(to, from, next) {
  console.log('kiter');
  
  // Supprimer l'onglet actif du localStorage si on quitte cette page
  localStorage.removeItem('PointCollecte');
  next();
},
  
}
</script>
<style lang="css" scoped>
  
</style>