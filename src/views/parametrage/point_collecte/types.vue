<template >
  <div>
  <Loading v-if="loading" style="z-index: 99999"></Loading>
  <div class="content-header">
			<div class="d-flex align-items-center justify-content-between">
				
					<h3 class="page-title"> Types de  points de collectes </h3>
					<div class="d-inline-block align-items-center">
						<nav>
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><router-link to="/"><i class="mdi mdi-home-outline"></i></router-link></li>
								<li class="breadcrumb-item" aria-current="page">SIM</li>
								<li class="breadcrumb-item active" aria-current="page">Types de points de collectes </li>
							</ol>
						</nav>
					</div>
				
				
			</div>
		</div>
   
  <div class="box">
      <div class="box-header with-border p-2">
          
        <div class="navbar-custom-menu r-side  float-right">
      <ul class="nav navbar-nav justify-content-end">	
        
    <li class="btn-group d-lg-inline-flex  h-40">
      <div class="app-menu">
        <div class="search-bx mx-5">
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
    </li>
    <li class="h-40">
      <button type="button" class="waves-effect waves-circle btn btn-circle btn-primary mb-5"  @click="openModal('add-type-marche')"  ><i class="mdi mdi-plus"></i></button>
    </li>

    
      </ul>
                </div>        
      </div>
  </div>
<div class="box mx-2">
<div class="box-header with-border">
  <h3 class="box-title mb-0">Liste des types des points de collectes  </h3>
</div>

