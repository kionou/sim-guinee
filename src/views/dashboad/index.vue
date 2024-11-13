<template >
	<div>
		<Loading v-if="loading" style="z-index: 99999"></Loading>
	
		<div class="content-header">
			<div class="d-flex align-items-center justify-content-between">
	
				<h3 class="page-title"> Tableau de bord </h3>
	
				<div class="d-inline-block align-items-center">
					<nav>
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><router-link to="/"><i
										class="mdi mdi-home-outline"></i></router-link></li>
							<li class="breadcrumb-item" aria-current="page">SIM</li>
							<li class="breadcrumb-item active" aria-current="page">Tableau de bord</li>
						</ol>
					</nav>
				</div>
	
	
			</div>
		</div>
		<!-- Main content -->
		<section class="content">
			<div class="row">
	
				<div class="col-md-6 col-lg-3" v-for="(item, index) in data" :key="index" data-aos="zoom-out-down">
					<div class="box pull-up">
						<div class="box-body">
							<div class="d-flex align-items-end justify-content-start">
								<!-- <div class="progress vertical progress-xxs h-100 mb-0">
									<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="height: 70%">
									</div>
								  </div> -->
								<div class="progress vertical progress-xxs h-100 mb-0">
									<div class="progress-bar" :class="randomColorClass(index)" role="progressbar"
										:aria-valuenow="getProgress(item)" aria-valuemin="0" aria-valuemax="100"
										:style="{ height: getProgress(item) + '%' }"></div>
								</div>
								<div class="ml-15">
									<span class="l-h-14">Date : <b class=" text-danger px-2 border-raduis">{{
											getYear(item.statistic?.date_enquete) }}</b></span> <br>
									<span class="l-h-14">Fiches : <b
											class="bg-info px-2 border-raduis">{{parseInt(item.statistic?.invalid_fiches) +
											parseInt(item.statistic?.valid_fiches) }}</b></span>
									<h4 class="my-10 font-size-14 font-weight-bold">{{ item?.type_marche?.nom_type_marche }}
									</h4>
									<p class="mb-0 text-primary line-height font-weight-bold">Fiches validées : <b
											class="bg-info px-2 border-raduis">{{ parseInt(item.statistic?.valid_fiches)
											}}</b></p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xl-12">
					<TableauPrix></TableauPrix>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>
<script>
import Pag from "@/components/others/pagination.vue";
import Loading from "@/components/others/loading.vue";

import axios from "@/lib/axiosConfig";
import { useToast } from "vue-toastification";
import TableauPrix from '@/components/dashboard/tableauPrix.vue';

export default {
  setup() {
    const toast = useToast();
    return { toast }
  },
  components: {

    Pag,
    Loading, TableauPrix
  },

  data() {
    return {
      loading: true,
      data: [],
      dataProduits: [],
      currentPage: 1,
      itemsPerPage: 10,
      ToId: "",
      totalPageArray: [],
	  colors: [
        "progress-bar-primary",
        "progress-bar-info",
        "progress-bar-success",
        "progress-bar-warning",
        "progress-bar-danger",
      ],

    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];

    },
    totalPages() {
      return Math.ceil(this.dataProduits.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.dataProduits.slice(startIndex, endIndex);
    },


  },
  async mounted() {
    await this.fetchStatistic();
    // await this.fetchStatisticProduits();

  },
  methods: {
    async fetchStatistic() {
      try {
        const response = await axios.get("/statistiques/fiches/enquetes", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("responsedatast", response);
        if (response.status === 200) {
          this.data = response.data.filter(item => item.statistic !== null);
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },

    async fetchStatisticProduits() {
      try {
        const response = await axios.get("/parametrages/produits/produits/les-plus-consommer", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          this.dataProduits = response.data
          this.loading = false;
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Utilisez 'auto' pour un défilement instantané
      });
    },
    updatePaginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;

      const endIndex = startIndex + this.itemsPerPage;
      return this.dataProduits.slice(startIndex, endIndex);
    },
    getYear(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0')
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const year = String(d.getFullYear())

      return `${day}/${month}/${year}`
    },
    getProgress(item) {
      const totalFiches =
        parseInt(item.statistic?.valid_fiches || 0) +
        parseInt(item.statistic?.invalid_fiches || 0);
      const validFiches = parseInt(item.statistic?.valid_fiches || 0);
      return totalFiches === 0 ? 0 : (validFiches / totalFiches) * 100;
    },
   
    randomColorClass(index) { 
      return this.colors[index % this.colors.length];
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

}
</script>
<style lang="css" scoped>

</style>