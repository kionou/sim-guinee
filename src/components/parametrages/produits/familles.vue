<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="col-12">
<div class="box">
   <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
     <h3 class="box-title mb-0">Liste des Familles</h3>
     <div class="navbar-custom-menu r-side  float-right">
        <ul class="nav navbar-nav justify-content-end">	
				  
			<li class="btn-group d-lg-inline-flex h-40">
				<div class="app-menu">
					<div class="search-bx mx-5">
						<form>
							<div class="input-group">
							  <input type="text" class="form-control" placeholder="Search" aria-label="Recherchez..." aria-describedby="button-addon2" v-model="searchFamille" @input="filterByName">
							  <div class="input-group-append">
								<button class="btn border border-1" ><i class="ti-search"></i></button>
							  </div>
							</div>
						</form>
					</div>
				</div>
			</li>
			<li class="h-40">
				<button type="button" class="waves-effect waves-circle btn btn-circle btn-primary mb-5"  @click="openModal('add-famille')" ><i class="mdi mdi-plus"></i></button>
			</li>

			
        </ul>
                  </div> 
   </div>
   <!-- /.box-header -->
   <div class="box-body">
       <div class="table-responsive">
         <table id="example1" class="table table-bordered table-striped">
           <thead>
               <tr>
                  
                   <th>Code</th>
                   <th>Nom</th>
                   <th>Visibilité</th>
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
                   
                   <td style="width:100px !important">{{ data?.code_famille_produit }}</td>
                   <td>{{ data?.nom_famille_produit }}</td>
                   <td>{{ data?.affichage_ecran }}</td>
                   
                   <td style="width: 100px;">
                    <div class="d-flex justify-content-evenly border-0">
                        <a href="javascript:void(0)" class="btn btn-circle btn-info btn-xs" title="" @click="HandleIdUpdate(data.code_famille_produit ,'update-famille')"  data-original-title="Update" ><i class="ti-marker-alt"></i></a>
                        <a href="javascript:vcode(0)" class="btn btn-circle btn-danger btn-xs" @click="HandleIdDelete(data.id_famille_produit)" title="" data-toggle="tooltip" data-original-title="Delete"><i class="ti-trash"></i></a>
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

            <div class="modal center-modal fade" id="add-famille"  ref="add-famille" tabindex="-1">
	  <div class="modal-dialog modal-lg">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title">Ajouter des familles</h5>
			<button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"  @click="closeModal('add-famille')" >
              <span aria-hidden="true">&times;</span>
            </button>
		  </div>
		  <div class="modal-body">
         <!-- <div class="btn-list" style="position:relative ; right: 7px; top: 5px;" > -->
          <div class="bouttons" style="position: relative ; width: 100%; " > 
        <div class="btn btn-secondary py-1 px-2" style="position: absolute; right: 0; top: 13px; z-index:1000" @click="AddformDataFamilles" ><i  class="ti-plus"></i></div>
         </div>
          <!-- </div>  -->
                <div class="row align-items-center p-2  border-bottom " v-for="(famille, index) in Familles" :key="famille.id">
                  <div class="col-11">
                    <span class="nombre">
                            {{index + 1}}
                        </span>
                        <div class="row  content-group">
                 
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Code <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="famille.code_famille_produit"
                        color="info"
                        name="code_famille_produit"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        @input="clearErrorFamilles(index, 'code_famille_produit')"

                      />
                      <small v-if="errors.Familles && errors.Familles[index] && errors.Familles[index].code_famille_produit">{{ errors.Familles[index].code_famille_produit }}</small>
                      <small v-if="resultError['Familles']"> {{ resultError["Familles"] }} </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Nom <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="famille.nom_famille_produit"
                        color="info"
                        name="nom_famille_produit"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        @input="clearErrorFamilles(index, 'nom_famille_produit')"

                      />
                      <small v-if="errors.Familles && errors.Familles[index] && errors.Familles[index].nom_famille_produit">{{ errors.Familles[index].nom_famille_produit }}</small>
                      <small v-if="resultError['Familles']"> {{ resultError["Familles"] }} </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Visibilité <span class="text-danger">*</span></label
                      >
                      <MazSelect
                        v-model="famille.affichage_ecran"
                        color="info"
                        name="affichage_ecran"
                        size="sm"
                        rounded-size="sm"
                        search
                        :options="choix"
                        @click="clearErrorFamilles(index, 'affichage_ecran')"

                      />
                      <small v-if="errors.Familles && errors.Familles[index] && errors.Familles[index].affichage_ecran">{{ errors.Familles[index].affichage_ecran }}</small>
                      <small v-if="resultError['Familles']"> {{ resultError["Familles"] }} </small>
                    </div>
                  </div>
                </div>
                  </div>
                  <div class="col-1" style="position: relative">
                    
                      <button class="btn btn-sm btn-icon btn-danger btn-wave py-1 px-2" @click="deleteRowFamilles(index)"  style=" position:absolute !important ; top: 12px !important; background:red;">
                       <i class="ti-trash"></i>
                      </button>
                  </div>

                </div>
             
		  </div>
		  <div class="modal-footer modal-footer-uniform text-end">
		
        <button type="button" @click="SubmitFamille('add-famille')" class="waves-effect waves-light btn btn-primary ">Valider</button>


		  </div>
		</div>
	  </div>
	        </div>

    
          <div class="modal center-modal fade"  id="update-famille"  ref="update-famille" tabindex="-1">
          <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Modifier une famille</h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('update-famille')" >
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
                  <div class="row mt-3 content-group">
                       
                        <div class="col-12">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Code <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.code_famille_produit"
                              color="secondary"
                              name="step2.code_famille_produit"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step2.code_famille_produit.$error">{{
                              v$.step2.code_famille_produit.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['code_famille_produit']">
                              {{ resultError["code_famille_produit"] }}
                            </small>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Nom <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.nom_famille_produit"
                              color="secondary"
                              name="step2.nom_famille_produit"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step2.nom_famille_produit.$error">{{
                              v$.step2.nom_famille_produit.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['nom_famille_produit']">
                              {{ resultError["nom_famille_produit"] }}
                            </small>
                          </div>
                        </div>

                        <div class="col-12">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Nom <span class="text-danger">*</span></label
                            >
                            <MazSelect
                              v-model="step2.affichage_ecran"
                              color="secondary"
                              name="step2.affichage_ecran"
                              size="sm"
                              rounded-size="sm"
                              search
                              :options="choix"
                              
                              
                            />
                            <small v-if="v$.step2.affichage_ecran.$error">{{
                              v$.step2.affichage_ecran.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['affichage_ecran']">
                              {{ resultError["affichage_ecran"] }}
                            </small>
                          </div>
                        </div>
                       
                      
                      </div>
                    
            </div>
            <div class="modal-footer modal-footer-uniform text-end">
          
              <button type="button" @click="submitUpdate('update-famille')" class="waves-effect waves-light btn btn-primary ">Valider</button>
          

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
    components:{
        Pag , Loading
    },
    computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPages() {
      return Math.ceil(this.FamillesOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.FamillesOptions.slice(startIndex, endIndex);
    },
  
  },
    data() {
        return {
            loading: true,
            searchFamille:"",
            isModalUpdate:"",
            FamillesOptions: [],
            data:[],
            currentPage: 1,
            itemsPerPage: 10,
            ToId:"",
            totalPageArray: [],
            choix:[
                {label:"Oui" , value:true},
                {label:"Non" , value:'non'}
            ],
            step2: {
                code_famille_produit:"",
            nom_famille_produit:"",
            affichage_ecran:"",
            },
            v$: useVuelidate(),
            error: "",
            resultError: {},
            errors: {Familles: [] , },
        Familles:[{ 
            code_famille_produit:"",
            nom_famille_produit:"",
            affichage_ecran:"",

         }
        ],

        }
    },
    validations: {
       
        step2: {
           
          
            code_famille_produit:{require},
            nom_famille_produit:{require},
            affichage_ecran:{require},
           
    },
  },
  async  mounted() {
    await this.fetchFamilles()
        
    },
    methods: {
        successmsg:successmsg,
        AddformDataFamilles() {
     this.Familles.push({code_famille_produit:"", nom_famille_produit:"",affichage_ecran:"", });
   },
   deleteRowFamilles(index) {
  
   if(index !== 0){
     this.Familles.splice(index, 1);
   }
  },
  clearErrorFamilles(index, field) {   
     if (this.errors.Familles[index]) {
       this.errors.Familles[index][field] = null;
     }
   },
   validateFamilles() {
    let isValid = true;
    this.errors = { Familles: [] };
    this.Familles.forEach((famille, index) => {
        const familleErrors = {};
        
        if (!famille.code_famille_produit) {
            familleErrors.code_famille_produit = 'Ce champs est obligatoire!';
            isValid = false;
        }
        if (!famille.nom_famille_produit) {
            familleErrors.nom_famille_produit = 'Ce champs est obligatoire!';
            isValid = false;
        }
        if (!famille.affichage_ecran) {
            familleErrors.affichage_ecran = 'Ce champs est obligatoire!';
            isValid = false;
        }
       
       
      
        this.errors.Familles[index] = familleErrors;
    });
    return isValid;
},
        
        async fetchFamilles() {
      try {
        const response = await axios.get( '/parametrages/familles',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
            
          }
        );

          console.log('response',response)
        if (response.status === 200) {
              this.data  = response.data ;
              this.FamillesOptions = this.data
            this.$emit('famille-count', this.data.length)
              this.loading =  false
        }
      } catch (error) {
        this.handleErrorsGet(error);
       
       
      }
    },
    async SubmitFamille(modalId) {
     
      if (this.validateFamilles()) {
        this.loading = true;
        this.Familles.forEach(famille => {
          if (famille.affichage_ecran === 'non') {
            famille.affichage_ecran = false;
          }
        });
        console.log('regions',this.Familles)
        try {
          const response = await axios.post("/parametrages/familles", this.Familles, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
           
          }
          });
       console.log('qfs',response)

      
          if (response.status === 200) {
     this.Familles = [{code_famille_produit:"", nom_famille_produit:"",affichage_ecran:"", }];

             this.closeModal(modalId);
             this.successmsg(
                "Création de familles",
                "Vos familles ont été créées avec succès !"
            );
            await this.fetchFamilles();
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
        const response = await axios.get(`/parametrages/familles/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`
          }
        });

      
        if (response.status === 200) {
            
        
          let data =  response.data
          this.step2.code_famille_produit = data.code_famille_produit,
          this.step2.nom_famille_produit = data.nom_famille_produit,
          this.step2.affichage_ecran = (data.affichage_ecran === true) ? true : 'non',
          
       
          this.ToId = data.id_famille_produit
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
            code_famille_produit:this.step2.code_famille_produit,
            nom_famille_produit:this.step2.nom_famille_produit,
            affichage_ecran: (this.step2.affichage_ecran === true) ? true : false,
            }
            console.log('data',data)

      try {
        const response = await axios.put(`/parametrages/familles/${this.ToId}`,data, {
          headers: {
           
            Authorization: `Bearer ${this.loggedInUser.token}`,
          
          },
        });
     
        if (response.status === 200) {
          this.closeModal(modalId);
          this.successmsg(
                "Mise à jour de la famille",
                "Votre famille a été mise à jour avec succès !"
            );
            await this.fetchFamilles();
         
          
        } 
      } catch (error) {
        this.handleErrors(error);
      }
    } else {
  
      this.loading = false;

    }
   },
    async HandleIdDelete(id) {
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
       this.ConfirmeDelete(id);
     }
         },
         async ConfirmeDelete(id) {
          this.loading = true
         
         try {
           // Faites une requête pour supprimer l'élément avec l'ID itemId
           const response = await axios.delete(`/parametrages/familles/${id}`, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
             },
   
   
           });
       
           if (response.status === 200) {
             this.loading = false
                        this.successmsg(
                "Suppression de la famille",
                "Votre famille a été supprimée avec succès !"
            );
            await this.fetchFamilles();
   
           } else {
        
            this.handleErrors(error);
           }
         } catch (error) {
            this.handleErrors(error);
           
         }
   
       },
    filterByName() {
this.currentPage = 1;
if (this.searchFamille !== null) {
   const tt = this.searchFamille;
  const  searchValue = tt.toLowerCase()
  this.FamillesOptions =this.data.filter(user => {
    const Nom = user.code_famille_produit || '';
    const definition = user.nom_famille_produit || '';
    return Nom.toLowerCase().includes(searchValue)  ||
     definition.toLowerCase().includes(searchValue) 
  });

} else {
this.FamillesOptions = [...this.data];
 
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
      return this.FamillesOptions.slice(startIndex, endIndex);
    },
    },
    
}
</script>
<style lang="css" scoped>
    
</style>