<template >
    <div>
    	<Loading v-if="loading" style="z-index: 99999"></Loading>

		<div class="content-header">
			<div class="d-flex align-items-center justify-content-between">
	
				<h3 class="page-title">  {{ infoMarche.description ?? "Marché" }} </h3>
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

      
  <div class="box mx-2">
  <div class="box-header with-border p-2">
    <div class="search-bx mx-5 w-25 float-end">
            <form>
              <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search" aria-label="Recherchez..."
                          aria-describedby="button-addon2" v-model="searchMarche" @input="filterByName">
                        <div class="input-group-append">
                          <button class="btn border border-1"><i class="ti-search"></i></button>
                        </div>
                      </div>
            </form>
          </div>
  </div>
  
  <div class="box-body p-2">
        <div class="table-responsive">
          <table id="example1" class="table table-bordered table-striped">
            <thead>
              <tr>
                <th class="text-center">Code</th>
                <th>Nom </th>
                <th>Geo local.</th>
                <th>Région</th>
                <th>Préfecture</th>
                <th>Commune</th>
                <th>Agent collecte</th>
                <th>Jours du marché</th>
                <th>Nb de fiches suivies</th>
                <th> suivre</th>
  
              </tr>
            </thead>
            <tbody v-if="paginatedItems.length === 0">
              <tr>
                <td colspan="18">
                  <div class="badge bg-warning" style="width: 100%; font-size: 14px">
                    Pas de données !!
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr v-for="data   in paginatedItems" :key="data.id">
                <td style="width: 50px;" class="text-center">
                  {{ data?.marche?.code_marche ?? "-"}}
                </td>

                <td>
                  <div>
                    <!-- <router-link v-if="data?.marche?.type_marche === 1"  @click="HamdleData(data.marche?.commune_relation)"
                      :to="{ name: 'fiches-enquetes-type-marche-collecte', params: { id: data.marche?.id_marche , nom:data.marche?.nom_marche }}"
                      style="color: #0d6efd !important; text-decoration: underline;  font-style: italic;">
                      {{ data?.marche?.nom_marche ?? "-"}}
  
                    </router-link> -->
  
                    <router-link 
                    @click="HamdleData(data.marche?.commune_relation)"
                    :to="generateRouteForMarket(data.marche)" 
                    style="color: #0d6efd !important; text-decoration: underline; font-style: italic;">
                    {{ data?.marche?.nom_marche ?? "-" }}
                    </router-link>
  
                  </div>
                </td>

                <td style="width: 100px;" class="text-center">
                  {{ data?.marche?.longitude ?? "-"}} , {{ data?.marche?.latitude ?? "-"}}
                </td>

                <td style="width: 100px;" class="text-center">
                  {{ data?.marche?.commune_relation?.prefecture_?.region_relation?.nom_region ?? "-"}}
                </td>
                <td style="width: 100px;" class="text-center">
                  {{ data?.marche?.commune_relation?.prefecture_?.nom_prefecture ?? "-"}}
                </td>
                <td style="width: 100px;" class="text-center">
                  {{ data?.marche?.commune_relation?.nom_commune ?? "-"}}
                </td>

                <td style="width: 170px;" class="text-center">
                  <span
                    class="text-dark font-weight-600 hover-primary mb-1 font-size-14">{{data?.collecteur_relation?.nom_collecteur
                    ?? "-"}} {{data?.marche?.collecteur_relation?.prenom_collecteur ?? "-"}}</span>
                  <span style="font-size:12px !important"
                    class="text-danger  d-block">{{data?.marche?.collecteur_relation?.whatsapp_collecteur ?? "-"}} </span>
                </td>

                <td   data-bs-toggle="tooltip"   data-bs-placement="top"
             
                    style="max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" 
                    :title="data?.marche?.jour_du_marche">
                  {{ data?.marche?.jour_du_marche ?? "-" }}
                </td>

                <td   class="text-center"
             
             style="width: 50px; font-weight: bolder; color: red;" 
             :title="data?.nbre_enquetes">
           {{ data?.nbre_enquetes ?? "-" }}
         </td>
  
                 <td class="text-center" style="width: 70px !important;">
                  <router-link @click="HamdleData(data.marche?.commune_relation)"  :to="generateRouteForMarket(data.marche)"  class="text-white btn btn-primary btn-sm">
                  suivre
                </router-link>
                </td>
               
              </tr>
            </tbody>
  
          </table>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="container_pagination">
              <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
            </div>
          </div>
        </div>
      </div>
  </div>
    
    </div>