<div class="box-body">
     <div class="table-responsive">
       <table id="example1" class="table table-bordered table-striped">
         <thead>
             <tr>
                 <th class="text-center">Code</th>
                 <th>Nom </th>
                 <th>Description </th>    
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
             <tr v-for="data  in paginatedItems" :key="data.id">
                 <td style="width: 50px;" class="text-center">
                  {{ data?.type?.code_type_marche}}
                 </td>
                 <td>
        <div>
          {{ data?.type?.nom_type_marche ?? "-"}}
        
        </div>
         </td>
         <td>
        <div>
          {{ data?.type?.description ?? "-"}}
        
        </div>
         </td>
               
                 <td style="width: 100px;">
                  <div class="d-flex justify-content-evenly border-0">
                      <a href="javascript:void(0)" class="btn btn-circle btn-info btn-xs" title="" @click="HandleIdUpdate(data?.type?.code_type_marche , 'update-type-marche')"   ><i class="ti-marker-alt"></i></a>
                      <!-- <a href="javascript:void(0)" class="btn btn-circle btn-danger btn-xs" @click="HandleIdDelete(data.code_marche)" title="" data-toggle="tooltip" data-original-title="Delete"><i class="ti-trash"></i></a> -->
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
  

 <div class="modal center-modal fade" id="add-type-marche"  ref="add-type-marche" tabindex="-1">
  <div class="modal-dialog ">
  <div class="modal-content">
    <div class="modal-header">
    <h5 class="modal-title">Ajouter un type de points de collectes </h5>
    <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('add-type-marche')">
            <span aria-hidden="true">&times;</span>
          </button>
    </div>
    <div class="modal-body">
    <div class="row mt-3 content-group">
                      <div class="col">
                        <div class="input-groupe">
                          <label for="userpassword"
                            > Code <span class="text-danger">*</span></label
                          >
                          <MazInput
                            v-model="step1.code_type_marche"
                            color="secondary"
                            name="step1.code_type_marche"
                            size="sm"
                            rounded-size="sm"
                            type="text"
                            
                            
                          />
                          <small v-if="v$.step1.code_type_marche.$error">{{
                            v$.step1.code_type_marche.$errors[0].$message
                          }}</small>
                          <small v-if="resultError['code_type_marche']">
                            {{ resultError["code_type_marche"] }}
                          </small>
                        </div>
                      </div>
        
                    
          </div>
          <div class="row mt-3 content-group">
                      <div class="col">
                        <div class="input-groupe">
                          <label for="userpassword"
                            > Nom <span class="text-danger">*</span></label
                          >
                          <MazInput
                            v-model="step1.nom_type_marche"
                            color="secondary"
                            name="step1.nom_type_marche"
                            size="sm"
                            rounded-size="sm"
                            type="text"
                            
                            
                          />
                          <small v-if="v$.step1.nom_type_marche.$error">{{
                            v$.step1.nom_type_marche.$errors[0].$message
                          }}</small>
                          <small v-if="resultError['nom_type_marche']">
                            {{ resultError["nom_type_marche"] }}
                          </small>
                        </div>
                      </div>
        
                    
          </div>
          <div class="row mt-3 content-group">
                      <div class="col">
                        <div class="input-groupe">
                          <label for="userpassword"
                            > Description <span class="text-danger">*</span></label
                          >
                          <textarea class="form-control" style="border-radius:0 !important; border:1px solid #e5eaee !important" id="text-area"  v-model="step1.description" rows="2"  ></textarea>

                          <small v-if="v$.step1.description.$error">{{
                            v$.step1.description.$errors[0].$message
                          }}</small>
                          <small v-if="resultError['description']">
                            {{ resultError["description"] }}
                          </small>
                        </div>
                      </div>
        
                    
          </div>
    
    
           
    </div>
    <div class="modal-footer modal-footer-uniform text-end">
  
      <button type="button" @click="SubmitTypeMarche('add-type-marche')" class="waves-effect waves-light btn btn-primary ">Valider</button>


    </div>
  </div>
  </div>
        </div>

  
        <div class="modal center-modal fade"  id="update-type-marche"  ref="update-type-marche" tabindex="-1">
        <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header">
          <h5 class="modal-title">Modifier un type de points de collectes </h5>
          <button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3" @click="closeModal('update-type-marche')" >
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
          <div class="modal-body">
    <div class="row mt-3 content-group">
                      <div class="col">
                        <div class="input-groupe">
                          <label for="userpassword"
                            > Code <span class="text-danger">*</span></label
                          >
                          <MazInput
                            v-model="step2.code_type_marche"
                            color="secondary"
                            name="step2.code_type_marche"
                            size="sm"
                            rounded-size="sm"
                            type="text"
                            disabled
                            
                            
                          />
                          <small v-if="v$.step2.code_type_marche.$error">{{
                            v$.step2.code_type_marche.$errors[0].$message
                          }}</small>
                          <small v-if="resultError['code_type_marche']">
                            {{ resultError["code_type_marche"] }}
                          </small>
                        </div>
                      </div>
        
                    
          </div>
          <div class="row mt-3 content-group">
                      <div class="col">
                        <div class="input-groupe">
                          <label for="userpassword"
                            > Nom <span class="text-danger">*</span></label
                          >
                          <MazInput
                            v-model="step2.nom_type_marche"
                            color="secondary"
                            name="step2.nom_type_marche"
                            size="sm"
                            rounded-size="sm"
                            type="text"
                            
                            
                          />
                          <small v-if="v$.step2.nom_type_marche.$error">{{
                            v$.step2.nom_type_marche.$errors[0].$message
                          }}</small>
                          <small v-if="resultError['nom_type_marche']">
                            {{ resultError["nom_type_marche"] }}
                          </small>
                        </div>
                      </div>
        
                    
          </div>
          <div class="row mt-3 content-group">
                      <div class="col">
                        <div class="input-groupe">
                          <label for="userpassword"
                            > Description <span class="text-danger">*</span></label
                          >
                          <textarea class="form-control" style="border-radius:0 !important; border:1px solid #e5eaee !important" id="text-area"  v-model="step2.description" rows="2"  ></textarea>

                          <small v-if="v$.step2.description.$error">{{
                            v$.step2.description.$errors[0].$message
                          }}</small>
                          <small v-if="resultError['description']">
                            {{ resultError["description"] }}
                          </small>
                        </div>
                      </div>
        
                    
          </div>
    
    
           
    </div>
          <div class="modal-footer modal-footer-uniform text-end">
        
            <button type="button" @click="submitUpdate('update-type-marche')" class="waves-effect waves-light btn btn-primary ">Valider</button>
        

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
      Pag , Loading , MazPhoneNumberInput
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
          loading: true,
          searchMarche:"",
          isModalUpdate:"",
          MarchesOptions: [],
          data:[],
          currentPage: 1,
          itemsPerPage: 10,
          ToId:"",
          totalPageArray: [],
    step1: {
      code_type_marche:"",
      nom_type_marche:"",
      description:"",
    },
  step2: {
      code_type_marche:"",
      nom_type_marche:"",
      description:"",
    },
          v$: useVuelidate(),
          error: "",
          resultError: {},

      }
  },
  validations: {
  step1: {
      code_type_marche:{require},
      nom_type_marche:{require},
      description:{require},
     
      
    },
     
 step2: {
      code_type_marche:{require},
      nom_type_marche:{require},
      description:{require},
   },
},
async  mounted() {
  await this.fetchMarches();
      
  },
  methods: {
      successmsg:successmsg,

      
      async fetchMarches() {
    try {
      const response = await axios.get( 'parametrages/type-marches/admin-dynamic-types',
        {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          
        }
      );

      if (response.status === 200) {
            this.data  = response.data ;
            this.MarchesOptions = this.data
            this.loading =  false
      }
    } catch (error) {
  this.handleErrorsGet(error);
    }
  },

  async SubmitTypeMarche(modalId) {
    this.v$.step1.$touch();
    if (this.v$.$errors.length == 0) {
      this.loading = true;
     let data = {

          code_type_marche:this.step1.code_type_marche,
          nom_type_marche:this.step1.nom_type_marche,
          description:this.step1.description,
          
          
     }
     
      try {
        const response = await axios.post("/parametrages/type-marches", data, {
          headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
        }
        });
    if (response.status === 200) {
          this.closeModal(modalId);
    this.successmsg(
      "Création du type de de points de collecte",
      "Votre type de de points de collecte a été créé avec succès !"
    );

          await this.fetchMarches();
        } else {
        }
      } catch (error) {
    this.handleErrors(error);
      }
    } else {
    
    }
  },
  async  HandleIdUpdate(id , modalId) {

this.step2 = {}
  this.loading = true;

    try {
      const response = await this.MarchesOptions.find(item => item.type?.code_type_marche === id);
        let data =  response
        this.step2 = {
          code_type_marche: data.type?.code_type_marche,
          nom_type_marche: data.type?.nom_type_marche,
          description: data.type?.description,
        }
     
        this.ToId = data.type?.id_type_marche
    this.openModal(modalId)

        this.loading = false;
      
      
    } catch (error) {
    
  this.handleErrors(error);
    }

  },
  async  submitUpdate(modalId){
 
 this.v$.step2.$touch();


  if (this.v$.$errors.length == 0) {
  
     this.loading = true;
     let data = {
          code_type_marche:this.step2.code_type_marche,
          nom_type_marche:this.step2.nom_type_marche,
          description:this.step2.description,
        
          }



    try {
      const response = await axios.put(`/parametrages/type-marches/${this.step2.code_type_marche}`,data, {
        headers: {
         
          Authorization: `Bearer ${this.loggedInUser.token}`,
        
        },
      });
   
      if (response.status === 200) {
        this.closeModal(modalId);
        this.successmsg(
      "Mise à jour du type de points de collecte ",
      "Votre type de points de collecte  a été mis à jour avec succès !"
    );
          await this.fetchMarches();
       
        
      } 
    } catch (error) {
  this.handleErrors(error);
    }
  } else {

    this.loading = false;

  }
 },
 
  filterByName() {
this.currentPage = 1;
if (this.searchMarche !== null) {
 const tt = this.searchMarche;
const  searchValue = tt.toLowerCase()
this.MarchesOptions =this.data.filter(user => {


  const Code = user.type?.code_type_marche || '';
  const nom = user.type?.nom_type_marche || '';
  const Commune = user?.type?.description || '';
  
  
  return Code.toLowerCase().includes(searchValue) || nom.toLowerCase().includes(searchValue) || Commune.toLowerCase().includes(searchValue) 
  
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
    return this.MarchesOptions.slice(startIndex, endIndex);
  },
  },
}
</script>
<style lang="css" scoped>
  
</style>