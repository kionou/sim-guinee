<template >
    <div style="position: relative;">
       

        <div class="col-12" data-aos="zoom-in">
            <div class="box">
                <div class="box-body">
                    <div class="row align-items-center mb-2">
                        <div class="col-xl-6">
                            <h4 class="box-title mb-0 mt-4">Prix evolutive des produits par famille et par région <b
                                    style="color:red">({{ProduitsOptions.length}})</b></h4>
    
                        </div>
                        <div class="col-xl-6">
                            <div class="row  content-group">
                                <div class="col-4">
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
    
                                <div class="col-4">
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
                                <div class="col-4 mt-4 ps-0">
                                  <div class="d-flex justify-content-between">
                                  <button class="waves-effect waves-light btn btn-social-icon btn-danger"  @click="openModal('export-pdf')" :disabled="ProduitsOptions.length === 0 || paginatedItems.length === 0"><i class="fa fa-file-pdf-o"></i></button>
                                  <button class="waves-effect waves-light btn btn-social-icon btn-info" @click="exportToCSV" :disabled="ProduitsOptions.length === 0 || paginatedItems.length === 0"><i class="fa  fa-file-text-o"></i></button>
                                  <button class="waves-effect waves-light btn btn-social-icon btn-success" @click="exportToExcel" :disabled="ProduitsOptions.length === 0 || paginatedItems.length === 0"><i class="fa fa-file-excel-o"></i></button>


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
                            <table v-else class="table table-bordered table-striped mt-0 mb-0"  data-aos="fade-up" data-aos-duration="1000">
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

        <div class="modal center-modal fade" id="export-pdf" ref="export-pdf" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content" style="height: 90vh; overflow-y: scroll;">
          <div class="modal-header">
            <h5 class="modal-title">Exporter en pdf</h5>
            <button @click="exportToPDF" class="btn btn-secondary" style=" z-index: 10; position: fixed;top: 5px;left: 50%;" :disabled="isLoading">
              <span v-if="isLoading === true">
                <i class="mdi mdi-loading mdi-spin"></i> Exportation en cours...
              </span>
              <span v-else>
                Exporter en PDF
              </span>
            </button>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"
              @click="closeModal('export-pdf')" style="right: 17px; top: 1px;">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div ref="pdfContent">
              <div class="header">
              <img src="@/assets/img/logo_pdf.png" alt="pdf" style="height: 100px; width: 100%;">
            </div>
           
            <div class="table-responsive" >
                        <div>
                            <div v-if="ProduitsOptions.length === 0">
                                <div class="badge bg-warning" style="width: 100%; font-size: 14px">
                                    Pas de données !!
                                </div>
                                <Loading v-if="loading" style="z-index: 99999"></Loading> 
                            </div>
                            <table v-else class="table table-bordered table-striped mt-0 mb-0">
                              <caption style="caption-side: top; font-weight: bold; padding: 10px; font-size: 20px;">
                              Prix évolutive des produits par famille <b style="color:white; background-color: var(--color-primary);">{{NomFamille?.nom_famille_produit || NomFamille?.label}}</b> et par région <b style="color:white; background-color: var(--color-primary);">{{NomRegion?.nom_region || NomRegion?.label}}</b> <b
                              style="color:red">({{ProduitsOptions.length}})</b>
                            </caption>
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
                                <thead v-for="(m, index) in ProduitsOptions" :key="index">
    
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
            </div>
          
  
          </div>
        </div>
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
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";


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
        isLoading: false,
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
    exportToPDF() {
      this.isLoading = true
      const element = this.$refs.pdfContent;

      const options = {
        margin:[ 0,0.2],
        filename: 'sim_guinee.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
      };

      html2pdf().from(element).set(options).save();
      this.isLoading = false

    },
    exportToCSV() {
      const headers = [
        "Préfecture",
        "Commune",
        "Marché",
        "Type Marché",
        "Agent de collecte",
        "Produit",
        "Prix Actuel (GNF)",
        "Date Actuel",
        "Prix Précédent (GNF)",
        "Date Précédent",
        "Evolution (%)",
      ];

   
      const data = [];
      this.ProduitsOptions.forEach((item) => {
        item.produits.forEach((produit, index) => {
          const row = [
            index === 0 ? item.marche.nom_prefecture : "",
            index === 0 ? item.marche.localite : "",
            index === 0 ? item.marche.nom_marche : "",
            index === 0 ? item.marche.nom_type_marche : "",
            index === 0 ? item.marche.nom_collecteur : "",
            produit.nom_produit,
            this.formatBudget(produit.prices[0]?.prix_kg || "-"),
            this.getYear(produit.prices[0]?.date_enquete || "-"),
            this.formatBudget(produit.prices[1]?.prix_kg || "-"),
            this.getYear(produit.prices[1]?.date_enquete || "-"),
            this.getDifference(produit.prices[1]?.prix_kg, produit.prices[0]?.prix_kg) + "%",
          ];

          data.push(row);
        });
      });

  
      const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);

  
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Produits");

  
      XLSX.writeFile(wb, "prix_evolution_produits.csv");
    },
    exportToExcel() {
    
      const data = [];
      
     
      data.push([
        "Préfecture",
        "Commune",
        "Marché",
        "Type Marché",
        "Agent de collecte",
        "Produit",
        "Prix Actuel (GNF)",
        "Date Actuelle",
        "Prix Précédent (GNF)",
        "Date Précédente",
        "Évolution (%)"
      ]);

   
      this.ProduitsOptions.forEach((item) => {
        item.produits.forEach((produit, idx) => {
          const row = [
            item.marche.nom_prefecture,
            item.marche.localite,
            item.marche.nom_marche,
            item.marche.nom_type_marche,
            item.marche.nom_collecteur,
            produit.nom_produit,
            produit.prices[0]?.prix_kg || "-",
            produit.prices[0]?.date_enquete || "-",
            produit.prices[1]?.prix_kg || "-",
            produit.prices[1]?.date_enquete || "-",
            this.getDifference(produit.prices[1]?.prix_kg, produit.prices[0]?.prix_kg) === 0
              ? ''
              : this.getDifference(produit.prices[1]?.prix_kg, produit.prices[0]?.prix_kg) > 0
              ? '+' + this.getDifference(produit.prices[1]?.prix_kg, produit.prices[0]?.prix_kg) + '%'
              : this.getDifference(produit.prices[1]?.prix_kg, produit.prices[0]?.prix_kg) + '%'
          ];

          data.push(row);
        });
      });

      
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Prix Produits");

      
      XLSX.writeFile(workbook, "Prix_Evolutive_Produits.xlsx");
    },
   
    getDifference(prixPrecedent, prixActuel) {
      if (!prixPrecedent || !prixActuel) return 0;
      return (((prixActuel - prixPrecedent) / prixPrecedent) * 100).toFixed(2);
    },
    addBackdrop() {
      if (!$('.modal-backdrop').length) {
        const backdrop = $('<div class="modal-backdrop fade"></div>');
        $('body').append(backdrop);
        backdrop.fadeIn(100);
      }
    },

    openModal(modalId) {
      let modalElement = this.$refs[modalId];

      $(modalElement).fadeIn(100, function () {
        $(modalElement).addClass('show');
      });
      $('body').addClass('modal-open');
      this.addBackdrop();
    },
    closeModal(modalId) {
      let modalElement = this.$refs[modalId];

      $(modalElement).fadeOut(100, function () {
        $(modalElement).removeClass('show');
        $(modalElement).css('display', 'none');
      });
      $('body').removeClass('modal-open');
      $('.modal-backdrop').fadeOut(100, function () {
        $(this).remove();
      });
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