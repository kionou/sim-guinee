<template >
	<div>
		<Loading v-if="loading" style="z-index: 99999"></Loading>

		<div class="content-header">
			<div class="d-flex align-items-center justify-content-between">
	
				<h3 class="page-title"> Marchés </h3>
				<div class="d-inline-block align-items-center">
					<nav>
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><router-link to="/"><i
										class="mdi mdi-home-outline"></i></router-link></li>
							<li class="breadcrumb-item" aria-current="page">SIM</li>
							<li class="breadcrumb-item active" aria-current="page">Marchés</li>
						</ol>
					</nav>
				</div>
	
	
			</div>
		</div>
    
		<div class="col-12">
			<div class="box box-default">
	
				<div class="box-body">
					<!-- Nav tabs -->
					<ul class="nav nav-tabs justify-content-center" role="tablist">
						<li v-for="marche in filteredMarches" :key="marche.value" class="nav-item">
							<a :class="['nav-link', { active: marche.value === activeTab }]" data-toggle="tab"
								@click="handleTabClick(`#${marche.label.toLowerCase().replace(/ /g, '')}`)"
								:href="`#${marche.label.toLowerCase().replace(/ /g, '')}`" role="tab">
								<span class="hidden-xs-down">{{ marche.label }}  <span class="badge ms-2 bg-warning fw-bolder font-size-16">
                         {{ getCountForType(marche.value) }}
            </span></span>
							</a>
						</li>
					</ul>
					<!-- Tab panes -->
					<div class="tab-content tabcontent-border">
						<div v-for="marche in filteredMarches" :key="marche.value"
							:class="['tab-pane', { active: marche.value === activeTab }]"
							:id="marche.label.toLowerCase().replace(/ /g, '')" role="tabpanel">
							<div class="p-15">
								<!-- <Collecte v-if="marche.value === 1" :marches-data="getMarchesData(marche.value)" />
                <Consommation v-if="marche.value === 3" :marches-data="getMarchesData(marche.value)" />
                <Grossiste v-if="marche.value === 2" :marches-data="getMarchesData(marche.value)" /> -->
							</div>
						</div>
					</div>
				</div>
	
			</div>
	
		</div>
	</div>
</template>
<script>
// import Collecte from "@/components/parametrages/marches/collecte.vue"
// import Consommation from "@/components/parametrages/marches/consommation.vue"
// import Grossiste from "@/components/parametrages/marches/grossiste.vue"

import { useToast } from "vue-toastification";
import axios from '@/lib/axiosConfig'
import Loading from "@/components/others/loading.vue";

export default {
  setup() {
    const toast = useToast();
    return { toast }
  },
  components: {
     Loading 
  },
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
      activeTabMarche: null,
	  loading:true,

      Marches: [
        { label: " Collecte", value: 1 },
        { label: " Grossiste", value: 2 },
        { label: "  Hebdomadaire", value: 3 },
        { label: "  Journalière", value: 4 },
        { label: " Bétail", value: 5 },
        { label: " Transfrontalier", value: 8 },
      ],
      data: [], 
      filteredMarches: [],

    }
  },

  async mounted() {
    await this.fetchMarchesTypes();
	const activeTab = localStorage.getItem("activeTabMarcheLocal");
	if (activeTab) {
        // Si un onglet actif est trouvé dans le localStorage, on simule un clic dessus
        const tabElement = document.querySelector(`[href="${activeTab}"]`);
        if (tabElement) {
            tabElement.click(); // Simuler un clic pour activer l'onglet
        }
    } else {
        // Si aucun onglet n'est trouvé dans le localStorage, on active le premier onglet par défaut
        const firstTabElement = document.querySelector('.nav-tabs .nav-link');
        if (firstTabElement) {
            firstTabElement.click(); // Simuler un clic sur le premier onglet
            // Stocker l'ID du premier onglet dans le localStorage
            localStorage.setItem('activeTabMarcheLocal', firstTabElement.getAttribute('href'));
            this.activeTabMarche = this.Marches[0]?.value;
        }
    }

  },
  methods: {
	handleTabClick(tabId) {
    localStorage.setItem("activeTabMarcheLocal", tabId);
    this.activeTabMarche = this.Marches.find(
      (marche) =>
        `#${marche.label.toLowerCase().replace(/ /g, '')}` === tabId
    )?.value;
  },
    async fetchMarchesTypes() {
      try {
        const response = await axios.get(
          "/parametrages/marches/par-type/marche",
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          }
        );
		  console.log('dataresponse',response)
        if (response.status === 200) {
          this.data = response.data;
          this.filteredMarches = this.Marches.filter((marche) =>
            this.data.some((item) => item.type_marche === marche.value)
          );
		  this.loading = false
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
	getCountForType(typeMarche) {
      const marcheData = this.data.find(
        (item) => item.type_marche === typeMarche
      );
      return marcheData ? marcheData.marches.length : 0;
    },
	getMarchesData(typeMarche) {
      const marcheData = this.data.find(
        (item) => item.type_marche === typeMarche
      );
      return marcheData ? marcheData.marches : [];
    },
    getComponent(value) {
      switch (value) {
        case 1:
          return "Collectes";
        case 2:
          return "Consommations";
        case 3:
          return "Grossistes";
        default:
          return "UnknownComponent";
      }
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
        console.log('bonjour')
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
    localStorage.removeItem('activeTabMarcheLocal');
    next();
  },

}
</script>
<style lang="css" scoped>

</style>