</template>
<script>
  import Pag from "@/components/others/pagination.vue";
  import Loading from "@/components/others/loading.vue";
  import axios from '@/lib/axiosConfig'
  import { useToast } from "vue-toastification";
export default {
    props:['id'],
    setup() {
    const toast = useToast();
    return { toast }
  },
  components: {
     Loading , Pag
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
            infoMarche: "",
            searchMarche:"",
            loading:true,
            MarchesOptions: [],
            data:[],
            currentPage: 1,
            itemsPerPage: 10,
            ToId:"",
            totalPageArray: [],
        }
    },
  async  mounted() {
        await this.fetchMarches(this.id);
        console.log('bonjour',this.id)
    },
    methods: {
        HamdleData(data){
      console.log('data',data)
      localStorage.setItem('DataCommune', JSON.stringify(data));
    },
        async fetchMarches() {
      try {
        const response = await axios.get(`/parametrages/marches/par-type/${this.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          }
        );
		  console.log('dataresponse',response)
        if (response.status === 200) {
          this.data = response.data.marches;
          this.infoMarche = response.data.type_marche
          this.MarchesOptions = this.data
		  this.loading = false
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    generateRouteForMarket(marche) {
        console.log('marche',marche)
      if (!marche) return '/default-route'; // Route par défaut si marche est undefined

      const typeMarche = marche.type_marche
      const params = {
        id:marche.id_marche,
        nom:marche?.nom_marche
      }

      switch (typeMarche) {
        case 1: // Collecte
          return { name: 'fiches-enquetes-type-marche-collecte', params };
        case 2: // Grossiste
          return { name: 'fiches-enquetes-type-marche-grossiste', params };
        case 3: // Journalier
          return { name: 'fiches-enquetes-type-marche-journaliere', params };
        case 4: // Hebdomadaire
          return { name: 'fiches-enquetes-type-marche-hebdomadaire', params };
        case 5: // Bétail
          return { name: 'fiches-enquetes-type-marche-betail', params };
        case 6: // Débarcadère
          return { name: 'fiches-enquetes-type-marche-debarcadere', params };
        case 7: // Port
          return { name: 'fiches-enquetes-type-marche-port', params };
        case 8: // Transfrontalier
          return { name: 'fiches-enquetes-type-marche-transfrontalier', params };
        default:
          return '/default-route'; // Route par défaut si aucun type ne correspond
      }
    },
    
    handleMarketClick(marche) {
      console.log("Market selected:", marche);
      // Ajoutez ici toute logique supplémentaire lors du clic
    },
    filterByName() {
  this.currentPage = 1;
  if (this.searchMarche !== null) {
   const tt = this.searchMarche;
   console.log('ee',tt)
  const  searchValue = tt.toLowerCase()
  console.log('searchValue',searchValue)
  console.log('searchValue',this.data)
  
  this.MarchesOptions =this.data.filter(user => {
  console.log('searchValueUser',user)
  
    const Code = user.marche?.code_marche || '';
    const nom = user.marche?.nom_marche || ''; 
    const Commune = user?.marche?.commune_relation?.nom_commune || '';
    const Jour = user?.marche?.jour_du_marche || '';
    const region = user?.marche?.commune_relation?.prefecture_?.region_relation?.nom_region || '';
    
    
    return Code.toLowerCase().includes(searchValue) || nom.toLowerCase().includes(searchValue) || Commune.toLowerCase().includes(searchValue) || region.toLowerCase().includes(searchValue) || Jour.toLowerCase().includes(searchValue) 
    
  });
  
  } else {
  this.MarchesOptions = [...this.data];
  
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
      return this.MarchesOptions.slice(startIndex, endIndex);
    },
    },
    
}
</script>
<style lang="">
    
</style>