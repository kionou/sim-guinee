<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="col-12">
<div class="box">
   <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
     <h3 class="box-title mb-0">Liste des provenances</h3>
     <div class="navbar-custom-menu r-side  float-right">
        <ul class="nav navbar-nav justify-content-end">	
				  
			<li class="btn-group d-lg-inline-flex  h-40">
				<div class="app-menu">
					<div class="search-bx mx-5">
						<form>
							<div class="input-group">
							  <input type="text" class="form-control" placeholder="Search" aria-label="Recherchez..." aria-describedby="button-addon2" v-model="searchOriginie" @input="filterByName">
							  <div class="input-group-append">
								<button class="btn border border-1" ><i class="ti-search"></i></button>
							  </div>
							</div>
						</form>
					</div>
				</div>
			</li>
			<li class="h-40">
				<button type="button" class="waves-effect waves-circle btn btn-circle btn-primary mb-5"  @click="openModal('add-origine')" ><i class="mdi mdi-plus"></i></button>
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
                   
                   <td style="width:100px !important">{{ data?.code_origine_produit }}</td>
                   <td>{{ data?.nom_origine_produit }}</td>
                   
                   <td style="width: 100px;">
                    <div class="d-flex justify-content-evenly border-0">
                        <a href="javascript:void(0)" class="btn btn-circle btn-info btn-xs" title="" @click="HandleIdUpdate(data.code_origine_produit , 'update-origine')"  data-original-title="Update"><i class="ti-marker-alt"></i></a>
                        <a href="javascript:vcode(0)" class="btn btn-circle btn-danger btn-xs" @click="HandleIdDelete(data.id_origine_produit)" title="" data-toggle="tooltip" data-original-title="Delete"><i class="ti-trash"></i></a>
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

            <div class="modal center-modal fade" id="add-origine"  ref="add-origine" tabindex="-1">
	  <div class="modal-dialog modal-lg">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title">Ajouter des provenances</h5>
      <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('add-origine')" >
              <span aria-hidden="true">&times;</span>
            </button>
		  </div>
		  <div class="modal-body">
         <!-- <div class="btn-list" style="position:relative ; right: 7px; top: 5px;" > -->
          <div class="bouttons" style="position: relative ; width: 100%; " > 
        <div class="btn btn-secondary py-1 px-2" style="position: absolute; right: 0; top: 13px; z-index:1000" @click="AddformDataOrigines" ><i  class="ti-plus"></i></div>
         </div>
          <!-- </div>  -->
                <div class="row align-items-center p-2  border-bottom " v-for="(origine, index) in Origines" :key="origine.id">
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
                        v-model="origine.code_origine_produit"
                        color="info"
                        name="code_origine_produit"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        @input="clearErrorOrigines(index, 'code_origine_produit')"

                      />
                      <small v-if="errors.Origines && errors.Origines[index] && errors.Origines[index].code_origine_produit">{{ errors.Origines[index].code_origine_produit }}</small>
                      <small v-if="resultError['Origines']"> {{ resultError["Origines"] }} </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Nom <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="origine.nom_origine_produit"
                        color="info"
                        name="nom_origine_produit"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        @input="clearErrorOrigines(index, 'nom_origine_produit')"

                      />
                      <small v-if="errors.Origines && errors.Origines[index] && errors.Origines[index].nom_origine_produit">{{ errors.Origines[index].nom_origine_produit }}</small>
                      <small v-if="resultError['Origines']"> {{ resultError["Origines"] }} </small>
                    </div>
                  </div>
                </div>
                  </div>
                  <div class="col-1" style="position: relative">
                    
                      <button class="btn btn-sm btn-icon btn-danger btn-wave py-1 px-2" @click="deleteRowOrigines(index)"  style=" position:absolute !important ; top: 12px !important; background:red;">
                       <i class="ti-trash"></i>
                      </button>
                  </div>

                </div>
             
		  </div>
		  <div class="modal-footer modal-footer-uniform text-end">
		
        <button type="button" @click="SubmitOrigine('add-origine')" class="waves-effect waves-light btn btn-primary ">Valider</button>


		  </div>
		</div>
	  </div>
	        </div>

    
          <div class="modal center-modal fade"  id="update-origine"  ref="update-origine" tabindex="-1">
          <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Modifier une provenance</h5>
            <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('update-origine')" >
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
                              v-model="step2.code_origine_produit"
                              color="secondary"
                              name="step2.code_origine_produit"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step2.code_origine_produit.$error">{{
                              v$.step2.code_origine_produit.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['code_origine_produit']">
                              {{ resultError["code_origine_produit"] }}
                            </small>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="input-groupe">
                            <label for="userpassword"
                              > Nom <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="step2.nom_origine_produit"
                              color="secondary"
                              name="step2.nom_origine_produit"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              
                              
                            />
                            <small v-if="v$.step2.nom_origine_produit.$error">{{
                              v$.step2.nom_origine_produit.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['nom_origine_produit']">
                              {{ resultError["nom_origine_produit"] }}
                            </small>
                          </div>
                        </div>
                       
                      
                      </div>
                    
            </div>
            <div class="modal-footer modal-footer-uniform text-end">
          
              <button type="button" @click="submitUpdate('update-origine')" class="waves-effect waves-light btn btn-primary ">Valider</button>
          

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
      return Math.ceil(this.OriginesOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.OriginesOptions.slice(startIndex, endIndex);
    },
  
  },
    data() {
        return {
            loading: true,
            searchOriginie:"",
            isModalUpdate:"",
            OriginesOptions: [],
            data:[],
            currentPage: 1,
            itemsPerPage: 10,
            ToId:"",
            totalPageArray: [],
            step2: {
              code_origine_produit:"",
            nom_origine_produit:"",
            },
            v$: useVuelidate(),
            error: "",
            resultError: {},
            errors: {Origines: [] , },
        Origines:[{ 
            code_origine_produit:"",
            nom_origine_produit:"",

         }
        ],

        }
    },
    validations: {
       
        step2: {
           
            code_origine_produit:{require},
            nom_origine_produit:{require},
           
    },
  },
  async  mounted() {
    await this.fetchOrigines()
        
    },
    methods: {
        successmsg:successmsg,
        AddformDataOrigines() {
     this.Origines.push({code_origine_produit:"", nom_origine_produit:"", });
   },
   deleteRowOrigines(index) {
  
   if(index !== 0){
     this.Origines.splice(index, 1);
   }
  },
  clearErrorOrigines(index, field) {   
     if (this.errors.Origines[index]) {
       this.errors.Origines[index][field] = null;
     }
   },
   validateOrigines() {
    let isValid = true;
    this.errors = { Origines: [] };
    this.Origines.forEach((origine, index) => {
        const origineErrors = {};
        
        if (!origine.code_origine_produit) {
            origineErrors.code_origine_produit = 'Ce champs est obligatoire!';
            isValid = false;
        }
        if (!origine.nom_origine_produit) {
            origineErrors.nom_origine_produit = 'Ce champs est obligatoire!';
            isValid = false;
        }
       
       
      
        this.errors.Origines[index] = origineErrors;
    });
    return isValid;
},
        
        async fetchOrigines() {
      try {
        const response = await axios.get( '/parametrages/origines',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
            
          }
        );

          console.log('response',response)
        if (response.status === 200) {
              this.data  = response.data ;
              this.OriginesOptions = this.data
          this.$emit('origine-count', this.data.length)

              this.loading =  false
        }
      } catch (error) {
        this.handleErrors(error);
       
      }
    },
    async SubmitOrigine(modalId) {
     
      if (this.validateOrigines()) {
        console.log('regions',this.Origines)
        this.loading = true;
        try {
          const response = await axios.post("/parametrages/origines", this.Origines, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
           
          }
          });
       console.log('qfs',response)

      
          if (response.status === 200) {
     this.Origines  = [{code_origine_produit:"", nom_origine_produit:"", }];

             this.closeModal(modalId);
             this.successmsg(
                "Création de provenances",
                "Vos provenances ont été créées avec succès !"
            );
            await this.fetchOrigines();
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
        const response = await axios.get(`/parametrages/origines/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`
          }
        });

      
        if (response.status === 200) {
            console.log('Slbvlkjbv',response)
        
          let data =  response.data
          this.step2.code_origine_produit = data.code_origine_produit,
          this.step2.nom_origine_produit = data.nom_origine_produit,
          
       
          this.ToId = data.id_origine_produit
          this.loading = false;
        
        }
      } catch (error) {
      
        this.handleErrors(error);
      }

    },
    async  submitUpdate(modalId){
   
   this.v$.step2.$touch();

 
    if (this.v$.$errors.length == 0) {
    
       this.loading = true;
       let data = {
            code_origine_produit:this.step2.code_origine_produit,
            nom_origine_produit:this.step2.nom_origine_produit,
            }

      try {
        const response = await axios.put(`/parametrages/origines/${this.ToId}`,data, {
          headers: {
           
            Authorization: `Bearer ${this.loggedInUser.token}`,
          
          },
        });
     
        if (response.status === 200) {
          this.closeModal(modalId);
          this.successmsg(
                "Mise à jour de la provenance",
                "Votre provenance a été mise à jour avec succès !"
            );
            await this.fetchOrigines();
         
          
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
           const response = await axios.delete(`/parametrages/origines/${id}`, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
             },
   
   
           });
       
           if (response.status === 200) {
             this.loading = false
                        this.successmsg(
                "Suppression de la provenance",
                "Votre provenance a été supprimée avec succès !"
            );
            await this.fetchOrigines();
   
           } else {
        
            this.handleErrors(error);
           }
         } catch (error) {
          this.handleErrors(error);
           
         }
   
       },
    filterByName() {
this.currentPage = 1;
if (this.searchOriginie !== null) {
   const tt = this.searchOriginie;
  const  searchValue = tt.toLowerCase()
  this.OriginesOptions =this.data.filter(user => {
    const Nom = user.code_origine_produit || '';
    const definition = user.nom_origine_produit || '';
    return Nom.toLowerCase().includes(searchValue)  ||
    Nom.toLowerCase().includes(searchValue)  || definition.toLowerCase().includes(searchValue) 
  });

} else {
this.OriginesOptions = [...this.data];
 
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
      return this.OriginesOptions.slice(startIndex, endIndex);
    },
    },
    
}
</script>
<style lang="css" scoped>
    
</style>