<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="col-12">
<div class="box">
   <div class="box-header with-border d-flex justify-content-between align-items-center p-3">
     <h3 class="box-title mb-0">Liste des préfectures </h3>
     <div class="navbar-custom-menu r-side">
        <ul class="nav navbar-nav justify-content-end">	
				  
			<li class="btn-group d-lg-inline-flex d-none h-40">
				<div class="app-menu">
					<div class="search-bx mx-5">
						<form>
							<div class="input-group">
							  <input type="text" class="form-control" placeholder="Search" aria-label="Recherchez..." aria-describedby="button-addon2" v-model="searchPrefecture" @input="filterByName">
							  <div class="input-group-append">
								<button class="btn border border-1" ><i class="ti-search"></i></button>
							  </div>
							</div>
						</form>
					</div>
				</div>
			</li>
			<li class="h-40">
				<button type="button" class="waves-effect waves-circle btn btn-circle btn-primary mb-5" @click="openModal('add-prefecture')"  ><i class="mdi mdi-plus"></i></button>
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
                   <th>Abréviation</th>
                   <th>Préfecture</th>
                   <th>Région</th>
                   <th>Région naturelle</th>
                   <th>Action</th>
                  
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
                   <td style="width: 50px;" class="text-center">
                        {{ data.code_prefecture }}
                   </td>
                   <td style="width: 120px;">{{ data.abrege_prefecture }}</td>
                   <td>{{ data.nom_prefecture }}</td>
                   <td>{{ data.region_relation?.nom_region ?? "-" }}</td>
                   <td>{{ data.region_relation?.region_naturelle_relation?.nom_region_naturelle ?? "-" }}</td>
               
                   <td style="width: 100px;">
                    <div class="d-flex justify-content-evenly border-0">
                        <a href="javascript:void(0)" class="btn btn-circle btn-info btn-xs" title="" @click="HandleIdUpdate(data.code_prefecture , 'prefecture-update')"><i class="ti-marker-alt"></i></a>
                        <a href="javascript:void(0)" class="btn btn-circle btn-danger btn-xs" @click="HandleIdDelete(data.code_prefecture)" title="" data-toggle="tooltip" data-original-title="Delete"><i class="ti-trash"></i></a>
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

            <div class="modal center-modal fade" id="add-prefecture"  ref="add-prefecture" tabindex="-1">
	  <div class="modal-dialog modal-lg">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title">Ajouter des préfectures </h5>
			<button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"  @click="closeModal('add-prefecture')" >
              <span aria-hidden="true">&times;</span>
            </button>
		  </div>
		  <div class="modal-body">
         <!-- <div class="btn-list" style="position:relative ; right: 7px; top: 5px;" > -->
          <div class="bouttons" style="position: relative ; width: 100%; " > 
        <div class="btn btn-secondary py-1 px-2" style="position: absolute; right: 0; top: 13px; z-index:1000" @click="AddformDataPrefectures" ><i  class="ti-plus"></i></div>
         </div>
          <!-- </div>  -->
                <div class="row align-items-center p-2  border-bottom " v-for="(prefecture, index) in Prefectures" :key="prefecture.id">
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
                        v-model="prefecture.code_prefecture"
                        color="info"
                        name="code_prefecture"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        @input="clearErrorPrefectures(index, 'code_prefecture')"

                      />
                      <small v-if="errors.Prefectures && errors.Prefectures[index] && errors.Prefectures[index].code_prefecture">{{ errors.Prefectures[index].code_prefecture }}</small>
                      <small v-if="resultError['Prefectures']"> {{ resultError["Prefectures"] }} </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Abréviation <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="prefecture.abrege_prefecture"
                        color="info"
                        name="abrege_prefecture"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        @input="clearErrorPrefectures(index, 'abrege_prefecture')"

                      />
                      <small v-if="errors.Prefectures && errors.Prefectures[index] && errors.Prefectures[index].abrege_prefecture">{{ errors.Prefectures[index].abrege_prefecture }}</small>
                      <small v-if="resultError['Prefectures']"> {{ resultError["Prefectures"] }} </small>
                    </div>
                  </div>

                 
 
                        </div>
                        <div class="row  content-group">
                 
                 <div class="col">
                   <div class="input-groupe">
                     <label for="userpassword"
                       >Nom <span class="text-danger">*</span></label
                     >
                     <MazInput
                       v-model="prefecture.nom_prefecture"
                       color="info"
                       name="nom_prefecture"
                       size="sm"
                       rounded-size="sm"
                       type="text"
                       @input="clearErrorPrefectures(index, 'nom_prefecture')"

                     />
                     <small v-if="errors.Prefectures && errors.Prefectures[index] && errors.Prefectures[index].nom_prefecture">{{ errors.Prefectures[index].nom_prefecture }}</small>
                     <small v-if="resultError['Prefectures']"> {{ resultError["Prefectures"] }} </small>
                   </div>
                 </div>
                 <div class="col">
                   <div class="input-groupe">
                     <label for="userpassword"
                       >Région  <span class="text-danger">*</span></label
                     >
                     <MazSelect
                       v-model="prefecture.region"
                       color="info"
                       name="region"
                       size="sm"
                       rounded-size="sm"
                       search
                       :options="RegionsOptions"
                       @click="clearErrorPrefectures(index, 'region')"

                     />
                     <small v-if="errors.Prefectures && errors.Prefectures[index] && errors.Prefectures[index].region">{{ errors.Prefectures[index].region }}</small>
                     <small v-if="resultError['Prefectures']"> {{ resultError["Prefectures"] }} </small>
                   </div>
                 </div>

                

                       </div>
                  </div>
                  <div class="col-1" style="position: relative">
                    
                      <button class="btn btn-sm btn-icon btn-danger btn-wave py-1 px-2" @click="deleteRowPrefectures(index)"  style=" position:absolute !important ; top: 12px !important; background:red;">
                       <i class="ti-trash"></i>
                      </button>
                  </div>

                </div>
             
		  </div>
		  <div class="modal-footer modal-footer-uniform text-end">
        <button type="button" @click="SubmitPrefecture('add-prefecture')" class="waves-effect waves-light btn btn-primary ">Valider</button>
		

		  </div>
		</div>
	  </div>
	</div>

    
    <div class="modal center-modal fade"  id="prefecture-update"  ref="prefecture-update" tabindex="-1">
	  <div class="modal-dialog modal-lg">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title">Modifier une préfecture</h5>
			<button type="button" class=" modal_close btn btn-circle btn-danger close py-1 px-3"  @click="closeModal('prefecture-update')" >
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
                        v-model="step2.code_prefecture"
                        color="secondary"
                        name="step2.code_prefecture"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        
                        
                      />
                      <small v-if="v$.step2.code_prefecture.$error">{{
                        v$.step2.code_prefecture.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['code_prefecture']">
                        {{ resultError["code_prefecture"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        > Abréviation <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step2.abrege_prefecture"
                        color="secondary"
                        name="step2.abrege_prefecture"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        
                        
                      />
                      <small v-if="v$.step2.abrege_prefecture.$error">{{
                        v$.step2.abrege_prefecture.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['abrege_prefecture']">
                        {{ resultError["abrege_prefecture"] }}
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
                        v-model="step2.nom_prefecture"
                        color="secondary"
                        name="step2.nom_prefecture"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        
                        
                      />
                      <small v-if="v$.step2.nom_prefecture.$error">{{
                        v$.step2.nom_prefecture.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['nom_prefecture']">
                        {{ resultError["nom_prefecture"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        > Région  <span class="text-danger">*</span></label
                      >
                      <MazSelect
                        v-model="step2.regionPrefecture"
                        color="secondary"
                        name="step2.regionPrefecture"
                        size="sm"
                        rounded-size="sm"
                        search
                        :options="RegionsOptions"
                        
                        
                      />
                      <small v-if="v$.step2.regionPrefecture.$error">{{
                        v$.step2.regionPrefecture.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['regionPrefecture']">
                        {{ resultError["regionPrefecture"] }}
                      </small>
                    </div>
                  </div>
                
                </div>

		  </div>
		  <div class="modal-footer modal-footer-uniform text-end">
        <button type="button" @click="submitUpdate('prefecture-update')" class="waves-effect waves-light btn btn-primary ">Valider</button>
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
      return Math.ceil(this.PrefecturesOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.PrefecturesOptions.slice(startIndex, endIndex);
    },
  
  },
    data() {
        return {
            loading: true,
            searchPrefecture:"",
            isModalUpdate:"",
            RegionsOptions: [],
            PrefecturesOptions: [],
            data:[],
            currentPage: 1,
            itemsPerPage: 20,
            ToId:"",
            totalPageArray: [],
            v$: useVuelidate(),
            error: "",
            resultError: {},
            errors: {Prefectures: [] , },
            Prefectures:[{ 
                code_prefecture:"",
                nom_prefecture:"",
                abrege_prefecture:"",
                region:"",
            }
            ],
            step2: {
                code_prefecture:"",
                nom_prefecture:"",
                abrege_prefecture:"",
                regionPrefecture:"",

            },


        }
    },
    validations: {
       
        step2: {
           
            code_prefecture:{require},
            nom_prefecture:{require},
            abrege_prefecture:{require},
            regionPrefecture:{require},
        },
  },
  async  mounted() {
    await this.fetchPrefectures()
    await this.fetchRegions()
        
    },
    methods: {
        successmsg:successmsg,
        AddformDataPrefectures() {
     this.Prefectures.push({ code_prefecture:"", nom_prefecture:"",abrege_prefecture:"", region:""});
   },
   deleteRowPrefectures(index) {
  
   if(index !== 0){
     this.Prefectures.splice(index, 1);
   }
  },
  clearErrorPrefectures(index, field) {   
     if (this.errors.Prefectures[index]) {
       this.errors.Prefectures[index][field] = null;
     }
   },
   validatePrefectures() {
    let isValid = true;
    this.errors = { Prefectures: [] };
    this.Prefectures.forEach((prefecture, index) => {
        const prefectureErrors = {};
        
        if (!prefecture.code_prefecture) {
            prefectureErrors.code_prefecture = 'Ce champs est obligatoire!';
            isValid = false;
        }
        if (!prefecture.nom_prefecture) {
            prefectureErrors.nom_prefecture = 'Ce champs est obligatoire!';
            isValid = false;
        }
        if (!prefecture.abrege_prefecture) {
            prefectureErrors.abrege_prefecture = 'Ce champs est obligatoire!';
            isValid = false;
        }
        if (!prefecture.region) {
            regionErrors.region = 'Ce champs est obligatoire!';
            isValid = false;
        }
       
      
        this.errors.Prefectures[index] = prefectureErrors;
    });
    return isValid;
},
        
        async fetchRegions() {
      try {
        const response = await axios.get( '/parametrages/localites/regions',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
            
          }
        );

          console.log('responseRegions',response.data)
        if (response.status === 200) {
              response.data.map(item =>  this.RegionsOptions.push({
                
                label:item.nom_region,
                value:item.id_region
              }))
             
              this.loading =  false
        }
      } catch (error) {
       
        this.handleErrors(error);
      }
    },
    async fetchPrefectures() {
      try {
        const response = await axios.get( '/parametrages/localites/prefectures',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
            
          }
        );

          console.log('response',response)
        if (response.status === 200) {
              this.data  = response.data ;
              this.PrefecturesOptions = this.data
              this.$emit('prefecture-count', this.data.length)
              this.loading =  false
        }
      } catch (error) {
       
        this.handleErrors(error);
      }
    },
    async SubmitPrefecture(modalId) {
      
     
      if (this.validatePrefectures()) {
        console.log('regions',this.validatePrefectures)
        this.loading = true;
        try {
          const response = await axios.post("/parametrages/localites/prefectures", this.Prefectures, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
           
          }
          });
       console.log('qfs',response)

      
          if (response.status === 200) {
     this.Prefectures = [{ code_prefecture:"", nom_prefecture:"",abrege_prefecture:"", region:""}];

             this.closeModal(modalId);
             this.successmsg(
                "Création de préfectures",
                "Vos préfectures ont été créées avec succès !"
            );

            await this.fetchPrefectures();
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
        const response = await axios.get(`/parametrages/localites/prefectures/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`
          }
        });

      
        if (response.status === 200) {
            console.log('Slbvlkjbv',response)
        
          let data =  response.data
          let Rprefecture = data?.region
          this.step2={
            code_prefecture : data.code_prefecture,
            nom_prefecture : data.nom_prefecture,
            abrege_prefecture :data.abrege_prefecture,
            regionPrefecture : Rprefecture

          }
          console.log('trest',Rprefecture)
        
          this.ToId = data.code_prefecture
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
            code_prefecture:this.step2.code_prefecture,
            nom_prefecture:this.step2.nom_prefecture,
            abrege_prefecture:this.step2.abrege_prefecture,
            region:this.step2.regionPrefecture,
          
          
            }

console.log('data',data)
 
      try {
        const response = await axios.put(`/parametrages/localites/prefectures/${this.ToId}`,data, {
          headers: {
           
            Authorization: `Bearer ${this.loggedInUser.token}`,
          
          },
        });
     
        if (response.status === 200) {
          this.closeModal(modalId);
          this.successmsg(
                "Mise à jour de la préfecture",
                "Votre préfecture a été mise à jour avec succès !"
            );
            await this.fetchPrefectures();
         
          
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
            console.log('delete',id)
          this.loading = true
         
         try {
           // Faites une requête pour supprimer l'élément avec l'ID itemId
           const response = await axios.delete(`/parametrages/localites/prefectures/${id}`, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
             },

           });
       
           if (response.status === 200) {
             this.loading = false
             this.successmsg(
                    "Suppression de la préfecture",
                    "Votre préfecture a été supprimée avec succès !"
                );
            await this.fetchPrefectures();
   
           } else {
        
             this.loading = false
           }
         } catch (error) {
          this.handleErrors(error);
           
         }
   
       },
    filterByName() {
this.currentPage = 1;
if (this.searchPrefecture !== null) {
   const tt = this.searchPrefecture;
  const  searchValue = tt.toLowerCase()
  this.PrefecturesOptions =this.data.filter(user => {
    const Code = user.code_prefecture || '';
    const Abréviation = user.abrege_prefecture || '';
    const Préfecture = user.region_relation?.nom_region || '';
    const Région = user.nom_prefecture || '';
    const naturelle = user.region_relation?.region_naturelle_relation?.nom_region_naturelle  || '';
    return Code.toLowerCase().includes(searchValue) || Abréviation.toLowerCase().includes(searchValue) || Préfecture.toLowerCase().includes(searchValue) || Région.toLowerCase().includes(searchValue) || naturelle.toLowerCase().includes(searchValue);
  });

} else {
this.PrefecturesOptions = [...this.data];
 
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
      return this.PrefecturesOptions.slice(startIndex, endIndex);
    },
    },
    
}
</script>
<style lang="css" scoped>
    
</style>