<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="col-12">
<div class="box">
  <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
     <h3 class="box-title mb-0 col-6" style="font-size: 20px;">Fiches d'enquêtes {{ collecteData.nom }}  {{year}} <b style="color:red">( {{ FichesCollOptions.length }})</b></h3>
 
   
     <div class="navbar-custom-menu r-side  float-right col-6">
        <ul class="nav navbar-nav row">	
				  
			<li class="b d-lg-inline-flex  h-40 col-10 px-0">
				<div class="app-menu">
					<div class="search-bx mx-5">
						<form>
              <div class="row">
                <div class="col-4 ">
                  <div class="input-group">        
               <MazInput v-model="debut" color="secondary" secondary  type="month"
                  size="sm" rounded-size="sm" placeholder="mois début" @input="filterMonth" />
             </div>
                </div>
                <div class="col-4">
                  <div class="input-group">
               
                               
                    <MazInput v-model="fin" color="secondary" secondary  type="month"
                    size="sm" rounded-size="sm" placeholder="mois début" @input="filterMonth" />
             </div>
                </div>
                <div class="col-4">
                  <div class="input-group">
               
                               
               <MazSelect v-model="year" color="secondary" secondary :options="yearOptions" search
                 v-slot="{ option }" size="sm" rounded-size="sm" placeholder="Selectionnez une année">
                 <div class="flex items-center"
                     style="padding-top: 0.5rem; padding-bottom: 0.5rem; width: 100%; gap: 1rem"
                     @click="handleOptionClickAnnee(option)">

                     {{ option.label }}

                 </div>

                 </MazSelect>
             </div>
                </div>
               
                  
                </div>
							
						</form>
					</div>
				</div>
			</li>

			<li class="h-40  col-1 px-0">
				<button type="button" class="waves-effect waves-circle btn btn-circle btn-sm btn-primary mb-5"   @click="openModal('add-fiche-debarcadere')"   ><i class="mdi mdi-filter"></i></button>
			</li>
            <li class="h-40 col-1 px-0">
				<button type="button" class="waves-effect waves-circle btn btn-circle btn-sm btn-primary mb-5"   @click="Refesh"   ><i class="mdi mdi-refresh"></i></button>
			</li>

			
        </ul>
         </div> 
   </div>
   <!-- /.box-header -->
   <div class="box-body">
    <div>
        <div v-if="hasNewSelection" class="position-fixed  my-1" style="left: 30%;">
      <button class="btn " style="background-color: red; color:white" @click="validateSelection">
        <i class="mdi mdi-checkbox-marked-circle-outline"></i>
        Valider
      </button>
    </div>

    </div>
       <div class="table-responsive">
         <table id="example1" class="table table-bordered table-striped">
           <thead>
               <tr>
                  
                <th> <input type="checkbox"  @change="selectAll" 
                  :checked="isAllSelected"></th>
                   <th>N° Fiche</th>
                   <th>Agent collecte</th>
                   <th>Type d'embarcation</th>
                   <th>Nb embarcat. rentrées/jour</th>
                   <th> L'espèce présente</th>
                   <!-- <th>Difficultes rencontrées</th> -->
                   <th> Hr. fin collecte sem.</th>
                   <!-- <th>Nb de prod. collectés </th> -->
                   <th>Date</th>
                   <th>Actions</th>
                  
               </tr>
           </thead>
           <tbody v-if="paginatedItems.length === 0" >
            <tr>
              <td colspan="18">
                <div
                  class="badge bg-warning"
                  style="width: 100%; font-size: 14px"
                >
                Pas de données !!
                </div>
              </td>
            </tr>
          </tbody>
           <tbody v-else>
               <tr v-for="(data )  in paginatedItems" :key="data.id">
                 <td class="text-center" style="width:50px">
                  <input type="checkbox"
                v-model="selectedItems" 
                :value="data.enquete?.num_fiche"
        :checked="data.enquete?.etat === true" 
         @change="updateSelection(data.enquete?.num_fiche, $event.target.checked)"
        
                 >

                 </td>
                   
                   <td style="width:100px !important">{{ data?.enquete?.num_fiche }}</td>
                   <td>
					  <div class="widget-user-image">
						
						<div style="display: inline-block">
						  <span style="font-weight: 600; font-size: 1.1em; display: block"
							>{{ data?.enquete?.collecteur_relation?.nom_collecteur }} {{ data?.enquete?.collecteur_relation?.prenom_collecteur }}</span
						  >
						  <span style="display: block; color:red !important">{{ data?.enquete?.collecteur_relation?.whatsapp_collecteur }}</span>
						</div>
					  </div>
					</td>
              
                   <td  class="text-center" >{{ data?.enquete?.type_embarcation ?? "-"}}</td>
                   <td  class="text-center" >{{ data?.enquete?.nbr_barques_rentres_jour ?? "-"}}</td>
                   <td  class="text-center" >{{ data?.enquete?.espece_presente ?? "-"}}</td>
                   <!-- <td  class="text-center" >{{ data?.enquete?.difficultes_rencontrees ?? "-"}}</td> -->
                   <td  class="text-center" >{{ data?.enquete?.heure_fin_collecte_semaine ?? "-" }}</td>
                   <!-- <td style="width:150px !important ; color:red !important; font-weight:bolder !important" class="text-center" >{{ data?.nbre_produit  ?? "-"}}</td> -->
                   <td style="width:100px !important ; color:red !important; font-weight:bolder !important" class="text-center" >{{ getYear( data?.enquete?.date_enquete) }}</td>
                   
                   <td style="width: 90px;">
                    <div class="d-flex justify-content-evenly border-0">
                        <router-link v-if="parseInt(collecteData.id) === 6" :to="{ name: 'enquete-prix-par-marche-debarcadere', params: { id: data.enquete?.id , nom:'DEBARCADERE' }}" class="btn btn-circle btn-success btn-xs" title="" @click="HandleData(data?.enquete)"  data-original-title="view" ><i class="ti-eye"></i></router-link>
                        <router-link v-if="parseInt(collecteData.id) === 7" :to="{ name: 'enquete-prix-par-marche-port', params: { id: data.enquete?.id , nom:'PORT' }}" class="btn btn-circle btn-success btn-xs" title="" @click="HandleData(data?.enquete)"  data-original-title="view" ><i class="ti-eye"></i></router-link>
                        <!-- <a href="javascript:void(0)" class="btn btn-circle btn-info btn-xs" title="" @click="HandleIdUpdate(data.enquete?.id , 'update-fiche-collecte')"  ><i class="ti-marker-alt"></i></a> -->
                        <a  v-if="parseInt(collecteData.id) === 6" href="javascript:vcode(0)" class="btn btn-circle btn-danger btn-xs" @click="HandleIdDelete(data.enquete?.id , 'DEBARCADERE')" title="" data-toggle="tooltip" data-original-title="Delete"><i class="ti-trash"></i></a>
                        <a  v-if="parseInt(collecteData.id) === 7" href="javascript:vcode(0)" class="btn btn-circle btn-danger btn-xs" @click="HandleIdDelete(data.enquete?.id , 'PORT')" title="" data-toggle="tooltip" data-original-title="Delete"><i class="ti-trash"></i></a>
                    </div>   
					</td > 
               </tr>
           </tbody>
          
         </table>
       </div>
       <div class="row">
              <div class="col-lg-12">
                <div class="container_pagination">
                  <Pag
                    :current-page="currentPage"
                    :total-pages="totalPages"
                    @page-change="updateCurrentPage"
                  />
                </div>
              </div>
             </div>
   </div>
   <!-- /.box-body -->
 </div>
         
            </div>

            <div class="modal center-modal fade"  id="add-fiche-debarcadere"  ref="add-fiche-debarcadere" tabindex="-1">
          <div class="modal-dialog ">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Recherchez...</h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('add-fiche-debarcadere')" >
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
                  <div class="row mt-3 content-group">
                       
                        <div class="col-12">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > N° Fiche </label
                            >
                            <MazInput
                              v-model="step1.num_fiche"
                              color="secondary"
                              name="step1.num_fiche"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                                                         
                              
                            />
                         
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Date d'enquete </label
                            >
                            <MazInput
                              v-model="step1.date_enquete"
                              color="secondary"
                              name="step1.date_enquete"
                              size="sm"
                              rounded-size="sm"
                              type="date"
                              
                              
                            />
                          
                          </div>
                        </div>

                      

                        <div class="col-12">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Agent collecte </label
                            >
                            <MazSelect
                              v-model="step1.collecteur"
                              color="secondary"
                              name="step1.collecteur"
                              size="sm"
                              rounded-size="sm"
                              search
                              :options="CollecteursOptions"
                              
                              
                            />
                         
                          </div>
                        </div>

                        <div class="col-12">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Date d'enregistrement</label
                            >
                            <MazInput
                              v-model="step1.date_enregistrement"
                              color="secondary"
                              name="step1.date_enregistrement"
                              size="sm"
                              rounded-size="sm"
                              type="date"
                              
                              
                            />
                          
                          </div>
                        </div>
                       
                      
                      </div>
                    
            </div>
            <div class="modal-footer modal-footer-uniform text-end">
          
              <button type="button" @click="submitFicheCollecte('add-fiche-debarcadere')" class="waves-effect waves-light btn btn-primary ">Valider</button>
          

            </div>
          </div>
          </div>
        </div>

    
          <div class="modal center-modal fade"  id="update-fiche-collecte"  ref="update-fiche-collecte" tabindex="-1">
          <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Modifier une fiche</h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('update-fiche-collecte')" >
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
                  <div class="row mt-3 content-group">
                       
                        <div class="col-6">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > N° Fiche <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.num_fiche"
                              color="secondary"
                              name="step2.num_fiche"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              readonly
                              disabled                              
                              
                            />
                            <small v-if="v$.step2.num_fiche.$error">{{
                              v$.step2.num_fiche.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['num_fiche']">
                              {{ resultError["num_fiche"] }}
                            </small>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Date <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.date_enquete"
                              color="secondary"
                              name="step2.date_enquete"
                              size="sm"
                              rounded-size="sm"
                              type="date"
                              
                              
                            />
                            <small v-if="v$.step2.date_enquete.$error">{{
                              v$.step2.date_enquete.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['date_enquete']">
                              {{ resultError["date_enquete"] }}
                            </small>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Agent collecte <span class="text-danger">*</span></label
                            >
                            <MazSelect
                              v-model="step2.collecteur"
                              color="secondary"
                              name="step2.collecteur"
                              size="sm"
                              rounded-size="sm"
                              search
                              :options="CollecteursOptions"
                              
                              
                            />
                            <small v-if="v$.step2.collecteur.$error">{{
                              v$.step2.collecteur.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['collecteur']">
                              {{ resultError["collecteur"] }}
                            </small>
                          </div>
                        </div>

                        <div class="col-6">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Type d'embarcation <span class="text-danger">*</span></label
                            >
                            <MazSelect
                              v-model="step2.type_embarcation"
                              color="secondary"
                              name="step2.type_embarcation"
                              size="sm"
                              rounded-size="sm"
                              search
                              :options="Embarcation"
                              
                              
                            />
                            <small v-if="v$.step2.type_embarcation.$error">{{
                              v$.step2.type_embarcation.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['type_embarcation']">
                              {{ resultError["type_embarcation"] }}
                            </small>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Nombre d'embarcations rentrées par jour <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.nbr_barques_rentres_jour"
                              color="secondary"
                              name="step2.nbr_barques_rentres_jour"
                              size="sm"
                              rounded-size="sm"
                              type="number"
                              
                              
                            />
                            <small v-if="v$.step2.nbr_barques_rentres_jour.$error">{{
                              v$.step2.nbr_barques_rentres_jour.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['nbr_barques_rentres_jour']">
                              {{ resultError["nbr_barques_rentres_jour"] }}
                            </small>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > L'espèce présente <span class="text-danger">*</span></label
                            >
                            <MazSelect label="" v-model="step2.espece_presente" :options="ProduitsOptions" v-slot="{ option  }" search
                                        size="sm" rounded-size="sm" color="secondary" multiple>
                                        <div class="d-flex align-items-center" style="
                                        padding-top: 0.5rem;
                                        padding-bottom: 0.5rem;
                                        width: 100%;
                                        gap: 1rem;
                                        ">
                                        <MazAvatar size="0.8rem" :src="option.picture" />
                                        <strong>
                                        {{ option.label }}
                                        </strong>
                                        </div>
                                                        </MazSelect>
                            <small v-if="v$.step2.espece_presente.$error">{{
                              v$.step2.espece_presente.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['espece_presente']">
                              {{ resultError["espece_presente"] }}
                            </small>
                          </div>
                        </div>

                        <div class="col-6">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Difficultes rencontrées <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.difficultes_rencontrees"
                              color="secondary"
                              name="step2.difficultes_rencontrees"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step2.difficultes_rencontrees.$error">{{
                              v$.step2.difficultes_rencontrees.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['difficultes_rencontrees']">
                              {{ resultError["difficultes_rencontrees"] }}
                            </small>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Heure de fin de collecte en semaine <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.heure_fin_collecte_semaine"
                              color="secondary"
                              name="step2.heure_fin_collecte_semaine"
                              size="sm"
                              rounded-size="sm"
                              type="time"
                              
                              
                            />
                            <small v-if="v$.step2.heure_fin_collecte_semaine.$error">{{
                              v$.step2.heure_fin_collecte_semaine.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['heure_fin_collecte_semaine']">
                              {{ resultError["heure_fin_collecte_semaine"] }}
                            </small>
                          </div>
                        </div>
                       
                       
                      
                      </div>
                    
            </div>
            <div class="modal-footer modal-footer-uniform text-end">
          
              <button type="button" @click="submitUpdate('update-fiche-collecte')" class="waves-effect waves-light btn btn-primary ">Valider</button>
          

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
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
import {successmsg} from "@/lib/modal.js"
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
  import Swal from 'sweetalert2'
  import { useToast } from "vue-toastification";
export default {
    setup() {
   const toast = useToast();
   return { toast }
 },
 props: {
   
   collecteData: {
     type: Object,
     required: true
   }

 },
    components:{
        Pag , Loading
    },
    computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPages() {
      return Math.ceil(this.FichesCollOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.FichesCollOptions.slice(startIndex, endIndex);
    },
    isAllSelected() {
    // Vérifie si tous les éléments de paginatedItems sont sélectionnés
    return this.paginatedItems.length > 0 && this.selectedItems.length === this.paginatedItems.length;
  }
  
  
  },
    data() {
        return {
            loading: false,
            searchFicheCollecteFiche:"",
            Commune:"",
            isModalUpdate:"",
            FichesCollOptions: [],
            CollecteursOptions: [],
            MarchesOptions: [],
            ProduitsOptions:[],
            data:[],
            currentPage: 1,
            itemsPerPage: 10,
            ToId:"",
            totalPageArray: [],
            currentMarcheName: "",
           yearOptions:[],
           years:[],
           year: new Date().getFullYear(),

           debut:"",
           fin:"",

           initialSelectedItems: [],
            selectAllCheckbox: false,  // État de la checkbox "select all"
            selectedItems: [],
            hasNewSelection: false, //
          
            step1: {
                num_fiche:"",
            date_enquete:"",
            date_enregistrement:"",
            collecteur:"",
            
            },
            step2: {
                num_fiche:"",
              date_enquete:"",
               collecteur:"",
               type_embarcation:"",
               nbr_barques_rentres_jour:"",
               espece_presente:[],
               difficultes_rencontrees:"",
               heure_fin_collecte_semaine:"",
            },
            v$: useVuelidate(),
            error: "",
            resultError: {},
            Embarcation:[
                {label:"MONOXYLE" , value:"MONOXYLE"},
                {label:"FLYMBOTE" , value:"FLYMBOTE"},
                {label:"SALAN" , value:"SALAN"},
            ]
         

        }
    },
    validations: {
     
       
        step2: {
           
          
            num_fiche:{require},
            date_enquete:{require},
            collecteur:{require},
            type_embarcation:{require},
            nbr_barques_rentres_jour:{require},
            espece_presente:{require},
            difficultes_rencontrees:{require},
            heure_fin_collecte_semaine:{require},
           
    },
  },
  async  mounted() {
    await this.initializeYears()
    // const code  =   await JSON.parse(localStorage.getItem('DataCommune'));
    // await this.fetchCommuneByCode(code )
    await this.fetchFichesCollectes(this.collecteData.id)
    await this.fetchCollecteurs()
    
    
        
    },
    watch: {
    collecteData: {
      handler(newData) {
        this.fetchFichesCollectes( newData.id)
        
      },
      deep: true,
      immediate: true,
    },
    selectedItems(newValue) {
    this.selectAllCheckbox = newValue.length === this.paginatedItems.length;
  }
  },
    methods: {
        successmsg:successmsg,
        HandleData(data){
            localStorage.setItem('DataPrixMarche', JSON.stringify(data));

        },
        getYear(date) {
   const d = new Date(date);
    const day =String(d.getDate()).padStart(2 , '0')
    const month =String(d.getMonth() + 1).padStart(2 , '0')
    const year =String(d.getFullYear()) 
    
    return `${day}/${month}/${year}`
},
  
        
async fetchFichesCollectes(id) {
           
           this.loading = true
     try {
       const response = await axios.get( `/enquetes/Fiches/par-type-marche/${id}?year=${this.year}`,
         {
           headers: {
             Authorization: `Bearer ${this.loggedInUser.token}`,
           },
           
         }
       );

       if (response.status === 200) {
             this.data  = response.data[0].enquetes ;
             this.FichesCollOptions = this.data

             this.initialSelectedItems = this.data
        .filter(item => item.enquete?.etat === true) 
        .map(item => item.enquete?.num_fiche); 
      this.selectedItems = [...this.initialSelectedItems];
      this.updateSelectedItems();
          
             this.loading =  false
       }
     } catch (error) {
       this.handleErrorsGet(error);
      
      
     }
   },
   updateSelectedItems() {
    this.currentPage = 1;
    this.paginatedItems.forEach(item => {
        if (this.selectedItems.includes(item.enquete?.num_fiche)) {
            item.enquete.etat = true; 
        } else {
            item.enquete.etat = false; 
        }
    });
},
   async  initializeYears() {
      const currentYear = new Date().getFullYear();
      for (let year = 2013; year <= currentYear; year++) {
        this.years.push(year);
      }
      this.yearOptions = await this.years.map((year) => ({
        label: String(year),
        value: year,
      }));
    },
  
    async fetchCollecteurs() {
      try {
        const response = await axios.get( '/parametrages/collecteurs',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
            
          }
        );
        if (response.status === 200) {
			response.data.map(item => {
				this.CollecteursOptions.push({
					label: `${item.nom_collecteur} ${item.prenom_collecteur}`,
					value: item.id_collecteur 
				});
});
        }
      } catch (error) {
		this.handleErrorsGet(error);
      }
    },
    async fetchCommuneByCode(code ) {
      try {
        const response = await axios.get( `/parametrages/localites/communes/${code.code_commune}`,
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
            
          }
        );

        if (response.status === 200) {
          this.Commune = response.data
		
        }
      } catch (error) {
		this.handleErrorsGet(error);
      }
    },
    async fetchNumberFiche() {
      try {
        const response = await axios.get( '/enquetes/Fiches/fiche-numero',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
            
          }
        );
        if (response.status === 200) {
		this.step1.num_fiche  = response.data
        }
      } catch (error) {
		this.handleErrorsGet(error);
      }
    },
    async fetchProduits() {
      try {
        const response = await axios.get(`/parametrages/produits?code_type_marche=06`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        if (response.status === 200) {
          response.data.map(item => this.ProduitsOptions.push({
            label: `${item.nom_produit} ( ${item.code_produit})`,
            picture: item.image,
            value: item.code_produit
          }))
          this.loading = false;
        }
      } catch (error) {
        this.handleErrorsGet(error);
      }
    },
    async submitFicheCollecte(modalId) {
this.currentPage = 1;
if (this.step1 !== null) {

  this.FichesCollOptions =this.data.filter(fiche => {
  
    return(
        (!this.step1.num_fiche ||  fiche.enquete?.num_fiche.toLowerCase().includes(this.step1.num_fiche.toLowerCase())) &&
        (!this.step1.date_enquete ||  fiche.enquete?.date_enquete === this.step1.date_enquete) &&
        (!this.step1.date_enregistrement ||  fiche.enquete?.date_enregistrement === this.step1.date_enregistrement) &&
        (!this.step1.collecteur ||  fiche.enquete?.collecteur === parseInt(this.step1.collecteur)) 
    )
   
  });

  this.closeModal(modalId);
  this.step1 = {
            num_fiche:"",
            date_enquete:"",
            date_enregistrement:"",
            collecteur:"",
  }

} else {
    this.currentPage = 1;
this.FichesCollOptions = [...this.data];
 
}
       
    },
    Refesh(){
      this.debut = "",
      this.fin = "",
      this.currentPage = 1;
        this.FichesCollOptions = [...this.data];

    },
    filterMonth() {
      this.currentPage = 1;
  const startMonth = this.debut ? new Date(this.debut + '-01') : null;
  const endMonth = this.fin ? new Date(this.fin + '-31') : null;
  this.FichesCollOptions = this.data.filter(fiche => {

    const ficheDate = new Date(fiche.enquete?.date_enquete);
  
    return (
      (!startMonth || ficheDate >= startMonth) &&
      (!endMonth || ficheDate <= endMonth)
    );
  });


},
   
    async  HandleIdUpdate(id , modalId){
      this.openModal(modalId)
    this.loading = true;

      try {
        const response = await axios.get(`/enquetes/Fiches/collectes/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`
          }
        });

      
        if (response.status === 200) { 
          let data =  response.data
       

          this.step2.num_fiche = data.num_fiche,
          this.step2.date_enquete = data.date_enquete,
          this.step2.collecteur = data.collecteur,
          this.step2.type_embarcation = data.type_embarcation,
       

          this.step2.nbr_barques_rentres_jour = data.nbr_barques_rentres_jour,
          this.step2.espece_presente = data.espece_presente,
          this.step2.difficultes_rencontrees = data.difficultes_rencontrees,
          this.step2.heure_fin_collecte_semaine = data.heure_fin_collecte_semaine,

          this.ToId = data.id
          this.loading = false;
        
        }
      } catch (error) {
      
        this.handleErrorsGet(error);
      }

    },
    async  submitUpdate(modalId){
   
   this.v$.step2.$touch();

 
    if (this.v$.$errors.length == 0) {
    
       this.loading = true;
       let data = {
           num_fiche:this.step2.num_fiche,
            date_enquete:this.step2.date_enquete,
            marche: this.id,
            collecteur: this.step2.collecteur,
            type_embarcation: this.step2.type_embarcation,
            nbr_barques_rentres_jour: this.step2.nbr_barques_rentres_jour,
            espece_presente: this.step2.espece_presente,
            difficultes_rencontrees: this.step2.difficultes_rencontrees,
            heure_fin_collecte_semaine: this.step2.heure_fin_collecte_semaine,
            }


      try {
        const response = await axios.put(`/enquetes/Fiches/debarcadere-ports/${this.ToId}`,data, {
          headers: {
           
            Authorization: `Bearer ${this.loggedInUser.token}`,
          
          },
        });
     
        if (response.status === 200) {
          this.closeModal(modalId);
          this.successmsg(
          "Mise à jour de la fiche d'enquête",
          "Votre fiche d'enquête a été mise à jour avec succès !"
          )
          this.$emit('enquete-updated');
          this.loading = false
         
          
        } 
      } catch (error) {
        this.handleErrors(error);
      }
    } else {
  
      this.loading = false;

    }
   },
    async HandleIdDelete(id , nom) {
     // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
     const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Vous ne pourrez pas annuler cette action !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le !',
        cancelButtonText: 'Non, annulez !',
        reverseButtons: true
     });

     // Si l'utilisateur confirme la suppression
     if (result.isConfirmed) {
       this.ConfirmeDelete(id , nom);
     }
         },
         async ConfirmeDelete(id , nom) {
          this.loading = true
         
         try {
           // Faites une requête pour supprimer l'élément avec l'ID itemId
           const response = await axios.delete(`/enquetes/Fiches/collectes/${id}?type=${nom}`, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
             },
   
   
           });
       
           if (response.status === 200) {
             this.loading = false
             this.successmsg(
                "Suppression de la fiche d'enquête",
                "Votre fiche d'enquête a été supprimée avec succès !"
            );
            this.$emit('enquete-updated');
            this.loading = false
   
           } else {
        
            this.handleErrors(error);
           }
         } catch (error) {
            this.handleErrors(error);
           
         }
   
       },
       updateSelection(num_fiche, etat) {
  if (etat) {
    if (!this.selectedItems.includes(num_fiche)) {
      this.selectedItems.push(num_fiche);
    }
  } else {
    const index = this.selectedItems.indexOf(num_fiche);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    }
    
  }
  this.hasNewSelection = this.selectedItems.some(item => !this.initialSelectedItems.includes(item));
},

selectAll(event) {
  if (event.target.checked) {
    this.selectedItems = this.paginatedItems.map(item => item.enquete?.num_fiche);
    this.hasNewSelection = this.selectedItems.some(item => !this.initialSelectedItems.includes(item));
  } else {
 
    this.selectedItems = [];
    this.hasNewSelection = false; 
  }

  this.showValidationButton = this.selectedItems.length > 0;
},

    async validateSelection() {
     const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Vous ne pourrez pas annuler cette action !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, validez !',
        cancelButtonText: 'Non, annulez !',
        reverseButtons: true
     });
  
     // Si l'utilisateur confirme la suppression
     if (result.isConfirmed) {
       this.validateSelection1();
     }
         },
  async  validateSelection1() {
    const newItems = this.selectedItems.filter(item => !this.initialSelectedItems.includes(item));
      const formattedItems = newItems.map(item => {
      return { code: String(item) };  
    });
      this.loading = true
         
         try {
           const response = await axios.post('/enquetes/Fiches/validations',formattedItems, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
             },
   
   
           });
       
           if (response.status === 200) {
             this.loading = false
             this.successmsg(
                  "Validation des fiches d'enquête",
                  "Les fiches d'enquête sélectionnées ont été validées avec succès !"
              );
              this.fetchFichesCollectes(this.collecteData.id)
              this.hasNewSelection = false
              this.loading = false
   
           } else {
        
            this.handleErrors(error);
           }
         } catch (error) {
            this.handleErrors(error);
           
         }

    },
    handleOptionClickAnnee(value){
      this.currentPage = 1;
        this.year = value.value
        this.fetchFichesCollectes(this.collecteData.id)

    },
    filterByName() {
this.currentPage = 1;
if (this.searchFicheCollecteFiche !== null) {
   const tt = this.searchFicheCollecteFiche;
  const  searchValue = tt.toLowerCase()
  this.FichesCollOptions =this.data.filter(user => {
    const Nom = user.enquete?.num_fiche || '';
    const definition = user.enquete?.marche_relation?.nom_marche || '';
    const collecte = user.enquete?.collecteur_relation?.nom_collecteur || '';
    const Prenom = user.enquete?.collecteur_relation?.prenom_collecteur || '';
    const Numero = user?.num_fiche || '';
    return Nom.toLowerCase().includes(searchValue)  ||
    collecte.toLowerCase().includes(searchValue)  ||
    Prenom.toLowerCase().includes(searchValue)  ||
    Numero.toLowerCase().includes(searchValue)  ||
     definition.toLowerCase().includes(searchValue) 
  });

} else {
this.FichesCollOptions = [...this.data];
 
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
        this.loading = false;
        this.data = [];
        
        // Logique pour une erreur serveur
        //   this.$router.push("/maintenance"); // Redirection vers une page de maintenance si nécessaire
      }
      else if (error.response?.status === 401 || error.response?.data.detail.includes(401)) {
        await this.$store.dispatch("auth/clearMyAuthenticatedUser");
        this.$router.push("/"); // Redirection vers la page de connexion
      } else if (error.response?.status === 404 || error.response?.data.detail.includes(404)) {
        this.loading = false;
        this.FichesCollOptions = [];
      } else {
        this.triggerToast(error.response?.data.detail);
        this.loading = false;
        return false;
      }
    },
    async handleErrorsGet(error) {
      console.log('Error:', error);
      if (error.response?.status === 500) {
        
      }
      if (error.response?.data.detail.includes('204')) {
        this.loading = false;
        this.data = [];

     
      }
      else if (error.response?.status === 401 || error.response?.data.detail.includes(401)) {
        await this.$store.dispatch("auth/clearMyAuthenticatedUser");
        this.$router.push("/"); 
      } else if (error.response?.status === 404 || error.response?.data.detail.includes(404)) {
        this.loading = false;
        this.data = [];
      } else {
     
        this.loading = false;
        return false;
      }
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

      $(modalElement).fadeIn(100, function() {
        $(modalElement).addClass('show');
      });
      $('body').addClass('modal-open');
      this.addBackdrop();
    },
    closeModal(modalId) { 
      let modalElement = this.$refs[modalId];

      $(modalElement).fadeOut(100, function() {
        $(modalElement).removeClass('show');
        $(modalElement).css('display', 'none');
      });
      $('body').removeClass('modal-open');
      $('.modal-backdrop').fadeOut(100, function() {
        $(this).remove(); 
      });
    },
    async formatValidationErrors(errors) {
      const formattedErrors = {};

      for (const field in errors) {
        const errorMessages = errors[field]; // Liste complète des messages d'erreur
  

        const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur
       

        formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
      }

      this.resultError = formattedErrors; // Stockez les erreurs dans un objet

    
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
      return this.FichesCollOptions.slice(startIndex, endIndex);
    },
    },
    
}
</script>
<style lang="css" scoped>
    
</style>