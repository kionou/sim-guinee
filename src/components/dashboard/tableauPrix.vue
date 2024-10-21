<template >
    <div style="position: relative;">
       

        <div class="col-12">
            <div class="box">
                <div class="box-body">
                    <div class="row align-items-center mb-2">
                        <div class="col-xl-6">
                            <h4 class="box-title mb-0 mt-4">Prix evolutive des produits par famille et par région <b
                                    style="color:red">({{ProduitsOptions.length}})</b></h4>
    
                        </div>
                        <div class="col-xl-6">
                            <div class="row  content-group">
                                <div class="col-6">
                                    <div class="input-groupe">
                                        <label for="">Région</label>
                                        <MazSelect v-model="Region" color="secondary" secondary :options="regionsSelect" search
                                            v-slot="{ option }" size="sm" rounded-size="sm">
                                            <div class="flex items-center"
                                                style="padding-top: 0.5rem; padding-bottom: 0.5rem; width: 100%; gap: 1rem"
                                                @click="handleOptionClickRegion(option)">
    
                                                {{ option.label }}
    
                                            </div>
    
                                        </MazSelect>
    
                                    </div>
                                </div>
    
                                <div class="col-6">
                                    <div class="input-groupe">
                                        <label for="">Famille</label>
                                        <MazSelect v-model="Famille" color="secondary" :options="FamilleSelect" search
                                            v-slot="{ option }" size="sm" rounded-size="sm">
                                            <div class="flex items-center"
                                                style="padding-top: 0.5rem; padding-bottom: 0.5rem; width: 100%; gap: 1rem"
                                                @click="handleOptionClickFamille(option)">
    
                                                {{ option.label }}
    
                                            </div>
    
                                        </MazSelect>
    
                                    </div>
                                </div>
    
    
                            </div>
                        </div>
                    </div>
    
                    <div class="table-responsive">
                        <div>
                            <div v-if="paginatedItems.length === 0">
                                <!-- <div class="badge bg-warning" style="width: 100%; font-size: 14px">
                                    Pas de données !!
                                </div> -->
                                <Loading v-if="loading" style="z-index: 99999"></Loading> 
                            </div>
                            <table v-else class="table table-bordered table-striped mt-0 mb-0">
                                <thead>
    
                                    <tr>
                                       
                                        <th rowspan="2" class="fw-semibold"
                                            style="background-color: var(--color-primary) !important; color: white;">Préfecture
                                        </th>
                                        <th rowspan="2" class="fw-semibold"
                                            style="background-color: var(--color-primary) !important; color: white;">Commune
                                        </th>
                                        <th rowspan="2" class="fw-semibold"
                                            style="background-color: var(--color-primary) !important; color: white;">Marché
                                        </th>
                                        <th rowspan="2" class="fw-semibold"
                                            style="background-color: var(--color-primary) !important; color: white;">Type Marché
                                        </th>
                                        <th rowspan="2" class="fw-semibold"
                                          style="background-color: var(--color-primary) !important; color: white;">Agent de collecte
                                        </th>
                                        <th rowspan="2" class="fw-semibold"
                                            style="background-color: var(--color-primary) !important; color: white;">Produit
                                        </th>
                                        <th colspan="2" class="text-center fw-semibold"
                                            style="background-color: var(--color-primary) !important; color: white; width:150px ;">
                                            Actuel</th>
    
                                        <th colspan="2" class="text-center fw-semibold"
                                            style="background-color: var(--color-primary) !important; color: white; width:150px ;">
                                            Précédent</th>
    
    
                                        <th rowspan="2" class="text-center fw-semibold"
                                            style="background-color: var(--color-primary) !important; color: white; width:130px ;">
                                            Evolution (%)</th>
                                    </tr>
    
                                    <tr>
                                        <th class="text-center font-weight-bold">Prix (GNF)</th>
                                        <th class="text-center font-weight-bold">Date</th>
    
                                        <th class="text-center font-weight-bold">Prix (GNF)</th>
                                        <th class="text-center font-weight-bold">Date</th>
                                    </tr>
    
    
    
                                </thead>
                                <thead v-for="(m, index) in paginatedItems" :key="index">
    
    
    
                                    <tr>
                   
                                        <td :rowspan="m.produits.length" style="width:200px ;">
                                            <div style="display: inline-block">
                                                <span style="font-weight: 600; font-size: 1.1em; display: block">{{ m.marche.nom_prefecture }} </span>
                                               
                                            </div>
    
                                        </td>
                                        <td :rowspan="m.produits.length" style="width:200px ;">
                                            <div style="display: inline-block">
                                                <span style="font-weight: 600; font-size: 1.1em; display: block">{{ m.marche.localite }} </span>
                                                
                                            </div>
    
                                        </td>
                                        <td :rowspan="m.produits.length" style="width:200px ;">
                                            <div style="display: inline-block">
                                                <span style="font-weight: 600; font-size: 1.1em; display: block">{{ m.marche.nom_marche }} </span>
                                                
                                            </div>
    
                                        </td>
                                        <td :rowspan="m.produits.length" style="width:200px ;">
                                            <div style="display: inline-block">
                                                <span style="font-weight: 600; font-size: 1.1em; display: block">{{ m.marche.nom_type_marche }} </span>
                                                
                                            </div>
    
                                        </td>
                                        <td :rowspan="m.produits.length" style="width:200px ;">
                                          <div class="widget-user-image">
						
                                          <div style="display: inline-block" class="text-center">
                                            <span style="font-weight: 600; font-size: 1.1em; display: block"
                                            >{{m.marche?.nom_collecteur }} </span
                                            >
                                            <span style="display: block; color:red !important">{{ m.marche?.contact_collecteur }}</span>
                                          </div>
                                          </div>
    
                                        </td>
                                        
    
                                        <td class="font-weight-bold" style="width:200px ;" >{{ m.produits[0].nom_produit }}
                                        </td>
    
    
                                        <td class="text-center bg-gray-100 font-weight-bold"
                                            style="width:130px ;  color: var(--color-primary);">{{
                                      m.produits[0].prices[0]?.prix_kg ? formatBudget( m.produits[0].prices[0]?.prix_kg) : "-" }} </td>
                                        <td class="text-center bg-gray-100 font-weight-bold"
                                            style="width:130px ; color: var(--color-primary);">{{
                                           m.produits[0].prices[0]?.date_enquete ? getYear( m.produits[0].prices[0]?.date_enquete) :   "-" }}</td>
    
                                        <td class="text-center bg-gray-100 font-weight-bold"
                                            style="width:130px ;    color: #000;">{{
                                             m.produits[0].prices[1]?.prix_kg ?  formatBudget(m.produits[0].prices[1]?.prix_kg) : "-" }} </td>
                                        <td class="text-center bg-gray-100 font-weight-bold"
                                            style="width:130px ;    color: #000;">{{m.produits[0].prices[1]?.date_enquete  ? getYear(m.produits[0].prices[1]?.date_enquete ) : "-"}}</td>
    
    
                                            <td class="text-center bg-gray-100 font-weight-bold"
    :style="{width: '130px', color: getDifference(m.produits[0].prices[1]?.prix_kg, m.produits[0].prices[0]?.prix_kg) > 0 ? 'red' : (getDifference(m.produits[0].prices[1]?.prix_kg, m.produits[0].prices[0]?.prix_kg) < 0 ? 'green' : 'inherit')}"
