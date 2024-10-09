<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="col-12">
  <div class="box">
    <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
     <h3 class="box-title mb-0 col-8" style="font-size: 20px;">Liste de toutes les  fiches d'enquêtes {{ collecteData.nom }} pour l'année {{year}} <b style="color:red">( {{ FichesCollOptions.length }})</b></h3>
 
   
     <div class="navbar-custom-menu r-side col-4">
        <ul class="nav navbar-nav justify-content-end">	
				  
			<li class="btn-group d-lg-inline-flex d-none h-40 w-250">
				<div class="app-menu w-250">
					<div class="search-bx mx-5">
						<form>
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
						</form>
					</div>
				</div>
			</li>
			<li class="h-40 me-3">
				<button type="button" class="waves-effect waves-circle btn btn-circle btn-primary mb-5"   @click="openModal('add-fiche-grossiste')"   ><i class="mdi mdi-filter"></i></button>
			</li>
            <li class="h-40">
				<button type="button" class="waves-effect waves-circle btn btn-circle btn-primary mb-5"   @click="Refesh"   ><i class="mdi mdi-refresh"></i></button>
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
                   <th>N° pt collecte</th>
                   <th>Nom & contact enquêt.</th>
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
                 <td class="text-center" style="width:70px !important">
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
                  <td class="text-center" style="width:50px !important">{{ data?.enquete?.numero_point_collecte ?? "-" }}</td>
  
                  <td>
            <div class="widget-user-image">
            
            <div style="display: inline-block">
              <span style="font-weight: 600; font-size: 1.1em; display: block"
              >{{ data?.enquete?.nom_personne_enquete ?? "_"}} </span
              >
              <span style="display: block; color:red !important">{{ data?.enquete?.contact_personne_enquete  ?? "-"}}</span>
            </div>
            </div>
                  </td>
              
                   <!-- <td style="width:100px !important ; color:red !important; font-weight:bolder !important" class="text-center" >{{  data?.nbre_produit }}</td> -->
                   <td style="width:100px !important ; color:red !important; font-weight:bolder !important" class="text-center" >{{ getYear( data?.enquete?.date_enquete) }}</td>
                   
                   <td style="width: 130px;">
                    <div class="d-flex justify-content-evenly border-0">
                        <router-link :to="{ name: 'enquete-prix-par-marche-grossiste', params: { id: data.enquete?.id , nom:'GROSSISTE' }}" class="btn btn-circle btn-success btn-xs" title="" @click="HandleData(data?.enquete)"  data-original-title="view" ><i class="ti-eye"></i></router-link>
                        <a href="javascript:vcode(0)" class="btn btn-circle btn-danger btn-xs" @click="HandleIdDelete(data.enquete?.id , 'GROSSISTE')" title="" data-toggle="tooltip" data-original-title="Delete"><i class="ti-trash"></i></a>
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
  </div>
         
            </div>
  
            <div class="modal center-modal fade"  id="add-fiche-grossiste"  ref="add-fiche-grossiste" tabindex="-1">
          <div class="modal-dialog ">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Recherchez...</h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('add-fiche-grossiste')" >
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
                  <div class="row mt-3 content-group">
                       
                        <div class="col-12">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > N° Fiche <span class="text-danger">*</span></label
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
                              > Date d'enquete<span class="text-danger">*</span></label
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
                              > Agent collecte <span class="text-danger">*</span></label
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
                            <small v-if="v$.step1.collecteur.$error">{{
                              v$.step1.collecteur.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['collecteur']">
                              {{ resultError["collecteur"] }}
                            </small>
                          </div>
                        </div>
  
                        <div class="col-12">
                          <div class="input-groupe">
                            <label for="userpassword"
                              >Date d'enregistrement <span class="text-danger">*</span></label
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
          
              <button type="button" @click="submitFicheCollecte('add-fiche-grossiste')" class="waves-effect waves-light btn btn-primary ">Valider</button>
          
  
            </div>
          </div>
          </div>
        </div>
  
    
          <div class="modal center-modal fade"  id="update-fiche-grossiste"  ref="update-fiche-grossiste" tabindex="-1">
          <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Modifier une fiche</h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('update-fiche-grossiste')" >
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
  
                        <!-- <div class="col-6">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Marché <span class="text-danger">*</span></label
                            >
                            <MazSelect
                              v-model="step2.marche"
                              color="secondary"
                              name="step2.marche"
                              size="sm"
                              rounded-size="sm"
                              search
                              :options="MarchesOptions"
                              
                              
                            />
                            <small v-if="v$.step2.marche.$error">{{
                              v$.step2.marche.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['marche']">
                              {{ resultError["marche"] }}
                            </small>
                          </div>
                        </div> -->
  
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
                              > Numero point collecte <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.numero_point_collecte"
                              color="secondary"
                              name="step2.numero_point_collecte"
                              size="sm"
                              rounded-size="sm"
                             
                              
                              
                            />
                            <small v-if="v$.step2.numero_point_collecte.$error">{{
                              v$.step2.numero_point_collecte.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['numero_point_collecte']">
                              {{ resultError["numero_point_collecte"] }}
                            </small>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="input-groupe">
                            <label for="userpassword"
                              >Nom de la personne enquete <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.nom_personne_enquete"
                              color="secondary"
                              name="step2.nom_personne_enquete"
                              size="sm"
                              rounded-size="sm"
                              search
                              :options="nom_personne_enquetesOptions"
                              
                              
                            />
                            <small v-if="v$.step2.nom_personne_enquete.$error">{{
                              v$.step2.nom_personne_enquete.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['nom_personne_enquete']">
                              {{ resultError["nom_personne_enquete"] }}
                            </small>
                          </div>
                        </div>
                       
  
                        <div class="col-6">
                          <div class="input-groupe">
                            <label for="userpassword"
                              >Contact<span class="text-danger">*</span></label
                            >
                          
                            <MazPhoneNumberInput v-model="step2.contact_personne_enquete" size="sm" rounded-size="sm" show-code-on-list color="secondary"
                          :ignored-countries="['AC']" defaultCountryCode="GN" update="results = $event"
                          :success="results?.isValid" />
                            <small v-if="v$.step2.contact_personne_enquete.$error">{{
                              v$.step2.contact_personne_enquete.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['contact_personne_enquete']">
                              {{ resultError["contact_personne_enquete"] }}
                            </small>
                          </div>
                        </div>
                      
                      </div>
                    
            </div>
            <div class="modal-footer modal-footer-uniform text-end">
          
              <button type="button" @click="submitUpdate('update-fiche-grossiste')" class="waves-effect waves-light btn btn-primary ">Valider</button>
          
  
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
        Pag , Loading , MazPhoneNumberInput
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
            data:[],
            currentPage: 1,
            itemsPerPage: 10,
            ToId:"",
            totalPageArray: [],
            currentMarcheName: "",
            yearOptions:[],
            years:[],
            year: new Date().getFullYear(),

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
            numero_point_collecte:"",
            nom_personne_enquete:"",
            contact_personne_enquete:"",
            },
            v$: useVuelidate(),
            error: "",
            resultError: {},
         
  
        }
    },
    validations: {
        step1: {
                num_fiche:{require},
            date_enquete:{require},
           
            collecteur:{require},
            numero_point_collecte:{require},
            nom_personne_enquete:{require},
            contact_personne_enquete:{require},
            
            },
       
        step2: {
  
          num_fiche:{require},
            date_enquete:{require},
           
            collecteur:{require},
            numero_point_collecte:{require},
            nom_personne_enquete:{require},
            contact_personne_enquete:{require},
           
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
        console.log('response',response)
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
        this.handleErrors(error);
       
       
      }
    },
    updateSelectedItems() {
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
    this.handleErrors(error);
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
    this.handleErrors(error);
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
        this.FichesCollOptions = [...this.data];
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
       this.ConfirmeDelete(id, nom);
     }
         },
         async ConfirmeDelete(id, nom) {
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
    // Sélectionner tous les éléments paginés
    this.selectedItems = this.paginatedItems.map(item => item.enquete?.num_fiche);
    console.log('Tous les éléments sélectionnés:', this.selectedItems);
    
    // Vérifie s'il y a une nouvelle sélection par rapport aux éléments initiaux
    this.hasNewSelection = this.selectedItems.some(item => !this.initialSelectedItems.includes(item));
  } else {
    // Désélectionner tous les éléments
    this.selectedItems = [];
    console.log('Tous les éléments désélectionnés');

    // Vérifie s'il y a une nouvelle sélection par rapport aux éléments initiaux
    this.hasNewSelection = false; // Aucune sélection, donc pas de nouvelle sélection
  }

  // Mettre à jour l'affichage du bouton de validation
  this.showValidationButton = this.selectedItems.length > 0;
},

    async validateSelection() {
     // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
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
    console.log("Items sélectionnés:", formattedItems);
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
      const NumeroCollecte = user?.enquete?.numero_point_collecte  || '';
      const Contact = user?.enquete?.contact_personne_enquete || '';
      const nomEnquete = user?.enquete?.nom_personne_enquete || '';
      return Nom.toLowerCase().includes(searchValue)  ||
      collecte.toLowerCase().includes(searchValue)  ||
      Prenom.toLowerCase().includes(searchValue)  ||
      Numero.toLowerCase().includes(searchValue)  ||
      NumeroCollecte.toLowerCase().includes(searchValue)  ||
      Contact.toLowerCase().includes(searchValue)  ||
      nomEnquete.toLowerCase().includes(searchValue)  ||
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