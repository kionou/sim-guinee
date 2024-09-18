<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>

    <div class="content-header">
      <div class="d-flex align-items-center justify-content-between">
        <h3 class="page-title">Fiches d'enquêtes herdomadaire</h3>
        <div class="d-inline-block align-items-center">
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="mdi mdi-home-outline"></i></router-link>
              </li>
              <li class="breadcrumb-item" aria-current="page">SIM</li>
              <li class="breadcrumb-item active" aria-current="page">Fiches d'enquêtes herdomadaire</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>

    <div class="col-12">
      <div class="box box-default">
        <!-- /.box-header -->
        <div class="mt-2 float-right" style="width: 98% !important;">
          <div class="float-end w-80 h-30 d-flex align-items-center" style="background-color:var(--color-primary) !important">
            <a class="p-2 text-white fs-15" @click="goBack" href="#"> &larr; Retour</a>
          </div>
        </div>

        <div class="box-body">
          <!-- Nav tabs -->
          <div v-if="data.length === 0">
            <ul class="nav nav-tabs justify-content-center" role="tablist">
              <li class="nav-item"> 
                <a class="nav-link active" data-toggle="tab" href="#naturelle" role="tab">
                  <span class="hidden-xs-down">pas de donnée</span>
                </a> 
              </li>
            </ul>

            <div class="tab-content tabcontent-border">
              <div class="tab-pane active" id="naturelle" role="tabpanel">
                <div class="p-15">
                  <p>Aucune enquête disponible pour l'année </p>
                  <Collectes :enquetes="[]" :nom="nom" :id="id" @enquete-updated="handleEnqueteUpdated"></Collectes>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <ul class="nav nav-tabs justify-content-center" role="tablist">
              <li class="nav-item" v-for="(item, index) in data" :key="index">
                <a class="nav-link" 
                   :class="{ active: activeTab === item.year }"
                   data-toggle="tab"
                   @click="handleTabClick(item.year)"
                   :href="`#year-${item.year}`"
                   role="tab">
                  <span class="hidden-xs-down">
                    {{ item.year }}
                    <span class="badge ms-2 bg-warning fw-bolder font-size-16">
                      {{ item?.enquetes?.length ?? '0' }}
                    </span>
                  </span>
                </a>
              </li>
            </ul>

            <div class="tab-content tabcontent-border">
              <div v-for="(item, index) in data" 
                   :key="index" 
                   class="tab-pane" 
                   :class="{ active: activeTab === item.year }"
                   :id="`year-${item.year}`" 
                   role="tabpanel">
                <div class="p-15">
                  <Collectes :enquetes="item.enquetes" :year="item.year" :nom="nom" :id="id" @enquete-updated="handleEnqueteUpdated"></Collectes>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>

<script>
import Collectes from "@/components/fiche_enquete_compo/hebdomadaire.vue"
import { useToast } from "vue-toastification";
import axios from '@/lib/axiosConfig'
import Loading from "@/components/others/loading.vue";


export default {
    setup() {
    const toast = useToast();
    return { toast }
  },
    components:{
        Collectes ,  Loading
    },
    props:['id', 'nom'],
    computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPages() {
      return Math.ceil(this.UnitesOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.UnitesOptions.slice(startIndex, endIndex);
    },

  },
    data() {
        return {
            activeTab: '',
            data: [], 
            filteredMarches: [],
            error204:false,
            loading:true
        }
    },

	async mounted() {
    await this.fetchMarchesTypes()
 

    const savedTab = localStorage.getItem("activeTabFicheCollecte");

    if (savedTab && this.data.some(item => item.year === Number(savedTab))) {
        this.activeTab = Number(savedTab); // Utiliser l'onglet sauvegardé si valide
      } else if (this.data.length > 0) {
        // Si l'onglet n'est pas trouvé ou n'existe pas, utiliser le premier onglet
        this.activeTab = this.data[0]?.year ?? null;
        localStorage.setItem("activeTabFicheCollecte", this.activeTab); // Sauvegarder le nouvel onglet
      }

		
	},
	methods: {
        goBack() {
      this.$router.go(-1);
    },
    handleTabClick(year) {
      this.activeTab = year;
      localStorage.setItem("activeTabFicheCollecte", year); // Sauvegarder l'onglet dans le localStorage
    },
        async fetchMarchesTypes() {
      try {
        const response = await axios.get( `enquetes/Fiches/par-marche/{id}?identite=${this.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          }
        );
		  console.log('dataresponsetypes',response)
        if (response.status === 200) {
          this.data = response.data;
          
       
const savedTab = localStorage.getItem("activeTabFicheCollecte");

if (savedTab && this.data.some(item => item.year === Number(savedTab))) {
        this.activeTab = Number(savedTab); // Utiliser l'onglet sauvegardé si valide
      } else if (this.data.length > 0) {
        // Si l'onglet n'est pas trouvé ou n'existe pas, utiliser le premier onglet
        this.activeTab = this.data[0]?.year ?? null;
        localStorage.setItem("activeTabFicheCollecte", this.activeTab); // Sauvegarder le nouvel onglet
      }
          this.loading = false
          
        }
      } catch (error) {
         this.handleErrors(error);
      }
    },
    handleEnqueteUpdated() {

      this.fetchMarchesTypes();
    },
		handleTabClick(tabId) {
    localStorage.setItem('activeTabFicheCollecte', tabId);
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
        console.log('bonjourrr')
        this.loading = false;
        this.data.length = 0;
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
      } else if(error.response?.data.detail === "An error occured") {
        this.loading = false;
        this.data = [];
        }else{
        this.triggerToast(error.response?.data.detail);
        this.loading = false;
        return false;
      }
    },
	},
//     beforeRouteLeave(to, from, next) {
//     console.log('kiter');
    
//     // Supprimer l'onglet actif du localStorage si on quitte cette page
//     localStorage.removeItem('activeTabFicheCollecte');
//     next();
//   },
    
}
</script>
<style lang="css" scoped>
    
</style>