>
  {{ getDifference(m.produits[0].prices[1]?.prix_kg, m.produits[0].prices[0]?.prix_kg) == 0 ? '' :
    getDifference(m.produits[0].prices[1]?.prix_kg, m.produits[0].prices[0]?.prix_kg) > 0
    ? '+' + getDifference(m.produits[0].prices[1]?.prix_kg, m.produits[0].prices[0]?.prix_kg) + "%" 
    : getDifference(m.produits[0].prices[1]?.prix_kg, m.produits[0].prices[0]?.prix_kg) + "%" 
  }}
</td>

                                    </tr>
    
                                    <tr v-for="(produit, idx) in m?.produits.slice(1)" :key="idx">
    
                                        <td class="font-weight-bold">{{ produit.nom_produit }}</td>
    
                                        <td class="text-center bg-gray-100 font-weight-bold"
                                            style="width:130px ; color: var(--color-primary);">{{
                                     produit.prices[0]?.prix_kg ? formatBudget(produit.prices[0]?.prix_kg) : "-" }} </td>
                                        <td class="text-center bg-gray-100 font-weight-bold"
                                            style="width:130px ; color: var(--color-primary);">{{
                                          produit.prices[0]?.date_enquete  ?  getYear( produit.prices[0]?.date_enquete ) : "-" }}</td>
    
                                        <td class="text-center bg-gray-100 font-weight-bold"
                                            style="width:130px ; color:#000;">{{
                                   produit.prices[1]?.prix_kg ? formatBudget( produit.prices[1]?.prix_kg) : "-" }} </td>
    
                                        <td class="text-center bg-gray-100 font-weight-bold"
                                            style="width:130px ; color:#000;">{{
                                         produit.prices[1]?.date_enquete ? getYear(produit.prices[1]?.date_enquete) : "-" }}</td>
    
                                                
    
    <td class="text-center bg-gray-100 font-weight-bold"
    :style="{width: '130px', color: getDifference(produit.prices[1]?.prix_kg, produit.prices[0]?.prix_kg) > 0 ? 'red' : (getDifference(produit.prices[1]?.prix_kg, produit.prices[0]?.prix_kg) < 0 ? 'green' : 'inherit')}"
>

  {{  getDifference(produit.prices[1]?.prix_kg, produit.prices[0]?.prix_kg) == 0  ? '': getDifference(produit.prices[1]?.prix_kg, produit.prices[0]?.prix_kg) > 0 
    ? '+' + getDifference(produit.prices[1]?.prix_kg, produit.prices[0]?.prix_kg) + "%"  
    : getDifference(produit.prices[1]?.prix_kg, produit.prices[0]?.prix_kg) + "%"  
  }}
