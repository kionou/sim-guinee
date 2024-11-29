<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="col-12">
<div class="box">
   <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
     <h3 class="box-title mb-0 col-8" style="font-size: 20px;">Liste des fiches d'enquêtes sur le marché <b style="color:red !important">{{nom }}</b> dans la commune de <b style="color:red !important">{{Commune.nom_commune }}</b> et dans la région <b style="color:red !important">{{Commune?.prefecture_?.region_relation?.nom_region }}</b></h3>
 
   
     <div class="navbar-custom-menu r-side  float-right col-4">
        <ul class="nav navbar-nav justify-content-end">	
				  
			<li class="btn-group d-lg-inline-flex h-40">
				<div class="app-menu">
					<div class="search-bx mx-5">
						<form>
							<div class="input-group">
							  <input type="text" class="form-control" placeholder="Search" aria-label="Recherchez..." aria-describedby="button-addon2" v-model="searchFicheCollecteFiche" @input="filterByName">
							  <div class="input-group-append">
								<button class="btn border border-1" ><i class="ti-search"></i></button>
							  </div>
							</div>
						</form>
					</div>
				</div>
			</li>
			<li class="h-40">
				<button type="button" class="waves-effect waves-circle btn btn-circle btn-primary mb-5"   @click="openModal('add-fiche-collecte')"   ><i class="mdi mdi-plus"></i></button>
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
                   <th>Nb de prod. collectés </th>
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
              
                   <td style="width:180px !important ; color:red !important; font-weight:bolder !important" class="text-center" >{{ data?.nbre_produit }}</td>
                   <td style="width:100px !important ; color:red !important; font-weight:bolder !important" class="text-center" >{{ getYear( data?.enquete?.date_enquete) }}</td>
                   
                   <td style="width: 120px;">
                    <div class="d-flex justify-content-evenly border-0">
                        <router-link :to="{ name: 'enquete-prix-par-marche-transfrontalier', params: { id: data.enquete?.id , nom:'TRANSFRONTALIER' }}" class="btn btn-circle btn-success btn-xs" title="" @click="HandleData(data?.enquete)"  data-original-title="view" ><i class="ti-eye"></i></router-link>
                        <button :disabled="data.enquete?.etat === true" class="btn btn-circle btn-info btn-xs" title="" @click="HandleIdUpdate(data.enquete?.id , 'update-fiche-collecte')"  ><i class="ti-marker-alt"></i></button>
                        <a href="javascript:vcode(0)" class="btn btn-circle btn-danger btn-xs" @click="HandleIdDelete(data.enquete?.id , 'TRANSFRONTALIER')" title="" data-toggle="tooltip" data-original-title="Delete"><i class="ti-trash"></i></a>
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

            <div class="modal center-modal fade"  id="add-fiche-collecte"  ref="add-fiche-collecte" tabindex="-1">
          <div class="modal-dialog ">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Ajouter une fiche</h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('add-fiche-collecte')" >
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
                              readonly
                              disabled                              
                              
                            />
                            <small v-if="v$.step1.num_fiche.$error">{{
                              v$.step1.num_fiche.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['num_fiche']">
                              {{ resultError["num_fiche"] }}
                            </small>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Date <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step1.date_enquete"
                              color="secondary"
                              name="step1.date_enquete"
                              size="sm"
                              rounded-size="sm"
                              type="date"
                              
                              
                            />
                            <small v-if="v$.step1.date_enquete.$error">{{
                              v$.step1.date_enquete.$errors[0].$message
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
                              v-model="step1.marche"
                              color="secondary"
                              name="step1.marche"
                              size="sm"
                              rounded-size="sm"
                              search
                              :options="MarchesOptions"
                              
                              
                            />
                            <small v-if="v$.step1.marche.$error">{{
                              v$.step1.marche.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['marche']">
                              {{ resultError["marche"] }}
                            </small>
                          </div>
                        </div> -->

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
                       
                      
                      </div>
                    
            </div>
            <div class="modal-footer modal-footer-uniform text-end">
          
              <button type="button" @click="submitFicheCollecte('add-fiche-collecte')" class="waves-effect waves-light btn btn-primary ">Valider</button>
          

            </div>
          </div>
          </div>
        </div>

    
          <div class="modal center-modal fade"  id="update-fiche-collecte"  ref="update-fiche-collecte" tabindex="-1">
          <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Modifier une fiche</h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('update-fiche-collecte')" >
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
                        <div class="col-12">
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

                        <div class="col-12">
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
    nom:{
        type:String,
        required:true,
    } ,
    enquetes: {
      type: Array,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    id:{
        type:String,
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
            data:[],
            currentPage: 1,
            itemsPerPage: 10,
            ToId:"",
            totalPageArray: [],
            currentMarcheName: "",

            initialSelectedItems: [],
            selectAllCheckbox: false,  // État de la checkbox "select all"
            selectedItems: [],
            hasNewSelection: false, //

          
            step1: {
                num_fiche:"",
            date_enquete:"",
            // marche:"",
            collecteur:"",
            
            },
            step2: {
              num_fiche:"",
            date_enquete:"",
            // marche:"",
            collecteur:"",
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
            // marche:{require},
            collecteur:{require},
            
            },
       
        step2: {
           
          
          num_fiche:{require},
            date_enquete:{require},
            // marche:{require},
            collecteur:{require},
           
    },
  },
  async  mounted() {
    const code  =   await JSON.parse(localStorage.getItem('DataCommune'));
    await this.fetchCommuneByCode(code )
     await this.fetchNumberFiche()
    await this.fetchCollecteurs()
    
    
        
    },
    watch: {
    enquetes: {
      handler(newData) {
        this.FichesCollOptions = [...newData];
        this.data = [...newData];
        this.updatePaginatedItems();

        this.initialSelectedItems = this.data
        .filter(item => item.enquete?.etat === true) 
        .map(item => item.enquete?.num_fiche); 
      this.selectedItems = [...this.initialSelectedItems];
      this.updateSelectedItems();
      },
      deep: true,
      immediate: true,
    },
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
  
        
        async fetchFichesCollectes() {
      try {
        const response = await axios.get( `/enquetes/Fiches/par-marche/{id}?identite=${this.id}&type=COLLECTE`,
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
            
          }
        );
        if (response.status === 200) {
              this.data  = response.data ;
              this.FichesCollOptions = this.data
           
              this.loading =  false
        }
      } catch (error) {
        this.handleErrorsGet(error);
       
       
      }
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
    async submitFicheCollecte(modalId) {
        this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let data = {
            num_fiche:this.step1.num_fiche,
            date_enquete:this.step1.date_enquete,
            marche: this.id,
            collecteur: this.step1.collecteur,
            }
        try {
          const response = await axios.post("/enquetes/Fiches/collectes", data, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
           
          }
          });
      
          if (response.status === 200) {
             this.closeModal(modalId);
             this.step1 = {
          num_fiche: "",
          date_enquete: "",
          collecteur: "",
         
        };
        this.v$.step1.$reset();
        this.successmsg(
            "Création de la fiche d'enquête",
            "Votre fiche d'enquête a été créée avec succès !"
        );
            this.$emit('enquete-updated');
            this.loading = false
          } else {
          }
        } catch (error) {
            this.handleErrors(error);
        }
      } else {
      
      }
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
            }
      try {
        const response = await axios.put(`/enquetes/Fiches/collectes/${this.ToId}`,data, {
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
       updateSelectedItems() {
      this.paginatedItems.forEach(item => {
        if (this.selectedItems.includes(item.enquete?.num_fiche)) {
          item.enquete.etat = true;
        } else {
          item.enquete.etat = false;
        }
      });
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
    async validateSelection1() {
      const newItems = this.selectedItems.filter(item => !this.initialSelectedItems.includes(item));
      const formattedItems = newItems.map(item => {
        return { code: String(item) };
      });
      this.loading = true

      try {
        const response = await axios.post('/enquetes/Fiches/validations', formattedItems, {
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
          this.$emit('enquete-updated');
          this.hasNewSelection = false
          this.loading = false

        } else {

          this.handleErrors(error);
        }
      } catch (error) {
        this.handleErrors(error);

      }

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
      this.fetchNumberFiche()
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