</td>

                                    </tr>
    
                                </thead>
    
    
    
    
    
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="container_pagination">
                                <Pag :current-page="currentPage" :total-pages="totalPages"
                                    @page-change="updateCurrentPage" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.box-body -->
            </div>
        </div>
    </div>
</template>
<script>
import axioss from '@/lib/axiosConfig'
import axios from 'axios';
import Pag from "@/components/others/pagination.vue";
import LoaderTable from '../others/loaderTable.vue';
import Loading from '../others/loaderTable.vue';


export default {
  components: {

    Pag, LoaderTable ,Loading

  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];

    },
    totalPages() {
      return Math.ceil(this.ProduitsOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.ProduitsOptions.slice(startIndex, endIndex);
    },


  },
  data() {
    return {
        loading:true,
      ProduitsOptions: [],
      FamillesOptions: [],
      PrixAllOptions: [],
      RegionsOptions: [],
      FamilleSelect: [],
      regionsSelect: [],
      PrixObtenus: [],
      ProduitsOptions: [],
      ProduitsByFamille: [],
      currentPage: 1,
      itemsPerPage: 5,
      ToId: "",
      totalPageArray: [],
      Region: "",
      Famille: "",
      NomFamille: "",
      NomRegion: "",

      Global: "",

    }
  },
  async mounted() {
    await this.fetchAllData()
    // await this.fetchStatisticProduits();


  },
  methods: {
    async fetchAllData() {
      let endpoints = [
        '/parametrages/familles',
        '/parametrages/localites/regions',
      ];
      try {
        const [famille, region] = await axios.all(endpoints.map((endpoint) => axioss.get(endpoint)));
    


        this.FamillesOptions = famille.data
        this.RegionsOptions = region.data

        famille.data.map(item => item.affichage_ecran && this.FamilleSelect.push({
          label: item.nom_famille_produit,
          value: item.id_famille_produit
        }))

        region.data.map(item => this.regionsSelect.push({
          label: item.nom_region,
          value: item.id_region
        }))

        this.Famille = this.FamilleSelect[0].id_famille_produit
        this.Region = region.data[0].id_region

        this.NomFamille = null
        this.NomRegion = region.data[0]
        this.fetchProduitByPrix(this.NomRegion, this.NomFamille)


      } catch (error) {
        console.log('err', error)

        // this.handleErrors(error);
      }
    },
    async fetchProduitsByIdFamille(id) {
      try {
        const response = await axioss.get(`/parametrages/produits/produit/listes?famille_produit=${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        if (response.status === 200) {
          //   this.ProduitsOptions = response.data
          this.ProduitsByFamille = response.data
          this.loading = true;
        }
      } catch (error) {
        // this.handleErrors(error);
      }
    },


    async fetchProduitByPrix(region, famille) {
       this.loading = true
     
      let NomFamille
      if (famille?.label) {
       

        NomFamille = famille?.label
      } else if (famille === null) {

        NomFamille = null

      } else {
        NomFamille = famille?.nom_famille_produit

      }

      //  const NomFamille = famille?.nom_famille_produit ? famille?.famille?.nom_famille_produit : famille.label
      const NomRegion = region?.nom_region ? region?.nom_region : region.label
      let url = NomFamille ? `enquetes/marches-prix/prix-des-deux-dernieres/famille-region?nom_region=${NomRegion}&famille=${NomFamille}` : `enquetes/marches-prix/prix-des-deux-dernieres/famille-region?nom_region=${NomRegion}`

      try {
        const response = await axioss.get(url, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        if (response.status === 200) {
          this.ProduitsOptions = response.data

          this.loading = false;
        }
      } catch (error) {
        // this.handleErrors(error);
      }

    },

    getDifference(ancien, nouveau) {
  if (ancien === undefined || nouveau === undefined || ancien === 0 || nouveau === 0) {
    return 0;  
  } else {
    const difference = parseFloat(nouveau) - parseFloat(ancien);
    return ((difference / parseFloat(ancien)) * 100).toFixed(2); 
  }
},

    getYear(date) {
   const d = new Date(date);
    const day =String(d.getDate()).padStart(2 , '0')
    const month =String(d.getMonth() + 1).padStart(2 , '0')
    const year =String(d.getFullYear()) 
    
    return `${day}/${month}/${year}`
},
formatBudget(value) {
    let Formatter = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
        return Formatter.format(value)

    },

    getRowSpan(item) {
      this.Global = item
      return item.prices.length;
    },


    handleOptionClickFamille(value) {
      this.paginatedItems.length = 0
      this.currentPage = 1;
      this.NomFamille = value
      this.fetchProduitByPrix(this.NomRegion, value)


    },
    handleOptionClickRegion(value) {
      this.paginatedItems.length = 0
      this.currentPage = 1;
      this.NomRegion = value
      this.fetchProduitByPrix(value, this.NomFamille)


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
      return this.ProduitsOptions.slice(startIndex, endIndex);
    },
  },


}
</script>
<style lang="css" scoped>
.table-bordered>thead>tr>td,
.table-bordered>thead>tr>th {

    padding: 3px !important;
}
</style>